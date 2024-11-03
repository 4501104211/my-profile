import React from 'react';
import { SocialIcons } from '@/components/icons/SocialIcons';

interface NavLink {
  href: string;
  label: string;
  isNew?: boolean;
}

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface FooterLink {
  href: string;
  label: string;
}
const rootUrl = typeof window !== 'undefined'
? window.location.origin
: `https://${process.env.VERCEL_URL || 'localhost:3000'}`;

const NAV_LINKS: NavLink[] = [
  { href: '/blog', label: 'Blog', isNew: true },
  { href: `${rootUrl}/resume`, label: 'Resume', isNew: true },
  { href: '/templates', label: 'Templates', isNew: true },
];

const SOCIAL_LINKS: SocialLink[] = [
  { 
    href: 'https://linkedin.com/in/yourusername', 
    label: 'LinkedIn',
    icon: SocialIcons.linkedin
  },
  { 
    href: 'https://github.com/yourusername', 
    label: 'GitHub',
    icon: SocialIcons.github
  },
];

const FOOTER_LINKS: FooterLink[] = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

export {
  NAV_LINKS,
  SOCIAL_LINKS,
  FOOTER_LINKS,
  type NavLink,
  type SocialLink,
  type FooterLink,
}; 