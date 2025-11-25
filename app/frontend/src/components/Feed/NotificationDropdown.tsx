/**
 * NotificationDropdown Component
 * Responsibility: Display and manage user notifications
 */

import React, { useState } from 'react';
import friendReqImage from '../../assets/images/friend-req.png';
import profile1Image from '../../assets/images/profile-1.png';

interface Notification {
  id: string;
  userName: string;
  message: string;
  time: string;
  avatar: string;
  isRead: boolean;
}

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Mock notifications - replace with actual data
  const notifications: Notification[] = [
    {
      id: '1',
      userName: 'Steve Jobs',
      message: 'posted a link in your timeline.',
      time: '42 minutes ago',
      avatar: friendReqImage,
      isRead: false,
    },
    {
      id: '2',
      userName: 'Admin',
      message: 'changed the name of the group Freelancer USA',
      time: '1 hour ago',
      avatar: profile1Image,
      isRead: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const displayedNotifications = showUnreadOnly
    ? notifications.filter((n) => !n.isRead)
    : notifications;

  return (
    <div className="relative">
      <button
        type="button"
        className="nav-link relative dark:hover:bg-[var(--color-dark-bg2)]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="badge badge-primary absolute -top-1 -right-1 text-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="notification-dropdown dark:bg-[var(--color-dark-bg)]">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h4>
              <button type="button" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>

            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <button
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    !showUnreadOnly
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setShowUnreadOnly(false)}
                >
                  All
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    showUnreadOnly
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setShowUnreadOnly(true)}
                >
                  Unread
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-96">
              {displayedNotifications.length > 0 ? (
                displayedNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${!notification.isRead ? 'notification-unread' : ''}`}
                  >
                    <img
                      src={notification.avatar}
                      alt={notification.userName}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white">
                        <span className="font-semibold">{notification.userName}</span>{' '}
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <p>No notifications</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
