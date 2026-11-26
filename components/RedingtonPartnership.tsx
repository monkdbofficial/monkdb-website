import { ArrowUpRight } from 'lucide-react'

export default function RedingtonPartnership() {
  return (
    <section aria-label="Redington partnership" className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-[#0f1623]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-7 sm:px-8 xl:flex-row xl:items-center xl:justify-between lg:px-14">
        <div className="flex min-w-0 items-center gap-5 sm:gap-8">
          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
            <img src="/logo.png" alt="MonkDB" className="h-auto w-[108px] sm:w-[132px]" />
            <span aria-hidden="true" className="h-9 w-px bg-slate-300 dark:bg-white/20" />
            <img src="/rd.png" alt="Redington" className="h-auto w-[116px] sm:w-[140px]" />
          </div>
          <div className="hidden h-10 w-px bg-slate-200 dark:bg-white/15 sm:block" aria-hidden="true" />
          <div className="hidden min-w-0 xl:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1A38E8]">Strategic ecosystem partnership</p>
            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-white">MonkDB is now on the Redington AI Exchange</p>
          </div>
        </div>
        <div className="flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between xl:justify-end">
          <p className="max-w-xl text-sm leading-5 text-slate-600 xl:hidden dark:text-slate-300">MonkDB is now on the Redington AI Exchange</p>
          <p className="hidden max-w-[390px] text-xs leading-5 text-slate-500 xl:block dark:text-slate-400">Connected data, context and AI capabilities for enterprise transformation.</p>
          <a href="/company/partners" className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#1A38E8] hover:underline">
            Learn more <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
