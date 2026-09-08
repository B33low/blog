#!/usr/bin/env node
/**
 * Upload full-quality films/photos to a Cloudflare R2 bucket (S3-compatible).
 *
 * Usage:
 *   pnpm upload:media <file-or-directory> --prefix films
 *   pnpm upload:media ./exports/kitesurf-01.mp4 --prefix films
 *   pnpm upload:media ./exports/dolomites --prefix photos
 *
 * Required env vars (put these in a local, gitignored .env — see .env.example):
 *   R2_ACCOUNT_ID
 *   R2_ACCESS_KEY_ID
 *   R2_SECRET_ACCESS_KEY
 *   R2_BUCKET_NAME
 *   PUBLIC_MEDIA_BASE_URL   (the custom domain / dev URL in front of the bucket)
 *
 * Nothing here re-encodes or resizes files — whatever you point at gets uploaded
 * byte-for-byte, then the script prints the public URL to paste into the matching
 * `videoUrl:` / `image:` frontmatter field.
 */

import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream, statSync, readdirSync } from "node:fs";
import { join, relative, basename } from "node:path";
import { config as loadEnv } from "dotenv";
import mime from "mime-types";

loadEnv();

const REQUIRED_ENV = [
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET_NAME",
  "PUBLIC_MEDIA_BASE_URL",
];

function requireEnv() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(`Missing env vars: ${missing.join(", ")}`);
    console.error("Copy .env.example to .env and fill in your R2 credentials first.");
    process.exit(1);
  }
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const prefixIndex = args.indexOf("--prefix");
  const prefix = prefixIndex !== -1 ? args[prefixIndex + 1] : "";
  const inputPath = args.filter((a, i) => a !== "--prefix" && i !== prefixIndex + 1)[0];

  if (!inputPath) {
    console.error("Usage: pnpm upload:media <file-or-directory> [--prefix films|photos]");
    process.exit(1);
  }

  return { inputPath, prefix };
}

function collectFiles(inputPath) {
  const stat = statSync(inputPath);
  if (stat.isFile()) return [inputPath];

  const files = [];
  for (const entry of readdirSync(inputPath, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = join(inputPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function uploadFile(client, bucket, publicBaseUrl, filePath, keyPrefix, baseDir) {
  const relPath = relative(baseDir, filePath) || basename(filePath);
  const key = keyPrefix ? `${keyPrefix}/${relPath}` : relPath;
  const contentType = mime.lookup(filePath) || "application/octet-stream";
  const size = statSync(filePath).size;

  const upload = new Upload({
    client,
    params: {
      Bucket: bucket,
      Key: key,
      Body: createReadStream(filePath),
      ContentType: contentType,
    },
  });

  let lastPercent = -1;
  upload.on("httpUploadProgress", (progress) => {
    if (!progress.total) return;
    const percent = Math.round((progress.loaded / progress.total) * 100);
    if (percent !== lastPercent && percent % 10 === 0) {
      lastPercent = percent;
      process.stdout.write(`\r  ${key} — ${percent}%`);
    }
  });

  await upload.done();
  process.stdout.write(`\r  ${key} — done (${(size / 1024 / 1024).toFixed(1)} MB)\n`);

  return `${publicBaseUrl.replace(/\/$/, "")}/${key}`;
}

async function main() {
  requireEnv();
  const { inputPath, prefix } = parseArgs(process.argv);

  const client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  const bucket = process.env.R2_BUCKET_NAME;
  const publicBaseUrl = process.env.PUBLIC_MEDIA_BASE_URL;

  const stat = statSync(inputPath);
  const files = collectFiles(inputPath);
  const baseDir = stat.isDirectory() ? inputPath : join(inputPath, "..");

  if (files.length === 0) {
    console.error(`No files found at ${inputPath}`);
    process.exit(1);
  }

  console.log(`Uploading ${files.length} file(s) to r2://${bucket}${prefix ? `/${prefix}` : ""} ...\n`);

  const urls = [];
  for (const file of files) {
    const url = await uploadFile(client, bucket, publicBaseUrl, file, prefix, baseDir);
    urls.push(url);
  }

  console.log("\nDone. Paste these into your content frontmatter:\n");
  urls.forEach((url) => console.log(`  ${url}`));
}

main().catch((err) => {
  console.error("\nUpload failed:", err.message || err);
  process.exit(1);
});
