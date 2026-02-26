import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { OverviewSection } from "@/components/overview-section"
import { DictionarySection } from "@/components/dictionary-section"
import { ApplicationForm } from "@/components/application-form"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <OverviewSection />
        <DictionarySection />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  )
}
