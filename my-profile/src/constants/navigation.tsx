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

const NAV_LINKS: NavLink[] = [
  { href: '/work', label: 'Work', isNew: true },
  { href: '/blog', label: 'Blog' },
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