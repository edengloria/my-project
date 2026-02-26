"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, Users, FileText, Award, BookOpen, TreePine } from "lucide-react"

const contestRules = [
  {
    icon: Calendar,
    title: "접수 기간",
    description: "작품 접수 2026년 5~8월, 수상작 발표 10월, 시상식 11월 개최. (3~5월은 공고 및 홍보 기간)",
  },
  {
    icon: Users,
    title: "참가 자격",
    description: "초등부문(초등학생)과 일반부문(제한 없음)으로 구분하여 접수 및 심사가 진행됩니다.",
  },
  {
    icon: FileText,
    title: "공모 분야 및 출품 수량",
    description: "'생태동시' 단일 분야로 진행되며, 1인당 최대 2편까지 제출 가능합니다.",
  },
  {
    icon: Award,
    title: "시상 내역",
    description: "총 28명 포상, 총상금 1,000만 원. 일반부문 대상 200만 원, 초등부문 대상 50만 원 등 각 부문별 대상·최우수·우수·장려상 수여.",
  },
  {
    icon: BookOpen,
    title: "작품 주제",
    description: "생태계를 주제로 한 동시(생태동시). 자연과 생명, 생물다양성, 기후변화 등 생태적 감수성을 담은 동시.",
  },
  {
    icon: TreePine,
    title: "제출 형식",
    description: "전용 홈페이지에서 양식을 내려받아 한글 프로그램(HWP, HWPX)으로 작성 후 제출.",
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
