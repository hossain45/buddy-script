/**
 * CreatePost Component
 * Responsibility: Form for creating new posts
 */

import React, { useState, useRef } from 'react';
import { useCreatePostMutation } from '../../store/api/postApi';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';
import type { CreatePostPayload } from '../../store/api/postApi';
import avatarImage from '../../assets/images/Avatar.png';

export const CreatePost: React.FC = () => {
  const [text, setText] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUser = useSelector(selectUser);
  const [createPost, { isLoading: isSubmitting }] = useCreatePostMutation();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const validFiles: File[] = [];
      const MAX_SIZE = 150 * 1024; // 150KB

      files.forEach(file => {
        if (file.size > MAX_SIZE) {
          alert(`File "${file.name}" exceeds the 150KB limit.`);
        } else {
          validFiles.push(file);
        }
      });

      if (validFiles.length > 0) {
        const newImages = [...images, ...validFiles].slice(0, 10); // Limit to 10 images
        setImages(newImages);
        
        // Create previews
        const newPreviews = newImages.map((file) => URL.createObjectURL(file));
        setImagePreviews(newPreviews);
      }
      
      // Reset input so the same file can be selected again if needed (e.g. after removing)
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
    
    // Revoke object URLs to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[index]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && images.length === 0) return;

    try {
      const payload: CreatePostPayload = {
        text: text.trim() || undefined,
        visibility,
        images: images.length > 0 ? images : undefined,
      };
      
      await createPost(payload).unwrap();
      setText('');
      setImages([]);
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      setImagePreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Failed to create post:', error);
      // TODO: Show error toast/notification
    }
  };

  return (
    <div className="card mb-6 p-4 dark:bg-[var(--color-dark-bg)]">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-4">
          <img
            src={avatarImage}
            alt={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Your avatar'}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-2 transition-colors">
            <textarea
              className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none min-h-[50px]"
              placeholder={`What's on your mind, ${currentUser?.firstName || 'User'}?`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer text-gray-600 dark:text-gray-300">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
              />
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Photo</span>
            </label>
            
            <button type="button" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300">
               <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Video</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <select
              className="bg-transparent text-sm font-medium text-gray-600 dark:text-gray-300 focus:ring-0 border-none cursor-pointer"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>

            <button
              type="submit"
              className="btn-primary p-2 rounded-lg"
              disabled={isSubmitting || (!text.trim() && images.length === 0)}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <div className='flex items-center gap-1'>
                  <svg className="w-5 h-5 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Post</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
