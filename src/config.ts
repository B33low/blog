export const SITE_FAVICON = "/bee_logo_dark_transparent.webp";
export const SITE_LOGO = "/bee_logo_dark_transparent.webp";
export const SITE_TITLE = "Thomas BOLTEAU";
export const SITE_URL = "https://hexadecilab.com";
export const SITE_DESCRIPTION = "Projects, adventures, photography and films by Thomas Bolteau.";
export const ME_AVATAR = "/bee_logo_dark_transparent.webp";
export const LANGUAGES = ["en", "fr"];
export const DEFAULT_LANGUAGE = "en";
interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  image: string;
  externalLink: string;
  details: string[];
}

interface WorkExperienceEntry {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
}

export const MENUS = [
  {
    title: "Videos",
    link: "/films",
    target: "_self",
  },
  {
    title: "Photography",
    link: "/photography",
    target: "_self",
  },
  {
    title: "Journal",
    link: "/en/posts",
    target: "_self",
  },
  {
    title: "About Me",
    link: "/me",
    target: "_self",
  },
  {
    title: "Github",
    link: "https://github.com/B33low",
    target: "_blank",
    icon: "github",
  },
];

// Base URL for the R2 (or any S3-compatible) bucket serving public media.
// Point this at your custom domain in front of the bucket, e.g.
// "https://media.hexadecilab.com". Film entries normally use `videoWebUrl`
// (default playback) plus an optional `videoOriginalUrl` (explicit opt-in only).
// Set PUBLIC_MEDIA_BASE_URL in your .env to override for local/staging use.
export const MEDIA_BASE_URL = import.meta.env.PUBLIC_MEDIA_BASE_URL || "https://media.hexadecilab.com";

export const HERO = {
  eyebrow: "Adventures, experiments & things I build",
  title: "Chasing water, wind and light",
  subtitle:
    "A collection of things I enjoy doing — from water sports and outdoor adventures to photography, engineering projects and whatever I decide to try next.",
  image: "/hero-freedive.webp",
  ctaLabel: "Explore the latest film",
};
export const FOOTER_CONTENT = "Thomas Bolteau. All rights reserved.";

export const CONTACTS = {
  linkedIn: "https://www.linkedin.com/in/thomas-bolteau",
  github: "https://github.com/B33low",
  email: "mailto:thomas.bolteau50@gmail.com",
  linkoftrust: "https://mainnet.linkoftrust.org/explore?user=HyzNSD8EyQKPr85H7j8mLSs27gsDm9AXpyo47HRD8rq8",
};

export const SLOGAN = "Engineer, Tinkerer, Explorer";

export const ME_DESCRIPTION = `Hi, I'm Thomas, a French engineer who enjoys building things, learning new skills, and experimenting with whatever catches my interest.

My background is in electrical engineering, embedded systems and software development. I enjoy understanding how things work and turning ideas into something tangible — whether that involves software, electronics, hardware, drones, robotics, or some random project I decided to explore.

Outside of engineering, I'm usually picking up a new hobby. I enjoy crochet and knitting, and more recently I've been discovering water sports, freediving and spending more time outdoors. I like trying new things, exploring new places, filming the experiences along the way, and occasionally figuring out the technical side of doing it better.

Hexadecilab is my little corner of the internet for all of that: projects, experiments, trips, photos, videos, notes, and whatever else I'm currently curious about.`;

export const WORK_EXPERIENCE: WorkExperienceEntry[] = [
  //   {
  //     company: "ENGIE GEMS",
  //     position: "VIE - Software Engineer",
  //     startDate: "2023",
  //     endDate: "2025",
  //   },
  //   {
  //     company: "NxP Semiconductors",
  //     position: "DevOps Intern",
  //     startDate: "2021",
  //     endDate: "2021",
  //   },
  //   {
  //     company: "Université Catholique de Louvain",
  //     position: "MASTER - Electrical Engineering",
  //     startDate: "2021",
  //     endDate: "2023",
  //   },
  //   {
  //     company: "Centrale Nantes",
  //     position: "ENGINEER DEGREE/MASTER - Embedded Systems Engineering",
  //     startDate: "2019",
  //     endDate: "2023",
  //   },
  //   {
  //     company: "CPGE Lycée Clemenceau",
  //     position: "PSI - Preparatory Classes - 296th/3200+ Concours Centrale-Supélec",
  //     startDate: "2017",
  //     endDate: "2019",
  //   },
];

export const PROJECTS: ProjectEntry[] = [
  // {
  //   id: "my-first-rocket-launch",
  //   title: "My First Rocket Launch",
  //   description: "This is the first rocket launch I participated in. I was a member of the Interstellar Academy Program, and I was responsible for the rocket's navigation system. I was able to successfully navigate the rocket to the target destination.",
  //   image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   externalLink: "https://www.nasa.gov/",
  //   details: [
  //     "Explaining space exploration concepts through creative illustrations.",
  //     "Making it easier for aspiring explorers to understand the basics of interstellar travel.",
  //     "Won an award in the interstellar creativity competition.",
  //   ],
  // },
];

export const GOOGLE_GTAG = "";
