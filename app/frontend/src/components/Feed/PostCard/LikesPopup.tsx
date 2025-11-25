/**
 * LikesPopup Component
 * Responsibility: Display modal with list of users who liked the post
 */

import React from 'react';
import avatarImage from '../../../assets/images/Avatar.png';

interface LikesPopupProps {
  likes: any[];
  likesCount: number;
  onClose: () => void;
}

export const LikesPopup: React.FC<LikesPopupProps> = ({ likes, likesCount, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="bg-white dark:bg-[var(--color-dark-bg)] rounded-lg shadow-xl max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Likes ({likesCount})
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* List of users who liked */}
          <div className="overflow-y-auto max-h-[60vh] p-4">
            {likes && likes.length > 0 ? (
              <div className="space-y-3">
                {likes.map((like: any) => (
                  <div key={like.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[var(--color-dark-bg2)] transition-colors">
                    <img
                      src={avatarImage}
                      alt={like.user?.firstName || 'User'}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {like.user?.firstName} {like.user?.lastName}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No likes yet
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
