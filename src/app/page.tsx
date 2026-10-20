import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Segments } from '@/components/landing/segments';
import { Pricing } from '@/components/landing/pricing';
import { FAQ } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F19]">
      <Navbar />
      <Hero />
      <Features />
      <Segments />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
