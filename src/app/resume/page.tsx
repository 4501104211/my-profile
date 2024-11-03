import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export const metadata: Metadata = {
  title: "Resume | Thái Nguyễn Cao",
  description: "Software Engineer specialized in Java",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen p-8">
      <Header />
      <main>
        {/* Two Column Layout */}

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,400px,1.5fr] gap-12 py-20">
          {/* Left Column - Profile */}
          <div className="space-y-12">
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

            <div className="space-y-6">
              <h1 className="text-4xl font-light text-white">
                Thái Nguyễn Cao
              </h1>
              <h2 className="text-xl text-gray-400">Software Engineer, Java</h2>
              <p className="text-gray-400 leading-relaxed">
                District Go Vap, HCMC – 034 296 4072 –
                <Link href="mailto:itthainguyencao@gmail.com" className="text-gray-400 hover:text-white transition-colors"> itthainguyencao@gmail.com</Link> –
                <Link href="https://linkedin.com/in/your-profile" className="text-gray-400 hover:text-white transition-colors"> LinkedIn Profile</Link>
              </p>
            </div>

            {/* Technical Skills */}
            <div className="space-y-4">
              <h3 className="text-gray-400 text-sm font-medium tracking-widest uppercase">Technical Skills</h3>
              <div className="space-y-2">
                <p className="text-gray-400">• Back-end Technologies: JPA, Hibernate, JDBC, Spring Data, Spring Security, Spring Boot, Spring Cloud Gateway.</p>
                <p className="text-gray-400">• Front-end Technologies: Javascript, AJAX, HTML5/CSS3, JQuery, Bootstrap, JSP.</p>
                <p className="text-gray-400">• Build framework: Maven.</p>
                <p className="text-gray-400">• Development tools: IntelliJ, Visual Studio, Docker.</p>
                <p className="text-gray-400">• Database: Oracle, PostgreSQL, MySQL.</p>
                <p className="text-gray-400">• Testing: Unit test, Selenium.</p>
                <p className="text-gray-400">• Message queue: Kafka.</p>
                <p className="text-gray-400">• Cache: Redis.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Experience & Education */}
          <div className="space-y-16">
            {/* Experience Section */}
            <section>
              <h2 className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-8">Experience</h2>
              <div className="space-y-12">
                {/* MindX */}
                <div className="glass p-8 rounded-3xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-white font-medium mb-2">Lecturer</h3>
                      <p className="text-gray-400">MindX Technology School, HCMC</p>
                    </div>
                    <span className="text-gray-400">07/2024 - Present</span>
                  </div>
                  <p className="text-gray-400">
                    • Designed and Implemented Curriculum for basic programming concepts.<br />
                    • Utilized Age-Appropriate Teaching Methods suited to children's developmental stages.<br />
                    • Fostered creativity and confidence through project-based learning.<br />
                    • Monitored and assessed student progress with constructive feedback.
                  </p>
                </div>

                {/* Fundiin */}
                <div className="glass p-8 rounded-3xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-white font-medium mb-2">Software Engineer</h3>
                      <p className="text-gray-400">Fundiin, HCMC</p>
                    </div>
                    <span className="text-gray-400">08/2022 - Present</span>
                  </div>
                  <p className="text-gray-400">
                    • Developed and enhanced large-scale systems using Java technologies.<br />
                    • Designed management systems for Merchant portal partners, ensuring Authentication security.<br />
                    • Engaged in researching and implementing new technologies for Payment Gateway integration.<br />
                    • Maintained ecommerce platforms like WooCommerce, Shopify, and Magento.
                  </p>
                </div>
              </div>
            </section>

            {/* Certifications Section */}
            <section>
              <h2 className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-8">Certifications</h2>
              <div className="space-y-4">
                <div className="glass p-8 rounded-3xl">
                  <h3 className="text-white font-medium mb-2">Agile & Scrum</h3>
                  <p className="text-gray-400">Issued: November 2021 - <Link href="#" className="text-gray-400 hover:text-white">View Certificate</Link></p>
                </div>
                <div className="glass p-8 rounded-3xl">
                  <h3 className="text-white font-medium mb-2">Container Basic</h3>
                  <p className="text-gray-400">Issued: October 8, 2024 - <Link href="#" className="text-gray-400 hover:text-white">View Certificate</Link></p>
                </div>
                <div className="glass p-8 rounded-3xl">
                  <h3 className="text-white font-medium mb-2">Kubernetes Basic</h3>
                  <p className="text-gray-400">Issued: October 8, 2024 - <Link href="#" className="text-gray-400 hover:text-white">View Certificate</Link></p>
                </div>
                <div className="glass p-8 rounded-3xl">
                  <h3 className="text-white font-medium mb-2">Rancher Basic</h3>
                  <p className="text-gray-400">Issued: October 8, 2024 - <Link href="#" className="text-gray-400 hover:text-white">View Certificate</Link></p>
                </div>
                <div className="glass p-8 rounded-3xl">
                  <h3 className="text-white font-medium mb-2">GitLab 101</h3>
                  <p className="text-gray-400">Issued: October 8, 2024 - <Link href="#" className="text-gray-400 hover:text-white">View Certificate</Link></p>
                </div>
                <div className="glass p-8 rounded-3xl">
                  <h3 className="text-white font-medium mb-2">GitLab 201</h3>
                  <p className="text-gray-400">Issued: October 8, 2024 - <Link href="#" className="text-gray-400 hover:text-white">View Certificate</Link></p>
                </div>
              </div>
            </section>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
