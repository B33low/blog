import { DEFAULT_LANGUAGE, LANGUAGES } from "../config";

export type Lang = (typeof LANGUAGES)[number];

// All static chrome text lives here. Actual content (blog posts, photo/film
// captions, bio copy) stays in its own files — this is only for the UI
// wrapped around it (nav, homepage labels, footer, About page chrome).
export const UI = {
  en: {
    nav: {
      videos: "Videos",
      photography: "Photography",
      journal: "Journal",
      aboutMe: "About Me",
      github: "Github",
    },
    hero: {
      eyebrow: "Adventures, experiments & things I build",
      title: "Chasing water, wind and light",
      subtitle:
        "A collection of things I enjoy doing — from water sports and outdoor adventures to photography, engineering projects and whatever I decide to try next.",
      ctaLabel: "Explore the latest film",
    },
    home: {
      featured: "Featured",
      featuredFilm: "Featured Film",
      latestPhotography: "Latest Photography",
      latestJournal: "Latest Journal",
      viewAll: "View all",
      stillsFromSession: "Stills from the same session",
      watchVideo: "Watch the video",
    },
    footer: {
      rights: "Thomas Bolteau. All rights reserved.",
    },
    me: {
      title: "About Me",
      welcome: "Welcome to my website!",
      contacts: "Contacts",
      workExperience: "Work Experience",
      contactMe: "Contact Me",
    },
  },
  fr: {
    nav: {
      videos: "Vidéos",
      photography: "Photographie",
      journal: "Journal",
      aboutMe: "À propos",
      github: "Github",
    },
    hero: {
      eyebrow: "Aventures, expérimentations et projets en cours",
      title: "À la poursuite de l'eau, du vent et de la lumière",
      subtitle:
        "Un aperçu de ce que j'aime faire — des sports nautiques et de l'aventure en plein air à la photographie, en passant par des projets d'ingénierie et tout ce qui me passe par la tête.",
      ctaLabel: "Voir le dernier film",
    },
    home: {
      featured: "À la une",
      featuredFilm: "Film à la une",
      latestPhotography: "Dernières photos",
      latestJournal: "Derniers articles",
      viewAll: "Tout voir",
      stillsFromSession: "Photos de la même sortie",
      watchVideo: "Regarder la vidéo",
    },
    footer: {
      rights: "Thomas Bolteau. Tous droits réservés.",
    },
    me: {
      title: "À propos",
      welcome: "Bienvenue sur mon site !",
      contacts: "Contacts",
      workExperience: "Expérience professionnelle",
      contactMe: "Me contacter",
    },
  },
} as const;

export function resolveLang(lang?: string | null): Lang {
  return (LANGUAGES as readonly string[]).includes(lang ?? "") ? (lang as Lang) : (DEFAULT_LANGUAGE as Lang);
}

export function t(lang?: string | null) {
  return UI[resolveLang(lang)];
}

// Default language-switch target for pages that don't need anything smarter
// than "keep the same path, just swap the /en/ or /fr/ prefix" (journal index,
// About page, homepage). Pages whose content genuinely differs per language
// (individual blog posts) should compute their own altUrls instead.
export function swapLangPrefix(pathname: string, targetLang: Lang): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && (LANGUAGES as readonly string[]).includes(parts[0])) {
    parts[0] = targetLang;
    return "/" + parts.join("/");
  }
  // No language prefix on this route (e.g. /films, /photography) — the page
  // isn't localized, so there's nothing to switch; stay put.
  return pathname;
}

export function defaultAltUrls(pathname: string): Record<Lang, string> {
  return Object.fromEntries(LANGUAGES.map((l) => [l, swapLangPrefix(pathname, l as Lang)])) as Record<Lang, string>;
}

// Nav is language-aware: labels come from the dictionary above, and the two
// localized routes (Journal, About Me) point at the current language's
// prefix instead of always going to English.
export const getMenus = (lang?: string | null) => {
  const l = resolveLang(lang);
  const strings = UI[l].nav;
  return [
    { title: strings.videos, link: "/films", target: "_self" },
    { title: strings.photography, link: "/photography", target: "_self" },
    { title: strings.journal, link: `/${l}/posts`, target: "_self" },
    { title: strings.aboutMe, link: `/${l}/me`, target: "_self" },
    { title: strings.github, link: "https://github.com/B33low", target: "_blank", icon: "github" },
  ];
};
