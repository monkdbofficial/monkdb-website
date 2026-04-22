import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Metrics from '@/components/Metrics'
import FeatureBanner from '@/components/FeatureBanner'
import About from '@/components/About'
import FeatureCards from '@/components/FeatureCards'
import Sovereignty from '@/components/Sovereignty'
import ArchitecturePillars from '@/components/ArchitecturePillars'
import AIReady from '@/components/AIReady'
import Mission from '@/components/Mission'
import CompetitionMatrix from '@/components/CompetitionMatrix'
import ROI from '@/components/ROI'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <Hero />
      <Metrics />
      <FeatureBanner />
      <About />
      <FeatureCards />
      <Sovereignty />
      <ArchitecturePillars />
      <AIReady />
      <Mission />
      <CompetitionMatrix />
      <ROI />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
