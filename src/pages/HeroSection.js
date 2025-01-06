import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);

   const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0xedebfe, 0.3);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: new THREE.Color('rgb(126, 58, 242)'),
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0003;
      particles.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <section className="relative bg-[rgb(237,235,254)]">
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0"
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">

        <motion.div 
            className="space-y-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[rgb(126,58,242)]">
              Deliver Reliable Automation for Enterprise-Grade Software
              <div className="text-sm font-semibold mt-2 text-[rgb(126,58,242)]">
                TesterAlly QA Platform
              </div>
            </h1>
            
            <motion.p 
              className="text-base md:text-lg text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{textAlign:"justify"}}
            >
              Tester Ally ensures robust test automation designed to meet the demands of enterprise software.
              With comprehensive test coverage powered by AI, the platform minimizes risks while accelerating time-to-market.
              Our functional UI testing tools provide seamless automation, enabling teams to deploy high-quality applications confidently.
            </motion.p>

            <motion.button 
              className="w-full md:w-auto px-8 py-4 bg-[rgb(126,58,242)] text-white rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => navigate("/dashboard/register")}
            >
              Start Free Trial
            </motion.button>
          </motion.div>

          <motion.div 
            className="relative h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <motion.path
                d="M50 250 L200 350 L350 250 L200 150 Z"
                fill="#e0e7ff"
                stroke="#c7d2fe"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
              />

              <motion.g
                initial={{ y: -10 }}
                animate={{ y: 10 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <rect x="150" y="100" width="120" height="90" fill="#7e3af2" rx="8"/>
                <rect x="160" y="120" width="100" height="12" fill="white" opacity="0.6" rx="2"/>
                <rect x="160" y="140" width="80" height="12" fill="white" opacity="0.6" rx="2"/>
                <circle cx="250" cy="115" r="8" fill="#4CAF50"/>
              </motion.g>

              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <rect x="250" y="180" width="90" height="70" fill="#9061f9" rx="6"/>
                <rect x="260" y="190" width="70" height="8" fill="white" opacity="0.6" rx="1"/>
                <rect x="260" y="205" width="50" height="8" fill="white" opacity="0.6" rx="1"/>
                <rect x="260" y="220" width="60" height="8" fill="white" opacity="0.6" rx="1"/>
              </motion.g>

              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="120" cy="200" r="20" fill="#7e3af2"/>
                <path d="M110 200 L130 200 M120 190 L120 210" stroke="white" strokeWidth="3"/>
              </motion.g>

              <motion.path
                d="M120 220 C 150 250, 200 250, 250 220"
                stroke="#7e3af2"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;