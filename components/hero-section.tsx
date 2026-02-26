"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ArrowDown } from "lucide-react"

/* ---------- Leaf-shaped floating element ---------- */

interface LeafProps {
  color: string
  size: number
  initialX: number
  initialY: number
  rotate?: number
}

function FloatingLeaf({ color, size, initialX, initialY, rotate = 0 }: LeafProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const factor = useRef((size / 180) * 0.035 + 0.005)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * factor.current
      const y = (e.clientY - window.innerHeight / 2) * factor.current
      setOffset({ x, y })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      className="pointer-events-none absolute transition-transform duration-700 ease-out"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        width: size,
        height: size,
        transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotate}deg)`,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        style={{
          filter: `drop-shadow(4px 4px ${Math.round(size * 0.06)}px rgba(0,0,0,0.1))`,
          opacity: size > 120 ? 0.55 : size > 80 ? 0.45 : 0.35,
        }}
      >
        <defs>
          <linearGradient id={`lg-${initialX}-${initialY}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path
          d="M50 5 C25 15, 8 35, 10 55 C12 72, 25 88, 50 95 C75 88, 88 72, 90 55 C92 35, 75 15, 50 5Z"
          fill={`url(#lg-${initialX}-${initialY})`}
        />
        <path
          d="M50 12 L50 90"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M50 30 L30 40 M50 45 L25 55 M50 60 L30 68 M50 30 L70 40 M50 45 L75 55 M50 60 L70 68"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M50 10 C30 20, 15 38, 18 55 C20 68, 30 82, 50 88 C55 86, 42 70, 40 55 C38 40, 42 25, 50 10Z"
          fill="rgba(255,255,255,0.15)"
        />
      </svg>
    </div>
  )
}

/* ---------- Typing + Liquid Glass blockquote ---------- */

const QUOTE_LINE_1 = "풀 한 포기에도 우주가 깃들어 있고,"
const QUOTE_LINE_2 = "나무 한 그루에도 시간이 흐른다."

function LiquidGlassQuote({ visible }: { visible: boolean }) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const ref = useRef<HTMLDivElement>(null)
  const [typedLine1, setTypedLine1] = useState("")
  const [typedLine2, setTypedLine2] = useState("")
  const [typingDone, setTypingDone] = useState(false)
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => setStartTyping(true), 800)
    return () => clearTimeout(timer)
  }, [visible])

  const typeText = useCallback(() => {
    if (!startTyping) return
    let i = 0
    const line1 = QUOTE_LINE_1
    const line2 = QUOTE_LINE_2
    const total = line1.length + line2.length

    const interval = setInterval(() => {
      if (i < line1.length) {
        setTypedLine1(line1.slice(0, i + 1))
      } else if (i < total) {
        const j = i - line1.length
        setTypedLine2(line2.slice(0, j + 1))
      }
      i++
      if (i >= total) {
        clearInterval(interval)
        setTypingDone(true)
      }
    }, 65)

    return () => clearInterval(interval)
  }, [startTyping])

  useEffect(() => {
    const cleanup = typeText()
    return cleanup
  }, [typeText])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
    el.addEventListener("mousemove", handleMove)
    return () => el.removeEventListener("mousemove", handleMove)
  }, [])

  const highlightX = 20 + mouse.x * 60
  const highlightY = 20 + mouse.y * 60

  return (
    <div
      ref={ref}
      className={`relative mx-auto mt-8 max-w-lg overflow-hidden rounded-2xl p-[1.5px] transition-all delay-300 duration-1000 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(45,90,39,0.25) 50%, rgba(255,255,255,0.35) 100%)`,
      }}
    >
      <div
        className="relative rounded-2xl px-8 py-6"
        style={{
          background: `rgba(45, 90, 39, 0.06)`,
          backdropFilter: "blur(24px) saturate(1.5)",
          WebkitBackdropFilter: "blur(24px) saturate(1.5)",
        }}
      >
        {/* Liquid highlight blob */}
        <div
          className="pointer-events-none absolute rounded-full transition-all duration-500 ease-out"
          style={{
            width: 160,
            height: 160,
            left: `${highlightX}%`,
            top: `${highlightY}%`,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(12px)",
          }}
        />
        {/* Secondary green refraction blob */}
        <div
          className="pointer-events-none absolute rounded-full transition-all duration-700 ease-out"
          style={{
            width: 100,
            height: 100,
            left: `${100 - highlightX}%`,
            top: `${100 - highlightY}%`,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(45,90,39,0.15) 0%, rgba(45,90,39,0) 70%)",
            filter: "blur(10px)",
          }}
        />

        <blockquote className="relative font-serif text-lg leading-loose tracking-wide md:text-xl" style={{ color: "#2C2417" }}>
          <span className="text-clay-forest/40 text-2xl leading-none" aria-hidden="true">{'"'}</span>
          <br />
          <span style={{ color: "#1a4a16" }}>{typedLine1}</span>
          {typedLine1.length > 0 && typedLine1.length < QUOTE_LINE_1.length && (
            <span className="typing-cursor" />
          )}
          {typedLine1.length === QUOTE_LINE_1.length && <br />}
          <span>{typedLine2}</span>
          {typedLine2.length > 0 && !typingDone && (
            <span className="typing-cursor" />
          )}
          {typingDone && (
            <>
              <br />
              <span className="text-clay-forest/40 text-2xl leading-none" aria-hidden="true">{'"'}</span>
            </>
          )}
        </blockquote>
      </div>
    </div>
  )
}

