"use client"

import { GraduationCap, Briefcase, MapPin, Languages, User, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

// Types
type InfoItem = {
  icon: React.ReactNode
  title: string
  content: string
}

// Constants
const INFO_ITEMS: InfoItem[] = [
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "about.education",
    content: "Bachelor in internationaler Medieninformatik,\nHochschule für Technik und Wirtschaft Berlin"
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "about.location",
    content: "Berlin, Germany"
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "about.position",
    content: "Website Developer at A.T.E.M. Management GmbH"
  },
  {
    icon: <Languages className="h-6 w-6" />,
    title: "about.languages",
    content: "Deutsch (Proficient), Englisch (Native), Urdu (Native)"
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function AboutSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-purple-600 mb-2">{t("about.title")}</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto" />
        </motion.div>

        {/* Main Content */}
        <motion.div 
          ref={ref} 
          variants={containerVariants} 
          initial="hidden" 
          animate={inView ? "visible" : "hidden"}
        >
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            {/* Introduction */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  {t("about.greeting")}
                </h3>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t("about.paragraph1")}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                {t("about.paragraph2")}
              </p>
            </motion.div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {INFO_ITEMS.map((item, index) => (
                <motion.div 
                  key={item.title}
                  variants={itemVariants} 
                  className="flex items-start gap-4"
                >
                  <div className="text-purple-600">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      {t(item.title)}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download Button */}
            <motion.div variants={itemVariants} className="mt-8">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                asChild
              >
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  {t("about.download")}
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
