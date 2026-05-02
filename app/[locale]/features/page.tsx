import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import PageBanner from '@/components/PageBanner'
import FeatureBanner from '@/components/FeatureBanner'
import FeatureCards from '@/components/FeatureCards'
import Mission from '@/components/Mission'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { buildPageMetadata } from '@/i18n/pageMetadata'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/features'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('features', locale)
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner />
      <FeatureBanner />
      <FeatureCards />
      <Mission />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
