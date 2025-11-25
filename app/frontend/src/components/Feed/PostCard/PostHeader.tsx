/**
 * PostHeader Component
 * Responsibility: Display post author info and action menu
 */

import React, { useState } from 'react';
import type { Post } from '../../../types';
import avatarImage from '../../../assets/images/Avatar.png';
import { useMakePostPrivateMutation, useMakePostPublicMutation } from '../../../store/api/postApi';

interface PostHeaderProps {
  post: Post;
  currentUserId?: number;
}

export const PostHeader: React.FC<PostHeaderProps> = ({ 
  post, 
  currentUserId, 
}) => {
  const [showPostActions, setShowPostActions] = useState(false);
  const [makePostPrivate] = useMakePostPrivateMutation();
  const [makePostPublic] = useMakePostPublicMutation();

  const handleToggleVisibility = async () => {
    try {
      if (post.visibility === 'public') {
        await makePostPrivate(post.id).unwrap();
      } else {
        await makePostPublic(post.id).unwrap();
      }
    } catch (error) {
      console.error('Failed to toggle visibility:', error);
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={avatarImage}
          alt={post.author?.firstName || 'User'}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
            {post.author?.firstName} {post.author?.lastName}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>{formatTimeAgo(post.createdAt)}</span>
            <span>•</span>
            {post.visibility === 'public' ? (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Public
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Private
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Post Actions Dropdown */}
      {currentUserId === post.userId && (
        <div className="relative">
          <button 
            onClick={() => setShowPostActions(!showPostActions)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showPostActions && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setShowPostActions(false)}
              />
              
              {/* Menu */}
              <div className="absolute right-0 top-8 z-20 w-48 bg-white dark:bg-[var(--color-dark-bg)] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                {/* Make Public/Private */}
                <button
                  onClick={() => {
                    handleToggleVisibility();
                    setShowPostActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[var(--color-dark-bg2)] flex items-center gap-2"
                >
                  {post.visibility === 'public' ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Make Private
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Make Public
                    </>
                  )}
                </button>

                {/* Edit Post */}
                <button
                  onClick={() => {
                    // TODO: Implement edit functionality
                    console.log('Edit post:', post.id);
                    setShowPostActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[var(--color-dark-bg2)] flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Post
                </button>

                {/* Delete Post */}
                <button
                  onClick={() => {
                    // TODO: Implement delete functionality
                    console.log('Delete post:', post.id);
                    setShowPostActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-[var(--color-dark-bg2)] flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Post
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
