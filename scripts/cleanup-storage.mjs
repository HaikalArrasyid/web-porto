/**
 * Firebase Storage Cleanup Script
 * Menghapus file duplikat & file besar dari Firebase Storage untuk bebaskan quota.
 *
 * Jalankan dengan:
 *   node scripts/cleanup-storage.mjs
 *   node scripts/cleanup-storage.mjs --dry-run   (hanya lihat, tidak hapus)
 *   node scripts/cleanup-storage.mjs --delete-videos  (hapus video juga)
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDryRun = process.argv.includes("--dry-run");
const deleteVideos = process.argv.includes("--delete-videos");

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const STORAGE_BUCKET = "management-web-porto.firebasestorage.app";
const SERVICE_ACCOUNT_PATH = join(__dirname, "serviceAccountKey.json");

// ─────────────────────────────────────────────────────────────────────────────

let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, "utf8"));
} catch {
  console.error(`
❌ File serviceAccountKey.json tidak ditemukan di scripts/!

Cara mendapatkan service account key:
1. Buka https://console.firebase.google.com/
2. Project Settings → Service accounts
3. Klik "Generate new private key"
4. Simpan file JSON sebagai: scripts/serviceAccountKey.json

⚠️  JANGAN commit file ini ke git! (sudah ada di .gitignore)
`);
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: STORAGE_BUCKET,
});
const bucket = getStorage().bucket();

async function main() {
  console.log(`\n🔍 Memindai Firebase Storage bucket: ${STORAGE_BUCKET}`);
  console.log(
    isDryRun
      ? "🟡 MODE: DRY RUN (tidak ada yang dihapus)\n"
      : "🔴 MODE: DELETE\n",
  );

  const [files] = await bucket.getFiles({ prefix: "assets/" });
  console.log(`📦 Total file ditemukan: ${files.length}`);

  // Hitung total size
  let totalBytes = 0;
  const fileMap = new Map(); // baseKey -> array of {name, size, updated}

  for (const file of files) {
    const meta = file.metadata;
    const size = parseInt(meta.size || "0");
    totalBytes += size;

    const name = file.name; // e.g. "assets/DSC02913_1784190942239.webp"
    const ext = name.split(".").pop();
    const isVideo = ["mp4", "mov", "avi", "webm"].includes(ext.toLowerCase());

    // Extract base name without timestamp suffix (e.g. "DSC02913")
    const basename = name.replace(/^assets\//, "").replace(/\.[^.]+$/, "");
    const baseKey = basename.replace(/_\d{13}$/, ""); // remove trailing _timestamp

    if (!fileMap.has(baseKey)) fileMap.set(baseKey, []);
    fileMap.get(baseKey).push({ name, size, updated: meta.updated, isVideo });
  }

  console.log(`💾 Total ukuran: ${(totalBytes / 1024 / 1024).toFixed(1)} MB\n`);

  // Find duplicates (same base name, multiple files)
  const toDelete = [];

  for (const [baseKey, versions] of fileMap.entries()) {
    if (versions.length > 1) {
      // Sort by date descending — keep the newest, delete the rest
      versions.sort((a, b) => new Date(b.updated) - new Date(a.updated));
      const [keep, ...dups] = versions;
      console.log(
        `🔁 Duplikat ditemukan: "${baseKey}" (${versions.length} versi)`,
      );
      console.log(
        `   ✅ Keep: ${keep.name} (${(keep.size / 1024).toFixed(0)} KB)`,
      );
      for (const dup of dups) {
        console.log(
          `   🗑️  Delete: ${dup.name} (${(dup.size / 1024).toFixed(0)} KB)`,
        );
        toDelete.push(dup);
      }
    }
  }

  // Find large videos
  if (deleteVideos) {
    for (const versions of fileMap.values()) {
      for (const f of versions) {
        if (f.isVideo && !toDelete.find((d) => d.name === f.name)) {
          console.log(
            `🎬 Video besar: ${f.name} (${(f.size / 1024 / 1024).toFixed(1)} MB)`,
          );
          toDelete.push(f);
        }
      }
    }
  }

  // Summary
  const deleteBytes = toDelete.reduce((sum, f) => sum + f.size, 0);
  console.log(`\n📊 Ringkasan:`);
  console.log(`   File yang akan dihapus: ${toDelete.length}`);
  console.log(
    `   Space yang dibebaskan: ${(deleteBytes / 1024 / 1024).toFixed(1)} MB`,
  );
  console.log(
    `   Perkiraan sisa: ${((totalBytes - deleteBytes) / 1024 / 1024).toFixed(1)} MB`,
  );

  if (toDelete.length === 0) {
    console.log("\n✅ Tidak ada file yang perlu dihapus!");
    return;
  }

  if (isDryRun) {
    console.log(
      "\n🟡 Dry run selesai. Jalankan tanpa --dry-run untuk menghapus.",
    );
    return;
  }

  // Confirm
  console.log("\n⚠️  Menghapus file...");
  let deleted = 0;
  for (const f of toDelete) {
    try {
      await bucket.file(f.name).delete();
      console.log(`   ✅ Deleted: ${f.name}`);
      deleted++;
    } catch (err) {
      console.error(`   ❌ Gagal hapus ${f.name}: ${err.message}`);
    }
  }

  console.log(
    `\n🎉 Selesai! ${deleted} file dihapus, ~${(deleteBytes / 1024 / 1024).toFixed(1)} MB dibebaskan.`,
  );
}

main().catch(console.error);
