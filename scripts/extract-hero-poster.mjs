/**
 * Extract a hero video poster frame (16:9) for the homepage wallpaper.
 * Requires: npm install --no-save ffmpeg-static
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

let ffmpegPath;
try {
  ffmpegPath = (await import("ffmpeg-static")).default;
} catch {
  console.error("Install ffmpeg-static: npm install --no-save ffmpeg-static");
  process.exit(1);
}

const defaultSrc = "C:\\Users\\DAVID\\Desktop\\Precifarm Designs\\Precifarm_Ad_1080p_MASTER.mp4";
const src = process.env.HERO_VIDEO ?? defaultSrc;
const outDir = path.join(root, "public", "images");
const outJpg = path.join(outDir, "home-hero-video-wallpaper.jpg");

if (!fs.existsSync(src)) {
  console.error(`Video not found: ${src}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

/** Pick a frame after the opening beat; subtle grade for web hero */
const vf = "scale=1920:-2,eq=brightness=-0.04:contrast=1.08:saturation=1.06,unsharp=5:5:0.4:5:5:0.0";

console.log("Extracting poster from", src);
execFileSync(
  ffmpegPath,
  [
    "-ss",
    process.env.HERO_POSTER_SEC ?? "74",
    "-i",
    src,
    "-vframes",
    "1",
    "-update",
    "1",
    "-vf",
    vf,
    "-q:v",
    "2",
    "-y",
    outJpg,
  ],
  { stdio: "inherit" },
);

console.log("Wrote", outJpg);
