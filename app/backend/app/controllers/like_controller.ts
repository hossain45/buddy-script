import type { HttpContext } from '@adonisjs/core/http'
import PostLike from '#models/post_like'
import CommentLike from '#models/comment_like'

export default class LikeController {
  /**
   * Like a post method
   * frontend will handle if it's already liked
   * @param params - The post ID
   */
  async likePost({ params, auth }: HttpContext) {
    const user = auth.user!
    const postId = params.id

    await PostLike.create({
      userId: user.id,
      postId,
    })

    return { message: 'Post liked' }
  }

  /**
   * Unlike a post method
   * frontend will handle if it's already unliked
   * @param params - The post ID
   */
  async unlikePost({ params, auth }: HttpContext) {
    const user = auth.user!
    const postId = params.id

    const like = await PostLike.findByOrFail({ userId: user.id, postId })
    await like.delete()

    return { message: 'Post unliked' }
  }

  /**
   * like state  of a post
   * @param params - The post ID
   */
  async likeState({ params }: HttpContext) {
    const postId = params.id

    const likes = await PostLike.findManyBy({ postId })
    return { likesCount: likes.length }
  }

  /**
   * Like a comment/reply
   * frontend will handle if it's already liked
   * @param params - The comment ID
   */
  async likeComment({ params, auth }: HttpContext) {
    const user = auth.user!
    const commentId = params.id

    await CommentLike.create({ userId: user.id, commentId })

    return { message: 'Comment liked' }
  }

  /**
   * Unlike a comment/reply
   * frontend will handle if it's already unliked
   * @param params - The comment ID
   */
  async unlikeComment({ params, auth }: HttpContext) {
    const user = auth.user!
    const commentId = params.id

    const like = await CommentLike.findByOrFail({ userId: user.id, commentId })
    await like.delete()

    return { message: 'Comment unliked' }
  }
}

