"use client";

import React from "react";
import TextType from "../typeeffect";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-6 py-24 lg:py-0">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 xl:gap-24 w-full">
        
        {/* Left Column: Text Content */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start w-full lg:w-auto max-w-xl lg:max-w-2xl">
          <div className="relative inline-block">
            <div className="absolute -inset-2 rounded-2xl bg-red-400/25 blur-xl -z-10 w-2/3 mx-auto lg:mx-0" />
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white">
              Full Stack
            </h1>
          </div>

          <div className="relative inline-block mt-2">
            <div className="absolute -inset-2 rounded-2xl bg-red-400/25 blur-xl -z-10 w-1/2 mx-auto lg:mx-0" />
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-red-400">
              Developer
            </h1>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-4xl mb-6 mt-6">
            <TextType
              as="span"
              text={[
                "Web Developer.",
                "Photographer."
              ]}
              typingSpeed={40}
              deletingSpeed={50}
              pauseDuration={1800}
              loop={true}
              className="inline-block font-semibold"
              showCursor={true}
              cursorCharacter="|"
              textColors={["#fff"]}
              variableSpeed={{ min: 30, max: 70 }}
            />
          </h1>

          <p className="text-white/70 text-base sm:text-lg md:text-xl mb-8 max-w-xl lg:max-w-2xl leading-relaxed">
            A Full Stack Developer student with a growing interest in building web application systems and collaborating within teams to bring ideas to life. Learning by building real projects with Next.js and NestJS, with an additional skill in professional photography.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 w-full">
            {["React", "Javascript", "Node.js", "Tailwind"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8 w-full">
            {/* Projects Button */}
            <Link
              href="#projects"
              className="group relative px-8 py-2.5 rounded-lg bg-[#0d0214] border border-red-500/30 shadow-[0_0_15px_rgba(248,113,113,0.15)] hover:shadow-[0_0_20px_rgba(248,113,113,0.3)] hover:border-red-400/50 cursor-pointer transition-all duration-300 block text-white"
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <span>Projects</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                </svg>
              </div>
            </Link>

            {/* Contact Button */}
            <a
              href="mailto:haikalarrasyid@gmail.com"
              className="group relative px-8 py-2.5 rounded-lg bg-[#0d0214] border border-red-500/30 shadow-[0_0_15px_rgba(248,113,113,0.15)] hover:shadow-[0_0_20px_rgba(248,113,113,0.3)] hover:border-red-400/50 cursor-pointer transition-all duration-300 block text-white"
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <span>Contact</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
            </a>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8 w-full">
            <a href="https://github.com/HaikalArrasyid" target="_blank" className="relative group">
              <div className="pointer-events-none absolute -inset-1 rounded-lg bg-red-400/20 blur-md group-hover:bg-red-500/35 transition duration-300" />
              <div className="relative px-3 py-3 rounded-lg bg-black/10 border border-white/10 hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-github text-white"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/haikal-arrasyid" target="_blank" className="relative group">
              <div className="pointer-events-none absolute -inset-1 rounded-lg bg-red-400/20 blur-md group-hover:bg-red-500/35 transition duration-300" />
              <div className="relative px-3 py-3 rounded-lg bg-black/10 border border-white/10 hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-linkedin text-white opacity-100"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </div>
            </a>
            <a href="https://www.instagram.com/namakuhaikall/" target="_blank" className="relative group">
              <div className="pointer-events-none absolute -inset-1 rounded-lg bg-red-400/20 blur-md group-hover:bg-red-500/35 transition duration-300" />
              <div className="relative px-3 py-3 rounded-lg bg-black/10 border border-white/10 hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-instagram text-white"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Visual Area (Terminal Console Mockup) */}
        <div className="w-full lg:w-auto flex justify-center items-center mt-12 lg:mt-0 relative px-4 sm:px-0">
          {/* Decorative Blur Background */}
          <div className="absolute w-72 h-72 bg-red-500/20 rounded-full blur-3xl -z-10" />
          
          {/* Terminal Main Window */}
          <div className="w-full max-w-[460px] aspect-[4/3] rounded-2xl border border-white/10 bg-[#090211]/85 backdrop-blur-md p-5 shadow-2xl relative overflow-visible flex flex-col justify-between">
            
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">System Online</span>
              </div>
              <div className="text-white/40 text-[10px] font-mono">
                IT CORE
              </div>
            </div>

            {/* Terminal Body Container */}
            <div className="flex-1 flex gap-4 mt-4 overflow-hidden relative">
              
              {/* Left Sub-window: Editor panel */}
              <div className="flex-1 rounded-xl border border-white/5 bg-black/40 p-4 flex flex-col gap-3 font-mono relative">
                <div className="text-[10px] text-white/40 border-b border-white/5 pb-1 flex items-center gap-1.5">
                  <span className="text-red-400">&lt;/&gt;</span> build /app
                </div>
                
                {/* Code line bars (crimson red/grey bars) */}
                <div className="flex flex-col gap-2.5">
                  <div className="h-2 w-3/4 rounded-full bg-red-500/60" />
                  <div className="h-2 w-11/12 rounded-full bg-white/10" />
                  <div className="h-2 w-5/6 rounded-full bg-red-400/50" />
                  <div className="h-2 w-1/2 rounded-full bg-white/15" />
                  <div className="h-2 w-2/3 rounded-full bg-white/10" />
                  <div className="h-2 w-3/4 rounded-full bg-red-500/60" />
                </div>
                
                <div className="text-[9px] text-white/30 mt-auto">
                  build ok
                </div>
              </div>

              {/* Right Sub-window: Status panel */}
              <div className="w-[130px] rounded-xl border border-white/5 bg-black/40 p-3 flex flex-col gap-3 font-mono">
                <div className="text-[10px] text-white/40 border-b border-white/5 pb-1 flex items-center gap-1.5 justify-between">
                  <span>RUNTIME</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                
                {/* Status bars */}
                <div className="flex flex-col gap-2.5">
                  <div>
                    <div className="text-[8px] text-white/50 mb-0.5">CPU</div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-red-500/60 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[8px] text-white/50 mb-0.5">MEM</div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-red-400/50 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[8px] text-white/50 mb-0.5">FPS</div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-red-500/70 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="text-[8px] text-white/30 text-right mt-auto">
                  latest: 3ms
                </div>
              </div>

            </div>

            {/* Bottom console output line */}
            <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-white/50 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                <span>Console output</span>
              </div>
              <div className="text-white/30">
                ACTIVE
              </div>
            </div>

            {/* Floating Pill Tags */}
            
            {/* Top-Left Floating Pill: CLI Shell */}
            <div className="absolute -top-3.5 -left-4 px-2.5 py-1 rounded-full bg-[#0c0517]/95 border border-white/10 text-white/80 text-[10px] font-mono flex items-center gap-1 shadow-lg hover:border-red-400/50 transition-all duration-300">
              <span className="text-red-400 font-semibold">&gt;_</span>
              <span>CLI Shell</span>
            </div>

            {/* Top-Right Floating Pill: Cloud Sync */}
            <div className="absolute top-8 -right-6 px-2.5 py-1 rounded-full bg-[#0c0517]/95 border border-white/10 text-white/80 text-[10px] font-mono flex items-center gap-1 shadow-lg hover:border-red-400/50 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
              <span>Cloud Sync</span>
            </div>

            {/* Bottom-Right Floating Pill: Secure */}
            <div className="absolute bottom-12 -right-4 px-2.5 py-1 rounded-full bg-[#0c0517]/95 border border-white/10 text-white/80 text-[10px] font-mono flex items-center gap-1 shadow-lg hover:border-red-400/50 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Secure</span>
            </div>

            {/* Bottom-Left Floating Pill: Server Node */}
            <div className="absolute -bottom-3 -left-2 px-2.5 py-1 rounded-full bg-[#0c0517]/95 border border-white/10 text-white/80 text-[10px] font-mono flex items-center gap-1 shadow-lg hover:border-red-400/50 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span>Server Node</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
