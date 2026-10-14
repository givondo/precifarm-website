/**
 * Extract a hero video poster frame (16:9) for the homepage wallpaper.
 * Requires: npm install --no-save ffmpeg-static
 *
 * HERO_POSTER_SEC=42   — default: Pulse home-charger frame (0:42 in v2 master)
 * HERO_POSTER_END=1    — last frame (~1:40 on v2 master); ignored if HERO_POSTER_SEC is set
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

const defaultSrc = "C:\\Users\\DAVID\\Desktop\\Precifarm Designs\\Precifarm_Ad_v2_MASTER.mp4";
const src = process.env.HERO_VIDEO ?? defaultSrc;
const outDir = path.join(root, "public", "images");
const outJpg = path.join(outDir, "home-hero-video-wallpaper.jpg");

if (!fs.existsSync(src)) {
  console.error(`Video not found: ${src}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

/** Subtle grade for web hero */
const vf = "scale=1920:-2,eq=brightness=-0.04:contrast=1.08:saturation=1.06,unsharp=5:5:0.4:5:5:0.0";

const posterSec = process.env.HERO_POSTER_SEC;
const useEnd =
  !posterSec &&
  (process.env.HERO_POSTER_END === "1" ||
    posterSec === "last" ||
    posterSec === "end");

const atSec = posterSec && posterSec !== "last" && posterSec !== "end" ? posterSec : "42";

const inputArgs = useEnd ? ["-sseof", "-0.5", "-i", src] : ["-ss", atSec, "-i", src];

console.log("Extracting poster from", src, useEnd ? "(last frame)" : `at ${atSec}s`);
execFileSync(
  ffmpegPath,
  [
    ...inputArgs,
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
