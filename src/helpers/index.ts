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
