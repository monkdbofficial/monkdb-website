'use client'

/**
 * Partners — partner-program tier strip + 4-track partner types + benefits + CTA.
 * Distinct visual: tier ladder + 4-track grid (different from logo wall on customers).
 */

import { useState } from 'react'
import {
  ArrowUpRight,
  Search,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { useI18n } from '@/i18n/I18nProvider'

export default function PartnersContent() {
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).partners) ?? {}) as Record<string, string>

  const [partnerType, setPartnerType] = useState('All partners')
  const [partnerSearch, setPartnerSearch] = useState('')
  const PARTNER_TYPES = ['All partners', 'Distributor', 'System Integrator', 'Technology']
  const PARTNERS: { name: string; type: string; description: string; highlights: string[]; logo: string; href: string }[] = [
    { name: 'Redington', type: 'Distributor', description: 'MonkDB is available on the Redington AI Exchange. Redington connects the platform with its established enterprise and channel ecosystem.', highlights: ['Redington AI Exchange', 'Enterprise distribution', 'Channel ecosystem'], logo: '/rd.png', href: 'https://aiexchange.redingtongroup.com' },
    { name: 'Spritle', type: 'System Integrator', description: 'Spritle works with enterprise teams to design, integrate, and deliver AI solutions with MonkDB in production environments.', highlights: ['Enterprise AI engineering', 'System integration', 'Production delivery'], logo: '/spritle.png', href: 'https://www.spritle.com/' },
  ]
  const matchingPartners = PARTNERS.filter((partner) =>
    (partnerType === 'All partners' || partner.type === partnerType) &&
    `${partner.name} ${partner.type} ${partner.description}`.toLowerCase().includes(partnerSearch.toLowerCase().trim()),
  )
  const partnerCount = (type: string) => type === 'All partners' ? PARTNERS.length : PARTNERS.filter((partner) => partner.type === type).length

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner
        title={t.title ?? 'Partners'}
        subtitle={t.subtitle ?? 'Meet the distributors and solution teams bringing MonkDB to enterprise customers.'}
        compact
        variant="none"
      />

      {/* Partner directory */}
      <section className="bg-white py-12 sm:py-16 dark:bg-[#0f1623]">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <SectionLabel text="Partner ecosystem" />
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-light tracking-tight text-[#0A2280] sm:text-4xl dark:text-white">Find a MonkDB partner</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Connect with the partners helping bring MonkDB solutions to enterprise teams.</p>
            </div>
            <label className="relative block w-full lg:max-w-[340px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={partnerSearch} onChange={(event) => setPartnerSearch(event.target.value)} placeholder="Search by partner name" aria-label="Search partners" className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#1A38E8] dark:border-white/15 dark:bg-[#111D35] dark:text-white" />
            </label>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="border-b border-slate-200 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6 dark:border-white/10">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Partner type</h3>
              <div className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1" aria-label="Filter partners by type">
                {PARTNER_TYPES.map((type) => (
                  <button key={type} type="button" aria-pressed={partnerType === type} onClick={() => setPartnerType(type)} className={`flex shrink-0 items-center justify-between gap-4 rounded-md px-3 py-2.5 text-left text-sm transition lg:w-full ${partnerType === type ? 'bg-[#EEF2FF] font-semibold text-[#1A38E8] dark:bg-blue-400/10 dark:text-blue-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5'}`}>
                    <span>{type}</span><span className={`text-xs ${partnerType === type ? 'text-[#1A38E8] dark:text-blue-300' : 'text-slate-400'}`}>{partnerCount(type)}</span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="min-w-0">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-200 pb-3 dark:border-white/10">
                <h3 className="text-sm font-medium text-slate-800 dark:text-white">{partnerType === 'All partners' ? 'All partners' : `${partnerType} partners`}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">{matchingPartners.length} {matchingPartners.length === 1 ? 'result' : 'results'}</span>
              </div>

              {matchingPartners.length > 0 ? (
                <div className="grid gap-5 lg:grid-cols-2">
                  {matchingPartners.map((partner) => (
                    <article key={partner.name} className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(10,34,128,0.035)] transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_36px_rgba(10,34,128,0.08)] sm:p-6 dark:border-white/10 dark:bg-[#111D35] dark:hover:border-white/20">
                      <div className="flex h-[116px] items-center justify-between gap-4 rounded-lg bg-white px-5 sm:px-7">
                        <img src={partner.logo} alt={`${partner.name} logo`} className="h-auto max-h-14 w-full max-w-[240px] object-contain object-left" />
                        <span className="shrink-0 rounded-full bg-[#EEF2FF] px-3 py-1.5 text-xs font-semibold text-[#1A38E8]">{partner.type}</span>
                      </div>
                      <div className="mt-5 min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">{partner.type} partner</p>
                        <h4 className="mt-1 text-2xl font-medium tracking-tight text-slate-900 dark:text-white">{partner.name}</h4>
                      </div>
                      <p className="mt-3 min-h-[72px] text-base leading-6 text-slate-600 dark:text-slate-300">{partner.description}</p>
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${partner.name} focus areas`}>
                        {partner.highlights.map((highlight) => <li key={highlight} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">{highlight}</li>)}
                      </ul>
                      <div className="mt-6 border-t border-slate-200 pt-4 dark:border-white/10">
                        <a href={partner.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A38E8] hover:underline">Visit {partner.name} <ArrowUpRight size={15} /></a>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-8 text-center dark:border-white/10 dark:bg-white/[0.03]">
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{partnerSearch ? 'No matching partners' : 'Technology partners coming soon'}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{partnerSearch ? 'Try another name or choose a different partner type.' : 'Interested in joining the MonkDB technology ecosystem?'}</p>
                  {!partnerSearch && <a href="mailto:partners@monkdb.com" className="mt-3 inline-flex text-xs font-semibold text-[#1A38E8] hover:underline">Talk to our partnerships team <ArrowUpRight size={13} /></a>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Partner enquiry */}
      <section className="bg-[#F8F4F0] py-10 sm:py-12 dark:bg-[#0A1326]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-14">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1A38E8]">Grow the ecosystem</p>
            <h2 className="mt-1.5 text-2xl font-light tracking-tight text-[#0A2280] sm:text-3xl dark:text-white">Become a MonkDB partner</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">We work with distributors, system integrators, and technology teams to bring enterprise AI solutions into production.</p>
          </div>
          <a href="mailto:partners@monkdb.com" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#1A38E8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1029bd]">
            Contact Partnerships <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
