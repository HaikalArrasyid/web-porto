"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  desc: string;
  content: string;
  contributions: string;
  tags: string[];
  img: string;
  gallery: string[];
  category: "webapp" | "photography" | "videography";
  liveUrl: string;
  githubUrl: string;
  year: string;
  order: number;
};

const categoryLabel: Record<string, string> = {
  webapp: "Web App",
  photography: "Photography",
  videography: "Videography",
};

// Parse YouTube & Vimeo URLs to standard embed URLs
function getEmbedUrl(url?: string): string | null {
  if (!url) return null;

  // YouTube parsing
  const ytReg =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const ytMatch = url.match(ytReg);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // Vimeo parsing
  const vimeoReg = /vimeo\.com\/(?:video\/)?([0-9]+)/;
  const vimeoMatch = url.match(vimeoReg);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [isVerticalVideo, setIsVerticalVideo] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDoc(doc(db, "projects", id));
        if (!snap.exists()) {
          setNotFound(true);
          return;
        }
        setProject({ id: snap.id, ...snap.data() } as Project);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  // ESC key to close lightbox
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImg(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
      </div>
    );
  }

  // ── Not Found ─────────────────────────────────────────────────────────────
  if (notFound || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-white/30 text-6xl font-bold">404</p>
        <p className="text-white/60">Project tidak ditemukan.</p>
        <Link
          href="/#projects"
          className="mt-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
        >
          Kembali ke Portfolio
        </Link>
      </div>
    );
  }

  // ── Contributions list ────────────────────────────────────────────────────
  const contributionLines = project.contributions
    ? project.contributions
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
    : [];

  const galleryImages = Array.isArray(project.gallery)
    ? project.gallery.filter(Boolean)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <main className="min-h-screen pb-24">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#140003] via-[#140003]/50 to-transparent" />

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="absolute top-24 left-6 md:top-6 md:left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white text-sm transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Kembali
          </button>

          {/* Category badge */}
          <div className="absolute top-24 right-6 md:top-6 md:right-6">
            <span className="px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
              {categoryLabel[project.category] ?? project.category}
            </span>
          </div>

          {/* Title overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8">
            <div
              className={`${project.category === "photography" ? "max-w-6xl" : "max-w-4xl"} mx-auto`}
            >
              {project.year && (
                <span className="text-white/40 text-xs tracking-widest uppercase">
                  {project.year}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-1 leading-tight">
                {project.title}
              </h1>
            </div>
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────────────────── */}
        <div
          className={`${project.category === "photography" ? "max-w-6xl" : "max-w-4xl"} mx-auto px-6 md:px-12 mt-12 flex flex-col gap-12`}
        >
          {/* Tags + Links Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-lg bg-white/5 border border-white/8 text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {project.liveUrl && project.category !== "videography" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  {project.category === "photography" ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                      Buka Google Album
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                      Live Demo
                    </>
                  )}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white text-sm font-medium hover:border-white/20 transition-colors"
                >
                  {project.category === "videography" ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-red-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      Postingan Asli
                    </>
                  ) : (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </>
                  )}
                </a>
              )}
            </div>
          </div>

          {/* About Project */}
          {project.content && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-5 bg-red-400 rounded-full" />
                Tentang Project
              </h2>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {project.content}
              </p>
            </div>
          )}

          {/* Contributions */}
          {contributionLines.length > 0 && (
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                <span className="w-1 h-5 bg-red-400 rounded-full" />
                Kontribusiku
              </h2>
              <ul className="flex flex-col gap-3">
                {contributionLines.map((line, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-white/70"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Video Player (for Videography) */}
          {project.category === "videography" && project.liveUrl && (() => {
            const isLocalVideo = project.liveUrl.endsWith(".mp4") || 
                                 project.liveUrl.endsWith(".webm") || 
                                 project.liveUrl.endsWith(".mov") || 
                                 project.liveUrl.startsWith("/assets/");
            
            const embedUrl = isLocalVideo ? null : getEmbedUrl(project.liveUrl);
            const isInstagram = embedUrl && (embedUrl.includes("sociablekit.com") || embedUrl.includes("instagram.com"));
            
            return (
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-5 bg-red-400 rounded-full" />
                  Video Player
                </h2>
                {isLocalVideo ? (
                  /* Render Native HTML5 Video Player for Self-hosted/Local Video files */
                  <div className="flex flex-col items-center w-full">
                    <div className={`mx-auto w-full rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-lg relative transition-all duration-500 ${
                      isVerticalVideo ? "max-w-[450px]" : "max-w-3xl"
                    }`}>
                      <video 
                        src={project.liveUrl} 
                        controls 
                        className="w-full h-auto max-h-[75vh] bg-black"
                        playsInline
                        onLoadedMetadata={(e) => {
                          const video = e.currentTarget;
                          if (video.videoHeight > video.videoWidth) {
                            setIsVerticalVideo(true);
                          }
                        }}
                      />
                    </div>
                    {project.githubUrl && (
                      <div className="mt-4 text-center">
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-red-400 hover:text-red-300 border-b border-red-400/30 hover:border-red-300 transition-colors font-medium"
                        >
                          <span>Lihat Postingan Asli di Instagram</span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                ) : embedUrl ? (
                  /* Render Iframe Video Player for Embed Links (YT, Vimeo, IG) */
                  <div 
                    className={`relative mx-auto rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-lg ${
                      isInstagram 
                        ? "max-w-[450px] w-full h-[650px] md:h-[750px]" 
                        : "w-full aspect-video"
                    }`}
                  >
                    <iframe
                      src={embedUrl}
                      className={isInstagram ? "w-full h-full border-0" : "absolute inset-0 w-full h-full"}
                      scrolling={isInstagram ? "no" : "yes"}
                      allowTransparency={isInstagram ? true : undefined}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen={!isInstagram}
                    />
                  </div>
                ) : (
                  /* Fallback External Play Button */
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-sm font-semibold justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                      />
                    </svg>
                    Putar Video (Tautan Eksternal)
                  </a>
                )}
              </div>
            );
          })()}

          {/* Gallery (for Web App and Photography) */}
          {(project.category === "webapp" ||
            project.category === "photography") &&
            galleryImages.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="w-1 h-5 bg-red-400 rounded-full" />
                    {project.category === "webapp"
                      ? "Gallery & Screenshots"
                      : "Album Foto"}
                  </h2>
                </div>
                <div
                  className={
                    project.category === "photography"
                      ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
                      : "columns-1 sm:columns-2 gap-4 space-y-4"
                  }
                >
                  {galleryImages.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxImg(src)}
                      className="break-inside-avoid block w-full relative overflow-hidden rounded-xl border border-white/5 group cursor-zoom-in"
                    >
                      <img
                        src={src}
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          className="w-8 h-8 opacity-70"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Short desc (fallback if no content) */}
          {!project.content && (
            <p className="text-white/60 leading-relaxed">{project.desc}</p>
          )}

          {/* Back */}
          <div className="pt-4 border-t border-white/5">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Kembali ke Portfolio
            </button>
          </div>
        </div>
      </main>

      {/* Gallery Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setLightboxImg(null)}
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={lightboxImg}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
