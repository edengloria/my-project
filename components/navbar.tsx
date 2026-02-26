"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { label: "공모전 소개", href: "#overview" },
  { label: "생태 사전", href: "#dictionary" },
  { label: "참가 신청", href: "#apply" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/images/nie-logo.png"
            alt="국립생태원 로고"
            width={120}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-clay-forest"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#apply"
            className="clay-button bg-clay-forest px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            지금 참가하기
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass-nav mt-2 mx-4 rounded-2xl px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-clay-forest"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#apply"
              onClick={() => setMobileOpen(false)}
              className="clay-button bg-clay-forest px-5 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              지금 참가하기
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
