import Navbar from '@/components/Navbar'
import PageBanner from '@/components/PageBanner'
import FeatureBanner from '@/components/FeatureBanner'
import FeatureCards from '@/components/FeatureCards'
import Mission from '@/components/Mission'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner title="Features" />
      <FeatureBanner />
      <FeatureCards />
      <Mission />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
