

export const SITE_FAVICON = "/bee_logo_dark_transparent.webp";
export const SITE_LOGO = "/bee_logo_dark_transparent.webpp";
export const SITE_TITLE = "Thomas BOLTEAU";
export const SITE_URL = "https://hexadecilab.com";
export const SITE_DESCRIPTION =
  `
  Personal website of Thomas Bolteau.
`;
export const ME_AVATAR = "/bee_logo_dark_transparent.webp";
export const LANGUAGES = ['en', 'fr'];
export const DEFAULT_LANGUAGE = 'en';
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
    title: "About Me",
    link: "/me",
    target: "_self",
  },
  {
    title: "Posts",
    link: "/en/posts",
    target: "_self",
  },
  {
    title: "Github",
    link: "https://github.com/B33low",
    target: "_blank",
    icon: "github",
  },
];

export const FOOTER_CONTENT = "Thomas Bolteau. All rights reserved.";

export const CONTACTS = {
  linkedIn: "https://www.linkedin.com/in/thomas-bolteau",
  github: "https://github.com/B33low",
  email: "mailto:thomas.bolteau50@gmail.com",
  linkoftrust: "https://mainnet.linkoftrust.org/explore?user=HyzNSD8EyQKPr85H7j8mLSs27gsDm9AXpyo47HRD8rq8",
};

export const SLOGAN = "Tinkerer, Engineer, Developer";
export const ME_DESCRIPTION =
  `Hi, I'm Thomas a french passionate engineer. I have always been passionate about learning new things and solving problems. Within my academical journey I specialized in electrical engineering and software development. I am currently working as a software engineer at ENGIE GEMS.\n
  To challenge myself I chose to start my career in a foreign country, Italy. This gave me the opportunity to learn a new language and discover a new culture. Outside of work, I enjoy giving my time to teach other freely my mother tongue, French and my other hobby such as crochet and knitting.\n
  I am looking for opportunities to work on hardware/embedded systems projects, especially with my appetite for drones and robotics.`;



export const WORK_EXPERIENCE: WorkExperienceEntry[] = [
  {
    company: "ENGIE GEMS",
    position: "VIE - Software Engineer",
    startDate: "2023",
    endDate: "2025",
  },
  {
    company: "NxP Semiconductors",
    position: "DevOps Intern",
    startDate: "2021",
    endDate: "2021",
  },
  
  {
    company: "Université Catholique de Louvain",
    position: "MASTER - Electrical Engineering",
    startDate: "2021",
    endDate: "2023",
  },
  
  {
    company: "Centrale Nantes",
    position: "ENGINEER DEGREE/MASTER - Embedded Systems Engineering",
    startDate: "2019",
    endDate: "2023",
  },
  {
    company: "CPGE Lycée Clemenceau",
    position: "PSI - Preparatory Classes - 296th/3200+ Concours Centrale-Supélec",
    startDate: "2017",
    endDate: "2019",
  },
  
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