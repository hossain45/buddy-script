/**
 * LeftSidebar Component
 * Responsibility: Display left sidebar with Explore menu and Events
 */

import React from 'react';
import eventImage from '../../assets/images/feed_event1.png';

export const LeftSidebar: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Explore Menu */}
      <div className="sidebar dark:bg-[var(--color-dark-bg)]">
        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 px-2">Explore</h4>
        <nav className="space-y-1">
          {/* Learning */}
          <button className="sidebar-item w-full text-left dark:hover:bg-[var(--color-dark-bg2)]">
            <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium dark:text-white flex-1">Learning</span>
            <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-semibold rounded">New</span>
          </button>

          {/* Insights */}
          <button className="sidebar-item w-full text-left dark:hover:bg-[var(--color-dark-bg2)]">
            <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="font-medium dark:text-white">Insights</span>
          </button>

          {/* Find friends */}
          <button className="sidebar-item w-full text-left dark:hover:bg-[var(--color-dark-bg2)]">
            <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span className="font-medium dark:text-white">Find friends</span>
          </button>

          {/* Bookmarks */}
          <button className="sidebar-item w-full text-left dark:hover:bg-[var(--color-dark-bg2)]">
            <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="font-medium dark:text-white">Bookmarks</span>
          </button>

          {/* Group */}
          <button className="sidebar-item w-full text-left dark:hover:bg-[var(--color-dark-bg2)]">
            <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-medium dark:text-white">Group</span>
          </button>

          {/* Gaming */}
          <button className="sidebar-item w-full text-left dark:hover:bg-[var(--color-dark-bg2)]">
            <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
            <span className="font-medium dark:text-white flex-1">Gaming</span>
            <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-semibold rounded">New</span>
          </button>

          {/* Settings */}
          <button className="sidebar-item w-full text-left dark:hover:bg-[var(--color-dark-bg2)]">
            <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium dark:text-white">Settings</span>
          </button>

          {/* Save post */}
          <button className="sidebar-item w-full text-left dark:hover:bg-[var(--color-dark-bg2)]">
            <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span className="font-medium dark:text-white">Save post</span>
          </button>
        </nav>
      </div>
      
      {/* Events */}
      <div className="sidebar dark:bg-[var(--color-dark-bg)]">
        <div className="flex items-center justify-between mb-4 px-2">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Events</h4>
          <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-semibold transition-colors">
            See all
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Event 1 */}
          <div className="space-y-3">
            <img 
              src={eventImage} 
              alt="Event" 
              className="w-full h-48 object-cover rounded-lg" 
            />
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-lg flex flex-col items-center justify-center text-white">
                <div className="text-xl font-bold">10</div>
                <div className="text-xs font-semibold">Jul</div>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                  No more terrorism no more cry
                </h5>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                17 People Going
              </span>
              <button className="px-4 py-1.5 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white font-semibold rounded-lg transition-colors">
                Going
              </button>
            </div>
          </div>

          {/* Event 2 */}
          <div className="space-y-3">
            <img 
              src={eventImage} 
              alt="Event" 
              className="w-full h-48 object-cover rounded-lg" 
            />
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-lg flex flex-col items-center justify-center text-white">
                <div className="text-xl font-bold">10</div>
                <div className="text-xs font-semibold">Jul</div>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                  No more terrorism no more cry
                </h5>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                17 People Going
              </span>
              <button className="px-4 py-1.5 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white font-semibold rounded-lg transition-colors">
                Going
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
