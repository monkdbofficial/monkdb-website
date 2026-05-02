import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import PageBanner from '@/components/PageBanner'
import CompetitionMatrix from '@/components/CompetitionMatrix'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { buildPageMetadata } from '@/i18n/pageMetadata'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/architecture'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('architecture', locale)
}

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner />
      <CompetitionMatrix />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
