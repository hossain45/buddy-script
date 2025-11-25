import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import PostMedia from '#models/post_media'
import env from '#start/env'
import axios from 'axios'
import fs from 'node:fs'

export default class PostController {
  /**
   * Get feed (public posts + user's private posts)
   */
  async index({ auth, response }: HttpContext) {
    const user = auth.user!

    const posts = await Post.query()
      .where((query) => {
        query.where('visibility', 'public').orWhere((q) => {
          q.where('visibility', 'private').where('user_id', user.id)
        })
      })
      .orderBy('created_at', 'desc')
      .preload('author')
      .preload('media')
      .preload('likes', (q) => q.preload('user'))
      .preload('comments', (q) =>
        q
          .whereNull('parent_id')
          .preload('author')
          .preload('likes')
          .preload('replies', (replyQuery) => replyQuery.preload('author').preload('likes'))
      )

    const formatted = posts?.map((post) => {
      const isLiked = post?.likes?.some((like) => like.userId === user.id)
      const likesCount = post?.likes?.length || 0
      const commentsCount = post?.comments?.length || 0

      return {
        ...post.serialize(),
        isLiked,
        likesCount,
        commentsCount,
      }
    })

    return response.json({
      posts: formatted,
      count: formatted.length,
    })
  }

  /**
   * Create a new post (with IMGBB image upload)
   */
  async createPost({ request, auth, response }: HttpContext) {
    const user = auth.user!

    const { text, visibility } = request.only(['text', 'visibility'])

    // Create and save the post first
    const post = new Post()
    post.text = text
    post.visibility = visibility ?? 'public'
    post.userId = user.id
    await post.save()

    const files = request.files('images')

    // handling image upload to IMGBB
    if (files && files.length > 0) {
      for (const [i, file] of files.entries()) {
        if (!file.isValid) continue

        try {
          // Convert file → Base64
          const fileBuffer = fs.readFileSync(file.tmpPath!)
          const base64Image = fileBuffer.toString('base64')
          
          // Clean up the temporary file
          fs.unlinkSync(file.tmpPath!)

          // Upload to ImgBB using URLSearchParams (application/x-www-form-urlencoded)
          // ImgBB does not support JSON payloads
          const formData = new URLSearchParams()
          formData.append('image', base64Image)

          const uploadRes = await axios.post(
            `https://api.imgbb.com/1/upload?key=${env.get('IMGBB_API_KEY')}`,
            formData,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          )

          const imageUrl = uploadRes.data.data.url

          await PostMedia.create({
            postId: post.id,
            url: imageUrl,
            order: i,
          })
        } catch (error) {
          console.error('Error uploading image to ImgBB:', error.response?.data || error.message)
          // Continue with other images even if one fails
        }
      }
    }

    // Load relationships after everything is saved
    await post.load('author')
    await post.load('media')
    await post.load('likes')

    return response.json({
      message: 'Post created successfully',
      post: post.serialize(),
    })
  }

  /**
   * make a post private
   * @param params - The post ID
   */
  async makePostPrivate({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const postId = params.id

    const post = await Post.query()
      .where('id', postId)
      .where('user_id', user.id)
      .firstOrFail()

    post.visibility = 'private'
    await post.save()

    return response.json({
      message: 'Post made private',
      postId: post.id,
      visibility: post.visibility,
    })
  }

  /**
   * make a post public
   * @param params - The post ID
   */
  async makePostPublic({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const postId = params.id

    const post = await Post.query()
      .where('id', postId)
      .where('user_id', user.id)
      .firstOrFail()

    post.visibility = 'public'
    await post.save()

    return response.json({
      message: 'Post made public',
      postId: post.id,
      visibility: post.visibility,
    })
  }
}
