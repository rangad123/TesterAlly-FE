import React from "react";
import "./Style2.css";
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

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

  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>AI-Driven Testing Automation</h1>
          <p>
           Accelerate your software development with AI-driven, end-to-end test automation for web, mobile, desktop, API, and Salesforce applications.
          </p>
          <button className="btn primary-btn" onClick={() => navigate('/dashboard')}>
          Start Free Trial
          </button>
        </div>
        <div className="hero-image">
          <img src="h2.jpg" alt="Hero Illustration" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src="AI.png" alt="AI Automation" />
            <h3>AI-Powered Automation</h3>
            <p>
            Utilize AI to create and maintain test cases in plain English, simplifying the testing process and reducing the need for extensive coding knowledge. Leverage AI to automate repetitive testing tasks and minimize
              human errors. 
            </p>
          </div>
          <div className="feature-card">
            <img src="report.png" alt="Advanced Reports" />
            <h3>Detailed Reporting</h3>
            <p>
            Access detailed reports and analytics in real-time to monitor test performance, identify issues promptly, and make informed decisions. Gain insights into test results with comprehensive analytics and
              reporting tools.
            </p>
          </div>
          <div className="feature-card">
            <img src="secure.png" alt="Secure Platform" />
            <h3>Secure Testing</h3>
            <p>
              Ensure security at every step with robust testing practices and
              tools. Conduct tests using multiple data sets to validate application behavior under various conditions, improving test coverage and reliability.
            </p>
          </div>
        </div>

          <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <FeatureCard
              title="AI-Based Automation"
              description="Automate repetitive testing tasks using AI-driven workflows."
              icon="🤖"
            />
            <FeatureCard
              title="Vision Agent"
              description="Capture coordinates of elements from images for precise operations."
              icon="👁"
            />
            <FeatureCard
              title="Streamlined Testing"
              description="Perform complex testing actions like button clicks and form filling."
              icon="⚡"
            />
          </div>
        </div>

      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <h2 className="section-title">How It Works</h2>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <StepCard
              step="1"
              title="Create Test Cases"
              description="Write test cases using natural language, making it accessible for team members without coding expertise."
            />
            <StepCard
              step="2"
              title="AI-Powered Test Maintenance"
              description="Leverage AI to automatically detect and update test cases when there are changes in the application, reducing maintenance efforts."
            />
            <StepCard
              step="3"
              title="Perform Actions"
              description="Run tests simultaneously across various browsers, devices, and operating systems to ensure comprehensive coverage."
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="about-us">
        <h2 className="section-title">About Us</h2>
        <p>
          TesterAlly is at the forefront of AI-driven testing solutions. Our
          mission is to empower developers and QA teams to deliver flawless
          software with unmatched speed and precision. With a dedicated team of
          experts and a passion for innovation, we are transforming the
          software testing landscape. We are a leading provider of AI-driven test automation solutions, committed to empowering development and QA teams to deliver high-quality software efficiently. Our platform combines the power of AI with user-friendly interfaces to streamline the testing process across various applications and environments.
        </p>
      </section>

      {/* Pricing Plans Section */}
      <section id="pricing" className="pricing">
        <h2 className="section-title">Our Pricing Plans</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Starter Plan</h3>
            <p>Ideal for small teams beginning their test automation journey.</p>
            <p className="price">$29/month</p>
            <button className="btn secondary-btn">Choose Starter</button>
          </div>
          <div className="pricing-card">
            <h3>Professional Plan</h3>
            <p>Designed for growing teams requiring advanced automation capabilities.</p>
            <p className="price">$99/month</p>
            <button className="btn secondary-btn">Choose Professional</button>
          </div>
          <div className="pricing-card">
            <h3>Enterprise Plan</h3>
            <p>Tailored solutions for large organizations with complex testing needs.</p>
            <p className="price">Contact Us</p>
            <button className="btn secondary-btn">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Blog Highlights Section */}
      <section id="blog" className="blog-highlights">
        <h2 className="section-title">From Our Blog</h2>
        <div className="blog-grid">
          <div className="blog-card">
            <h4>The Future of AI in Test Automation</h4>
            <p>
            Explore how AI is transforming the landscape of test automation and what it means for the future of software development. Discover the latest trends in AI and how they are revolutionizing
              software testing.
            </p>
            <button className="btn primary-btn">Read More</button>
          </div>
          <div className="blog-card">
            <h4>Best Practices for Cross-Browser Testing</h4>
            <p>
            Learn essential strategies to ensure your application performs flawlessly across all browsers and devices. Learn how AI can help QA teams achieve faster and more accurate
              results.
            </p>
            <button className="btn primary-btn">Read More</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
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
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
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
