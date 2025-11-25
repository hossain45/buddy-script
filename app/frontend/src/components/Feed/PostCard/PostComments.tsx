/**
 * PostComments Component
 * Responsibility: Handle comment input and display list of comments
 */

import React, { useState } from 'react';
import type { Post, User } from '../../../types';
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} from '../../../store/api/commentApi';
import { Comments } from '../Comments';
import avatarImage from '../../../assets/images/Avatar.png';

interface PostCommentsProps {
  post: Post;
  currentUser: User | null;
  currentUserId?: number;
  showComments: boolean;
}

export const PostComments: React.FC<PostCommentsProps> = ({
  post,
  currentUser,
  currentUserId,
  showComments,
}) => {
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const [createComment] = useCreateCommentMutation();
  const [likeComment] = useLikeCommentMutation();
  const [unlikeComment] = useUnlikeCommentMutation();

  const { data: commentsData, refetch: refetchComments } = useGetCommentsQuery(post.id, {
    skip: !showComments,
  });

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await createComment({
        postId: post.id,
        text: commentText.trim(),
        parentId: replyingTo || undefined,
      }).unwrap();
      setCommentText('');
      setReplyingTo(null);
      refetchComments();
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  const handleReplySubmit = async (parentId: number) => {
    if (!replyText.trim()) return;

    try {
      await createComment({
        postId: post.id,
        text: replyText.trim(),
        parentId,
      }).unwrap();
      setReplyText('');
      setReplyingTo(null);
      refetchComments();
    } catch (error) {
      console.error('Failed to create reply:', error);
    }
  };

  if (!showComments) return null;

  return (
    <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      {/* Comment Input */}
      <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4 p-4">
        <img
          src={avatarImage}
          alt={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Your avatar'}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
        <input
          type="text"
          className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-[var(--color-dark-bg2)] border-0 rounded-full text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          type="submit"
          className="btn-primary px-4 py-2"
          disabled={!commentText.trim()}
        >
          Post
        </button>
      </form>

      {/* Comments List */}
      <Comments
        comments={commentsData?.comments || []}
        currentUserId={currentUserId}
        onReply={(commentId) => setReplyingTo(commentId)}
        replyingTo={replyingTo}
        replyText={replyText}
        onReplyTextChange={setReplyText}
        onReplySubmit={handleReplySubmit}
        onLikeComment={async (commentId) => {
          try {
            const comment = commentsData?.comments.find((c) => c.id === commentId);
            const isLiked = (comment as any)?.isLiked ?? false;
            if (isLiked) {
              await unlikeComment(commentId).unwrap();
            } else {
              await likeComment(commentId).unwrap();
            }
            refetchComments();
          } catch (error) {
            console.error('Failed to toggle comment like:', error);
          }
        }}
      />
    </div>
  );
};
