"use client";

import WorkCard from './WorkCard';
import { PROJECTS } from '@/constants/projects';

export default function WorkShowcase() {
  return (
    <div className="overflow-hidden">
      <style jsx>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 1rem));
          }
        }
        @keyframes slideRight {
          0% {
            transform: translateX(calc(-50% - 1rem));
          }
          100% {
            transform: translateX(0);
          }
        }
        .slide-container-left {
          animation: slideLeft 35s linear infinite;
          display: flex;
          width: max-content;
          gap: 1rem;
        }
        .slide-container-right {
          animation: slideRight 35s linear infinite;
          display: flex;
          width: max-content;
          gap: 1rem;
        }
        .slide-container-left:hover,
        .slide-container-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative max-w-[450px] space-y-4">
        {/* Fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

        {/* Top row - moving left */}
        <div className="relative">
          <div className="slide-container-left">
            {[...PROJECTS, ...PROJECTS].map((project, index) => (
              <li
                key={`top-${project.title}-${index}`}
                className="flex-none list-none"
              >
                <WorkCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                />
              </li>
            ))}
          </div>
        </div>

        {/* Bottom row - moving right */}
        <div className="relative">
          <div className="slide-container-right">
            {[...PROJECTS.slice().reverse(), ...PROJECTS.slice().reverse()].map((project, index) => (
              <li
                key={`bottom-${project.title}-${index}`}
                className="flex-none list-none"
              >
                <WorkCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                />
              </li>
            ))}
          </div>
        </div>
      </div>

      <div className="text-right mt-8">
        <button className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group">
          Explore more 
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transform transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14m-7-7 7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}