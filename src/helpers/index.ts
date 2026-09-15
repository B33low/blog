import { getCollection } from "astro:content";
import { CollectionType } from "../types";

export const posts = (await getCollection(CollectionType.Blog, ({ data }:any) => {
  // don't return draft posts
  return data.draft !== true;
})).sort((a:any, b:any) =>
  new Date(a.data.date).valueOf() > new Date(b.data.date).valueOf() ? -1 : 1,
);

export const getPostsByLang = (lang?: string) => {
  if (!lang) return posts
  return posts.filter((post:any) => post.slug.startsWith(lang));
};

// Given a post's slug (e.g. "en/are-cnn-dead") and a target language, finds
// the slug of that same article's translation via the shared `translationId`
// frontmatter field. Returns null if this post has no linked translation yet
// (e.g. one language is missing that article), so callers can fall back to
// the journal index instead of a dead link.
export const getTranslatedPostSlug = (currentSlug: string, targetLang: string): string | null => {
  const current = posts.find((post: any) => post.slug === currentSlug);
  const translationId = current?.data?.translationId;
  if (!translationId) return null;
  const match = posts.find(
    (post: any) => post.data.translationId === translationId && post.slug.startsWith(`${targetLang}/`),
  );
  return match ? match.slug.slice(targetLang.length + 1) : null;
};

export const tags = Array.from(
  new Set(
    posts
      .map((post:any) => {
        if (post.data.tags && post.data.tags.length) {
          return post.data.tags;
        }
        return [];
      })
      .flat(),
  ),
).sort();

export const years = Array.from(new Set(posts.map((post:any) => new Date(post.data.date).getFullYear().toString()))).sort();

// Films and photos are not localized per-language (media speaks for itself),
// so unlike blog posts these collections live flat, outside /en /fr folders.
export const films = (await getCollection(CollectionType.Films, ({ data }:any) => {
  return data.draft !== true;
})).sort((a:any, b:any) =>
  new Date(a.data.date).valueOf() > new Date(b.data.date).valueOf() ? -1 : 1,
);

export const filmTags = Array.from(
  new Set(
    films
      .map((film:any) => (film.data.tags && film.data.tags.length ? film.data.tags : []))
      .flat(),
  ),
).sort();

export const photos = (await getCollection(CollectionType.Photos, ({ data }:any) => {
  return data.draft !== true;
})).sort((a:any, b:any) =>
  new Date(a.data.date).valueOf() > new Date(b.data.date).valueOf() ? -1 : 1,
);

export const photoTags = Array.from(
  new Set(
    photos
      .map((photo:any) => (photo.data.tags && photo.data.tags.length ? photo.data.tags : []))
      .flat(),
  ),
).sort();
