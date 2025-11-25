/**
 * ThemeToggle Component
 * Responsibility: Toggle between light and dark themes
 */

import React, { useState, useEffect } from 'react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMdOrLarger, setIsMdOrLarger] = useState(true);

  useEffect(() => {
    // Check if screen is md or larger (768px)
    const checkScreenSize = () => {
      const isLarge = window.matchMedia('(min-width: 768px)').matches;
      setIsMdOrLarger(isLarge);
      
      // Force light mode on smaller screens
      if (!isLarge) {
        document.documentElement.classList.remove('dark');
        setIsDark(false);
      } else {
        // Load theme preference from localStorage only on larger screens
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          setIsDark(true);
          document.documentElement.classList.add('dark');
        }
      }
    };

    // Initial check
    checkScreenSize();

    // Listen for screen size changes
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addEventListener('change', checkScreenSize);

    return () => {
      mediaQuery.removeEventListener('change', checkScreenSize);
    };
  }, []);

  const toggleTheme = () => {
    // Only allow theme toggle on md screens and larger
    if (!isMdOrLarger) return;

    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
  <div
  className={`
    flex flex-col items-center gap-1 p-1 rounded-full border-[1px]
    transition-all duration-300
    ${
      isDark
        ? 'bg-[#102032] border-[#1890ff]'
        : 'bg-[#1890ff]'
    }
  `}
>
  {/* Light Mode Button */}
  <button
    onClick={() => !isDark && null || toggleTheme()}
    className={`
      relative p-1 rounded-full transition-all duration-300 ease-in-out
      ${
        !isDark
          ? 'bg-[#1890ff] text-white shadow-lg scale-105'
          : 'bg-white text-gray-600 hover:scale-105'
      }
    `}
    aria-label="Light mode"
    aria-pressed={!isDark}
  >
    <svg
      className={`w-4 h-4 transition-all duration-300 ${!isDark ? 'rotate-0' : 'rotate-180'}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  </button>

  {/* Dark Mode Button */}
  <button
    onClick={() => isDark && null || toggleTheme()}
    className={`
      relative p-1 rounded-full transition-all duration-300 ease-in-out
      ${
        isDark
          ? 'bg-[#102032] text-white shadow-lg scale-105'
          : 'bg-white text-gray-600 hover:scale-105'
      }
    `}
    aria-label="Dark mode"
    aria-pressed={isDark}
  >
    <svg
      className={`w-4 h-4 transition-all duration-300 ${isDark ? 'rotate-0' : '-rotate-90'}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</div>
  );
};