/* ---------- Hero Section ---------- */

export function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-20">
      {/* Floating leaves -- MORE saturated, vivid colors */}
      <FloatingLeaf color="#1B8C12" size={190} initialX={8}  initialY={12} rotate={-15} />
      <FloatingLeaf color="#27A31E" size={130} initialX={78} initialY={18} rotate={25} />
      <FloatingLeaf color="#D4742B" size={85}  initialX={72} initialY={62} rotate={-40} />
      <FloatingLeaf color="#1B8C12" size={55}  initialX={14} initialY={72} rotate={10} />
      <FloatingLeaf color="#7A6240" size={155} initialX={84} initialY={74} rotate={-20} />
      <FloatingLeaf color="#D4742B" size={65}  initialX={24} initialY={42} rotate={50} />
      <FloatingLeaf color="#2DB822" size={110} initialX={52} initialY={8}  rotate={-30} />
      <FloatingLeaf color="#1B8C12" size={45}  initialX={60} initialY={80} rotate={70} />
      <FloatingLeaf color="#27A31E" size={70}  initialX={40} initialY={68} rotate={-55} />

      {/* Content */}
      <div
        className={`relative z-10 mx-auto max-w-3xl text-center transition-all duration-1000 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-clay-forest/10 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-clay-forest" />
          <span className="text-sm font-medium text-clay-forest">
            작품 접수 2026.05 ~ 2026.08
          </span>
        </div>

        <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl md:leading-tight">
          <span className="text-balance">
            {"제11회 국립생태원"}
            <br />
            <span className="text-clay-forest">생태문학 공모전</span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          자연과 생명의 이야기를 생태동시에 담아주세요.
          <br className="hidden md:block" />
          초등부문·일반부문으로 나뉘어 총 28명, 1,000만 원 시상합니다.
        </p>

        {/* Liquid glass blockquote with typing effect */}
        <LiquidGlassQuote visible={visible} />

        <div
          className={`mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all delay-500 duration-1000 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <a
            href="#apply"
            className="clay-button !rounded-2xl bg-clay-forest px-8 py-3.5 text-base font-medium text-primary-foreground"
          >
            참가 신청하기
          </a>
          <a
            href="#overview"
            className="clay-button !rounded-2xl bg-card px-8 py-3.5 text-base font-medium text-foreground"
          >
            자세히 알아보기
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-8">
        <a
          href="#overview"
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-clay-forest"
          aria-label="아래로 스크롤"
        >
          <span className="text-xs font-medium">아래로</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
