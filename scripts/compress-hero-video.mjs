/**
 * Compress hero ad for web (1080p) and mobile (720p). Requires ffmpeg-static.
 * Usage: node scripts/compress-hero-video.mjs
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "videos");

const defaultSrc = "C:\\Users\\DAVID\\Desktop\\Precifarm Designs\\Precifarm_Ad_v2_MASTER.mp4";
const src = process.env.HERO_VIDEO ?? defaultSrc;

let ffmpegPath;
try {
  ffmpegPath = (await import("ffmpeg-static")).default;
} catch {
  console.error("Install ffmpeg-static: npm install --no-save ffmpeg-static");
  process.exit(1);
}

if (!fs.existsSync(src)) {
  console.error(`Video not found: ${src}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const webOut = path.join(outDir, "precifarm-ad-v2-web.mp4");
const mobileOut = path.join(outDir, "precifarm-ad-v2-mobile.mp4");

/** H.264 + AAC, faststart for progressive download; CRF tuned for quality vs size */
const webArgs = [
  "-i",
  src,
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "23",
  "-profile:v",
  "high",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  "-c:a",
  "aac",
  "-b:a",
  "128k",
  "-ar",
  "48000",
  "-y",
  webOut,
];

const mobileArgs = [
  "-i",
  src,
  "-vf",
  "scale=-2:720",
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "24",
  "-profile:v",
  "main",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  "-c:a",
  "aac",
  "-b:a",
  "96k",
  "-ar",
  "48000",
  "-y",
  mobileOut,
];

function sizeMb(file) {
  return (fs.statSync(file).size / (1024 * 1024)).toFixed(1);
}

console.log("Encoding web (1080p CRF 23)...", webOut);
execFileSync(ffmpegPath, webArgs, { stdio: "inherit" });
console.log(`Web: ${sizeMb(webOut)} MiB`);

console.log("Encoding mobile (720p CRF 24)...", mobileOut);
execFileSync(ffmpegPath, mobileArgs, { stdio: "inherit" });
console.log(`Mobile: ${sizeMb(mobileOut)} MiB`);

console.log("Done.");
