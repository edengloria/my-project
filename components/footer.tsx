import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-secondary/30 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2.5">
          <Image
            src="/images/nie-logo.png"
            alt="국립생태원 로고"
            width={100}
            height={34}
            className="h-8 w-auto"
          />
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          충청남도 서천군 마서면 금강로 1210
          <br />
          전화: 041-950-5300 | 이메일: contest@nie.re.kr
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-clay-forest">
            개인정보처리방침
          </a>
          <span className="text-border">|</span>
          <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-clay-forest">
            이용약관
          </a>
          <span className="text-border">|</span>
          <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-clay-forest">
            국립생태원 홈페이지
          </a>
        </div>
        <p className="text-xs text-muted-foreground/60">
          {"© 2026 National Institute of Ecology. All rights reserved."}
        </p>
      </div>
    </footer>
  )
}
