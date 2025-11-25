/**
 * PostCard Component
 * Responsibility: Display a single post with interactions (like, comment, share)
 */

import React, { useState } from 'react';
import type { Post } from '../../types';
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from '../../store/api/postApi';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';
import { PostHeader } from './PostCard/PostHeader';
import { PostContent } from './PostCard/PostContent';
import { PostStats } from './PostCard/PostStats';
import { PostActions } from './PostCard/PostActions';
import { LikesPopup } from './PostCard/LikesPopup';
import { PostComments } from './PostCard/PostComments';

interface PostCardProps {
  post: Post & { isLiked?: boolean };
  currentUserId?: number;
}

export const PostCard: React.FC<PostCardProps> = ({ post, currentUserId }) => {
  const [showComments, setShowComments] = useState(false);
  const [showLikesPopup, setShowLikesPopup] = useState(false);
  const currentUser = useSelector(selectUser);

  // Optimistic state for likes
  const [optimisticIsLiked, setOptimisticIsLiked] = useState(post.isLiked ?? false);
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(post.likesCount ?? 0);

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  const handleLike = async () => {
    const wasLiked = optimisticIsLiked;
    const previousCount = optimisticLikesCount;
    
    setOptimisticIsLiked(!wasLiked);
    setOptimisticLikesCount(wasLiked ? previousCount - 1 : previousCount + 1);

    try {
      if (wasLiked) {
        await unlikePost(post.id).unwrap();
      } else {
        await likePost(post.id).unwrap();
      }
    } catch (error) {
      setOptimisticIsLiked(wasLiked);
      setOptimisticLikesCount(previousCount);
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <div className="card mb-6 p-0 overflow-hidden dark:bg-[var(--color-dark-bg)]">
      {/* Header */}
      <PostHeader
        post={post}
        currentUserId={currentUserId}
      />

      {/* Content */}
      <PostContent post={post} />

      {/* Stats */}
      <PostStats
        likesCount={optimisticLikesCount}
        commentsCount={post.commentsCount ?? 0}
        onLikesClick={() => setShowLikesPopup(true)}
        onCommentsClick={() => setShowComments(!showComments)}
      />

      {/* Actions */}
      <PostActions
        isLiked={optimisticIsLiked}
        onLike={handleLike}
        onComment={() => setShowComments(!showComments)}
      />

      {/* Likes Popup */}
      {showLikesPopup && (
        <LikesPopup
          likes={post.likes ?? []}
          likesCount={optimisticLikesCount}
          onClose={() => setShowLikesPopup(false)}
        />
      )}

      {/* Comments Section */}
      <PostComments
        post={post}
        currentUser={currentUser}
        currentUserId={currentUserId}
        showComments={showComments}
      />
    </div>
  );
};
