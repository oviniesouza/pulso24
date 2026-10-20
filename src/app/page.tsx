import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { InteractiveDemo } from '@/components/landing/interactive-demo';
import { RoiCalculator } from '@/components/landing/roi-calculator';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Features } from '@/components/landing/features';
import { Segments } from '@/components/landing/segments';
import { Testimonials } from '@/components/landing/testimonials';
import { Pricing } from '@/components/landing/pricing';
import { FAQ } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import { FloatingWhatsApp } from '@/components/landing/floating-whatsapp';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white selection:bg-emerald-500 selection:text-black">
      <Navbar />
      <Hero />
      <InteractiveDemo />
      <RoiCalculator />
      <HowItWorks />
      <Features />
      <Segments />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
