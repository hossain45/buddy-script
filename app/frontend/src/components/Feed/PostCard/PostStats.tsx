/**
 * PostStats Component
 * Responsibility: Display post statistics (likes and comments count)
 */

import React from 'react';

interface PostStatsProps {
  likesCount: number;
  commentsCount: number;
  onLikesClick: () => void;
  onCommentsClick: () => void;
}

export const PostStats: React.FC<PostStatsProps> = ({
  likesCount,
  commentsCount,
  onLikesClick,
  onCommentsClick,
}) => {
  return (
    <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
      <button 
        onClick={onLikesClick}
        className="flex items-center gap-1 hover:underline cursor-pointer"
      >
        <div className="flex -space-x-1">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center border border-white dark:border-gray-800">
             <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
          </div>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
          {likesCount}
        </span>
      </button>
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <button 
          onClick={onCommentsClick}
          className="hover:underline cursor-pointer"
        >
          {commentsCount} Comment{commentsCount !== 1 ? 's' : ''}
        </button>
      </div>
    </div>
  );
};
