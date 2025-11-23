/**
 * Feed Page Component
 * Responsibility: Main feed page container with all feed components
 */

import React, { useState } from 'react';
import { Header } from '../components/feed/Header';
import { Sidebar } from '../components/feed/Sidebar';
import { CreatePost } from '../components/feed/CreatePost';
import { PostCard } from '../components/feed/PostCard';
import { ThemeToggle } from '../components/feed/ThemeToggle';
import type { CreatePostPayload, PostWithDetails } from '../types';

export const Feed: React.FC = () => {
  // Mock posts - replace with actual data from API
  const [posts, setPosts] = useState<PostWithDetails[]>([
    {
      id: 1,
      userId: 1,
      text: 'Just launched my new project! Check it out 🚀',
      visibility: 'public',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      media: [],
      likesCount: 42,
      commentsCount: 5,
    },
  ]);

  const handleCreatePost = async (data: CreatePostPayload) => {
    console.log('Creating post:', data);
    // TODO: Implement API call
    // After successful creation, add the new post to the posts array
  };

  const handleLike = (postId: number) => {
    console.log('Like post:', postId);
    // TODO: Implement API call
  };

  const handleComment = (postId: number, text: string) => {
    console.log('Comment on post:', postId, text);
    // TODO: Implement API call
  };

  const handleShare = (postId: number) => {
    console.log('Share post:', postId);
    // TODO: Implement API call
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
    // TODO: Implement search functionality
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ThemeToggle />
      <Header onSearch={handleSearch} />

      <div className="container-custom py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20">
              <Sidebar position="left" />
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6">
            <CreatePost onSubmit={handleCreatePost} />

            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20">
              <Sidebar position="right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
