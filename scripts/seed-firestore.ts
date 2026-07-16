/**
 * Seed Script — masukkan data awal ke Firestore
 *
 * Cara pakai:
 *   1. Pastikan firebase.ts sudah ada di root project
 *   2. Jalankan: npx ts-node --project tsconfig.json scripts/seed-firestore.ts
 *      ATAU kalau pakai tsx:  npx tsx scripts/seed-firestore.ts
 *
 * Script ini hanya perlu dijalankan SEKALI.
 * Setelah itu manage data lewat Admin Panel (Step 3 & 4).
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, writeBatch, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZKuh5a7CUTynVHqalQyAimz297PN1S6U",
  authDomain: "management-web-porto.firebaseapp.com",
  projectId: "management-web-porto",
  storageBucket: "management-web-porto.firebasestorage.app",
  messagingSenderId: "178858999375",
  appId: "1:178858999375:web:6e5c1b73867c4a7f01f43a",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "Website Perusahaan (Company Profile) Prima",
    desc: "A corporate landing page built with modern framework components and high-performance UI optimization.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    category: "webapp",
    order: 1,
  },
  {
    title: "Liburan Kita - Platform Perjalanan",
    desc: "A modern tourism booking platform built for travelers seeking interactive adventure bookings.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    category: "webapp",
    order: 2,
  },
  {
    title: "Website Company Profile Kedai Kopi",
    desc: "A stylish café website featuring automated reservation grids and a modern responsive menu layout.",
    tags: ["HTML", "Vanilla CSS", "JavaScript"],
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
    category: "webapp",
    order: 3,
  },
  {
    title: "Urban Street Photography",
    desc: "A visual narrative of urban life, capturing candid moments through the streets with artistic composition.",
    tags: ["Lightroom", "Portrait", "Street Photography"],
    img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80",
    category: "photography",
    order: 1,
  },
  {
    title: "Product & Brand Photography",
    desc: "Clean and professional product shots for brand campaigns using controlled studio lighting techniques.",
    tags: ["Photoshop", "Studio", "Commercial"],
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    category: "photography",
    order: 2,
  },
  {
    title: "Event & Documentary Coverage",
    desc: "Full event coverage capturing the energy and key moments of conferences, concerts, and special occasions.",
    tags: ["Event", "Documentary", "Lightroom"],
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    category: "photography",
    order: 3,
  },
  {
    title: "Cinematic Travel Video Highlights",
    desc: "Color-graded cinematic travel vlog sequence cut and stabilized with professional sound design.",
    tags: ["Premiere Pro", "After Effects", "Color Grading"],
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    category: "videography",
    order: 1,
  },
  {
    title: "Brand Commercial Video",
    desc: "Short-form promotional video content crafted for social media with dynamic motion graphics.",
    tags: ["After Effects", "Motion Graphics", "DaVinci Resolve"],
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    category: "videography",
    order: 2,
  },
];

const certificates = [
  {
    title: "ExploreAItion",
    issuer: "Mini-Hackathon",
    date: "2025",
    desc: "Berpartisipasi dalam mini Hackathon, membuat dan mengembangkan ide automation berbasis AI.",
    img: "/assets/certificates/Explor[AI]tion.webp",
    credentialUrl: "/assets/certificates/Explor[AI]tion.webp",
    order: 1,
  },
  {
    title: "Speaker of Probation METIC",
    issuer: "METIC Organization",
    date: "2025",
    desc: "Menjadi speaker materi konsep sorting and searching pada pelatihan Metizen 34.",
    img: "/assets/certificates/Probation-METIC.webp",
    credentialUrl: "/assets/certificates/Probation-METIC.webp",
    order: 2,
  },
  {
    title: "Semi-Finalist JHIC 2025",
    issuer: "Jagoan Hosting Infrastructure Competition",
    date: "2025",
    desc: "Berhasil mencapai babak semifinal di JHIC, kompetisi bergengsi yang menguji kemampuan inovasi, problem solving, dan presentasi ide.",
    img: "/assets/certificates/SEMIFINAL-JHIC.webp",
    credentialUrl: "/assets/certificates/SEMIFINAL-JHIC.webp",
    order: 3,
  },
  {
    title: "Sertifikat Innovation Challenge",
    issuer: "Innovation Challenge",
    date: "2024",
    desc: "Mengikuti Innovation Challenge dan mengembangkan ide inovatif yang berdampak nyata, melewati serangkaian seleksi ketat bersama tim dari berbagai negara.",
    img: "/assets/certificates/Sertifikat Inovation Challenge.webp",
    credentialUrl: "/assets/certificates/Sertifikat Inovation Challenge.webp",
    order: 4,
  },
  {
    title: "Participant of Digifest",
    issuer: "UI/UX Alliance",
    date: "2024",
    desc: "Mendapatkan sertifikasi dari UI/UX Alliance atas kontribusi dan keahlian dalam desain antarmuka pengguna yang berpusat pada pengalaman manusia.",
    img: "/assets/certificates/UIUX Aliance (sign).webp",
    credentialUrl: "/assets/certificates/UIUX Aliance (sign).webp",
    order: 5,
  },
  {
    title: "Certificate of Completion",
    issuer: "Anthropic",
    date: "2024",
    desc: "Menyelesaikan program ANT yang mencakup pelatihan dan pengembangan keterampilan di bidang teknologi dan kepemimpinan digital.",
    img: "/assets/certificates/ant.webp",
    credentialUrl: "/assets/certificates/ant.webp",
    order: 6,
  },
  {
    title: "Finalist Kompetisi Standarisasi Nasional (KSN) 2026",
    issuer: "BSN Program",
    date: "2024",
    desc: "Berhasil menyelesaikan program BSN, mendalami standar dan praktik terbaik dalam pengembangan sistem berbasis teknologi.",
    img: "/assets/certificates/bsn.webp",
    credentialUrl: "/assets/certificates/bsn.webp",
    order: 7,
  },
  {
    title: "CSS Certification",
    issuer: "SkilVul Web Development Course",
    date: "2024",
    desc: "Mendapatkan sertifikasi CSS yang memvalidasi kemampuan dalam styling web modern, termasuk Flexbox, Grid, dan animasi CSS.",
    img: "/assets/certificates/css.webp",
    credentialUrl: "/assets/certificates/css.webp",
    order: 8,
  },
  {
    title: "HTML Certification",
    issuer: "SkilVul Web Development Course",
    date: "2024",
    desc: "Sertifikasi HTML yang membuktikan penguasaan struktur dan semantik web, fondasi utama dalam pembangunan halaman web profesional.",
    img: "/assets/certificates/html.webp",
    credentialUrl: "/assets/certificates/html.webp",
    order: 9,
  },
  {
    title: "JavaScript Certification",
    issuer: "SkilVul Web Development Course",
    date: "2024",
    desc: "Sertifikasi JavaScript yang mengonfirmasi kemampuan pemrograman web interaktif, logika, DOM manipulation, dan pengembangan aplikasi frontend.",
    img: "/assets/certificates/js.webp",
    credentialUrl: "/assets/certificates/js.webp",
    order: 10,
  },
];

const techStack = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    order: 1,
  },
  {
    category: "Backend & Database",
    skills: ["Node.js", "Express", "PostgreSQL", "REST APIs", "Firebase"],
    order: 2,
  },
  {
    category: "Design & Media Tools",
    skills: ["Figma", "Photoshop", "Lightroom", "Premiere Pro"],
    order: 3,
  },
];

// ─── Seed Function ─────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Starting Firestore seed...\n");

  // Projects
  console.log("📁 Seeding projects...");
  for (const item of projects) {
    const ref = await addDoc(collection(db, "projects"), item);
    console.log(`  ✅ ${item.title} [${ref.id}]`);
  }

  // Certificates
  console.log("\n📜 Seeding certificates...");
  for (const item of certificates) {
    const ref = await addDoc(collection(db, "certificates"), item);
    console.log(`  ✅ ${item.title} [${ref.id}]`);
  }

  // Tech Stack
  console.log("\n🔧 Seeding techStack...");
  for (const item of techStack) {
    const ref = await addDoc(collection(db, "techStack"), item);
    console.log(`  ✅ ${item.category} [${ref.id}]`);
  }

  console.log("\n🎉 Seeding complete! Semua data sudah masuk ke Firestore.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
