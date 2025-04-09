"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "de"

type Translations = {
  [key: string]: {
    en: string
    de: string
  }
}

// Define translations
const translations: Translations = {
  // Navbar
  "nav.home": {
    en: "Home",
    de: "Startseite",
  },
  "nav.about": {
    en: "About",
    de: "Über mich",
  },
  "nav.skills": {
    en: "Skills",
    de: "Fähigkeiten",
  },
  "nav.projects": {
    en: "Projects",
    de: "Projekte",
  },
  "nav.contact": {
    en: "Contact",
    de: "Kontakt",
  },

  // Hero Section
  "hero.title": {
    en: "Website Developer",
    de: "Website Entwickler",
  },
  "hero.description": {
    en: "Innovative website developer with an eye for pixel-perfect design and a passion for modern web technologies. I transform complex requirements into elegant, user-friendly interfaces and bring creativity, technical expertise, and a problem-solver mindset to every project.",
    de: "Innovativer Website-Entwickler mit einem Auge für pixel-perfektes Design und einer Leidenschaft für moderne Web-Technologien. Ich verwandle komplexe Anforderungen in elegante, benutzerfreundliche Interfaces und bringe Kreativität, technisches Know-how und eine Problemlöser-Mentalität in jedes Projekt ein.",
  },
  "hero.cta.work": {
    en: "View My Work",
    de: "Meine Arbeit ansehen",
  },
  "hero.cta.contact": {
    en: "Get In Touch",
    de: "Kontakt aufnehmen",
  },

  // About Section
  "about.title": {
    en: "About Me",
    de: "Über mich",
  },
  "about.greeting": {
    en: "Hello, I'm Talha Tayyab",
    de: "Hallo, ich bin Talha Tayyab",
  },
  "about.description.1": {
    en: "As a technically skilled website developer, I combine precise coding with creative design thinking. My expertise in HTML5, CSS3, and JavaScript (ES6+) allows me to develop complex UI components with React that are both aesthetically appealing and functionally robust.",
    de: "Als technisch versierter Website-Entwickler verbinde ich präzises Coding mit kreativem Design-Denken. Meine Expertise in HTML5, CSS3 und JavaScript (ES6+) ermöglicht es mir, komplexe UI-Komponenten mit React zu entwickeln, die sowohl ästhetisch ansprechend als auch funktional robust sind.",
  },
  "about.description.2": {
    en: "My approach combines technical precision with creative design thinking. I use modern development tools and CSS-Frameworks to work more efficiently. I'm particularly interested in Progressive Web Apps and subtle animations that enhance the user experience and make websites not only functional but also appealing.",
    de: "Mein Ansatz verbindet technische Genauigkeit mit kreativem Design. Ich nutze moderne Entwicklungstools und CSS-Frameworks, um effizienter zu arbeiten. Besonders interessiere ich mich für Progressive Web Apps und dezente Animationen, die das Nutzererlebnis verbessern und Webseiten nicht nur funktional, sondern auch ansprechend machen.",
  },
  "about.paragraph1": {
    en: "As a technically skilled website developer, I combine precise coding with creative design thinking. My expertise in HTML5, CSS3, and JavaScript (ES6+) allows me to develop complex UI components with React that are both aesthetically appealing and functionally robust.",
    de: "Als technisch versierter Website-Entwickler verbinde ich präzises Coding mit kreativem Design-Denken. Meine Expertise in HTML5, CSS3 und JavaScript (ES6+) ermöglicht es mir, komplexe UI-Komponenten mit React zu entwickeln, die sowohl ästhetisch ansprechend als auch funktional robust sind.",
  },
  "about.paragraph2": {
    en: "My approach combines technical precision with creative design thinking. I use modern development tools and CSS-Frameworks to work more efficiently. I'm particularly interested in Progressive Web Apps and subtle animations that enhance the user experience and make websites not only functional but also appealing.",
    de: "Mein Ansatz verbindet technische Genauigkeit mit kreativem Design. Ich nutze moderne Entwicklungstools und CSS-Frameworks, um effizienter zu arbeiten. Besonders interessiere ich mich für Progressive Web Apps und dezente Animationen, die das Nutzererlebnis verbessern und Webseiten nicht nur funktional, sondern auch ansprechend machen.",
  },
  "about.education": {
    en: "Education",
    de: "Ausbildung",
  },
  "about.location": {
    en: "Location",
    de: "Standort",
  },
  "about.position": {
    en: "Current Position",
    de: "Aktuelle Position",
  },
  "about.languages": {
    en: "Languages",
    de: "Sprachen",
  },
  "about.download": {
    en: "Download CV",
    de: "Lebenslauf herunterladen",
  },

  // Skills Section
  "skills.title": {
    en: "Technical Skills",
    de: "Technische Fähigkeiten",
  },
  "skills.description": {
    en: "My technical toolkit spans various domains of software development, from frontend and backend technologies to game development.",
    de: "Mein technisches Toolkit umfasst verschiedene Bereiche der Softwareentwicklung, von Frontend- und Backend-Technologien bis hin zur Spieleentwicklung.",
  },

  // Projects Section
  "projects.title": {
    en: "My Projects",
    de: "Meine Projekte",
  },
  "projects.description": {
    en: "A selection of my website development projects showcasing my progression from HTML/CSS/JS to React, TypeScript, and Vue.js.",
    de: "Eine Auswahl meiner Website-Entwicklungsprojekte, die meinen Fortschritt von HTML/CSS/JS zu React, TypeScript und Vue.js zeigen.",
  },
  "projects.subtitle": {
    en: "Explore my recent work across web development, game design, and software engineering.",
    de: "Entdecken Sie meine neuesten Arbeiten in den Bereichen Webentwicklung, Spieldesign und Softwareentwicklung.",
  },
  "projects.demo": {
    en: "Demo",
    de: "Demo",
  },
  "projects.code": {
    en: "Code",
    de: "Code",
  },

  // Contact Section
  "contact.title": {
    en: "Contact Me",
    de: "Kontaktiere mich",
  },
  "contact.description": {
    en: "Have a project in mind or want to discuss potential opportunities? Feel free to reach out!",
    de: "Haben Sie ein Projekt im Sinn oder möchten Sie potenzielle Möglichkeiten besprechen? Kontaktieren Sie mich gerne!",
  },
  "contact.info": {
    en: "Contact Information",
    de: "Kontaktinformationen",
  },
  "contact.info.description": {
    en: "Feel free to reach out through any of these channels",
    de: "Sie können mich gerne über einen dieser Kanäle kontaktieren",
  },
  "contact.email": {
    en: "Email",
    de: "E-Mail",
  },
  "contact.phone": {
    en: "Phone",
    de: "Telefon",
  },
  "contact.location": {
    en: "Location",
    de: "Standort",
  },
  "contact.connect": {
    en: "Connect With Me",
    de: "Verbinde dich mit mir",
  },
  "contact.form.title": {
    en: "Send Me a Message",
    de: "Sende mir eine Nachricht",
  },
  "contact.form.description": {
    en: "I'll get back to you as soon as possible",
    de: "Ich werde mich so schnell wie möglich bei Ihnen melden",
  },
  "contact.form.name": {
    en: "Your Name",
    de: "Ihr Name",
  },
  "contact.form.email": {
    en: "Your Email",
    de: "Ihre E-Mail",
  },
  "contact.form.subject": {
    en: "Subject",
    de: "Betreff",
  },
  "contact.form.message": {
    en: "Message",
    de: "Nachricht",
  },
  "contact.form.send": {
    en: "Send Message",
    de: "Nachricht senden",
  },
  "contact.form.sending": {
    en: "Sending...",
    de: "Wird gesendet...",
  },
  // Add these new translations for tab labels in skills section
  "skills.tab.frontend": {
    en: "Frontend",
    de: "Frontend",
  },
  "skills.tab.backend": {
    en: "Backend",
    de: "Backend",
  },
  "skills.tab.database": {
    en: "Database",
    de: "Datenbank",
  },
  "skills.tab.tools": {
    en: "Tools & Platforms",
    de: "Tools & Plattformen",
  },
  "skills.tab.cms": {
    en: "CMS",
    de: "CMS",
  },
  "skills.tab.gamedev": {
    en: "Game Dev",
    de: "Spieleentwicklung",
  },

  // Add these for skill categories
  "skills.frontend": {
    en: "Frontend Skills",
    de: "Frontend-Fähigkeiten",
  },
  "skills.backend": {
    en: "Backend Skills",
    de: "Backend-Fähigkeiten",
  },
  "skills.database": {
    en: "Database Skills",
    de: "Datenbank-Fähigkeiten",
  },
  "skills.tools": {
    en: "Tools & Platforms",
    de: "Tools & Plattformen",
  },
  "skills.cms": {
    en: "CMS Skills",
    de: "CMS-Fähigkeiten",
  },
  "skills.gamedev": {
    en: "Game Dev Skills",
    de: "Spieleentwicklungs-Fähigkeiten",
  },

  // Footer
  "footer.rights": {
    en: "All rights reserved.",
    de: "Alle Rechte vorbehalten.",
  },
  "footer.built": {
    en: "Designed and built with ❤️",
    de: "Entworfen und gebaut mit ❤️",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "de")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
