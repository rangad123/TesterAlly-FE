import React from "react";
import "./Style2.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import CookieConsent from "./CookieConsent";
import HeroSection from "./HeroSection";

export default function Dashboard() {
  const FeatureCard = ({ title, description, icon }) => (
    <div className="feature-cards">
      <div className="feature-icon">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
  const StepCard = ({ step, title, description }) => (
    <div className="step-card">
      <div className="step-icon">{step}</div>
      <h4 className="step-title">{title}</h4>
      <p className="step-description">{description}</p>
    </div>
  );

 

  return (
    <div className="">
      <CookieConsent />
      {/* Hero Section */}
      <section className="hero">
        <HeroSection />
      </section>

{/* Marquee Section */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 my-8 mx-4 md:mx-8 lg:mx-auto lg:max-w-7xl rounded-lg">
        <p className="text-blue-800 text-sm md:text-base lg:text-lg font-semibold text-center animate-pulse">
          🚀 Unlock the power of AI in testing | 🌟 Seamless automate web, mobile, and API testing | 📈 Scale your testing with TesterAlly today!
        </p>
      </div>

      {/* Features Section */}
  <section id="features" className="features max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="section-title">AI-Driven Web Testing</h2>
  <div className="space-y-5">
    <div className="grid grid-cols-1 md:grid-cols-3">
      <FeatureCard
        title="Intelligent Test Automation"
        description="Leverage advanced AI to generate and maintain test cases in simple, human-readable language. Streamline testing workflows by automating repetitive tasks, reducing manual effort, and ensuring higher accuracy in testing."
        icon="⚙️"
      />
      <FeatureCard
        title="Comprehensive Analytics"
        description="Get real-time insights into testing performance with detailed analytics and reporting tools. Identify bottlenecks, track progress, and make informed decisions to enhance the quality of your testing processes."
        icon="📊"
      />
      <FeatureCard
        title="Reliable Test Coverage"
        description="Perform robust testing with dynamic datasets to simulate real-world scenarios. Validate application behavior under various conditions to achieve higher reliability and enhanced test coverage."
        icon="🔒"
      />
      <FeatureCard
        title="AI-Driven Workflows"
        description="Accelerate testing with automated workflows powered by cutting-edge AI technology."
        icon="🤖"
      />
      <FeatureCard
        title="Smart Element Recognition"
        description="Identify and interact with UI elements through intelligent visual detection and precise coordinate mapping."
        icon="👁"
      />
      <FeatureCard
        title="Efficient Interaction Testing"
        description="Automate complex testing tasks, such as form interactions and multi-step operations, with precision and ease."
        icon="⚡"
      />
      
    </div>
  </div>
</section>


      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">How Tester-ally works </h2>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <StepCard
              step="1"
              title="Codeless Test Creation"
              description="Empower anyone to create test cases in simple, natural language, speeding up the test authoring process without the need for coding expertise."
            />
            <StepCard
              step="2"
              title="Test Execution Scheduling"
              description="Set up tests to run as frequently as needed, whenever you choose, using the flexible Execution Planner to automate your testing cycles."
            />
            <StepCard
              step="3"
              title="Comprehensive Test Reporting"
              description="Gather detailed insights from your test results, along with AI-generated suggestions to diagnose why a test may have failed, helping teams pinpoint issues efficiently."
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="about-us">
        <h2 className="section-title">About Us</h2>
        <p>
        TesterAlly is leading the charge in AI-powered test automation solutions. 
        Our mission is to empower development and QA teams to achieve impeccable software quality with unparalleled speed and accuracy. 
        Driven by innovation and a commitment to excellence, we are revolutionizing the testing process. With our cutting-edge platform, 
        we combine AI’s power with intuitive, codeless interfaces to simplify and accelerate testing across web, mobile, and API applications. 
        TesterAlly is your trusted partner for automating and enhancing the testing lifecycle, ensuring seamless delivery of high-quality software at scale.
        </p>
      </section>

      {/* Blog Highlights Section */}
      <section id="blog" className="blog-highlights max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">From Our Blog</h2>
        <div className="blog-grid">
          <div className="blog-card">
            <h4>The Future of AI in Test Automation</h4>
            <p>
              Explore how AI is transforming the landscape of test automation
              and what it means for the future of software development. Discover
              the latest trends in AI and how they are revolutionizing software
              testing.
            </p>
            <button className="btn primary-btn">Read More</button>
          </div>
          <div className="blog-card">
            <h4>Best Practices for Cross-Browser Testing</h4>
            <p>
              Learn essential strategies to ensure your application performs
              flawlessly across all browsers and devices. Learn how AI can help
              QA teams achieve faster and more accurate results.
            </p>
            <button className="btn primary-btn">Read More</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>
              "This platform has completely transformed our testing workflow.
              The AI capabilities are top-notch!"
            </p>
            <h4>- Jane Doe, Software Engineer</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "Detailed reporting and secure testing have made our development
              process much smoother."
            </p>
            <h4>- John Smith, QA Lead</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <p>© 2024 TesterAlly. All Rights Reserved.</p>
        <div className="social-links">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a href="https://github.com/rangad123/TesterAlly-FE/" target="_blank" rel="noopener noreferrer">
            <FaGithub /> GitHub
          </a>
          <a href="mailto:contact@testerally.com">
            <FaEnvelope /> Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
