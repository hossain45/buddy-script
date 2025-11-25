/**
 * Feed Page Component
 * Responsibility: Main feed page container with all feed components
 */

import React from 'react';
import { Header } from '../components/feed/Header';
import { LeftSidebar } from '../components/feed/LeftSidebar';
import { RightSidebar } from '../components/feed/RightSidebar';
import { CreatePost } from '../components/feed/CreatePost';
import { PostCard } from '../components/feed/PostCard';
import { ThemeToggle } from '../components/feed/ThemeToggle';
import { useGetPostsQuery } from '../store/api/postApi';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';

export const Feed: React.FC = () => {
  const { data: postsData, isLoading, error, refetch } = useGetPostsQuery();
  const currentUser = useSelector(selectUser);

  console.log(error);
  
  // Sort posts by newest first
  const posts = postsData?.posts
    ? [...postsData.posts].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      })
    : [];

  const handleSearch = (query: string) => {
    console.log('Search:', query);
    // TODO: Implement search functionality
  };



  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#232E42] transition-colors duration-200">
      <div className='hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-50'>
        <ThemeToggle />
      </div>
      <Header onSearch={handleSearch} />

      <div className="container-custom py-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20">
              <LeftSidebar />
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6">
            <CreatePost />

            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-white">Loading feed...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600 dark:text-red-400 mb-4">Failed to load feed</p>
                  <button
                    onClick={() => refetch()}
                    className="btn-primary px-4 py-2"
                  >
                    Retry
                  </button>
                </div>
              ) : posts.length === 0 ? (
                <div className="post-card dark:bg-[var(--color-dark-bg)] text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No posts yet. Be the first to post!</p>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard key={post.id} post={post} currentUserId={currentUser?.id} />
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
