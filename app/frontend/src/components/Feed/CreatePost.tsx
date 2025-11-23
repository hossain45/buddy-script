/**
 * CreatePost Component
 * Responsibility: Form for creating new posts
 */

import React, { useState } from 'react';
import type { CreatePostPayload } from '../../types';

interface CreatePostProps {
  onSubmit: (data: CreatePostPayload) => Promise<void>;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ text, visibility });
      setText('');
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-card mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 mb-4">
          <img
            src="/images/Avatar.png"
            alt="Your avatar"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
          <textarea
            className="form-input flex-1 min-h-[100px]"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Photo/Video</span>
            </button>
            
            <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Feeling</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <select
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 cursor-pointer"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
            >
              <option value="public">🌍 Public</option>
              <option value="private">🔒 Private</option>
            </select>

            <button
              type="submit"
              className="btn-primary px-6 py-2"
              disabled={isSubmitting || !text.trim()}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
