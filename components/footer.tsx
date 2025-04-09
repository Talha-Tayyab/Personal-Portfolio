"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
              Talha Tayyab
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{t("hero.title")}</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm text-muted-foreground">© {currentYear} Talha Tayyab. All rights reserved.</p>
            <p className="text-xs text-muted-foreground mt-1">Designed and built with ❤️</p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
