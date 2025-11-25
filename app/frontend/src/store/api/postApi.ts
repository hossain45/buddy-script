/**
 * Post API endpoints
 * Handles post creation, retrieval, visibility updates, and post likes
 */

import { baseApi } from './baseApi';
import type { Post, PostVisibility } from '../../types';

export interface GetPostsResponse {
  posts: Post[];
  count: number;
}

export interface CreatePostPayload {
  text?: string;
  visibility?: PostVisibility;
  images?: File[];
}

export interface CreatePostResponse {
  message: string;
  post: Post;
}

export interface UpdatePostVisibilityResponse {
  message: string;
  postId: number;
  visibility: PostVisibility;
}

export interface LikePostResponse {
  message: string;
  postId: number;
  likesCount: number;
}

export interface UnlikePostResponse {
  message: string;
  postId: number;
  likesCount: number;
}

export interface PostLikeStateResponse {
  postId: number;
  likesCount: number;
}

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all posts (feed)
    getPosts: builder.query<GetPostsResponse, void>({
      query: () => ({
        url: '/feed',
        method: 'GET',
      }),
      providesTags: ['Post'],
    }),

    // Create a new post
    createPost: builder.mutation<CreatePostResponse, CreatePostPayload>({
      query: (postData) => {
        const formData = new FormData();
        formData.append('text', postData.text || '');
        formData.append('visibility', postData.visibility || 'public');

        // Append images if provided
        if (postData.images && postData.images.length > 0) {
          postData.images.forEach((file) => {
            formData.append('images', file);
          });
        }

        return {
          url: '/feed/post',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Post'],
    }),

    // Make post private
    makePostPrivate: builder.mutation<UpdatePostVisibilityResponse, number>({
      query: (postId) => ({
        url: `/feed/post/${postId}/private`,
        method: 'PUT',
      }),
      invalidatesTags: ['Post'],
    }),

    // Make post public
    makePostPublic: builder.mutation<UpdatePostVisibilityResponse, number>({
      query: (postId) => ({
        url: `/feed/post/${postId}/public`,
        method: 'PUT',
      }),
      invalidatesTags: ['Post'],
    }),

    // Like a post
    likePost: builder.mutation<LikePostResponse, number>({
      query: (postId) => ({
        url: `/feed/post/${postId}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Post', 'Like'],
    }),

    // Get post like state
    getPostLikeState: builder.query<PostLikeStateResponse, number>({
      query: (postId) => ({
        url: `/feed/post/${postId}/likes`,
        method: 'GET',
      }),
      providesTags: (_result, _error, postId) => [{ type: 'Like', id: `post-${postId}` }],
    }),

    // Unlike a post
    unlikePost: builder.mutation<UnlikePostResponse, number>({
      query: (postId) => ({
        url: `/feed/post/${postId}/like`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post', 'Like'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useMakePostPrivateMutation,
  useMakePostPublicMutation,
  useLikePostMutation,
  useGetPostLikeStateQuery,
  useUnlikePostMutation,
} = postApi;

