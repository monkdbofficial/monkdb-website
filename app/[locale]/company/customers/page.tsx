import type { Metadata } from 'next'
import CustomersContent from './CustomersContent'
import { buildPageMetadata } from '@/i18n/pageMetadata'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/company/customers'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('companyCustomers', locale)
}

export default function Page() {
  return <CustomersContent />
}
