import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import PostLike from '#models/post_like'
import Comment from '#models/Comment'
import CommentLike from '#models/comment_like'
import PostMedia from '#models/post_media'
import env from '#start/env'
import axios from 'axios'
import fs from 'node:fs'

export default class FeedController {
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
  async createPost({ request, auth, response }: HttpContext) {
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
        mimeType: file.type,
        order: i,
      })
    }

    return {
      message: 'Post created successfully',
      post: await post.refresh(),
    }
  }

  /**
   * Like a post
   */
  async likePost({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const postId = params.id

    const already = await PostLike.query()
      .where('user_id', user.id)
      .where('post_id', postId)
      .first()

    if (already) {
      return response.badRequest({ message: 'Already liked' })
    }

    await PostLike.create({
      userId: user.id,
      postId,
    })

    return { message: 'Post liked' }
  }

  /**
   * Unlike a post
   */
  async unlikePost({ params, auth }: HttpContext) {
    const user = auth.user!
    const postId = params.id

    await PostLike.query().where('user_id', user.id).where('post_id', postId).delete()

    return { message: 'Post unliked' }
  }

  /**
   * Create a comment on a post (or reply)
   */
  async createComment({ params, request, auth }: HttpContext) {
    const user = auth.user!
    const postId = params.id
    const { text, parentId } = request.only(['text', 'parentId'])

    const comment = await Comment.create({
      userId: user.id,
      postId,
      text,
      parentId: parentId ?? null,
    })

    return {
      message: 'Comment added',
      comment,
    }
  }

  /**
   * Like a comment/reply
   */
  async likeComment({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const commentId = params.id

    const exists = await CommentLike.query()
      .where('user_id', user.id)
      .where('comment_id', commentId)
      .first()

    if (exists) {
      return response.badRequest({ message: 'Already liked' })
    }

    await CommentLike.create({
      userId: user.id,
      commentId,
    })

    return { message: 'Comment liked' }
  }

  /**
   * Unlike a comment/reply
   */
  async unlikeComment({ params, auth }: HttpContext) {
    const user = auth.user!
    const commentId = params.id

    await CommentLike.query().where('user_id', user.id).where('comment_id', commentId).delete()

    return { message: 'Comment unliked' }
  }
}
