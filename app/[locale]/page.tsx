import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PositioningStrip from '@/components/PositioningStrip'
import Metrics from '@/components/Metrics'
import FeatureBanner from '@/components/FeatureBanner'
import About from '@/components/About'
import WhatIsMonkDB from '@/components/WhatIsMonkDB'
import CoreDifferentiation from '@/components/CoreDifferentiation'
import FeatureCards from '@/components/FeatureCards'
import HomeCapabilities from '@/components/HomeCapabilities'
import ReplaceYourStack from '@/components/ReplaceYourStack'
import Sovereignty from '@/components/Sovereignty'
import ArchitecturePillars from '@/components/ArchitecturePillars'
import HomeArchitecture from '@/components/HomeArchitecture'
import AIReady from '@/components/AIReady'
import HomePerformance from '@/components/HomePerformance'
import Mission from '@/components/Mission'
import CompetitionMatrix from '@/components/CompetitionMatrix'
import HomeUseCases from '@/components/HomeUseCases'
import ROI from '@/components/ROI'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />

      {/* docx Page 1 narrative interleaved with existing premium sections */}

      {/* 1. Hero — docx: "Where Data Becomes Action" */}
      <Hero />

      {/* 2. NEW (docx): Positioning Strip — From Data Systems to Execution Systems */}
      <PositioningStrip />

      {/* 3. Metrics — performance proof block (kept) */}
      <Metrics />

      {/* 4. FeatureBanner — kept */}
      <FeatureBanner />

      {/* 5. About — kept */}
      <About />

      {/* 6. NEW (docx): What is MonkDB — The AI-Native Unified Execution Engine */}
      <WhatIsMonkDB />

      {/* 7. NEW (docx): Core Differentiation — Most Platforms Stop at Insight. MonkDB Executes. */}
      <CoreDifferentiation />

      {/* 8. FeatureCards — kept */}
      <FeatureCards />

      {/* 9. NEW (docx): Capabilities — Six engines, one system */}
      <HomeCapabilities />

      {/* 10. NEW (docx): Replace Your Stack — clean comparison table */}
      <ReplaceYourStack />

      {/* 11. Sovereignty — kept */}
      <Sovereignty />

      {/* 11. ArchitecturePillars — kept */}
      <ArchitecturePillars />

      {/* 12. NEW (docx): Architecture flow — Data Sources -> MonkDB -> Intelligence -> Execution -> Applications */}
      <HomeArchitecture />

      {/* 13. AIReady — kept */}
      <AIReady />

      {/* 14. NEW (docx): Performance — Sub-millisecond, High concurrency, Scalable */}
      <HomePerformance />

      {/* 15. Mission — kept */}
      <Mission />

      {/* 16. CompetitionMatrix — kept */}
      <CompetitionMatrix />

      {/* 17. NEW (docx): Use Cases Overview — links to /solutions/use-cases/<slug> */}
      <HomeUseCases />

      {/* 18. ROI — kept */}
      <ROI />

      {/* 19. CTA — docx Final: "Stop managing data. Start running systems." */}
      <CTABanner />

      <Footer />
      <ScrollToTop />
    </main>
  )
}
