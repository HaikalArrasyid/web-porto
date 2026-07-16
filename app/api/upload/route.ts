import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    let buffer = Buffer.from(bytes);

    // Save directory: public/assets
    const uploadDir = path.join(process.cwd(), "public", "assets");
    
    // Ensure directories exist
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // already exists
    }

    const originalExt = path.extname(file.name).toLowerCase();
    const isImage = [".png", ".jpg", ".jpeg", ".webp", ".tiff", ".gif"].includes(originalExt);

    let finalFileName = "";
    const baseName = path.basename(file.name, originalExt).replace(/[^a-zA-Z0-9]/g, "_");

    if (isImage) {
      // Convert to webp with sharp and resize to max 1600px width for optimization
      try {
        buffer = await sharp(buffer)
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
        
        finalFileName = `${baseName}_${Date.now()}.webp`;
      } catch (err) {
        console.error("Sharp image conversion failed, saving original:", err);
        finalFileName = `${baseName}_${Date.now()}${originalExt}`;
      }
    } else {
      finalFileName = `${baseName}_${Date.now()}${originalExt}`;
    }

    const filePath = path.join(uploadDir, finalFileName);

    // Write file to assets
    await writeFile(filePath, buffer);

    const publicUrl = `/assets/${finalFileName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
