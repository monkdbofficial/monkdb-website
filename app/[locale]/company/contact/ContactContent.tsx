'use client'

/**
 * Contact — split layout: contact form (left) + reach options + offices (right).
 * Distinct visual: form-based UX, no card grids. The form is the centerpiece.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Briefcase,
  Megaphone,
  Users,
  Building2,
  Send,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { useI18n } from '@/i18n/I18nProvider'

const EASE = [0.165, 0.84, 0.44, 1] as const

const INITIAL_FORM = {
  name: '',
  company: '',
  email: '',
  phone: '',
  role: '',
  workload: '',
  message: '',
  acceptCommunications: false,
  website: '', // honeypot — must stay empty for the submission to be accepted
}

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState(INITIAL_FORM)
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).contact) ?? {}) as Record<string, string>

  const REACH_OPTIONS = [
    { Icon: Briefcase, title: t.reachSales ?? 'Sales', body: t.reachSalesBody ?? 'Talk to an engineer about your workload. We will scope a proof of value in your environment.', email: 'sales@monkdb.com' },
    { Icon: Users, title: t.reachSupport ?? 'Customer support', body: t.reachSupportBody ?? 'Already a customer? Reach support with priority routing.', email: 'support@monkdb.com' },
    { Icon: Building2, title: t.reachPartnerships ?? 'Partnerships', body: t.reachPartnershipsBody ?? 'Cloud, technology, system integrator, or ISV partner inquiries.', email: 'partners@monkdb.com' },
    { Icon: Megaphone, title: t.reachPress ?? 'Press and analyst', body: t.reachPressBody ?? 'Briefings, interviews, and analyst coverage.', email: 'press@monkdb.com' },
  ]

  const OFFICES = [
    { city: t.officeHyderabadCity ?? 'Hyderabad', country: t.officeIndia ?? 'India', address: t.officeHyderabadAddress ?? 'WeWork Raheja Mindspace Building 9, Floor 13, Mindspace IT Park, Madhapur, Hyderabad 500081, Telangana', role: t.officeHqRole ?? 'Headquarters' },
    { city: t.officeNewYorkCity ?? 'New York', country: t.officeUs ?? 'United States', address: t.officeNewYorkAddress ?? '100 Bowery, New York, NY 10013', role: t.officeAmericasRole ?? 'Americas hub' },
    { city: t.officeLondonCity ?? 'London', country: t.officeUk ?? 'United Kingdom', address: t.officeLondonAddress ?? '1 Finsbury Avenue, London EC2M 2PA', role: t.officeEmeaRole ?? 'EMEA hub' },
  ]

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const target = e.target
    const value =
      target instanceof HTMLInputElement && target.type === 'checkbox'
        ? target.checked
        : target.value
    setForm({ ...form, [target.name]: value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error ?? t.errorDefault ?? 'Failed to send message. Please try again.')
      }
      setSubmitted(true)
      setForm(INITIAL_FORM)
    } catch (err) {
      setError(err instanceof Error ? err.message : (t.errorNetwork ?? 'Network error. Please try again.'))
    } finally {
      setSubmitting(false)
    }
  }

  function handleSendAnother() {
    setSubmitted(false)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner
        title={t.title ?? 'Contact'}
        subtitle={t.subtitle ?? 'Talk to an engineer about your workload.'}
      />

      {/* Split: form left, sidebar right */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="rounded-2xl"
              style={{
                background: 'white',
                border: '1px solid rgba(10,34,128,0.10)',
                padding: 'clamp(28px, 3vw, 44px)',
              }}
            >
              <SectionLabel text={t.talkToUs ?? 'Talk to us'} />
              <h2
                className="text-[#0A2280] dark:text-white"
                style={{
                  fontSize: 'clamp(24px, 3vw, 40px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginTop: 'clamp(16px, 1.8vw, 28px)',
                  marginBottom: 'clamp(12px, 1.4vw, 20px)',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                {t.formTitle ?? 'Tell us about your workload'}
              </h2>
              <p
                className="text-gray-600 dark:text-gray-400"
                style={{
                  fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                  lineHeight: 1.65,
                  margin: '0 0 28px 0',
                  maxWidth: '520px',
                }}
              >
                {t.formIntro ?? 'We will route this to the right engineer and reply within one business day.'}
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label={t.fieldName ?? 'Name'}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label={t.fieldCompany ?? 'Company'}
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label={t.fieldEmail ?? 'Work email'}
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label={t.fieldPhone ?? 'Phone'}
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <Field
                    label={t.fieldRole ?? 'Role'}
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                  />
                  <SelectField
                    label={t.fieldWorkload ?? 'Primary workload'}
                    name="workload"
                    value={form.workload}
                    onChange={handleChange}
                    placeholder={t.selectOne ?? 'Select one'}
                    options={[
                      t.workload1 ?? 'Real-time analytics',
                      t.workload2 ?? 'AI/ML on live data',
                      t.workload3 ?? 'Vector and hybrid search',
                      t.workload4 ?? 'Streaming SQL',
                      t.workload5 ?? 'Edge intelligence',
                      t.workload6 ?? 'Autonomous decisioning',
                      t.workloadOther ?? 'Other',
                    ]}
                  />
                  <TextAreaField
                    label={t.fieldMessage ?? 'What are you trying to build?'}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                  <label className="flex items-start gap-3 mt-1">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      name="acceptCommunications"
                      checked={form.acceptCommunications}
                      onChange={handleChange}
                      style={{
                        width: 16,
                        height: 16,
                        marginTop: 2,
                        accentColor: '#1A38E8',
                        cursor: 'pointer',
                      }}
                    />
                    <span style={{ fontSize: 13, lineHeight: 1.55, color: '#4B5563' }}>
                      {t.consent ?? 'I agree to receive product updates and communications from MonkDB.'}
                    </span>
                  </label>
                  {/* Honeypot — hidden from real users, bots fill it, server rejects. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={handleChange}
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: 1,
                      height: 1,
                      opacity: 0,
                    }}
                  />
                  {error && (
                    <div
                      role="alert"
                      style={{
                        padding: '10px 14px',
                        borderRadius: 10,
                        background: 'rgba(220,38,38,0.06)',
                        border: '1px solid rgba(220,38,38,0.25)',
                        color: '#B91C1C',
                        fontSize: 13,
                        lineHeight: 1.5,
                      }}
                    >
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 self-start"
                    style={{
                      background: '#1A38E8',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '14px',
                      padding: '14px 28px',
                      borderRadius: '999px',
                      border: 'none',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.7 : 1,
                      boxShadow: '0 8px 22px rgba(26,56,232,0.32)',
                      marginTop: '8px',
                      transition: 'opacity 200ms ease',
                    }}
                  >
                    <Send size={14} strokeWidth={2.2} />
                    {submitting ? (t.sending ?? 'Sending…') : (t.send ?? 'Send message')}
                  </button>
                </form>
              ) : (
                <div
                  className="rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(26,56,232,0.06) 0%, rgba(30,138,255,0.05) 100%)',
                    border: '1px solid rgba(26,56,232,0.20)',
                    padding: 'clamp(24px, 2.6vw, 32px)',
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#1A38E8',
                    }}
                  >
                    {t.receivedLabel ?? 'Message received'}
                  </span>
                  <h3
                    className="text-[#0A2280]"
                    style={{
                      fontSize: 'clamp(20px, 2vw, 28px)',
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                      lineHeight: 1.25,
                      margin: '14px 0 12px 0',
                    }}
                  >
                    {t.thankYou ?? 'Thank you. We will be in touch.'}
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{
                      fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {t.thankYouBodyPrefix ?? 'A MonkDB engineer will reach out within one business day. For anything urgent, email'}{' '}
                    <a
                      href="mailto:sales@monkdb.com"
                      style={{ color: '#1A38E8', fontWeight: 500 }}
                    >
                      sales@monkdb.com
                    </a>
                    {t.thankYouBodySuffix ?? '.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleSendAnother}
                    style={{
                      marginTop: 18,
                      background: 'transparent',
                      color: '#1A38E8',
                      fontWeight: 600,
                      fontSize: 13,
                      padding: '10px 18px',
                      borderRadius: 999,
                      border: '1.5px solid rgba(26,56,232,0.3)',
                      cursor: 'pointer',
                    }}
                  >
                    {t.sendAnother ?? 'Send another message'}
                  </button>
                </div>
              )}
            </motion.div>

            {/* Sidebar: reach options + offices */}
            <aside className="flex flex-col gap-5 lg:sticky lg:top-32">
              {REACH_OPTIONS.map((opt, i) => (
                <motion.a
                  key={opt.title}
                  href={`mailto:${opt.email}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                  className="group block rounded-2xl"
                  style={{
                    background: '#F8F4F0',
                    border: '1px solid rgba(10,34,128,0.10)',
                    padding: 'clamp(20px, 2.4vw, 26px)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="inline-flex items-center justify-center rounded-xl flex-shrink-0"
                      style={{
                        width: 40,
                        height: 40,
                        background:
                          'linear-gradient(135deg, rgba(26,56,232,0.10) 0%, rgba(30,138,255,0.06) 100%)',
                        border: '1px solid rgba(26,56,232,0.18)',
                        color: '#1A38E8',
                      }}
                    >
                      <opt.Icon size={18} strokeWidth={1.6} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className="text-[#0A2280]"
                          style={{
                            fontSize: 'clamp(15px, 1.3vw, 18px)',
                            fontWeight: 500,
                            letterSpacing: '-0.005em',
                            margin: 0,
                          }}
                        >
                          {opt.title}
                        </h3>
                        <ArrowUpRight
                          size={14}
                          style={{ color: '#1A38E8' }}
                        />
                      </div>
                      <p
                        className="text-gray-600"
                        style={{
                          fontSize: '13px',
                          lineHeight: 1.55,
                          margin: '6px 0 8px 0',
                        }}
                      >
                        {opt.body}
                      </p>
                      <span
                        className="inline-flex items-center gap-1.5"
                        style={{
                          fontFamily:
                            'var(--font-mono, ui-monospace, monospace)',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#1A38E8',
                        }}
                      >
                        <Mail size={12} />
                        {opt.email}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </aside>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text={t.officesLabel ?? 'Offices'} />
          <h2
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(24px, 3.2vw, 40px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginTop: 'clamp(20px, 2.4vw, 40px)',
              marginBottom: 'clamp(28px, 3.5vw, 40px)',
              maxWidth: 'clamp(580px, 75vw, 1040px)',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            {t.officesTitle ?? 'Where we are'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {OFFICES.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="rounded-2xl"
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(22px, 2.6vw, 30px)',
                }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <MapPin size={16} style={{ color: '#1A38E8' }} />
                  <span
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#1A38E8',
                    }}
                  >
                    {office.role}
                  </span>
                </div>
                <h3
                  className="text-[#0A2280]"
                  style={{
                    fontSize: 'clamp(20px, 2vw, 28px)',
                    fontWeight: 400,
                    letterSpacing: '-0.012em',
                    lineHeight: 1.15,
                    margin: '0 0 4px 0',
                  }}
                >
                  {office.city}
                </h3>
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '11.5px',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(10,34,128,0.55)',
                  }}
                >
                  {office.country}
                </span>
                <p
                  className="text-gray-600 mt-4"
                  style={{
                    fontSize: '13.5px',
                    fontWeight: 400,
                    lineHeight: 1.55,
                    margin: '14px 0 0 0',
                  }}
                >
                  {office.address}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}

/* ───────── Form field atoms ───────── */

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(10,34,128,0.6)',
        }}
      >
        {label}
        {rest.required && <span style={{ color: '#DC2626' }}> *</span>}
      </span>
      <input
        {...rest}
        style={{
          padding: '12px 14px',
          background: '#F8F4F0',
          border: '1px solid rgba(10,34,128,0.12)',
          borderRadius: '10px',
          fontSize: '14px',
          color: '#0A2280',
          fontFamily: 'inherit',
          transition: 'border-color 200ms ease, background 200ms ease',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#1A38E8'
          e.currentTarget.style.background = 'white'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(10,34,128,0.12)'
          e.currentTarget.style.background = '#F8F4F0'
        }}
      />
    </label>
  )
}

function SelectField({
  label,
  options,
  placeholder,
  ...rest
}: {
  label: string
  options: string[]
  placeholder?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(10,34,128,0.6)',
        }}
      >
        {label}
      </span>
      <select
        {...rest}
        style={{
          padding: '12px 14px',
          background: '#F8F4F0',
          border: '1px solid rgba(10,34,128,0.12)',
          borderRadius: '10px',
          fontSize: '14px',
          color: '#0A2280',
          fontFamily: 'inherit',
          appearance: 'none',
          backgroundImage:
            'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' fill=\'none\' viewBox=\'0 0 14 14\'%3e%3cpath stroke=\'%231A38E8\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m3.5 5.25 3.5 3.5 3.5-3.5\'/%3e%3c/svg%3e")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
          paddingRight: '36px',
        }}
      >
        <option value="">{placeholder ?? 'Select one'}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

function TextAreaField({
  label,
  ...rest
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(10,34,128,0.6)',
        }}
      >
        {label}
        {rest.required && <span style={{ color: '#DC2626' }}> *</span>}
      </span>
      <textarea
        {...rest}
        rows={5}
        style={{
          padding: '12px 14px',
          background: '#F8F4F0',
          border: '1px solid rgba(10,34,128,0.12)',
          borderRadius: '10px',
          fontSize: '14px',
          color: '#0A2280',
          fontFamily: 'inherit',
          resize: 'vertical',
          minHeight: '120px',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#1A38E8'
          e.currentTarget.style.background = 'white'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(10,34,128,0.12)'
          e.currentTarget.style.background = '#F8F4F0'
        }}
      />
    </label>
  )
}
