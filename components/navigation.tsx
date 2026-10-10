"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/data/site.config"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navLinks = siteConfig.nav.map((link) => ({ name: link.label, href: link.href }))

  return (
    <>
      {/* Mobile Menu Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          scrolled
            ? "top-4 mx-4 md:mx-auto max-w-5xl rounded-full bg-background/70 backdrop-blur-lg border border-white/10 shadow-2xl"
            : "top-0 bg-transparent border-transparent pt-4"
        )}
      >
        <div className="container mx-auto px-6">
          <div className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled ? "h-16" : "h-20"
          )}>
            {/* Logo Anchor */}
            <a href="#home" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src="/logo.png"
                alt="Villa Pensabene"
                width={240}
                height={80}
                className={cn("h-14 w-auto transition-transform duration-500", scrolled && "scale-90")}
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-accent group",
                    scrolled ? "text-foreground" : "text-white"
                  )}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 shadow-lg shadow-accent/20"
                asChild
              >
                <a href="#prenota">Prenota Tavolo</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "md:hidden p-2 rounded-full transition-colors",
                scrolled ? "text-foreground hover:bg-foreground/5" : "text-white hover:bg-white/10"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-6 space-y-4 border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "block py-2 text-lg font-medium transition-colors hover:text-accent",
                    scrolled ? "text-foreground" : "text-white"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full py-6 text-lg"
                asChild
              >
                <a href="#prenota" onClick={() => setIsOpen(false)}>Prenota Tavolo</a>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

