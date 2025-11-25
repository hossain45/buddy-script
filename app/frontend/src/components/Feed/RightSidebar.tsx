/**
 * RightSidebar Component
 * Responsibility: Display right sidebar with Your Friends list
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';
import recommend1Image from '../../assets/images/recommend1.png';
import recommend2Image from '../../assets/images/recommend2.png';
import group1Image from '../../assets/images/grp_ct1.png';
import group2Image from '../../assets/images/grp_ct2.png';

// Hardcoded friend data with job titles and profile pictures
const friendsData = [
  {
    id: 1,
    avatar: recommend1Image,
    jobTitle: 'CEO of Apple',
    isOnline: false,
    lastSeen: '5 minute ago',
  },
  {
    id: 2,
    avatar: recommend2Image,
    jobTitle: 'CEO of Linkedin',
    isOnline: true,
  },
  {
    id: 3,
    avatar: recommend1Image,
    jobTitle: 'CEO of Figma',
    isOnline: true,
  },
  {
    id: 4,
    avatar: recommend2Image,
    jobTitle: 'CEO of Apple',
    isOnline: false,
    lastSeen: '5 minute ago',
  },
];

export const RightSidebar: React.FC = () => {
  const currentUser = useSelector(selectUser);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock friends list - in real app, this would come from API
  // We'll use the user's name from Redux and combine with hardcoded data
  const friends = friendsData.map((friend, index) => ({
    ...friend,
    name: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : `Friend ${index + 1}`,
  }));

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Friend Suggestions */}
      <div className="sidebar dark:bg-[var(--color-dark-bg)]">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Friend Suggestions</h5>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[var(--color-dark-bg2)] transition-colors">
            <img src={recommend1Image} alt="Jane Smith" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <h6 className="font-medium text-gray-900 dark:text-white text-sm">Jane Smith</h6>
              <p className="text-xs text-gray-500 dark:text-gray-400">5 mutual friends</p>
            </div>
            <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
              Add
            </button>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[var(--color-dark-bg2)] transition-colors">
            <img src={recommend2Image} alt="Mike Johnson" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <h6 className="font-medium text-gray-900 dark:text-white text-sm">Mike Johnson</h6>
              <p className="text-xs text-gray-500 dark:text-gray-400">12 mutual friends</p>
            </div>
            <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Trending Groups */}
      <div className="sidebar dark:bg-[var(--color-dark-bg)]">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Trending Groups</h5>
        <div className="space-y-3">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-[var(--color-dark-bg2)] p-2 rounded-lg transition-colors">
            <img src={group1Image} alt="Web Developers" className="w-10 h-10 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h6 className="font-medium text-gray-900 dark:text-white text-sm">Web Developers</h6>
              <p className="text-xs text-gray-500 dark:text-gray-400">10.5k members</p>
            </div>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-[var(--color-dark-bg2)] p-2 rounded-lg transition-colors">
            <img src={group2Image} alt="UI/UX Designers" className="w-10 h-10 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h6 className="font-medium text-gray-900 dark:text-white text-sm">UI/UX Designers</h6>
              <p className="text-xs text-gray-500 dark:text-gray-400">8.2k members</p>
            </div>
          </div>
        </div>
      </div>
      {/* Your Friends */}
      <div className="sidebar dark:bg-[var(--color-dark-bg)]">
        <div className="flex items-center justify-between mb-4 px-2">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Your Friends</h4>
          <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-semibold transition-colors">
            See All
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-4 px-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <input
              type="search"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-[var(--color-dark-bg2)] border-0 rounded-full text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              placeholder="input search text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Friends List */}
        <div className="space-y-3">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[var(--color-dark-bg2)] transition-colors cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {friend.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-[var(--color-dark-bg)] rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h6 className="font-bold text-gray-900 dark:text-white text-sm truncate">
                  {friend.name}
                </h6>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {friend.jobTitle}
                </p>
              </div>
              {!friend.isOnline && friend.lastSeen && (
                <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
                  {friend.lastSeen}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
