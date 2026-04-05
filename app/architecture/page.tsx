import Navbar from '@/components/Navbar'
import PageBanner from '@/components/PageBanner'
import CompetitionMatrix from '@/components/CompetitionMatrix'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner title="Architecture" />
      <CompetitionMatrix />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
