import Navbar from '@/components/Navbar'
import PageBanner from '@/components/PageBanner'
import ROI from '@/components/ROI'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner title="Why Choose Us" />
      <ROI />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
