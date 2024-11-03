import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import CurrentTime from "@/components/sections/CurrentTime";
import TechStack from "@/components/sections/TechStack";
import WorkShowcase from "@/components/sections/WorkShowcase";
import { SOCIAL_LINKS } from "@/constants/navigation";
import GlobeAnimation from "@/components/sections/GlobeAnimation";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <Header />

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,400px,1.5fr] gap-12 py-20">
        {/* Left Column */}
        <div className="space-y-8 border-r border-gray-100 rounded-lg">
          <div className="flex flex-col items-start gap-6">
            <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden">
              {/* Default Profile Image */}
              <Image
                src="/avatar.webp"
                alt="Profile"
                fill
                className="object-cover transition-opacity duration-300"
              />
              {/* Hover Profile Image */}
              <Image
                src="/profile.jpg"
                alt="Profile Hover"
                fill
                className="object-cover opacity-0 transition-opacity duration-300 hover:opacity-100 absolute top-0 left-0"
              />
            </div>
            <div>
              <h1 className="text-3xl font-light mb-2 tracking-tight gradient-text">
                Hello!
                <br />
                I&apos;m Thái Nguyễn Cao
              </h1>
              <p className="body-text">
                <span className="text-primary font-medium">
                  Backend Developer
                </span>{" "}
                specializing in Spring Framework with a passion for building
                robust and scalable systems.
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
        <div className="space-y-8 border-r border-gray-100 rounded-lg">
          <section>
            <h2 className="section-title">
              <div className="section-title-dot" />
              <span className="section-title-text">About</span>
            </h2>
            <div className="space-y-4">
              <p className="body-text">
                My journey in software development began with a deep fascination
                for server-side architecture and distributed systems. Since
                2023, I&apos;ve been crafting enterprise-grade applications
                using Spring Framework, focusing on creating efficient,
                maintainable, and secure backend solutions.
              </p>
              <p className="body-text">
                With expertise in Java ecosystem and microservices architecture,
                I specialize in developing RESTful APIs, implementing
                authentication systems, and optimizing database performance.
                I&apos;m particularly passionate about clean code practices,
                test-driven development, and continuous integration/deployment
                pipelines.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-0.5 bg-gray-800/50 rounded-full text-[10px] tracking-wider text-gray-400">
                  Spring Boot
                </span>
                <span className="px-2.5 py-0.5 bg-gray-800/50 rounded-full text-[10px] tracking-wider text-gray-400">
                  Java
                </span>
                <span className="px-2.5 py-0.5 bg-gray-800/50 rounded-full text-[10px] tracking-wider text-gray-400">
                  Microservices
                </span>
                <span className="px-2.5 py-0.5 bg-gray-800/50 rounded-full text-[10px] tracking-wider text-gray-400">
                  DevOps
                </span>
              </div>
            </div>
          </section>
          <div className="w-full h-[1px] bg-gray-800/50" />
          <section>
            <h2 className="section-title">
              <div className="section-title-dot" />
              <span className="section-title-text">Tech Stack</span>
            </h2>
            <div className="flex justify-center">
              <TechStack />
            </div>
          </section>
          <div className="w-full h-[1px] bg-gray-800/50" />
          <div className="mt-12">
            <h2 className="text-2xl font-light tracking-tight gradient-text">
              Code That Connects People
              <br />
              and Possibilities.
            </h2>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8 border-r border-gray-100 rounded-lg">
          <section>
            <h2 className="section-title">
              <div className="section-title-dot" />
              <span className="section-title-text">Projects</span>
            </h2>
            <WorkShowcase />
          </section>

          <div className="mt-8 p-4 glass rounded-xl flex items-center gap-3">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <p className="text-xs tracking-wide text-foreground">
              Open for work:{" "}
              <span className="text-primary font-medium">
                Full time / Remote
              </span>
            </p>
          </div>

          <div className="relative mt-20">
            <GlobeAnimation />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[300px] text-center z-10">
              <p className="text-xs text-gray-400 leading-relaxed italic backdrop-blur-sm bg-background/50 p-4 rounded-xl">
                &ldquo;A website is essential in today&apos;s digital landscape
                because it serves as the primary online presence for businesses,
                organizations, and individuals. It provides a platform to
                showcase products, services, and information to a global
                audience, enhancing visibility and credibility.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
