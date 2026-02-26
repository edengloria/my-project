"use client"

import { useEffect, useRef, useState } from "react"

const ecoTerms = [
  {
    term: "탄소 중립",
    english: "Carbon Neutrality",
    emoji: "🌱",
    definition:
      "우리가 생활하면서 내뿜는 이산화탄소를 최대한 줄이고, 나무를 심거나 숲을 가꿔서 남은 이산화탄소까지 깨끗이 없애는 거예요. 그래서 지구에 보내는 나쁜 공기가 '0'이 되는 거랍니다!",
  },
  {
    term: "생물다양성",
    english: "Biodiversity",
    emoji: "🦋",
    definition:
      "지구에는 아주 작은 개미부터 커다란 고래까지, 정말 다양한 생물이 살고 있어요. 이 모든 동물, 식물, 미생물이 서로 다른 모습으로 어우러져 사는 것을 생물다양성이라고 해요. 다양할수록 지구가 건강하답니다!",
  },
  {
    term: "생태 발자국",
    english: "Ecological Footprint",
    emoji: "👣",
    definition:
      "우리가 밥을 먹고, 물을 쓰고, 전기를 사용할 때마다 지구에 발자국을 남기는 것과 같아요. 이 발자국이 너무 크면 지구가 힘들어하니까, 작은 발자국을 남기도록 노력해야 해요!",
  },
  {
    term: "순환 경제",
    english: "Circular Economy",
    emoji: "♻️",
    definition:
      "물건을 한 번 쓰고 버리는 대신, 다시 고쳐 쓰거나 새로운 물건으로 만드는 거예요. 마치 자연에서 낙엽이 떨어져 흙이 되고, 그 흙에서 새싹이 자라는 것처럼 빙글빙글 돌려쓰는 거랍니다!",
  },
  {
    term: "습지 생태계",
    english: "Wetland Ecosystem",
    emoji: "🐸",
    definition:
      "물이 촉촉하게 젖어 있는 땅을 습지라고 해요. 연못가나 갯벌처럼 물과 땅이 만나는 곳이죠. 개구리, 잠자리, 갈대 같은 친구들이 모여 사는 아주 소중한 자연의 집이에요!",
  },
  {
    term: "기후 위기",
    english: "Climate Crisis",
    emoji: "🌡️",
    definition:
      "공장이나 자동차에서 나오는 나쁜 공기가 지구를 이불처럼 감싸면서 점점 더워지고 있어요. 그래서 여름이 더 덥고, 비가 한꺼번에 많이 오고, 겨울에 눈이 안 오기도 하는 거랍니다.",
  },
]

function FlipCard({
  term,
  english,
  emoji,
  definition,
  delay,
}: {
  term: string
  english: string
  emoji: string
  definition: string
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
      <div
        className="flip-card h-72 w-full cursor-pointer sm:h-64"
        role="button"
        tabIndex={0}
        aria-label={`${term} - 뒤집어서 뜻 알아보기`}
      >
        <div className="flip-card-inner relative h-full w-full">
          {/* Front */}
          <div
            className="flip-card-front clay-card absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          >
            <span className="mb-2 text-3xl" aria-hidden="true">{emoji}</span>
            <span className="mb-1 text-xs font-medium tracking-wider text-clay-terracotta uppercase">
              {english}
            </span>
            <h3 className="font-serif text-2xl font-bold text-foreground">
              {term}
            </h3>
            <span className="mt-3 text-xs text-muted-foreground">
              {"살짝 올려놓으면 뜻이 나타나요!"}
            </span>
          </div>

          {/* Back */}
          <div
            className="flip-card-back absolute inset-0 flex flex-col items-center justify-center overflow-hidden p-5 text-center"
            style={{
              borderRadius: "1.25rem 4px 1.25rem 4px",
              background: "linear-gradient(135deg, #2D5A27 0%, #1a3d18 50%, #2D5A27 100%)",
              boxShadow:
                "inset 2px 2px 4px rgba(255,255,255,0.15), 4px 4px 12px rgba(0,0,0,0.12)",
              border: "1px solid rgba(61,122,53,0.4)",
            }}
          >
            <span className="mb-1.5 text-xl" aria-hidden="true">{emoji}</span>
            <h4 className="mb-2 font-serif text-base font-semibold" style={{ color: "#FFFDF8" }}>
              {term}
            </h4>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "rgba(255,253,248,0.92)" }}
            >
              {definition}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DictionarySection() {
  return (
    <section id="dictionary" className="bg-secondary/50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-medium tracking-wide text-clay-terracotta uppercase">
            Eco Dictionary
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            생태 용어 사전
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            자연을 더 잘 이해할 수 있는 생태 용어들을 모았어요.
            <br />
            카드 위에 손가락을 올려보세요!
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ecoTerms.map((term, index) => (
            <FlipCard
              key={term.term}
              term={term.term}
              english={term.english}
              emoji={term.emoji}
              definition={term.definition}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
