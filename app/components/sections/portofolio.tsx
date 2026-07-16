"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";

// ─── Tech Stack Icon Helper ──────────────────────────────────────────────────
const getTechIcon = (skill: string) => {
  const s = skill.toLowerCase().trim();
  if (s.includes("html")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
  if (s.includes("css")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
  if (s.includes("javascript") || s === "js") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
  if (s.includes("typescript") || s === "ts") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
  if (s.includes("react")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
  if (s.includes("next")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg";
  if (s.includes("tailwind")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg";
  if (s.includes("node")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
  if (s.includes("express")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg";
  if (s.includes("postgres")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg";
  if (s.includes("firebase")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg";
  if (s.includes("figma")) return "/icons/figma.svg";
  if (s.includes("lightroom")) return "/icons/lightroom.svg";
  if (s.includes("davinci")) return "/icons/davinci.svg";
  if (s.includes("capcut")) return "/icons/capcut.svg";
  if (s.includes("canva")) return "/icons/canva.svg";
  if (s.includes("git") && !s.includes("github")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg";
  if (s.includes("github")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg";
  return null;
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "projects" | "certificates" | "tech";
type SubTab = "webapp" | "photography" | "videography";

type ProjectItem = {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  img: string;
  category: SubTab;
  order: number;
};

type CertItem = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  desc: string;
  img: string;
  credentialUrl: string;
  order: number;
};

type TechCategory = {
  id: string;
  category: string;
  skills: string[];
  order: number;
};

// ─── Loading Skeleton ──────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-black/30 overflow-hidden animate-pulse">
      <div className="w-full aspect-[16/10] bg-white/5" />
      <div className="p-6 flex flex-col gap-3">
        <div className="h-4 bg-white/5 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-5/6" />
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-14 bg-white/5 rounded-md" />
          <div className="h-5 w-16 bg-white/5 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function CertSkeleton() {
  return (
    <div className="break-inside-avoid rounded-2xl border border-white/5 bg-black/30 overflow-hidden animate-pulse mb-4">
      <div className="w-full aspect-[4/3] bg-white/5" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-4 bg-white/5 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-1/2" />
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Portofolio() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("webapp");
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);

  // Firestore data states
  const [projects, setProjects] = useState<Record<SubTab, ProjectItem[]>>({
    webapp: [],
    photography: [],
    videography: [],
  });
  const [certificates, setCertificates] = useState<CertItem[]>([]);
  const [techStack, setTechStack] = useState<TechCategory[]>([]);

  // Loading states
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCerts, setLoadingCerts] = useState(true);
  const [loadingTech, setLoadingTech] = useState(true);

  // ── Fetch Projects ───────────────────────────────────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("order"));
        const snap = await getDocs(q);
        const all = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ProjectItem, "id">),
        }));
        setProjects({
          webapp: all.filter((p) => p.category === "webapp"),
          photography: all.filter((p) => p.category === "photography"),
          videography: all.filter((p) => p.category === "videography"),
        });
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetch();
  }, []);

  // ── Fetch Certificates ───────────────────────────────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(collection(db, "certificates"), orderBy("order"));
        const snap = await getDocs(q);
        setCertificates(
          snap.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<CertItem, "id">),
          }))
        );
      } catch (err) {
        console.error("Failed to fetch certificates:", err);
      } finally {
        setLoadingCerts(false);
      }
    };
    fetch();
  }, []);

  // ── Fetch Tech Stack ─────────────────────────────────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(collection(db, "techStack"), orderBy("order"));
        const snap = await getDocs(q);
        setTechStack(
          snap.docs.map((doc) => {
            const data = doc.data() as Omit<TechCategory, "id">;
            if (data.category === "Design & Media Tools") {
              return {
                id: doc.id,
                ...data,
                skills: ["Figma", "Lightroom Classic", "DaVinci", "CapCut", "Canva"],
              };
            }
            return {
              id: doc.id,
              ...data,
            };
          })
        );
      } catch (err) {
        console.error("Failed to fetch techStack:", err);
      } finally {
        setLoadingTech(false);
      }
    };
    fetch();
  }, []);

  // ── ESC key to close lightbox ─────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-24 relative">
      <div className="container mx-auto flex flex-col gap-12 max-w-5xl">

        {/* Title and Subtitle */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-red-400">
            Portfolio Showcase
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Explore my journey through projects, certifications, and technical expertise.
            Each section represents a milestone in my continuous learning path.
          </p>
        </div>

        {/* Main Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 bg-white/[0.02] border border-white/5 p-2 rounded-2xl max-w-2xl mx-auto w-full">
          {/* Projects Tab */}
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
              activeTab === "projects"
                ? "bg-[#0d0214] border border-red-500/30 text-white shadow-[0_0_15px_rgba(248,113,113,0.1)]"
                : "border border-transparent text-white/50 hover:text-white"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
            Projects
          </button>

          {/* Certificates Tab */}
          <button
            onClick={() => setActiveTab("certificates")}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
              activeTab === "certificates"
                ? "bg-[#0d0214] border border-red-500/30 text-white shadow-[0_0_15px_rgba(248,113,113,0.1)]"
                : "border border-transparent text-white/50 hover:text-white"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
            </svg>
            Certificates
          </button>

          {/* Tech Stack Tab */}
          <button
            onClick={() => setActiveTab("tech")}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
              activeTab === "tech"
                ? "bg-[#0d0214] border border-red-500/30 text-white shadow-[0_0_15px_rgba(248,113,113,0.1)]"
                : "border border-transparent text-white/50 hover:text-white"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.39.43 1.007.093 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.398 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.337.443.298 1.06-.093 1.45l-.774.773a1.125 1.125 0 01-1.449.093l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.08-.424-.393-.764-.79-.93-.398-.164-.854-.142-1.204.108l-.738.527a1.125 1.125 0 01-1.448-.093l-.774-.774a1.125 1.125 0 01-.093-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.527-.738a1.125 1.125 0 01.093-1.45l.774-.773a1.125 1.125 0 011.448-.093l.738.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Tech Stack
          </button>
        </div>

        {/* Projects Sub-tabs */}
        {activeTab === "projects" && (
          <div className="flex justify-center gap-3 mt-4">
            {(["webapp", "photography", "videography"] as SubTab[]).map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubTab(sub)}
                className={`py-2 px-6 rounded-full font-medium text-xs border tracking-wider transition-all duration-300 capitalize ${
                  activeSubTab === sub
                    ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20"
                    : "bg-[#0d0214] border-white/5 text-white/60 hover:text-white"
                }`}
              >
                {sub === "webapp" ? "Web App" : sub.charAt(0).toUpperCase() + sub.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* ── Tab Contents ──────────────────────────────────────────────────── */}
        <div className="mt-8 min-h-[400px]">

          {/* Projects View */}
          {activeTab === "projects" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loadingProjects
                ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
                : projects[activeSubTab].length === 0
                ? (
                  <div className="col-span-3 text-center text-white/30 py-16">
                    <p className="text-sm">Belum ada project di kategori ini.</p>
                  </div>
                )
                : projects[activeSubTab].map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.id}`}
                    className="rounded-2xl border border-white/5 bg-black/30 overflow-hidden hover:scale-[1.02] hover:border-red-400/35 transition-all duration-300 flex flex-col group shadow-xl cursor-pointer"
                  >
                    <div className="w-full aspect-[16/10] bg-white/5 relative overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="flex items-center gap-1.5 text-[10px] text-white/70 tracking-wider uppercase">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                          Lihat Detail
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1 gap-3 justify-between">
                      <div>
                        <h4 className="text-white font-bold text-lg leading-snug group-hover:text-red-400 transition-colors duration-300">
                          {p.title}
                        </h4>
                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed mt-2.5">{p.desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {p.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 text-[10px] sm:text-xs rounded-md bg-white/5 border border-white/5 text-white/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}

          {/* Certificates View */}
          {activeTab === "certificates" && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 max-w-5xl mx-auto w-full">
              {loadingCerts
                ? Array.from({ length: 6 }).map((_, i) => <CertSkeleton key={i} />)
                : certificates.length === 0
                ? (
                  <div className="col-span-3 text-center text-white/30 py-16">
                    <p className="text-sm">Belum ada sertifikat.</p>
                  </div>
                )
                : certificates.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCert(c)}
                    className="break-inside-avoid block w-full text-left rounded-2xl border border-white/5 bg-black/30 overflow-hidden hover:border-red-400/35 hover:scale-[1.02] transition-all duration-300 shadow-xl group cursor-pointer mb-4"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={c.img}
                        alt={c.title}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div>
                          <span className="text-[10px] text-red-400 font-semibold tracking-widest uppercase block">{c.issuer}</span>
                          <h4 className="text-white font-bold text-sm mt-0.5">{c.title}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between border-t border-white/5">
                      <div>
                        <p className="text-white font-semibold text-sm leading-tight">{c.title}</p>
                        <p className="text-white/40 text-xs mt-0.5">{c.issuer}</p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white/30 group-hover:text-red-400 transition-colors duration-300 shrink-0 ml-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </div>
                  </button>
                ))}
            </div>
          )}

          {/* Tech Stack View */}
          {activeTab === "tech" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
              {loadingTech
                ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-white/5 bg-black/30 animate-pulse flex flex-col gap-6">
                    <div className="h-4 bg-white/5 rounded w-1/2" />
                    <div className="grid grid-cols-3 gap-3">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <div key={j} className="aspect-square bg-white/5 rounded-xl" />
                      ))}
                    </div>
                  </div>
                ))
                : techStack.length === 0
                ? (
                  <div className="col-span-3 text-center text-white/30 py-16">
                    <p className="text-sm">Belum ada data tech stack.</p>
                  </div>
                )
                : techStack.map((cat) => (
                  <div key={cat.id} className="p-6 rounded-2xl border border-white/5 bg-black/30 flex flex-col gap-6 shadow-xl">
                    <h4 className="text-white font-bold text-base uppercase tracking-wider border-b border-white/5 pb-3 text-red-400/90">
                      {cat.category}
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {cat.skills.map((skill) => {
                        const iconUrl = getTechIcon(skill);
                        return (
                          <div key={skill} className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-red-500/20 transition-all duration-300 aspect-square text-center">
                            {iconUrl ? (
                              <img src={iconUrl} alt={skill} className="w-8 h-8 object-contain mb-2" />
                            ) : (
                              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-2 text-red-400 font-bold text-xs shrink-0">
                                {skill.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                            <span className="text-white/60 text-[10px] font-medium truncate max-w-full px-0.5">{skill}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          )}

        </div>
      </div>

      {/* ── Lightbox Modal ─────────────────────────────────────────────────── */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div
            className="relative z-10 max-w-3xl w-full rounded-3xl border border-white/10 bg-[#0d0214]/90 shadow-2xl shadow-black/60 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-black/50 border border-white/10 text-white/60 hover:text-white hover:border-red-400/40 transition-all duration-200"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="w-full bg-black/40">
              <img
                src={selectedCert.img}
                alt={selectedCert.title}
                className="w-full object-contain max-h-[70vh]"
              />
            </div>

            {/* Info Footer */}
            <div className="p-6 border-t border-white/5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="text-[10px] text-red-400 font-semibold tracking-widest uppercase block">{selectedCert.issuer}</span>
                  <h3 className="text-white font-bold text-lg mt-1">{selectedCert.title}</h3>
                  <span className="text-white/40 text-xs">{selectedCert.date}</span>
                </div>
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Buka Penuh
                </a>
              </div>
              {selectedCert.desc && (
                <p className="mt-4 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {selectedCert.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}