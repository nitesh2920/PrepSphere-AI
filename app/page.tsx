import Navbar from './_components/landing/Navbar'
import HeroSection from './_components/landing/HeroSection'
import Features from '@/components/features-1'
import ComparisonSection from './_components/landing/ComparisonSection'
import PricingSection from './_components/landing/PricingSection'
import FAQSection from './_components/landing/FAQSection'
import Footer from './_components/landing/Footer'
import LenisProvider from './_components/providers/LenisProvider'

export default function Home() {
  return (
    <LenisProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <section id="features">
            <Features />
          </section>
          <ComparisonSection />
          <section id="pricing">
            <PricingSection />
          </section>
          <section id="faq">
            <FAQSection />
          </section>
          {/* <CTASection /> */}
        </main>
        <Footer />
      </div>
    </LenisProvider>
  )
}
