import Navbar from '@/components/Navbar'
import PageBanner from '@/components/PageBanner'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner title="Resources" />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
