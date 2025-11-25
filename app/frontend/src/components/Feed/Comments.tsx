/**
 * Comments Component
 * Responsibility: Display comments and replies with like functionality
 */

import React from 'react';
import type { Comment } from '../../types';
import avatarImage from '../../assets/images/Avatar.png';

interface CommentsProps {
  comments: (Comment & { isLiked?: boolean })[];
  currentUserId?: number;
  onReply: (commentId: number | null) => void;
  replyingTo: number | null;
  replyText: string;
  onReplyTextChange: (text: string) => void;
  onReplySubmit: (parentId: number) => void;
  onLikeComment: (commentId: number) => void;
}

export const Comments: React.FC<CommentsProps> = ({
  comments,

  onReply,
  replyingTo,
  replyText,
  onReplyTextChange,
  onReplySubmit,
  onLikeComment,
}) => {
  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return commentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderComment = (comment: Comment & { isLiked?: boolean }, isReply = false) => {
    const isLiked = comment.isLiked ?? false;
    const likesCount = comment.likesCount ?? 0;
    const replies = comment.replies || [];

    return (
      <div key={comment.id} className={`mb-4 ${isReply ? 'ml-10 pl-4 border-l-2 border-gray-100 dark:border-gray-700' : ''}`}>
        <div className="flex gap-3">
          <img
            src={avatarImage}
            alt={comment.author?.firstName || 'User'}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none p-3 mb-1 inline-block min-w-[200px]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm text-gray-900 dark:text-white">
                  {comment.author?.firstName} {comment.author?.lastName}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{formatTimeAgo(comment.createdAt)}</span>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{comment.text}</p>
            </div>

            {/* Comment Actions */}
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 ml-2 mb-2">
              <button
                type="button"
                onClick={() => onLikeComment(comment.id)}
                className={`flex items-center gap-1 hover:text-blue-500 transition-colors font-medium ${
                  isLiked ? 'text-blue-500' : ''
                }`}
              >
                {isLiked ? 'Liked' : 'Like'}
                {likesCount > 0 && <span>({likesCount})</span>}
              </button>

              {!isReply && (
                <button
                  type="button"
                  onClick={() => onReply(comment.id)}
                  className="hover:text-blue-500 transition-colors font-medium"
                >
                  Reply
                </button>
              )}
            </div>

            {/* Reply Input */}
            {replyingTo === comment.id && (
              <div className="flex gap-2 mb-3 mt-2 animate-fade-in">
                <input
                  type="text"
                  className="form-input flex-1 text-sm py-1.5"
                  placeholder={`Reply to ${comment.author?.firstName}...`}
                  value={replyText}
                  onChange={(e) => onReplyTextChange(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      onReplySubmit(comment.id);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => onReplySubmit(comment.id)}
                  className="btn-primary px-3 py-1 text-xs"
                  disabled={!replyText.trim()}
                >
                  Reply
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onReplyTextChange('');
                    onReply(null);
                  }}
                  className="px-3 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Replies */}
            {replies.length > 0 && (
              <div className="mt-2 space-y-3">
                {replies.map((reply) => renderComment(reply as Comment & { isLiked?: boolean }, true))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
        No comments yet. Be the first to start the conversation!
      </div>
    );
  }

  return <div className="space-y-4 px-4 pb-4">{comments.map((comment) => renderComment(comment))}</div>;
};

