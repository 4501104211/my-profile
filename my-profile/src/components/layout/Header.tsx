"use client";

import Link from 'next/link';
import { NAV_LINKS } from '@/constants/navigation';
import { useTheme } from '@/providers/ThemeProvider';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-4 z-50">
      <div className="max-w-[800px] mx-auto">
        <nav className={`flex justify-between items-center px-6 py-3 ${
          theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-white'
        } rounded-full border border-gray-800/10`}>
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-foreground">
            CK
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
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

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                theme === 'dark' 
                  ? 'bg-[#222222] text-gray-400' 
                  : 'bg-gray-100 text-gray-600'
              } hover:text-foreground transition-colors`}
            >
              {theme === 'dark' ? 'Dark' : 'Light'}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
} 