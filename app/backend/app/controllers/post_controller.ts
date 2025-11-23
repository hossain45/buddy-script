import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import PostMedia from '#models/post_media'
import PostLike from '#models/post_like'
import env from '#start/env'
import axios from 'axios'
import fs from 'node:fs'

export default class PostController {
  /**
   * Get feed (public posts + user's private posts)
   */
  async index({ auth }: HttpContext) {
    const user = auth.user!

    const posts = await Post.query()
      .where((query) => {
        query.where('visibility', 'public').orWhere('user_id', user.id)
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

    const formatted = posts.map((post) => {
      const isLiked = post.likes.some((like) => like.userId === user.id)

      return {
        ...post.serialize(),
        isLiked,
      }
    })

    return formatted
  }

  /**
   * Create a new post (with IMGBB image upload)
   */
  async createPost({ request, auth }: HttpContext) {
    const user = auth.user!

    const { text, visibility } = request.only(['text', 'visibility'])

    const post = await Post.create({
      text,
      visibility: visibility ?? 'public',
      userId: user.id,
    })

    const files = request.files('images')

    // handling image upload to IMGBB
    for (const [i, file] of files.entries()) {
      if (!file.isValid) continue

      const imgData = request.file('photo', {
        size: '150kb',
        extnames: ['jpg', 'png', 'jpeg'],
      })

      // Convert file → Base64
      const fileBuffer = fs.readFileSync(imgData!.tmpPath!)
      const base64Image = fileBuffer.toString('base64')
      // Clean up the temporary file
      fs.unlinkSync(imgData!.tmpPath!)

      // Upload to ImgBB
      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${env.get('IMGBB_API_KEY')}`,
        {
          image: base64Image,
        }
      )

      const imageUrl = uploadRes.data.data.url
      console.log(imageUrl)

      await PostMedia.create({
        postId: post.id,
        url: imageUrl,
        order: i,
      })
    }

    return {
      message: 'Post created successfully',
      post: await post.refresh(),
    }
  }

  /**
   * make a post private
   * @param params - The post ID
   */
  async makePostPrivate({ params, auth }: HttpContext) {
    const user = auth.user!
    const postId = params.id

    await Post.updateOrCreate({ id: postId, userId: user.id }, { visibility: 'private' })

    return { message: 'Post made private' }
  }

  /**
   * make a post public
   * @param params - The post ID
   */
  async makePostPublic({ params, auth }: HttpContext) {
    const user = auth.user!
    const postId = params.id
    await Post.updateOrCreate({ id: postId, userId: user.id }, { visibility: 'public' })

    return { message: 'Post made public' }
  }
}

