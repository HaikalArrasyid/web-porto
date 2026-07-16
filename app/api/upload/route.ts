import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save directory: public/assets
    const uploadDir = path.join(process.cwd(), "public", "assets");
    
    // Ensure directories exist
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // already exists or permission issue handled by try-catch
    }

    // Clean filename: remove spaces and special characters
    const ext = path.extname(file.name);
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9]/g, "_");
    const uniqueFileName = `${baseName}_${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    // Write file to assets
    await writeFile(filePath, buffer);

    const publicUrl = `/assets/${uniqueFileName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
