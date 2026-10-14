import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDownloadableUrl(url: string): string {
  if (!url) return "";
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    if (!url.includes("/fl_attachment/")) {
      return url.replace("/upload/", "/upload/fl_attachment/");
    }
  }
  return url;
}
