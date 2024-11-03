"use client";

import Link from 'next/link';
import { NAV_LINKS } from '@/constants/navigation';
import { useTheme } from '@/providers/ThemeProvider';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === 'light';

  return (
    <header className="sticky top-4 z-50">
      <div className="max-w-[1000px] mx-auto flex justify-between items-center gap-12">
        
        {/* Left Section: Logo and Navigation Links */}
        <div className={`flex items-center gap-20 px-12 py-4 rounded-[15px] border ${
          theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-white'
        } border-gray-200 shadow`}>
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-foreground">
            THÁI
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-20">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group"
              >
                <span className="text-sm text-gray-400 hover:text-foreground transition-colors">
                  {link.label}
                </span>
                {link.isNew && (
                  <span className="absolute -top-3 -right-6 px-1.5 py-0.5 text-[10px] font-medium text-primary bg-primary/10 rounded-full">
                    NEW
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section: Theme Toggle Buttons */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-[15px]">
          <button
            onClick={() => isLightMode ? null : toggleTheme()}
            aria-pressed={!isLightMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !isLightMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-600'
            } ${isLightMode ? 'bg-[rgba(74,222,128,var(--tw-bg-opacity))]' : ''}`} // Active color for dark theme
          >
            {/* Light Icon */}
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-lg md:text-sm pointer-events-none" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            Light
          </button>
          <button
            onClick={() => !isLightMode ? null : toggleTheme()}
            aria-pressed={isLightMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isLightMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-600'
            } ${!isLightMode ? 'bg-[rgba(74,222,128,var(--tw-bg-opacity))]' : ''}`} // Active color for light theme
          >
            {/* Dark Icon */}
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-lg md:text-sm pointer-events-none" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            Dark
          </button>
        </div>
      </div>
    </header>
  );
}
