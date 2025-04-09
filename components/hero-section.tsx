"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

// Types
type SocialLink = {
  href: string
  icon: React.ReactNode
  label: string
}

type Role = {
  text: string
  delay: number
}

// Constants
const ROLES: Role[] = [
  { text: "Developer", delay: 0.7 },
  { text: "Game Enthusiast", delay: 1.0 },
  { text: "Problem Solver", delay: 1.3 }
]

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://github.com/Talha-Tayyab",
    icon: <Github className="h-5 w-5" />,
    label: "GitHub"
  },
  {
    href: "https://www.linkedin.com/in/talha-tayyab",
    icon: <Linkedin className="h-5 w-5" />,
    label: "LinkedIn"
  },
  {
    href: "mailto:Talhar755@gmail.com",
    icon: <Mail className="h-5 w-5" />,
    label: "Email"
  }
]

// Animation variants
const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 }
}

const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 }
}

export default function HeroSection() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="home" className="w-full gradient-bg py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        {/* Profile Image */}
        <motion.div
          {...scaleIn}
          className="mb-8 relative animate-float"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <Image
              src="/images/profile.png"
              alt="Talha Tayyab"
              width={160}
              height={160}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <motion.div
            className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 500 }}
            whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
          >
            <span className="text-lg font-bold">TT</span>
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-2"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 animate-shimmer">
            Talha Tayyab
          </span>
        </motion.h1>

        {/* Roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-4 relative h-6 overflow-hidden"
        >
          {ROLES.map((role, index) => (
            <motion.span
              key={role.text}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: role.delay,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
              className="inline-block mx-2 text-muted-foreground"
            >
              {index > 0 && <span className="mr-2 text-primary">|</span>}
              {role.text}
            </motion.span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.9 }}
          className="text-muted-foreground max-w-2xl mb-8"
        >
          {t("hero.description")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Button asChild className="bg-primary hover:bg-primary/90 relative overflow-hidden group">
            <Link href="#projects">
              <span className="relative z-10">{t("hero.cta.work")}</span>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-primary-foreground/10 transition-all duration-300 group-hover:h-full" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="relative overflow-hidden group">
            <Link href="#contact">
              <span className="relative z-10">{t("hero.cta.contact")}</span>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-primary/10 transition-all duration-300 group-hover:h-full" />
            </Link>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          {SOCIAL_LINKS.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-800/40 dark:hover:bg-gray-700/60 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                asChild
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                  <span className="sr-only">{link.label}</span>
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
