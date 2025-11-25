/**
 * Comment API endpoints
 * Handles comment creation, retrieval, and comment likes
 */

import { baseApi } from './baseApi';
import type { Comment, CreateCommentPayload } from '../../types';

export interface CreateCommentResponse {
  message: string;
  comment: Comment;
}

export interface GetCommentsResponse {
  comments: Comment[];
  count: number;
}

export interface LikeCommentResponse {
  message: string;
  commentId: number;
  likesCount: number;
}

export interface UnlikeCommentResponse {
  message: string;
  commentId: number;
  likesCount: number;
}

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a comment on a post (or reply)
    createComment: builder.mutation<CreateCommentResponse, CreateCommentPayload & { postId: number }>({
      query: ({ postId, text, parentId }) => ({
        url: `/feed/post/${postId}/comment`,
        method: 'POST',
        body: {
          text,
          parentId: parentId || undefined,
        },
      }),
      invalidatesTags: ['Comment', 'Post'],
    }),

    // Get comments for a post
    getComments: builder.query<GetCommentsResponse, number>({
      query: (postId) => ({
        url: `/feed/post/${postId}/comments`,
        method: 'GET',
      }),
      providesTags: (_result, _error, postId) => [
        { type: 'Comment', id: `post-${postId}` },
        { type: 'Comment', id: 'LIST' },
      ],
    }),

    // Like a comment
    likeComment: builder.mutation<LikeCommentResponse, number>({
      query: (commentId) => ({
        url: `/feed/comment/${commentId}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Comment', 'Like'],
    }),

    // Unlike a comment
    unlikeComment: builder.mutation<UnlikeCommentResponse, number>({
      query: (commentId) => ({
        url: `/feed/comment/${commentId}/like`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment', 'Like'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} = commentApi;

