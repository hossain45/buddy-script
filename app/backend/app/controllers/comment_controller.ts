import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import CommentLike from '#models/comment_like'

export default class CommentController {
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
   * get comments of a post and replies
   * @param params - The post ID
   */
  async getComments({ params, auth }: HttpContext) {
    const postId = params.id
    const user = auth.user!

    const comments = await Comment.query()
      .where({ postId })
      .whereNull('parent_id')
      .preload('author')
      .preload('likes', (q) => q.preload('user'))
      .preload('replies', (replyQuery) =>
        replyQuery.preload('author').preload('likes', (q) => q.preload('user'))
      )

    const formatted = comments.map((comment) => {
      const isLiked = comment.likes.some((like) => like.userId === user.id)

      return {
        ...comment.serialize(),
        isLiked,
      }
    })

    return formatted
  }
}

