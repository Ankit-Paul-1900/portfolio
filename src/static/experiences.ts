import {
  Code2,
  GraduationCap,
  Layers3,
  Server,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Experience = {
  id: string;
  date: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  Icon: LucideIcon;
  accent: string;
};

const experiences: Experience[] = [
  {
    id: "objectsol-developer",
    date: "May 2026 — Present",
    title: "Software Developer",
    company: "Objectsol Technologies Pvt. Ltd.",
    location: "Kolkata",
    description:
      "Building scalable backend solutions and high-performance REST APIs using Python and FastAPI.",
    tags: ["Python", "FastAPI", "REST APIs"],
    Icon: Server,
    accent: "#22d3ee",
  },
  {
    id: "objectsol-apprenticeship",
    date: "Mar 2025 — Apr 2026",
    title: "Graduate Apprentice",
    company: "Objectsol Technologies Pvt. Ltd.",
    location: "Kolkata",
    description:
      "Gained hands-on experience developing RESTful APIs with Python and FastAPI, contributing to database integration, testing, debugging, and performance optimization in collaborative development teams.",
    tags: ["Python", "FastAPI", "Database Integration", "API Testing"],
    Icon: Code2,
    accent: "#60a5fa",
  },
  {
    id: "ejobindia",
    date: "Jul 2024 — Jan 2025",
    title: "Full Stack Development Trainee",
    company: "EJOBINDIA",
    location: "Kolkata",
    description:
      "Completed MERN Full Stack Development training, building responsive web applications using React.js, Node.js, Express.js, SQL, and MongoDB while developing RESTful APIs and backend services.",
    tags: ["React.js", "Node.js", "Express.js", "SQL", "MongoDB"],
    Icon: Layers3,
    accent: "#a78bfa",
  },
  {
    id: "sigilotech",
    date: "Oct 2023 — Jul 2024",
    title: "Software Engineer Intern",
    company: "Sigilotech",
    location: "Kolkata",
    description:
      "Developed business applications using Microsoft PowerApps and Power Automate, integrating SharePoint to automate workflows and improve operational efficiency in an Agile environment.",
    tags: ["PowerApps", "Power Automate", "SharePoint"],
    Icon: Workflow,
    accent: "#f472b6",
  },
  {
    id: "msc-computer-science",
    date: "Aug 2021 — Jun 2023",
    title: "M.Sc. in Computer Science",
    company: "St. Xavier's College (Autonomous), Kolkata",
    location: "Kolkata",
    description: "Completed postgraduate studies in Computer Science.",
    tags: ["Computer Science", "Postgraduate"],
    Icon: GraduationCap,
    accent: "#fbbf24",
  },
  {
    id: "bsc-computer-science",
    date: "Aug 2018 — Jun 2021",
    title: "B.Sc. in Computer Science",
    company: "Acharya Prafulla Chandra College",
    location: "Kolkata",
    description: "Completed undergraduate studies in Computer Science.",
    tags: ["Computer Science", "Undergraduate"],
    Icon: GraduationCap,
    accent: "#34d399",
  },
];

export default experiences;
