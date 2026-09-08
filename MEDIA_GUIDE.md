# Adding Films & Photos

The `films` and `photos` collections sit alongside the technical blog. Media is hosted outside GitHub Pages, ideally on Cloudflare R2 behind `media.hexadecilab.com`.

## Video quality policy

Films intentionally have two public playback files:

- **Web HQ** — the default. A high-quality 1440p/4K web encode that is reasonable to stream.
- **Original 4K** — optional HEVC camera-quality file (for example a DJI Action 6 master around 50 Mb/s). It is never preloaded. The visitor must explicitly opt in after a data-usage warning.

At 50 Mb/s the original consumes roughly **375 MB/minute**, so do not use it as the default `<video>` source.

The private archival master can live in a separate non-public R2 bucket. `videoOriginalUrl` may point at a public remux/copy of the same HEVC bitstream (`-c copy`) if you want visitors to have access to the camera-quality version.

## Adding a film

Create `src/content/films/my-film.mdx`:

```md
---
title: "Alps Roadtrip"
description: "A few days on the road through mountain passes."
date: 2026-08-15
location: "Alps, FR · IT · CH"
duration: "06:24"
gear: "DJI Osmo Action 6"
tags:
  - Roadtrip
  - Mountains
cover: "https://media.hexadecilab.com/videos/alps-roadtrip/poster.jpg"

# Loaded by default. Keep this high quality, but reasonable for normal streaming.
videoWebUrl: "https://media.hexadecilab.com/videos/alps-roadtrip/fallback-1440p.mp4"

# Optional. This URL is not requested until the visitor confirms the warning.
videoOriginalUrl: "https://media.hexadecilab.com/videos/alps-roadtrip/master-hevc.mp4"
originalBitrateMbps: 50
originalCodec: "HEVC / H.265"

videoFormat: landscape
featured: true
draft: false
---

Optional write-up / behind-the-scenes notes go here.
```

`videoUrl` is still accepted for old entries and behaves like `videoWebUrl`, so existing content does not have to be migrated immediately.

### Recommended R2 layout

```text
hexadecilab-media/
└── videos/
    └── alps-roadtrip/
        ├── fallback-1440p.mp4   # default Web HQ
        ├── master-hevc.mp4      # public original, optional
        ├── poster.jpg
        └── metadata.json

hexadecilab-originals/           # private bucket, optional
└── videos/
    └── alps-roadtrip/
        └── master.mp4           # immutable archive
```

The player preserves the current playback position when switching quality. If the browser cannot decode the HEVC original, it automatically returns to Web HQ.

## Adding a photo

Create `src/content/photos/my-photo.mdx`:

```md
---
title: "Rising for air"
description: "A freediver ascending toward the surface."
date: 2026-08-02
location: "Mediterranean Sea"
tags:
  - Freediving
  - Underwater
image: "https://media.hexadecilab.com/photos/my-photo.avif"
featured: true
draft: false
---
```

Local images can still be placed under `src/content/images/` and handled by `astro:assets`. For externally prepared AVIF/JPEG assets, point `image` directly at R2.

## Media hosting workflow

1. Export the final cut locally.
2. Keep the immutable original privately if desired.
3. Generate a Web HQ version (for difficult underwater/action footage, a quality-targeted encode such as x264 CRF 16 is a good starting point rather than a very low fixed bitrate).
4. Produce a web-friendly HEVC remux/copy for the optional original (`-c:v copy`, normally with `hvc1` and `faststart`) without re-encoding the video stream.
5. Generate a poster image.
6. Upload the public derivatives to `hexadecilab-media` and reference them in the film frontmatter.

The Astro site never transcodes video. It only selects which R2 object the browser should play.

## Large photos: lightweight gallery previews

Remote photos are served by R2 as-is, so a 25 MB PNG used directly in a gallery card would cost 25 MB before the visitor even opens it. Photo entries now support an optional `thumbnail` field:

```yaml
image: "https://media.b33low.com/photos/Remontee.png"
thumbnail: "https://media.b33low.com/photos/previews/Remontee.webp"
```

`thumbnail` is used by the Photography grids/homepage. `image` remains the full-resolution source used when the visitor opens the lightbox or photo page. Existing entries without `thumbnail` keep working and fall back to `image`.

A small helper script publishes both versions through the existing Ant Media utility container:

```bash
./scripts/publish-photo.sh ~/Pictures/Remontee.png
```

It keeps the original unchanged and generates a max-1600px WebP preview at quality 82 before uploading both files to R2.
