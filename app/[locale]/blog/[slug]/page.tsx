import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import ScrollToTop from '@/components/ScrollToTop'
import { buildSlugPageMetadata } from '@/i18n/pageMetadata'
import { localizedHref } from '@/i18n/config'

const SLUG = 'monkdb-iiot-startup-to-watch-2026'
const TITLE = 'MonkDB recognized among 2026 IIoT startups to watch'
const DESCRIPTION =
  'DemystifyingPLM features MonkDB in its 2026 guide to startups to watch in IIoT and industrial connectivity.'
const SOURCE_URL = 'https://demystifyingplm.com/best-iiot-platforms-2026'

export function generateStaticParams() {
  return [{ slug: SLUG }]
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/blog/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (slug !== SLUG) return {}
  return buildSlugPageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: `/blog/${SLUG}`,
    locale,
  })
}

export default async function BlogPost({
  params,
}: PageProps<'/[locale]/blog/[slug]'>) {
  const { locale, slug } = await params
  if (slug !== SLUG) notFound()

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#0f1623] dark:text-white">
      <ScrollProgressBar />
      <Navbar />

      <article className="mx-auto max-w-[1120px] px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12">
        <Link
          href={localizedHref('/resources/blog', locale)}
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#3154C8] transition hover:text-[#1837B5] dark:text-blue-300 dark:hover:text-blue-200"
        >
          <ArrowLeft size={16} /> Blog
        </Link>

        <header className="mb-10 max-w-4xl border-b border-slate-200 pb-8 dark:border-white/10 sm:mb-12 sm:pb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#3154C8] dark:text-blue-300">
            Industry spotlight · 2026
          </p>
          <h1 className="mb-5 text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            {TITLE}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
            DemystifyingPLM features MonkDB in its guide to independent companies shaping IIoT and industrial connectivity.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
            <span>MonkDB</span><span aria-hidden="true">·</span><span>4 min read</span>
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div className="max-w-[720px] space-y-8 text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">
            <p>
              In its 2026 <em>Startups to Watch: IIoT and Industrial Connectivity</em> guide, DemystifyingPLM includes MonkDB among the independent companies to watch in the industrial connectivity landscape.
            </p>

            <section aria-labelledby="coverage-title" className="space-y-4">
              <h2 id="coverage-title" className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                A multi-model data layer for industrial systems
              </h2>
              <p>
                The guide describes MonkDB as an AI-native operational database with SQL, time-series, streaming, document, vector and graph capabilities in one engine. It highlights MonkDB’s role alongside manufacturing systems such as MES, ERP, quality and engineering platforms.
              </p>
              <p>
                This approach brings operational and AI workloads closer together, giving industrial teams a shared data layer for applications that need to work across multiple data types.
              </p>
            </section>

            <aside className="rounded-2xl border border-blue-100 bg-[#F4F7FF] p-5 dark:border-blue-300/15 dark:bg-blue-950/25 sm:p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#3154C8] dark:text-blue-300">Read the original coverage</p>
              <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Explore DemystifyingPLM’s full 2026 guide to IIoT and industrial connectivity startups.
              </p>
              <a
                href={SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-wrap items-center gap-2 text-sm font-semibold text-[#2445B5] underline decoration-[#2445B5]/30 underline-offset-4 transition hover:decoration-[#2445B5] dark:text-blue-300"
              >
                demystifyingplm.com/best-iiot-platforms-2026
                <ArrowUpRight size={15} />
              </a>
            </aside>
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 p-5 dark:border-white/10 dark:bg-white/[0.03] sm:p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">In this article</p>
            <p className="mb-4 text-lg font-semibold leading-snug text-slate-900 dark:text-white">MonkDB on the 2026 IIoT watchlist</p>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              A short look at the external coverage and the multi-model approach it highlights for industrial data and AI workloads.
            </p>
            <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2445B5] dark:text-blue-300">
              Visit DemystifyingPLM <ArrowUpRight size={15} />
            </a>
          </aside>
        </div>
      </article>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
