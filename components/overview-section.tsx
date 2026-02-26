"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, Users, FileText, Award, BookOpen, TreePine } from "lucide-react"

const contestRules = [
  {
    icon: Calendar,
    title: "접수 기간",
    description: "2026년 3월 1일부터 5월 31일까지 온라인으로 접수합니다.",
  },
  {
    icon: Users,
    title: "참가 자격",
    description: "대한민국 국적의 누구나 참가 가능합니다. 나이, 직업 제한 없습니다.",
  },
  {
    icon: FileText,
    title: "응모 부문",
    description: "시 부문과 산문(수필) 부문으로 나뉘며, 1인 1작품만 응모 가능합니다.",
  },
  {
    icon: Award,
    title: "시상 내역",
    description: "대상 1편(300만원), 최우수상 2편(각 150만원), 우수상 3편(각 100만원).",
  },
  {
    icon: BookOpen,
    title: "작품 주제",
    description: "생태계 보전, 생물다양성, 기후변화 등 자연과 공존에 관한 주제.",
  },
  {
    icon: TreePine,
    title: "발표 및 시상",
    description: "2026년 8월 중 국립생태원 홈페이지를 통해 발표, 9월 시상식 개최.",
  },
]

function AnimatedCard({
  children,
  delay,
}: {
  children: React.ReactNode
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  )
}

export function OverviewSection() {
  return (
    <section id="overview" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-medium tracking-wide text-clay-terracotta uppercase">
            Contest Overview
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            공모전 안내
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            국립생태원이 주최하는 제11회 생태문학 공모전의 세부 사항을 확인하세요.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contestRules.map((rule, index) => (
            <AnimatedCard key={rule.title} delay={index * 100}>
              <div className="clay-card group flex h-full flex-col !rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]">
                <div className="leaf-radius-sm mb-4 flex h-12 w-12 items-center justify-center bg-clay-forest/10 text-clay-forest transition-colors duration-300 group-hover:bg-clay-forest group-hover:text-primary-foreground">
                  <rule.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {rule.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {rule.description}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}
