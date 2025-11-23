import type { HttpContext } from '@adonisjs/core/http'
import PostLike from '#models/post_like'
import CommentLike from '#models/comment_like'

export default class LikeController {
  /**
   * Like a post method
   * frontend will handle if it's already liked
   * @param params - The post ID
   */
  async likePost({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const postId = params.id

    await PostLike.create({
      userId: user.id,
      postId,
    })

    const likesCount = await PostLike.query().where('post_id', postId).count('* as total')
    const totalLikes = Number(likesCount[0].$extras.total)

    return response.json({
      message: 'Post liked',
      postId,
      likesCount: totalLikes,
    })
  }

  /**
   * Unlike a post method
   * frontend will handle if it's already unliked
   * @param params - The post ID
   */
  async unlikePost({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const postId = params.id

    const like = await PostLike.findByOrFail({ userId: user.id, postId })
    await like.delete()

    const likesCount = await PostLike.query().where('post_id', postId).count('* as total')
    const totalLikes = Number(likesCount[0].$extras.total)

    return response.json({
      message: 'Post unliked',
      postId,
      likesCount: totalLikes,
    })
  }

  /**
   * like state  of a post
   * @param params - The post ID
   */
  async likeState({ params, response }: HttpContext) {
    const postId = params.id

    const likes = await PostLike.findManyBy({ postId })

    return response.json({
      postId,
      likesCount: likes.length,
    })
  }

  /**
   * Like a comment/reply
   * frontend will handle if it's already liked
   * @param params - The comment ID
   */
  async likeComment({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const commentId = params.id

    await CommentLike.create({ userId: user.id, commentId })

    const likesCount = await CommentLike.query().where('comment_id', commentId).count('* as total')
    const totalLikes = Number(likesCount[0].$extras.total)

    return response.json({
      message: 'Comment liked',
      commentId,
      likesCount: totalLikes,
    })
  }

  /**
   * Unlike a comment/reply
   * frontend will handle if it's already unliked
   * @param params - The comment ID
   */
  async unlikeComment({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const commentId = params.id

    const like = await CommentLike.findByOrFail({ userId: user.id, commentId })
    await like.delete()

    const likesCount = await CommentLike.query().where('comment_id', commentId).count('* as total')
    const totalLikes = Number(likesCount[0].$extras.total)

    return response.json({
      message: 'Comment unliked',
      commentId,
      likesCount: totalLikes,
    })
  }
}
