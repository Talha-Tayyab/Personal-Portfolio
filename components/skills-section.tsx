"use client"

import { useState } from "react"
import { Monitor, Server, Database, Terminal, Globe, Gamepad2, Code, Braces } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

// Types
type SkillCategory = "frontend" | "backend" | "database" | "tools" | "cms" | "gamedev"

type Skill = {
  name: string
  level: number
}

type Tab = {
  id: SkillCategory
  icon: React.ReactNode
  label: string
}

type TechIcon = {
  name: string
  icon: React.ReactNode
}

// Constants
const TABS: Tab[] = [
  { id: "frontend", icon: <Monitor className="w-5 h-5" />, label: "skills.tab.frontend" },
  { id: "backend", icon: <Server className="w-5 h-5" />, label: "skills.tab.backend" },
  { id: "database", icon: <Database className="w-5 h-5" />, label: "skills.tab.database" },
  { id: "tools", icon: <Terminal className="w-5 h-5" />, label: "skills.tab.tools" },
  { id: "cms", icon: <Globe className="w-5 h-5" />, label: "skills.tab.cms" },
  { id: "gamedev", icon: <Gamepad2 className="w-5 h-5" />, label: "skills.tab.gamedev" },
]

const SKILL_CATEGORIES: Record<SkillCategory, Skill[]> = {
  frontend: [
    { name: "HTML", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 90 },
    { name: "CSS", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Vue.js", level: 75 },
  ],
  backend: [
    { name: "Node.js", level: 80 },
    { name: "Express", level: 75 },
    { name: "Java", level: 65 },
    { name: "Python", level: 60 },
    { name: "Spring Boot", level: 70 },
    { name: "REST APIs", level: 85 },
  ],
  database: [
    { name: "MongoDB", level: 85 },
    { name: "MySQL", level: 80 },
    { name: "PostgreSQL", level: 75 },
    { name: "Firebase", level: 70 },
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "GitHub", level: 85 },
    { name: "Linux", level: 75 },
    { name: "Cypress", level: 70 },
    { name: "VS Code", level: 90 },
    { name: "Figma", level: 75 },
    { name: "Scrum", level: 82 },
    { name: "Selenium", level: 70 },
  ],
  cms: [
    { name: "WordPress", level: 85 },
    { name: "Shopify", level: 75 },
    { name: "TYPO3", level: 80 },
    { name: "Google Search Console", level: 70 },
  ],
  gamedev: [
    { name: "Unity", level: 80 },
    { name: "C#", level: 75 },
    { name: "Unreal Engine", level: 60 },
    { name: "Game Design", level: 70 },
  ],
}

const TECH_ICONS: TechIcon[] = [
  { name: "React", icon: <Code className="w-6 h-6" /> },
  { name: "TypeScript", icon: <Braces className="w-6 h-6" /> },
  { name: "Python", icon: <Code className="w-6 h-6" /> },
  { name: "Java", icon: <Code className="w-6 h-6" /> },
  { name: "MongoDB", icon: <Database className="w-6 h-6" /> },
  { name: "Git", icon: <Terminal className="w-6 h-6" /> },
  { name: "Unity", icon: <Gamepad2 className="w-6 h-6" /> },
  { name: "REST APIs", icon: <Globe className="w-6 h-6" /> },
  { name: "Spring Boot", icon: <Server className="w-6 h-6" /> },
  { name: "WordPress", icon: <Globe className="w-6 h-6" /> },
  { name: "Linux", icon: <Terminal className="w-6 h-6" /> },
  { name: "C#", icon: <Code className="w-6 h-6" /> },
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

export default function SkillsSection() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<SkillCategory>("frontend")
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-purple-600 mb-2">{t("skills.title")}</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto mb-8" />
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {t("skills.description")}
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
            {TABS.map((tab) => (
              <motion.button
                key={tab.id}
                variants={itemVariants}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 transition-all duration-300 ${
                  activeTab === tab.id 
                    ? "bg-purple-600 text-white" 
                    : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                aria-label={t(tab.label)}
              >
                <span>{tab.icon}</span>
                <span className="font-medium tracking-wide">{t(tab.label)}</span>
              </motion.button>
            ))}
          </div>

          {/* Skills Content */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-10">
              <div className="flex items-center mb-8">
                {TABS.find(tab => tab.id === activeTab)?.icon}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 ml-3">
                  {t(`skills.${activeTab}`)}
                </h3>
              </div>

              {/* Skill Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-12">
                {SKILL_CATEGORIES[activeTab].slice(0, 4).map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        className="h-full bg-purple-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Technology Icons Grid */}
          <div className="grid grid-cols-1 gap-10">
            {[0, 1].map((rowIndex) => (
              <motion.div 
                key={rowIndex}
                variants={containerVariants} 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8"
              >
                {TECH_ICONS.slice(rowIndex * 6, (rowIndex + 1) * 6).map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 h-full flex flex-col items-center justify-center shadow-sm">
                      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
                        <span className="text-purple-600 dark:text-purple-400">{tech.icon}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tech.name}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
