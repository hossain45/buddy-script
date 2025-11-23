/**
 * Sidebar Component
 * Responsibility: Display sidebar content (profile, friends, groups, etc.)
 */

import React from 'react';

interface SidebarProps {
  position: 'left' | 'right';
}

export const Sidebar: React.FC<SidebarProps> = ({ position }) => {
  if (position === 'left') {
    return (
      <div className="space-y-4">
        {/* Profile Card */}
        <div className="sidebar">
          <div className="flex items-center gap-3 p-2">
            <img src="/images/Avatar.png" alt="Profile" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h5 className="font-semibold text-gray-900">John Doe</h5>
              <p className="text-sm text-gray-500">@johndoe</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="sidebar">
          <nav className="space-y-1">
            <a href="/feed" className="sidebar-item active">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium">News Feed</span>
            </a>

            <a href="/friends" className="sidebar-item">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-medium">Friends</span>
            </a>

            <a href="/groups" className="sidebar-item">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-medium">Groups</span>
            </a>

            <a href="/photos" className="sidebar-item">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Photos</span>
            </a>
          </nav>
        </div>
      </div>
    );
  }

  // Right sidebar
  return (
    <div className="space-y-4">
      {/* Friend Suggestions */}
      <div className="sidebar">
        <h5 className="font-semibold text-gray-900 mb-4">Friend Suggestions</h5>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img src="/images/recommend1.png" alt="Jane Smith" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <h6 className="font-medium text-gray-900 text-sm">Jane Smith</h6>
              <p className="text-xs text-gray-500">5 mutual friends</p>
            </div>
            <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors">
              Add
            </button>
          </div>

          <div className="flex items-center gap-3">
            <img src="/images/recommend2.png" alt="Mike Johnson" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <h6 className="font-medium text-gray-900 text-sm">Mike Johnson</h6>
              <p className="text-xs text-gray-500">12 mutual friends</p>
            </div>
            <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Trending Groups */}
      <div className="sidebar">
        <h5 className="font-semibold text-gray-900 mb-4">Trending Groups</h5>
        <div className="space-y-3">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <img src="/images/grp_ct1.png" alt="Web Developers" className="w-10 h-10 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h6 className="font-medium text-gray-900 text-sm">Web Developers</h6>
              <p className="text-xs text-gray-500">10.5k members</p>
            </div>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <img src="/images/grp_ct2.png" alt="UI/UX Designers" className="w-10 h-10 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h6 className="font-medium text-gray-900 text-sm">UI/UX Designers</h6>
              <p className="text-xs text-gray-500">8.2k members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
