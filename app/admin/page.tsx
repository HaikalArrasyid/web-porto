"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, query, orderBy
} from "firebase/firestore";
import { db } from "@/firebase";

// ─── Types ────────────────────────────────────────────────────────────────────
type AdminTab = "projects" | "certificates" | "tech";

type Project = {
  id: string; title: string; desc: string;
  tags: string[]; img: string;
  category: "webapp" | "photography" | "videography"; order: number;
  content?: string;
  contributions?: string;
  liveUrl?: string;
  githubUrl?: string;
  gallery?: string[];
  year?: string;
};
type Certificate = {
  id: string; title: string; issuer: string; date: string;
  desc: string; img: string; credentialUrl: string; order: number;
};
type TechCategory = {
  id: string; category: string; skills: string[]; order: number;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-0.5 text-[10px] rounded-md bg-white/5 border border-white/8 text-white/50">
      {children}
    </span>
  );
}

function ActionBtn({ onClick, variant, children }: {
  onClick: () => void; variant: "edit" | "delete"; children: React.ReactNode;
}) {
  const cls = variant === "edit"
    ? "border-white/10 text-white/50 hover:text-white hover:border-white/30"
    : "border-red-500/20 text-red-400/60 hover:text-red-400 hover:border-red-400/40";
  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all duration-200 ${cls}`}>
      {children}
    </button>
  );
}

function SectionHeader({ title, count, onAdd }: { title: string; count: number; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-white/30 text-sm mt-0.5">{count} item{count !== 1 ? "s" : ""}</p>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Tambah
      </button>
    </div>
  );
}

// ─── Modal Wrapper ─────────────────────────────────────────────────────────────
function Modal({ title, onClose, onSubmit, loading, children }: {
  title: string; onClose: () => void; onSubmit: (e: React.FormEvent) => void;
  loading: boolean; children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-lg bg-[#120619] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="text-white font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/40 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 p-6 overflow-y-auto flex-1">
          {children}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 text-sm hover:text-white transition-colors">
              Batal
            </button>
            <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-all">
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Form Field Components ────────────────────────────────────────────────────
const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-400/40 transition-all";
const labelCls = "text-xs text-white/50 font-medium mb-1 block";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1"><label className={labelCls}>{label}</label>{children}</div>;
}

// ─── Delete Confirm ────────────────────────────────────────────────────────────
function DeleteConfirm({ name, onConfirm, onCancel }: {
  name: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative z-10 bg-[#120619] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-red-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-white font-bold text-center mb-2">Hapus Item?</h3>
        <p className="text-white/40 text-sm text-center mb-6">
          "<span className="text-white/60">{name}</span>" akan dihapus permanen.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 text-sm hover:text-white transition-colors">Batal</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">Hapus</button>
        </div>
      </div>
    </div>
  );
}

// ─── File Upload Helper ────────────────────────────────────────────────────────
async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData
  });
  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error || "Gagal mengunggah file.");
  }
  return data.url;
}

// ══════════════════════════════════════════════════════════════════════════════
// PROJECTS TAB
// ══════════════════════════════════════════════════════════════════════════════
function ProjectsTab() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>({
    title: "", desc: "", tags: [], img: "", category: "webapp", order: 1,
    content: "", contributions: "", liveUrl: "", githubUrl: "", gallery: [], year: ""
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const snap = await getDocs(query(collection(db, "projects"), orderBy("order")));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setForm({
      title: "", desc: "", tags: [], img: "", category: "webapp", order: items.length + 1,
      content: "", contributions: "", liveUrl: "", githubUrl: "", gallery: [], year: new Date().getFullYear().toString()
    });
    setTagsInput("");
    setEditId(null);
    setModal("add");
  };

  const openEdit = (item: Project) => {
    setForm({
      title: item.title,
      desc: item.desc,
      tags: item.tags,
      img: item.img,
      category: item.category,
      order: item.order,
      content: item.content || "",
      contributions: item.contributions || "",
      liveUrl: item.liveUrl || "",
      githubUrl: item.githubUrl || "",
      gallery: item.gallery || [],
      year: item.year || ""
    });
    setTagsInput(item.tags ? item.tags.join(", ") : "");
    setEditId(item.id);
    setModal("edit");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      ...form,
      tags: tagsInput.split(",").map(t => t.trim()).filter(Boolean)
    };
    try {
      if (modal === "add") await addDoc(collection(db, "projects"), data);
      else if (editId) await updateDoc(doc(db, "projects", editId), data);
      setModal(null);
      load();
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteDoc(doc(db, "projects", deleteTarget.id));
    setDeleteTarget(null);
    load();
  };

  return (
    <div>
      <SectionHeader title="Projects" count={items.length} onAdd={openAdd} />
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-white/3 animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <img src={item.img} alt={item.title} className="w-16 h-12 object-cover rounded-lg shrink-0 bg-white/5" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{item.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge>{item.category}</Badge>
                  {item.tags.slice(0, 2).map(t => <Badge key={t}>{t}</Badge>)}
                  {item.tags.length > 2 && <span className="text-white/20 text-[10px]">+{item.tags.length - 2}</span>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <ActionBtn variant="edit" onClick={() => openEdit(item)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                  Edit
                </ActionBtn>
                <ActionBtn variant="delete" onClick={() => setDeleteTarget(item)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  Hapus
                </ActionBtn>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === "add" ? "Tambah Project" : "Edit Project"} onClose={() => setModal(null)} onSubmit={handleSubmit} loading={saving}>
          <Field label="Judul Project">
            <input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Nama project..." />
          </Field>
          <Field label="Deskripsi">
            <textarea className={inputCls} rows={3} value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} required placeholder="Deskripsi singkat..." />
          </Field>
          <Field label="Kategori">
            <select className={inputCls} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Project["category"] }))}>
              <option value="webapp">Web App</option>
              <option value="photography">Photography</option>
              <option value="videography">Videography</option>
            </select>
          </Field>
          <Field label="Tags (pisah dengan koma)">
            <input className={inputCls} value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="React, Next.js, Tailwind CSS" />
          </Field>
          {/* Main Cover Image - File Upload for ALL categories */}
          <Field label="Upload Gambar Utama (Cover/Thumbnail)">
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                className={inputCls}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploading(true);
                    try {
                      const url = await uploadFile(file);
                      setForm(f => ({ ...f, img: url }));
                    } catch (err: any) {
                      alert(err.message || "Upload gagal");
                    } finally {
                      setUploading(false);
                    }
                  }
                }}
              />
              {uploading && <span className="text-red-400 text-xs animate-pulse">Mengunggah file...</span>}
              {form.img && (
                <div className="flex items-center gap-3 p-2.5 rounded-xl border border-white/5 bg-white/[0.01]">
                  <img src={form.img} alt="Preview" className="w-12 h-10 object-cover rounded-lg bg-white/5" />
                  <span className="text-white/60 text-xs truncate flex-1">{form.img}</span>
                </div>
              )}
            </div>
          </Field>

          <Field label="Tahun Project">
            <input className={inputCls} value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="2026" />
          </Field>

          {/* Conditional Links based on Category */}
          {form.category === "webapp" && (
            <>
              <Field label="Link Website (Live Demo)">
                <input className={inputCls} value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} placeholder="https://..." />
              </Field>
              <Field label="Link GitHub">
                <input className={inputCls} value={form.githubUrl} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))} placeholder="https://github.com/..." />
              </Field>
            </>
          )}

          {form.category === "photography" && (
            <Field label="Link Google Photo Album (Opsional)">
              <input className={inputCls} value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} placeholder="https://photos.google.com/..." />
            </Field>
          )}

          {form.category === "videography" && (
            <>
              <Field label="Video (Pilih salah satu: Upload File atau Masukkan URL)">
                <div className="flex flex-col gap-2.5">
                  {/* Option 1: File Upload */}
                  <div className="flex flex-col gap-1.5 border border-white/5 bg-white/[0.01] p-3.5 rounded-xl">
                    <span className="text-white/60 text-[10px] uppercase font-semibold tracking-wider">Opsi A: Upload File Video Lokal (MP4/WebM)</span>
                    <input
                      type="file"
                      accept="video/*"
                      className={inputCls}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploading(true);
                          try {
                            const url = await uploadFile(file);
                            setForm(f => ({ ...f, liveUrl: url }));
                          } catch (err: any) {
                            alert(err.message || "Upload video gagal");
                          } finally {
                            setUploading(false);
                          }
                        }
                      }}
                    />
                    {uploading && <span className="text-red-400 text-xs animate-pulse">Mengunggah video...</span>}
                  </div>

                  {/* Option 2: Text Input */}
                  <div className="flex flex-col gap-1.5 border border-white/5 bg-white/[0.01] p-3.5 rounded-xl">
                    <span className="text-white/60 text-[10px] uppercase font-semibold tracking-wider">Opsi B: Atau Masukkan URL Video (YouTube / Vimeo / IG)</span>
                    <input 
                      className={inputCls} 
                      value={form.liveUrl} 
                      onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} 
                      placeholder="https://www.youtube.com/watch?v=... atau https://..." 
                    />
                  </div>

                  {/* Preview state if liveUrl is set */}
                  {form.liveUrl && (
                    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-white/5 bg-white/[0.01]">
                      <div className="w-12 h-8 rounded bg-white/5 flex items-center justify-center text-[9px] text-white/50 font-mono tracking-widest">
                        {form.liveUrl.endsWith(".mp4") || form.liveUrl.endsWith(".webm") || form.liveUrl.startsWith("/assets/") ? "VIDEO" : "LINK"}
                      </div>
                      <span className="text-white/60 text-xs truncate flex-1">{form.liveUrl}</span>
                    </div>
                  )}
                </div>
              </Field>

              <Field label="Link Postingan Asli / Instagram (Opsional - Terutama jika mengunggah file video lokal)">
                <input 
                  className={inputCls} 
                  value={form.githubUrl} 
                  onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))} 
                  placeholder="https://www.instagram.com/reel/... atau link postingan asli" 
                />
              </Field>
            </>
          )}

          <Field label="Deskripsi Detail (Halaman Detail)">
            <textarea className={inputCls} rows={4} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Penjelasan lengkap tentang project..." />
          </Field>

          <Field label="Kontribusi Anda (Tulis baris per baris)">
            <textarea className={inputCls} rows={4} value={form.contributions} onChange={e => setForm(f => ({ ...f, contributions: e.target.value }))} placeholder="Membuat UI layout&#10;Inisialisasi API integration" />
          </Field>

          {/* Dynamic Gallery Image Upload for Web App and Photography */}
          {(form.category === "webapp" || form.category === "photography") && (
            <Field label={form.category === "webapp" ? "Upload Gambar Galeri Pendukung (Screenshots)" : "Upload Foto Album (Bisa pilih banyak file sekaligus)"}>
              <div className="flex flex-col gap-2.5">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className={inputCls}
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      setUploading(true);
                      const urls: string[] = [];
                      try {
                        for (let i = 0; i < files.length; i++) {
                          const url = await uploadFile(files[i]);
                          urls.push(url);
                        }
                        setForm(f => ({
                          ...f,
                          gallery: [...(f.gallery || []), ...urls]
                        }));
                      } catch (err: any) {
                        alert(err.message || "Upload gagal");
                      } finally {
                        setUploading(false);
                      }
                    }
                  }}
                />
                {uploading && <span className="text-red-400 text-xs animate-pulse">Mengunggah file galeri...</span>}
                {form.gallery && form.gallery.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-1">
                    {form.gallery.map((url, i) => (
                      <div key={i} className="relative aspect-video rounded-lg overflow-hidden group border border-white/5 bg-white/5">
                        <img src={url} alt="Gallery thumb" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setForm(f => ({
                              ...f,
                              gallery: (f.gallery || []).filter((_, idx) => idx !== i)
                            }));
                          }}
                          className="absolute inset-0 bg-red-650/90 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-semibold transition-opacity duration-200"
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Field>
          )}
          <Field label="Urutan (order)">
            <input type="number" className={inputCls} value={form.order} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))} min={1} />
          </Field>
        </Modal>
      )}

      {deleteTarget && (
        <DeleteConfirm name={deleteTarget.title} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CERTIFICATES TAB
// ══════════════════════════════════════════════════════════════════════════════
function CertificatesTab() {
  const [items, setItems] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Certificate | null>(null);
  const [form, setForm] = useState<Omit<Certificate, "id">>({
    title: "", issuer: "", date: "", desc: "", img: "", credentialUrl: "", order: 1,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const snap = await getDocs(query(collection(db, "certificates"), orderBy("order")));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as Certificate)));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setForm({ title: "", issuer: "", date: "", desc: "", img: "", credentialUrl: "", order: items.length + 1 });
    setEditId(null);
    setModal("add");
  };

  const openEdit = (item: Certificate) => {
    setForm({ title: item.title, issuer: item.issuer, date: item.date, desc: item.desc, img: item.img, credentialUrl: item.credentialUrl, order: item.order });
    setEditId(item.id);
    setModal("edit");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal === "add") await addDoc(collection(db, "certificates"), form);
      else if (editId) await updateDoc(doc(db, "certificates", editId), form);
      setModal(null);
      load();
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteDoc(doc(db, "certificates", deleteTarget.id));
    setDeleteTarget(null);
    load();
  };

  return (
    <div>
      <SectionHeader title="Certificates" count={items.length} onAdd={openAdd} />
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-white/3 animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <img src={item.img} alt={item.title} className="w-16 h-12 object-cover rounded-lg shrink-0 bg-white/5" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{item.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{item.issuer} · {item.date}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <ActionBtn variant="edit" onClick={() => openEdit(item)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                  Edit
                </ActionBtn>
                <ActionBtn variant="delete" onClick={() => setDeleteTarget(item)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  Hapus
                </ActionBtn>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === "add" ? "Tambah Sertifikat" : "Edit Sertifikat"} onClose={() => setModal(null)} onSubmit={handleSubmit} loading={saving}>
          <Field label="Judul Sertifikat">
            <input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Nama sertifikat..." />
          </Field>
          <Field label="Issuer / Penerbit">
            <input className={inputCls} value={form.issuer} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))} required placeholder="Nama organisasi / platform..." />
          </Field>
          <Field label="Tanggal">
            <input className={inputCls} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="2024 atau Jan 2025" />
          </Field>
          <Field label="Deskripsi">
            <textarea className={inputCls} rows={3} value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Ceritakan bagaimana kamu mendapatkan sertifikat ini..." />
          </Field>
          <Field label="Upload Gambar Sertifikat (Local)">
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                className={inputCls}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploading(true);
                    try {
                      const url = await uploadFile(file);
                      setForm(f => ({ ...f, img: url }));
                    } catch (err: any) {
                      alert(err.message || "Upload gagal");
                    } finally {
                      setUploading(false);
                    }
                  }
                }}
              />
              {uploading && <span className="text-red-400 text-xs animate-pulse">Mengunggah file...</span>}
              {form.img && (
                <div className="flex items-center gap-3 p-2.5 rounded-xl border border-white/5 bg-white/[0.01]">
                  <img src={form.img} alt="Preview" className="w-12 h-10 object-cover rounded-lg bg-white/5" />
                  <span className="text-white/60 text-xs truncate flex-1">{form.img}</span>
                </div>
              )}
            </div>
          </Field>
          <Field label="URL Credential (link verifikasi)">
            <input className={inputCls} value={form.credentialUrl} onChange={e => setForm(f => ({ ...f, credentialUrl: e.target.value }))} placeholder="/assets/certificates/nama.webp atau https://..." />
          </Field>
          <Field label="Urutan (order)">
            <input type="number" className={inputCls} value={form.order} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))} min={1} />
          </Field>
        </Modal>
      )}

      {deleteTarget && (
        <DeleteConfirm name={deleteTarget.title} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TECH STACK TAB
// ══════════════════════════════════════════════════════════════════════════════
function TechStackTab() {
  const [items, setItems] = useState<TechCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TechCategory | null>(null);
  const [form, setForm] = useState<Omit<TechCategory, "id">>({ category: "", skills: [], order: 1 });
  const [skillsInput, setSkillsInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const snap = await getDocs(query(collection(db, "techStack"), orderBy("order")));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as TechCategory)));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setForm({ category: "", skills: [], order: items.length + 1 });
    setSkillsInput("");
    setEditId(null);
    setModal("add");
  };

  const openEdit = (item: TechCategory) => {
    setForm({ category: item.category, skills: item.skills, order: item.order });
    setSkillsInput(item.skills.join(", "));
    setEditId(item.id);
    setModal("edit");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = { ...form, skills: skillsInput.split(",").map(s => s.trim()).filter(Boolean) };
    try {
      if (modal === "add") await addDoc(collection(db, "techStack"), data);
      else if (editId) await updateDoc(doc(db, "techStack", editId), data);
      setModal(null);
      load();
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteDoc(doc(db, "techStack", deleteTarget.id));
    setDeleteTarget(null);
    load();
  };

  return (
    <div>
      <SectionHeader title="Tech Stack" count={items.length} onAdd={openAdd} />
      {loading ? (
        <div className="space-y-3">
          {[1,2].map(i => <div key={i} className="h-20 rounded-xl bg-white/3 animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-red-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{item.category}</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {item.skills.map(s => <Badge key={s}>{s}</Badge>)}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <ActionBtn variant="edit" onClick={() => openEdit(item)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                  Edit
                </ActionBtn>
                <ActionBtn variant="delete" onClick={() => setDeleteTarget(item)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  Hapus
                </ActionBtn>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === "add" ? "Tambah Tech Category" : "Edit Tech Category"} onClose={() => setModal(null)} onSubmit={handleSubmit} loading={saving}>
          <Field label="Nama Kategori">
            <input className={inputCls} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required placeholder="Frontend / Backend / Tools..." />
          </Field>
          <Field label="Skills (pisah dengan koma)">
            <textarea className={inputCls} rows={3} value={skillsInput} onChange={e => setSkillsInput(e.target.value)} placeholder="React, Next.js, TypeScript, Tailwind CSS" />
          </Field>
          <Field label="Urutan (order)">
            <input type="number" className={inputCls} value={form.order} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))} min={1} />
          </Field>
        </Modal>
      )}

      {deleteTarget && (
        <DeleteConfirm name={deleteTarget.category} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN ADMIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>("projects");

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    {
      key: "projects",
      label: "Projects",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
    },
    {
      key: "certificates",
      label: "Certificates",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
        </svg>
      ),
    },
    {
      key: "tech",
      label: "Tech Stack",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Tab Nav */}
      <div className="flex gap-2 mb-8 border-b border-white/5 pb-4">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              tab === t.key
                ? "bg-red-500/10 border border-red-500/20 text-red-400"
                : "text-white/40 hover:text-white/70 border border-transparent"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "projects" && <ProjectsTab />}
      {tab === "certificates" && <CertificatesTab />}
      {tab === "tech" && <TechStackTab />}
    </div>
  );
}
