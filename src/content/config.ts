import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      draft: z.boolean().optional(),
      hideOnHomePage: z.boolean().optional(),
      date: z
        .string()
        .or(z.date())
        .transform((val) =>
          new Date(val).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        ),
      tags: z.array(z.string()).optional(),
      // image or image url
      cover: image().or(z.string()),
    }),
});

// in case we want to change the schema of the projects, we can do it here
const projects = blog;

const films = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      draft: z.boolean().optional(),
      hideOnHomePage: z.boolean().optional(),
      featured: z.boolean().optional(),

      date: z
        .string()
        .or(z.date())
        .transform((val) =>
          new Date(val).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        ),

      tags: z.array(z.string()).optional(),

      cover: image().or(z.string()),

      // Legacy single-file field. Keep it for existing entries; new films should use videoWebUrl.
      videoUrl: z.string().optional(),

      // Default stream-friendly encode. This is the only file loaded automatically.
      videoWebUrl: z.string().optional(),

      // Optional camera-quality HEVC master. Never preloaded: visitors must explicitly opt in.
      videoOriginalUrl: z.string().optional(),
      originalBitrateMbps: z.number().positive().optional(),
      originalCodec: z.string().optional(),

      // Format d'affichage de la vidéo
      videoFormat: z.enum(["auto", "landscape", "portrait", "square"]).default("landscape"),

      duration: z.string().optional(),
      location: z.string().optional(),
      gear: z.string().optional(),
    }).superRefine((data, ctx) => {
      if (!data.videoWebUrl && !data.videoUrl) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["videoWebUrl"],
          message: "A film needs videoWebUrl (or the legacy videoUrl field).",
        });
      }
    }),
});

const photos = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      draft: z.boolean().optional(),
      hideOnHomePage: z.boolean().optional(),
      featured: z.boolean().optional(),
      date: z
        .string()
        .or(z.date())
        .transform((val) =>
          new Date(val).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        ),
      tags: z.array(z.string()).optional(),
      // Full-resolution image. Remote R2 URLs are served as-is and are only loaded
      // when the visitor explicitly opens the photo/detail page.
      image: image().or(z.string()),

      // Optional lightweight preview used by gallery cards/homepage. For large R2
      // originals, point this at a pre-generated WebP/AVIF thumbnail.
      thumbnail: image().or(z.string()).optional(),

      location: z.string().optional(),
    }),
});

export const collections = { blog, projects, films, photos };
