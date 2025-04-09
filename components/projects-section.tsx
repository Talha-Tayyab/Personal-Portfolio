"use client"

import { useMemo } from "react"
import { Gamepad, ShoppingCart, Cloud, Code, Blocks, Layers3, Globe, Compass } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Types
type Language = "en" | "de"

type ProjectTitle = {
  [key in Language]: string
}

type ProjectDescription = {
  [key in Language]: string
}

type ProjectColor = "pink" | "purple" | "cyan" | "violet" | "green" | "blue" | "orange"

type Project = {
  icon: React.ReactNode
  title: ProjectTitle
  description: ProjectDescription
  date: string
  tags: string[]
  color: ProjectColor
  repoLink: string
}

// Constants
const PROJECTS: Project[] = [
  {
    icon: <Globe className="w-8 h-8 text-pink-500" />,
    title: {
      en: "Personal Portfolio Website",
      de: "Persönliche Portfolio-Website",
    },
    description: {
      en: "A responsive portfolio website showcasing my skills, projects, and professional experience with modern design.",
      de: "Eine responsive Portfolio-Website, die meine Fähigkeiten, Projekte und berufliche Erfahrung mit modernem Design präsentiert.",
    },
    date: "Dec 2024",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    color: "pink",
    repoLink: "https://github.com/Talha-Tayyab/Personal-Portfolio.git",
  },
  {
    icon: <Layers3 className="w-8 h-8 text-purple-500" />,
    title: {
      en: "Dynamic Quiz App",
      de: "Dynamische Quiz-App",
    },
    description: {
      en: "An interactive quiz application with multiple categories, difficulty levels, and real-time scoring.",
      de: "Eine interaktive Quiz-Anwendung mit mehreren Kategorien, Schwierigkeitsgraden und Echtzeit-Bewertung.",
    },
    date: "Nov 2024",
    tags: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    color: "purple",
    repoLink: "https://github.com/Talha-Tayyab/Quiz-App.git",
  },
  {
    icon: <Cloud className="w-8 h-8 text-cyan-500" />,
    title: {
      en: "3D Weather Simulation",
      de: "3D Wettersimulation",
    },
    description: {
      en: "An interactive 3D weather visualization app that displays real-time weather data with immersive visual effects.",
      de: "Eine interaktive 3D-Wettervisualisierungs-App, die Echtzeit-Wetterdaten mit immersiven visuellen Effekten anzeigt.",
    },
    date: "Sep 2024 - Oct 2024",
    tags: ["Three.js", "React", "OpenWeather API", "WebGL"],
    color: "cyan",
    repoLink: "https://github.com/Talha-Tayyab/3d-Weather-Simulation.git",
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-violet-500" />,
    title: {
      en: "Ecommerce Dashboard",
      de: "Ecommerce Dashboard",
    },
    description: {
      en: "A responsive admin dashboard for e-commerce platforms with sales analytics, inventory management, and user controls.",
      de: "Ein responsives Admin-Dashboard für E-Commerce-Plattformen mit Verkaufsanalysen, Bestandsverwaltung und Benutzerkontrollen.",
    },
    date: "Jul 2024 - Aug 2024",
    tags: ["React", "Redux", "Material UI", "Chart.js", "Firebase"],
    color: "violet",
    repoLink: "https://github.com/Talha-Tayyab/Talha-Tayyab-Ecommerce-Dashboar.git",
  },
  {
    icon: <Compass className="w-8 h-8 text-green-500" />,
    title: {
      en: "3D Maze Game",
      de: "3D Labyrinth-Spiel",
    },
    description: {
      en: "A 3D maze exploration game with procedurally generated labyrinths, challenging puzzles, and immersive gameplay.",
      de: "Ein 3D-Labyrinth-Erkundungsspiel mit prozedural generierten Labyrinthen, herausfordernden Rätseln und immersivem Gameplay.",
    },
    date: "Apr 2024 - May 2024",
    tags: ["Unity", "C#", "3D", "Procedural Generation", "Game Development"],
    color: "green",
    repoLink: "https://github.com/Talha-Tayyab/3d-Maze.git",
  },
  {
    icon: <Blocks className="w-8 h-8 text-blue-500" />,
    title: {
      en: "3D Block Breaker",
      de: "3D Block Breaker",
    },
    description: {
      en: "A 3D version of the classic Breakout game with modern graphics, power-ups, and multiple levels.",
      de: "Eine 3D-Version des klassischen Breakout-Spiels mit moderner Grafik, Power-ups und mehreren Leveln.",
    },
    date: "Mar 2024 - Apr 2024",
    tags: ["Unity", "C#", "3D", "Game Development"],
    color: "blue",
    repoLink: "https://github.com/Talha-Tayyab/3d-Block-Breaker-.git",
  },
  {
    icon: <Gamepad className="w-8 h-8 text-orange-500" />,
    title: {
      en: "Subway Surfer Prototype",
      de: "Subway Surfer Prototyp",
    },
    description: {
      en: "An endless runner game inspired by Subway Surfers with character movement, obstacle avoidance, and score tracking.",
      de: "Ein Endless-Runner-Spiel, inspiriert von Subway Surfers, mit Charakterbewegung, Hindernissvermeidung und Punkteverfolgung.",
    },
    date: "Jan 2024 - Feb 2024",
    tags: ["Unity", "C#", "3D", "Game Development"],
    color: "orange",
    repoLink: "https://github.com/Talha-Tayyab/Subway-Surfer-Prototype.git",
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

// Components
const ProjectCard = ({ project, language }: { project: Project; language: Language }) => {
  // Memoize the badge components to prevent unnecessary re-renders
  const badgeComponents = useMemo(() => {
    return project.tags.map((tag, tagIndex) => (
      <Badge
        key={tagIndex}
        variant="outline"
        className={`text-xs font-medium px-2 py-1 bg-${project.color}-50 text-${project.color}-700 border-${project.color}-200 dark:bg-${project.color}-900/20 dark:text-${project.color}-300 dark:border-${project.color}-800`}
      >
        {tag}
      </Badge>
    ))
  }, [project.tags, project.color])

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <motion.div
            className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {project.icon}
          </motion.div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{project.date}</span>
        </div>

        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
          {project.title[language]}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{project.description[language]}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {badgeComponents}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-auto flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
          asChild
        >
          <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
            <Code className="h-4 w-4" />
            <span>View on GitHub</span>
          </a>
        </Button>
      </div>
    </motion.div>
  )
}

// Memoized section title component
const SectionTitle = ({ t }: { t: (key: string) => string }) => (
  <motion.div
    variants={titleVariants}
    initial="hidden"
    animate="visible"
    className="text-center mb-16"
  >
    <h2 className="text-3xl font-bold text-primary mb-2">{t("projects.title")}</h2>
    <div className="w-20 h-1 bg-primary mx-auto mb-8" />
    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">{t("projects.description")}</p>
    <p className="text-lg text-foreground">
      {t("projects.subtitle")}
    </p>
  </motion.div>
)

export default function ProjectsSection() {
  const { t, language } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Memoize the project cards to prevent unnecessary re-renders
  const projectCards = useMemo(() => {
    return PROJECTS.map((project, index) => (
      <ProjectCard key={index} project={project} language={language} />
    ))
  }, [language])

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionTitle t={t} />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectCards}
        </motion.div>
      </div>
    </section>
  )
}
