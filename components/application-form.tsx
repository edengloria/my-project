"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import {
  User,
  PenLine,
  Upload,
  ChevronLeft,
  ChevronRight,
  Check,
  FileUp,
  X,
} from "lucide-react"

const steps = [
  { label: "개인 정보", icon: User },
  { label: "작품 정보", icon: PenLine },
  { label: "파일 업로드 및 서약", icon: Upload },
]

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`leaf-radius-sm flex h-11 w-11 items-center justify-center transition-all duration-500 ${
                  index <= currentStep
                    ? "bg-clay-forest text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  index <= currentStep ? "text-clay-forest" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="mx-3 mb-6 h-0.5 flex-1 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-clay-forest transition-all duration-700 ease-out"
                  style={{ width: index < currentStep ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function StepOne({ visible }: { visible: boolean }) {
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible
          ? "translate-x-0 opacity-100"
          : "-translate-x-8 opacity-0 absolute inset-0 pointer-events-none"
      }`}
    >
      <h3 className="mb-6 font-serif text-xl font-semibold text-foreground">
        참가자 정보를 입력해 주세요
      </h3>
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            성명 <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="홍길동"
            className="clay-input w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
              이메일 <span className="text-destructive">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              className="clay-input w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
              연락처 <span className="text-destructive">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="010-0000-0000"
              className="clay-input w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-foreground">
            응모 부문 <span className="text-destructive">*</span>
          </label>
          <select
            id="category"
            className="clay-input w-full appearance-none px-4 py-3 text-sm text-foreground focus:outline-none"
          >
            <option value="">참가 부문을 선택해 주세요</option>
            <option value="general">일반부문</option>
            <option value="elementary">초등부문</option>
          </select>
        </div>
        <div>
          <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-foreground">
            거주 지역
          </label>
          <input
            id="address"
            type="text"
            placeholder="서울특별시"
            className="clay-input w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

function StepTwo({ visible }: { visible: boolean }) {
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible
          ? "scale-100 opacity-100"
          : "scale-95 opacity-0 absolute inset-0 pointer-events-none"
      }`}
    >
      <h3 className="mb-6 font-serif text-xl font-semibold text-foreground">
        작품 정보를 입력해 주세요
      </h3>
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-foreground">
            작품 제목 <span className="text-destructive">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder="작품 제목을 입력하세요"
            className="clay-input w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="poem" className="mb-1.5 block text-sm font-medium text-foreground">
            작품 본문 <span className="text-destructive">*</span>
          </label>
          <textarea
            id="poem"
            rows={8}
            placeholder="생태동시 본문을 입력해 주세요. (한글 프로그램 HWP/HWPX 파일로도 제출 가능합니다.)"
            className="clay-input w-full resize-none px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="motivation" className="mb-1.5 block text-sm font-medium text-foreground">
            창작 배경 및 동기
          </label>
          <textarea
            id="motivation"
            rows={4}
            placeholder="이 작품을 쓰게 된 배경이나 영감을 받은 생태적 경험을 자유롭게 적어 주세요."
            className="clay-input w-full resize-none px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

function StepThree({ visible }: { visible: boolean }) {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 absolute inset-0 pointer-events-none"
      }`}
    >
      <h3 className="mb-6 font-serif text-xl font-semibold text-foreground">
        파일 업로드 및 서약
      </h3>
      <div className="flex flex-col gap-6">
        {/* Upload zone */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            응모 파일 업로드
          </label>
          <div
            className={`breathe-border leaf-radius-lg flex cursor-pointer flex-col items-center justify-center border-2 border-dashed p-8 transition-colors duration-200 ${
              dragActive
                ? "border-clay-forest bg-clay-forest/5"
                : "border-border bg-card"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="파일 업로드 영역"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".hwp,.hwpx"
              className="hidden"
              onChange={handleChange}
            />
            {file ? (
              <div className="flex items-center gap-3">
                <FileUp className="h-8 w-8 text-clay-forest" />
                <div>
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFile(null)
                  }}
                  className="ml-2 rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="파일 제거"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="mb-3 h-10 w-10 text-muted-foreground/60" />
                <p className="text-sm font-medium text-foreground">
                  파일을 드래그하거나 클릭하여 업로드
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  HWP, HWPX (한글 프로그램 전용, 최대 10MB)
                </p>
              </>
            )}
          </div>
        </div>

        {/* Pledges */}
        <div className="clay-card flex flex-col gap-4 p-6">
          <h4 className="text-sm font-semibold text-foreground">
            서약 사항 <span className="text-destructive">*</span>
          </h4>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 h-5 w-5 rounded-lg accent-clay-forest"
            />
            <span className="text-sm leading-relaxed text-muted-foreground">
              본 작품은 본인이 직접 창작한 것이며, 타인의 저작권을 침해하지 않았음을 서약합니다.
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 h-5 w-5 rounded-lg accent-clay-forest"
            />
            <span className="text-sm leading-relaxed text-muted-foreground">
              AI를 이용한 대필 작품이 아님을 확인하며, 표절이 확인될 경우 수상을 취소함에 동의합니다.
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 h-5 w-5 rounded-lg accent-clay-forest"
            />
            <span className="text-sm leading-relaxed text-muted-foreground">
              당선작은 반환하지 않으며, 국립생태원이 수상자로부터 독점적인 이용 허락을 받아 향후 5년간 출판권을 행사할 수 있음에 동의합니다.
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="apply" className="px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="clay-card !rounded-2xl mx-auto flex flex-col items-center p-12">
            <div className="leaf-radius mb-6 flex h-16 w-16 items-center justify-center bg-clay-forest text-primary-foreground">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground">
              참가 신청이 완료되었습니다
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              소중한 작품을 보내주셔서 감사합니다.
              <br />
              심사 결과는 2026년 10월 중 공지될 예정입니다.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setCurrentStep(0)
              }}
              className="clay-button mt-8 bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground"
            >
              다시 신청하기
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="apply" className="px-6 py-24" ref={sectionRef}>
      <div
        className={`mx-auto max-w-2xl transition-all duration-1000 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-medium tracking-wide text-clay-terracotta uppercase">
            Application
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            참가 신청
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            아래 양식을 작성하여 작품을 제출해 주세요.
          </p>
        </div>

        <div className="clay-card !rounded-2xl p-8 md:p-10">
          <ProgressBar currentStep={currentStep} />

          <div className="relative min-h-[380px]">
            <StepOne visible={currentStep === 0} />
            <StepTwo visible={currentStep === 1} />
            <StepThree visible={currentStep === 2} />
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`clay-button flex items-center gap-2 px-5 py-3 text-sm font-medium transition-opacity ${
                currentStep === 0
                  ? "pointer-events-none opacity-0"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              이전
            </button>

            {currentStep < 2 ? (
              <button
                onClick={handleNext}
                className="clay-button flex items-center gap-2 bg-clay-forest px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                다음
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="clay-button flex items-center gap-2 bg-clay-forest px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                <Check className="h-4 w-4" />
                제출하기
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
