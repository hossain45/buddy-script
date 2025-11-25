/**
 * PostContent Component
 * Responsibility: Display post text and media
 */

import React from 'react';
import type { Post } from '../../../types';

interface PostContentProps {
  post: Post;
}

export const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <>
      {/* Text Content */}
      <div className="px-4 pb-2">
        <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
          {post.text}
        </p>
      </div>

      {/* Media Grid */}
      {post.media && post.media.length > 0 && (
        <div className={`mt-2 grid gap-1 ${
          post.media.length === 1 ? 'grid-cols-1' :
          post.media.length === 2 ? 'grid-cols-2' :
          post.media.length === 3 ? 'grid-cols-2' :
          'grid-cols-2'
        }`}>
          {post.media.map((media, index) => (
            <div key={media.id} className={`relative ${
              post?.media?.length === 3 && index === 0 ? 'row-span-2' : ''
            }`}>
              <img
                src={media.url}
                alt={`Post attachment ${index + 1}`}
                className="w-full h-full object-cover max-h-[500px]"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
