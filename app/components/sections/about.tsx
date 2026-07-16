"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { motion } from "framer-motion";

export default function About() {
  const [projectCount, setProjectCount] = useState(8);
  const [certCount, setCertCount] = useState(10);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const projSnap = await getDocs(collection(db, "projects"));
        if (!projSnap.empty) setProjectCount(projSnap.size);
        const certSnap = await getDocs(collection(db, "certificates"));
        if (!certSnap.empty) setCertCount(certSnap.size);
      } catch (e) {
        console.error("Failed to fetch dynamic stats:", e);
      }
    };
    fetchCounts();
  }, []);

  return (
    <section id="about" className="py-12 md:py-20 -mt-8 md:-mt-12 lg:-mt-16 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="container mx-auto flex flex-col gap-12 max-w-6xl">
        
        {/* Side-by-Side Content */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center justify-between w-full">
          
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 text-center md:text-left flex flex-col items-center md:items-start max-w-2xl"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Haikal Arrasyid
            </h2>

            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6 font-light">
              A Software Engineering student at SMK Telkom Malang, currently focused on full stack web development with Next.js and NestJS. Growing interest in system architecture and API integration, learned through real, hands-on projects and team collaboration. Alongside development, professional photography adds another dimension, supporting documentation and visual asset needs.
            </p>

            {/* Quote Block */}
            <div className="w-full max-w-lg p-4 mb-6 rounded-2xl border border-white/5 bg-white/[0.01] text-left relative overflow-hidden">
              <p className="text-red-400/80 text-sm font-medium italic flex items-center gap-2">
                <span className="text-2xl text-red-500/40 font-serif leading-none">“</span>
                Leveraging code to solve problems, and visuals to tell stories.
                <span className="text-2xl text-red-500/40 font-serif leading-none">”</span>
              </p>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start w-full">
              <a
                href="/CV.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-650 shadow-lg shadow-red-500/20 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download CV
              </a>
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-red-500/30 text-white/80 hover:text-white text-sm font-semibold transition-all duration-300 bg-white/[0.02]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
                View Projects
              </a>
            </div>
          </motion.div>

          {/* Right Column: Image with Glowing Circle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="flex-1 w-full flex justify-center items-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] rounded-full flex items-center justify-center shrink-0">
              {/* Outer pink/red glow shadow */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-red-500 to-red-400 opacity-60 blur-md -z-10 animate-pulse" />
              <div className="absolute -inset-8 rounded-full bg-red-500/25 blur-3xl -z-20" />
              
              <img
                src="/profile picture.jpeg"
                alt="Haikal Arrasyid"
                className="w-full h-full rounded-full border border-white/10 shadow-2xl object-cover relative"
              />
            </div>
          </motion.div>

        </div>

        {/* Bottom Row: 3 Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8"
        >
          
          {/* Card 1: Projects */}
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 relative group overflow-hidden">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Total Projects</h4>
                  <p className="text-white/60 text-xs mt-1">Web, design, and editing delivered</p>
                </div>
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white shrink-0">
                {projectCount}
              </span>
            </div>
            {/* Soft highlight bar at bottom */}
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-550" />
          </div>

          {/* Card 2: Certificates */}
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 relative group overflow-hidden">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Certificates</h4>
                  <p className="text-white/60 text-xs mt-1">Professional skills validated</p>
                </div>
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white shrink-0">
                {certCount}
              </span>
            </div>
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-550" />
          </div>

          {/* Card 3: Experience */}
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 relative group overflow-hidden">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Years of Study</h4>
                  <p className="text-white/60 text-xs mt-1">Continuous software engineering</p>
                </div>
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white shrink-0">
                3
              </span>
            </div>
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-550" />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
