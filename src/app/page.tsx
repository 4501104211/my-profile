import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import CurrentTime from '@/components/sections/CurrentTime';
import TechStack from '@/components/sections/TechStack';
import WorkShowcase from '@/components/sections/WorkShowcase';
import { SOCIAL_LINKS } from '@/constants/navigation';
import GlobeAnimation from '@/components/sections/GlobeAnimation';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <Header />
      
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,400px,1.5fr] gap-12 py-20">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="flex flex-col items-start gap-6">
            <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden">
              <Image
                src="/avatar.webp"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
            <h1 className="text-4xl font-bold mb-2 gradient-text">
                Hello!<br />
                I&apos;m Thai Nguyen Cao
              </h1>
              <p className="text-gray-400">
                <span className="text-primary font-medium">Software Enginner</span> with over 2+ years
                of experience in development financial solution and payment systems.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800/50 rounded-xl hover:bg-gray-800/70"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
              <button className="px-6 py-2 bg-primary text-black font-medium rounded-xl hover:bg-primary/90 transition-colors">
                LET&apos;S TALK
              </button>
            </div>
           
            <div className="h-8" /> {/* Added spacing */}
            <div className="w-full h-[1px] bg-gray-800/50" />
            <CurrentTime />
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-8">
          <section>
          <h2 className="section-title">
              <div className="section-title-dot" />
              <span className="section-title-text">ABOUT ME</span>
            </h2>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm leading-relaxed">
              Hi, I'm Thai Nguyen, a back-end software engineer with a strong passion for building and optimizing large-scale back-end systems. I have extensive experience in developing high-performance, secure APIs and distributed systems using technologies like Java, Spring Boot, Redis, and other modern platforms.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
              Throughout my years of working on complex projects, I’ve been involved in designing and implementing big data processing systems, microservices architectures, and integration solutions. I continuously strive to learn and adapt to new technologies to deliver innovative and efficient solutions to business challenges.
              If you're interested in discussing technical projects or exploring collaboration opportunities, feel free to connect with me!
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-800/50 rounded-full text-xs">23 yo.</span>
                <span className="px-3 py-1 bg-gray-800/50 rounded-full text-xs">Software Development</span>
                <span className="px-3 py-1 bg-gray-800/50 rounded-full text-xs">Front-end</span>
                <span className="px-3 py-1 bg-gray-800/50 rounded-full text-xs">Back-end</span>
              </div>
            </div>
          </section>
          <div className="w-full h-[1px] bg-gray-800/50" />
          <section>
            <h2 className="section-title">
              <div className="section-title-dot" />
              <span className="section-title-text">MY DAILY TECH</span>
            </h2>
            <div className="flex justify-center">
              <TechStack />
            </div>
          </section>
          <div className="w-full h-[1px] bg-gray-800/50" />
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Code That Connects People<br />and Possibilities.
            </h2>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <section>
            <h2 className="section-title">
              <div className="section-title-dot" />
              <span className="section-title-text">MY WORKS</span>
            </h2>
            <WorkShowcase />
          </section>

          <div className="mt-8 p-6 glass rounded-xl flex items-center gap-3">
            <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <p className="text-sm font-medium text-foreground">
              Open for work: <span className="text-primary font-semibold">Full time / Remote</span>
            </p>
          </div>

          <div className="relative mt-20">
            <GlobeAnimation />
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[300px] text-center z-10">
              <p className="text-gray-400 text-sm leading-relaxed italic backdrop-blur-sm bg-background/50 p-4 rounded-xl">
                &ldquo;A website is essential in today&apos;s digital landscape because it serves 
                as the primary online presence for businesses, organizations, and individuals. 
                It provides a platform to showcase products, services, and information to a 
                global audience, enhancing visibility and credibility.&rdquo;
              </p>
            </div> */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 