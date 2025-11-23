/**
 * PostCard Component
 * Responsibility: Display a single post with interactions (like, comment, share)
 */

import React, { useState } from 'react';
import type { PostWithDetails } from '../../types';

interface PostCardProps {
  post: PostWithDetails;
  onLike?: (postId: number) => void;
  onComment?: (postId: number, text: string) => void;
  onShare?: (postId: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment, onShare }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(post.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment?.(post.id, commentText);
      setCommentText('');
    }
  };

  const handleShare = () => {
    onShare?.(post.id);
  };

  return (
    <div className="post-card animate-fade-in">
      {/* Post Header */}
      <div className="post-header">
        <img
          src="/images/feed_event1.png"
          alt={post.author.firstName}
          className="post-avatar"
        />
        <div className="flex-1">
          <h5 className="post-author">
            {post.author.firstName} {post.author.lastName}
          </h5>
          <div className="post-time">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>
        <button type="button" className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Post Content */}
      {post.text && (
        <div className="post-content">
          <p>{post.text}</p>
        </div>
      )}

      {/* Post Media */}
      {post.media && post.media.length > 0 && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <div className={`grid ${post.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
            {post.media.map((media) => (
              <img
                key={media.id}
                src={media.url}
                alt="Post media"
                className="w-full h-auto object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {/* Post Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            <img src="/images/react_img1.png" alt="Like" className="w-5 h-5 rounded-full border-2 border-white" />
            <img src="/images/react_img2.png" alt="Love" className="w-5 h-5 rounded-full border-2 border-white" />
            <img src="/images/react_img3.png" alt="Wow" className="w-5 h-5 rounded-full border-2 border-white" />
          </div>
          <span>{post.likesCount || 0}</span>
        </div>
        <div className="flex gap-4">
          <span>{post.commentsCount || 0} Comments</span>
          <span>2 Shares</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <button
          type="button"
          className={`post-action-btn ${isLiked ? 'text-blue-500' : ''}`}
          onClick={handleLike}
        >
          <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="font-medium">Like</span>
        </button>

        <button
          type="button"
          className="post-action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="font-medium">Comment</span>
        </button>

        <button
          type="button"
          className="post-action-btn"
          onClick={handleShare}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span className="font-medium">Share</span>
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <img src="/images/Avatar.png" alt="Your avatar" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <input
              type="text"
              className="form-input flex-1"
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
        </div>
      )}
    </div>
  );
};
