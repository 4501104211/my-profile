"use client";

import { TechIcons } from '../icons/TechIcons';

interface TechItem {
  name: string;
  icon: keyof typeof TechIcons;
}

const TECH_STACK: TechItem[] = [
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'React', icon: 'react' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Netlify', icon: 'netlify' },
  { name: 'WordPress', icon: 'wordpress' },
  { name: 'Figma', icon: 'figma' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'HTML', icon: 'html' },
  { name: 'CSS', icon: 'css' },
  { name: 'PHP', icon: 'php' },
];

export default function TechStack() {
  return (
    <div className="overflow-hidden">
      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 25px));
          }
        }
        @keyframes scrollRight {
          0% {
            transform: translateX(calc(-50% - 25px));
          }
          100% {
            transform: translateX(0);
          }
        }
        .scroll-container-left {
          animation: scrollLeft 30s linear infinite;
          display: flex;
          width: max-content;
          gap: 50px;
          padding-left: 25px;
        }
        .scroll-container-right {
          animation: scrollRight 30s linear infinite;
          display: flex;
          width: max-content;
          gap: 50px;
          padding-right: 25px;
        }
        .scroll-container-left:hover,
        .scroll-container-right:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="relative max-w-[400px] space-y-8">
        {/* Fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Top row - moving left */}
        <div className="relative">
          <div className="scroll-container-left">
            {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
              <div
                key={`top-${tech.name}-${index}`}
                className="flex-none w-10 h-10 relative group"
              >
                <div className="tech-icon absolute inset-0 rounded-xl transition-all duration-300" />
                <div className="relative h-full w-full p-2">
                  <div className="tech-icon-text transition-colors duration-300">
                    {TechIcons[tech.icon]}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs tech-icon-text whitespace-nowrap transition-opacity duration-300">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row - moving right */}
        <div className="relative">
          <div className="scroll-container-right">
            {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
              <div
                key={`bottom-${tech.name}-${index}`}
                className="flex-none w-10 h-10 relative group"
              >
                <div className="tech-icon absolute inset-0 rounded-xl transition-all duration-300" />
                <div className="relative h-full w-full p-2">
                  <div className="tech-icon-text transition-colors duration-300">
                    {TechIcons[tech.icon]}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs tech-icon-text whitespace-nowrap transition-opacity duration-300">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}