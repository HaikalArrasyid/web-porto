"use client";

import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate contact form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-24 relative">
      <div className="container mx-auto flex flex-col gap-12 max-w-5xl">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Get in Touch
          </h2>
          <p className="text-red-400 text-sm sm:text-base font-semibold mt-3 flex items-center justify-center gap-1.5 uppercase tracking-wider">
            ✨ Let's build something amazing together ✨
          </p>
        </div>

        {/* Form and Info */}
        <div className="flex flex-col md:flex-row gap-12 items-stretch mt-8 w-full">
          
          {/* Left Column: Direct Info cards */}
          <div className="flex-1 flex flex-col gap-6 justify-between">
            <div className="p-6 rounded-2xl border border-white/5 bg-black/30 flex flex-col gap-4 shadow-xl">
              <h3 className="text-white font-bold text-xl">Contact Information</h3>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                Feel free to reach out for project inquiries, collaboration discussions, or photography shoots.
              </p>
              
              <div className="flex flex-col gap-4 mt-2">
                <a
                  href="mailto:haikalarrasyid@gmail.com"
                  className="flex items-center gap-3 text-white/80 hover:text-red-400 transition-colors duration-300 text-sm sm:text-base group"
                >
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 group-hover:scale-105 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span>haikalarrasyid@gmail.com</span>
                </a>

                <div className="flex items-center gap-3 text-white/80 text-sm sm:text-base">
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25gA7.5 7.5 0 1119.5 10.5z" />
                    </svg>
                  </div>
                  <span>Bandung, West Java, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Social card */}
            <div className="p-6 rounded-2xl border border-white/5 bg-black/30 flex flex-col gap-4 shadow-xl">
              <h3 className="text-white font-bold text-lg">Connect With Me</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/HaikalArrasyid"
                  target="_blank"
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-white hover:border-red-400/50 hover:text-red-400 hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/haikal-arrasyid"
                  target="_blank"
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-white hover:border-red-400/50 hover:text-red-400 hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/namakuhaikall/"
                  target="_blank"
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-white hover:border-red-400/50 hover:text-red-400 hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="flex-1 p-6 rounded-2xl border border-white/5 bg-black/30 shadow-xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-400 mb-4 animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Message Sent!</h4>
                <p className="text-white/60 text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-white/60 text-xs font-mono">YOUR NAME</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] focus:border-red-400/40 focus:bg-white/[0.04] text-white outline-none transition-all duration-300 text-sm"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-white/60 text-xs font-mono">YOUR EMAIL</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] focus:border-red-400/40 focus:bg-white/[0.04] text-white outline-none transition-all duration-300 text-sm"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="subject" className="text-white/60 text-xs font-mono">SUBJECT</label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] focus:border-red-400/40 focus:bg-white/[0.04] text-white outline-none transition-all duration-300 text-sm"
                    placeholder="Message subject"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="text-white/60 text-xs font-mono">MESSAGE</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] focus:border-red-400/40 focus:bg-white/[0.04] text-white outline-none transition-all duration-300 text-sm resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 py-3 px-6 rounded-xl bg-[#0d0214] border border-red-500/30 hover:border-red-400/50 hover:bg-[#14001c] text-white font-medium text-sm transition-all duration-300 shadow-[0_0_15px_rgba(248,113,113,0.1)] hover:shadow-[0_0_20px_rgba(248,113,113,0.25)] flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
