"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

// Types
type NavSection = "home" | "about" | "skills" | "projects" | "contact"

type NavItem = {
  id: NavSection
  label: string
  href: string
}

// Constants
const NAV_SECTIONS: NavSection[] = ["home", "about", "skills", "projects", "contact"]

const NAV_ITEMS: NavItem[] = NAV_SECTIONS.map((section) => ({
  id: section,
  label: `nav.${section}`,
  href: section === "home" ? "/" : `#${section}`
}))

// Animation variants
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
}

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

export default function Navbar() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<NavSection>("home")

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    // Update scroll state
    setScrolled(window.scrollY > 10)

    // Update active section based on scroll position
    const scrollPosition = window.scrollY + 100

    for (const section of NAV_SECTIONS) {
      const element = document.getElementById(section)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }
  }, [])

  // Scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Handle navigation click
  const handleNavClick = useCallback((section: NavSection, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveSection(section)
    setIsMenuOpen(false)

    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const sectionElement = document.getElementById(section)
      sectionElement?.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`sticky top-0 z-50 w-full transition-all duration-200 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/" className="group">
            <span className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
              Talha Tayyab
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item, index) => (
            <motion.div key={item.id} variants={itemVariants} custom={index}>
              <Link
                href={item.href}
                className={`${
                  activeSection === item.id ? "text-purple-600" : "text-gray-800 dark:text-gray-200"
                } hover:text-purple-600 transition-colors relative`}
                onClick={(e) => handleNavClick(item.id, e)}
              >
                {t(item.label)}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          <motion.div variants={itemVariants} className="flex items-center space-x-2">
            <LanguageSwitcher />
            <ModeToggle />
          </motion.div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <LanguageSwitcher />
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="ml-2"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white dark:bg-gray-900 border-b dark:border-gray-800"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`${
                    activeSection === item.id ? "text-purple-600" : "text-gray-800 dark:text-gray-200"
                  } hover:text-purple-600 transition-colors`}
                  onClick={(e) => handleNavClick(item.id, e)}
                >
                  {t(item.label)}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
