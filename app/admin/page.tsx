'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  FileText,
  Github,
  PlayCircle,
  Youtube,
  Trash2,
  Upload,
  LogOut,
  Pencil,
  X,
  Briefcase,
  Library,
  Newspaper,
  ImageIcon,
  Download,
  LayoutDashboard,
  Settings,
  Search,
  Plus,
  KeyRound,
  Menu,
  ArrowUpRight,
  Check,
  Eye,
  type LucideIcon,
} from 'lucide-react'
import type { ResourceItem, ResourceKind } from '@/content/resourceLibrary'
import { RESOURCE_KIND_LABELS } from '@/content/resourceLibrary'
import type { JobItem, JobTeam } from '@/content/jobs'
import { JOB_TEAM_LABELS } from '@/content/jobs'
import type { PressItem, PressCategory } from '@/content/press'
import { PRESS_CATEGORY_LABELS } from '@/content/press'
import type { PressAssetItem } from '@/content/pressAssets'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { ToastProvider, useToast } from '@/components/admin/Toast'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

const KIND_ICONS: Record<ResourceKind, LucideIcon> = {
  whitepaper: FileText,
  github: Github,
  demo: PlayCircle,
  video: Youtube,
}

const KIND_ACCENTS: Record<ResourceKind, string> = {
  whitepaper: '#1A38E8',
  github: '#0A2280',
  demo: '#0EA5E9',
  video: '#DC2626',
}

type AdminTab = 'dashboard' | 'resources' | 'jobs' | 'press' | 'media' | 'settings'
type AuthState = 'unknown' | 'in' | 'out'

const NAV: { id: AdminTab; label: string; Icon: LucideIcon }[] = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'resources', label: 'Resources', Icon: Library },
  { id: 'jobs', label: 'Jobs', Icon: Briefcase },
  { id: 'press', label: 'Press', Icon: Newspaper },
  { id: 'media', label: 'Media Kit', Icon: ImageIcon },
  { id: 'settings', label: 'Settings', Icon: Settings },
]

const TAB_TITLES: Record<AdminTab, string> = {
  dashboard: 'Dashboard',
  resources: 'Resource library',
  jobs: 'Job listings',
  press: 'Press releases',
  media: 'Media kit',
  settings: 'Settings',
}

/* ════════════════════════════════════════════════════════════════════════ */

export default function AdminPage() {
  return (
    <ToastProvider>
      <AdminApp />
    </ToastProvider>
  )
}

function AdminApp() {
  const [auth, setAuth] = useState<AuthState>('unknown')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [busy, setBusy] = useState(false)
  const [tab, setTab] = useState<AdminTab>('dashboard')
  const [navOpen, setNavOpen] = useState(false)

  // Probe auth once on mount by hitting an admin-only endpoint.
  const probe = useCallback(async () => {
    try {
      const r = await fetch('/api/admin/resources', { cache: 'no-store' })
      setAuth(r.status === 401 ? 'out' : 'in')
    } catch {
      setAuth('out')
    }
  }, [])

  useEffect(() => {
    probe()
  }, [probe])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setLoginError('')
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!r.ok) {
        setLoginError('Wrong password.')
        return
      }
      setPassword('')
      setAuth('in')
    } catch {
      setLoginError('Login failed.')
    } finally {
      setBusy(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setAuth('out')
  }

  if (auth === 'unknown') {
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        <p>Loading…</p>
      </div>
    )
  }

  if (auth === 'out') {
    return <LoginScreen {...{ handleLogin, password, setPassword, loginError, busy }} />
  }

  return (
    <div className="admin-scope" style={{ minHeight: '100vh', display: 'flex', background: '#F4F6FC' }}>
      {/* Sidebar */}
      <aside
        className="admin-sidebar"
        data-open={navOpen}
        style={{
          width: 248,
          background: '#0A2280',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          flexShrink: 0,
        }}
      >
        <div style={{ padding: '22px 22px 18px 22px', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            MonkDB
          </span>
          <div style={{ fontSize: 19, fontWeight: 300, letterSpacing: '-0.01em', marginTop: 4 }}>
            Admin console
          </div>
        </div>

        <div style={{ padding: '16px 22px 6px 22px' }}>
          <span style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            Menu
          </span>
        </div>
        <nav style={{ padding: '0 12px 12px 12px', display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
          {NAV.map(({ id, label, Icon }) => {
            const active = tab === id
            return (
              <button
                key={id}
                onClick={() => {
                  setTab(id)
                  setNavOpen(false)
                }}
                className="admin-navitem inline-flex items-center gap-3"
                style={{
                  position: 'relative',
                  borderRadius: 10,
                  padding: '10px 12px',
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.72)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  boxShadow: active ? 'inset 3px 0 0 #1E8AFF' : 'none',
                }}
              >
                <Icon size={17} strokeWidth={1.9} />
                {label}
              </button>
            )
          })}
        </nav>

        <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.10)' }}>
          <button
            onClick={handleLogout}
            className="admin-navitem inline-flex items-center gap-3"
            style={{
              width: '100%',
              borderRadius: 10,
              padding: '10px 12px',
              fontSize: 14,
              background: 'transparent',
              color: 'rgba(255,255,255,0.72)',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <LogOut size={17} strokeWidth={1.9} /> Sign out
          </button>
        </div>
      </aside>

      {navOpen && (
        <div
          onClick={() => setNavOpen(false)}
          className="admin-scrim"
          style={{ position: 'fixed', inset: 0, background: 'rgba(10,20,60,0.4)', zIndex: 40 }}
        />
      )}

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            background: '#fff',
            borderBottom: '1px solid rgba(10,34,128,0.08)',
            padding: '16px clamp(16px, 3vw, 36px)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <button
            className="admin-burger"
            onClick={() => setNavOpen(true)}
            aria-label="Open menu"
            style={{
              display: 'none',
              border: '1px solid rgba(10,34,128,0.14)',
              background: '#fff',
              borderRadius: 8,
              padding: 8,
              cursor: 'pointer',
              color: '#0A2280',
            }}
          >
            <Menu size={18} />
          </button>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(10,34,128,0.45)',
              }}
            >
              {tab === 'dashboard' ? 'Overview' : 'Manage'}
            </div>
            <h1 className="text-[#0A2280]" style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 300, margin: '2px 0 0 0' }}>
              {TAB_TITLES[tab]}
            </h1>
          </div>

          <div className="admin-account flex items-center gap-3" style={{ marginLeft: 'auto' }}>
            <span
              className="inline-flex items-center gap-2"
              style={{
                borderRadius: 999,
                padding: '5px 12px 5px 10px',
                background: 'rgba(5,150,105,0.08)',
                border: '1px solid rgba(5,150,105,0.20)',
                fontSize: 12,
                fontWeight: 500,
                color: '#047857',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 0 3px rgba(16,185,129,0.18)' }} />
              Live
            </span>
            <span className="flex items-center gap-2">
              <span
                className="inline-flex items-center justify-center"
                style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #1A38E8, #0A2280)', color: '#fff', fontSize: 13, fontWeight: 600 }}
              >
                A
              </span>
              <span className="admin-account-name" style={{ fontSize: 13, fontWeight: 500, color: '#0A2280' }}>Administrator</span>
            </span>
          </div>
        </header>

        <main style={{ flex: 1, padding: 'clamp(18px, 3vw, 40px)', width: '100%', maxWidth: 1760, margin: '0 auto' }}>
          {tab === 'dashboard' && <DashboardPanel onJump={setTab} />}
          {tab === 'resources' && <ResourcesPanel />}
          {tab === 'jobs' && <JobsPanel />}
          {tab === 'press' && <PressPanel />}
          {tab === 'media' && <MediaKitPanel />}
          {tab === 'settings' && <SettingsPanel />}
        </main>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .admin-sidebar {
            position: fixed !important;
            z-index: 50;
            transform: translateX(-100%);
            transition: transform 0.22s ease;
          }
          .admin-sidebar[data-open="true"] { transform: translateX(0); }
          .admin-burger { display: inline-flex !important; }
        }
        @media (min-width: 861px) {
          .admin-scrim { display: none; }
        }
        @media (max-width: 560px) {
          .admin-account-name { display: none; }
        }
        .admin-cols { display: grid; gap: 20px; grid-template-columns: 1fr; align-items: start; }
        @media (min-width: 1240px) {
          .admin-cols { grid-template-columns: minmax(440px, 540px) 1fr; }
        }
      `}</style>
    </div>
  )
}

/* ── Login ────────────────────────────────────────────────────────────── */

function LoginScreen({
  handleLogin,
  password,
  setPassword,
  loginError,
  busy,
}: {
  handleLogin: (e: React.FormEvent) => void
  password: string
  setPassword: (v: string) => void
  loginError: string
  busy: boolean
}) {
  return (
    <div className="admin-scope min-h-screen grid place-items-center px-4" style={{ background: 'radial-gradient(circle at 50% 0%, #eef1fb 0%, #F4F6FC 55%)' }}>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white rounded-2xl admin-card"
        style={{ border: '1px solid rgba(10,34,128,0.10)', padding: 28, boxShadow: '0 24px 60px rgba(10,20,80,0.10)' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(10,34,128,0.5)',
          }}
        >
          MonkDB / Admin
        </span>
        <h1 className="text-[#0A2280]" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', fontWeight: 300, letterSpacing: '-0.01em', margin: '6px 0 6px 0' }}>
          Admin sign-in
        </h1>
        <p className="text-gray-500" style={{ fontSize: 13, margin: '0 0 20px 0', lineHeight: 1.5 }}>
          Enter the shared admin password to manage site content.
        </p>
        <label style={labelStyle}>Password</label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...inputStyle, marginBottom: 14 }}
        />
        {loginError && <p style={{ fontSize: 12, color: '#DC2626', margin: '0 0 12px 0' }}>{loginError}</p>}
        <button
          type="submit"
          disabled={busy || !password}
          className="admin-primary"
          style={{
            width: '100%',
            borderRadius: 999,
            padding: '11px 24px',
            fontWeight: 600,
            fontSize: 14,
            background: busy ? 'rgba(26,56,232,0.6)' : '#1A38E8',
            color: '#fff',
            border: 'none',
            cursor: busy ? 'wait' : 'pointer',
          }}
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

/* ── Dashboard ────────────────────────────────────────────────────────── */

function DashboardPanel({ onJump }: { onJump: (t: AdminTab) => void }) {
  const [counts, setCounts] = useState<Record<string, number | null>>({
    resources: null,
    jobs: null,
    press: null,
    media: null,
  })

  useEffect(() => {
    const endpoints: [string, string][] = [
      ['resources', '/api/admin/resources'],
      ['jobs', '/api/admin/jobs'],
      ['press', '/api/admin/press'],
      ['media', '/api/admin/press-assets'],
    ]
    endpoints.forEach(([key, url]) => {
      fetch(url, { cache: 'no-store' })
        .then((r) => r.json())
        .then((d: { items?: unknown[] }) =>
          setCounts((c) => ({ ...c, [key]: d.items?.length ?? 0 })),
        )
        .catch(() => setCounts((c) => ({ ...c, [key]: 0 })))
    })
  }, [])

  const cards: { id: AdminTab; label: string; Icon: LucideIcon; accent: string; key: string }[] = [
    { id: 'resources', label: 'Resources', Icon: Library, accent: '#1A38E8', key: 'resources' },
    { id: 'jobs', label: 'Open jobs', Icon: Briefcase, accent: '#0A2280', key: 'jobs' },
    { id: 'press', label: 'Press releases', Icon: Newspaper, accent: '#0EA5E9', key: 'press' },
    { id: 'media', label: 'Media kit assets', Icon: ImageIcon, accent: '#7C3AED', key: 'media' },
  ]

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {cards.map(({ id, label, Icon, accent, key }) => (
          <button
            key={id}
            onClick={() => onJump(id)}
            className="admin-stat admin-card"
            style={{
              textAlign: 'left',
              background: '#fff',
              border: '1px solid rgba(10,34,128,0.08)',
              borderRadius: 16,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="inline-flex items-center justify-center"
                style={{ width: 40, height: 40, borderRadius: 10, background: `${accent}14`, color: accent }}
              >
                <Icon size={19} strokeWidth={1.8} />
              </span>
              <ArrowUpRight size={16} style={{ color: '#c2c8d6' }} />
            </div>
            <div>
              <div className="text-[#0A2280]" style={{ fontSize: 34, fontWeight: 300, lineHeight: 1 }}>
                {counts[key] === null ? '—' : counts[key]}
              </div>
              <div style={{ fontSize: 12.5, color: '#6b7280', marginTop: 8, fontWeight: 500, letterSpacing: '0.01em' }}>
                {label}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        <Card>
          <SectionTitle>Quick actions</SectionTitle>
          <div className="flex flex-wrap gap-2" style={{ marginTop: 16 }}>
            <QuickAction Icon={Library} label="Add resource" onClick={() => onJump('resources')} />
            <QuickAction Icon={Briefcase} label="Add job" onClick={() => onJump('jobs')} />
            <QuickAction Icon={Newspaper} label="Add press release" onClick={() => onJump('press')} />
            <QuickAction Icon={ImageIcon} label="Add media asset" onClick={() => onJump('media')} />
            <QuickAction Icon={KeyRound} label="Change password" onClick={() => onJump('settings')} />
          </div>
        </Card>

        <Card>
          <SectionTitle>System</SectionTitle>
          <div style={{ marginTop: 16, display: 'grid', gap: 0 }}>
            <StatusRow label="Content database" value="Connected" ok />
            <StatusRow label="File storage" value="Cloudflare R2" ok />
            <StatusRow label="Rich text editor" value="Enabled" ok />
            <StatusRow label="Public site" value="Live" ok last />
          </div>
        </Card>
      </div>
    </div>
  )
}

function StatusRow({ label, value, ok, last }: { label: string; value: string; ok?: boolean; last?: boolean }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ padding: '11px 0', borderBottom: last ? 'none' : '1px solid rgba(10,34,128,0.07)' }}
    >
      <span style={{ fontSize: 13.5, color: '#4b5563' }}>{label}</span>
      <span className="inline-flex items-center gap-2" style={{ fontSize: 13, fontWeight: 500, color: ok ? '#047857' : '#6b7280' }}>
        {ok && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981' }} />}
        {value}
      </span>
    </div>
  )
}

function QuickAction({ Icon, label, onClick }: { Icon: LucideIcon; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="admin-quick inline-flex items-center gap-2"
      style={{
        borderRadius: 999,
        padding: '9px 16px',
        fontSize: 13.5,
        fontWeight: 500,
        background: 'rgba(26,56,232,0.06)',
        color: '#0A2280',
        border: '1px solid rgba(10,34,128,0.12)',
        cursor: 'pointer',
      }}
    >
      <Icon size={15} strokeWidth={1.8} /> {label}
    </button>
  )
}

/* ── Resources ────────────────────────────────────────────────────────── */

function ResourcesPanel() {
  const toast = useToast()
  const [items, setItems] = useState<ResourceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<ResourceKind | 'all'>('all')

  const [editingId, setEditingId] = useState<string | null>(null)
  const [kind, setKind] = useState<ResourceKind>('whitepaper')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [meta, setMeta] = useState('')
  const [body, setBody] = useState('')
  const [uploading, setUploading] = useState(false)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const resetForm = () => {
    setEditingId(null)
    setKind('whitepaper')
    setTitle('')
    setSummary('')
    setUrl('')
    setMeta('')
    setBody('')
  }

  const startEdit = (it: ResourceItem) => {
    setEditingId(it.id)
    setKind(it.kind)
    setTitle(it.title)
    setSummary(it.summary)
    setUrl(it.url)
    setMeta(it.meta ?? '')
    setBody(it.body ?? '')
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/resources', { cache: 'no-store' })
      const data = (await r.json()) as { items?: ResourceItem[] }
      setItems(data.items ?? [])
    } catch {
      toast.error('Failed to load resources.')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    load()
  }, [load])

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', kind === 'whitepaper' ? 'whitepapers' : 'resources')
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = (await r.json()) as { url?: string; error?: string }
      if (!r.ok || !data.url) {
        toast.error(data.error || 'Upload failed.')
        return
      }
      setUrl(data.url)
      toast.success('File uploaded to R2.')
    } catch {
      toast.error('Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !summary.trim() || !url.trim()) {
      toast.error('Title, summary, and URL are required.')
      return
    }
    try {
      const payload = { kind, title, summary, url, meta, body }
      const r = editingId
        ? await fetch('/api/admin/resources', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: editingId, ...payload }),
          })
        : await fetch('/api/admin/resources', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
      const data = (await r.json()) as { item?: ResourceItem; error?: string }
      if (!r.ok || !data.item) {
        toast.error(data.error || 'Could not save.')
        return
      }
      if (editingId) {
        setItems((cur) => cur.map((it) => (it.id === data.item!.id ? data.item! : it)))
        toast.success(`Updated: ${data.item.title}`)
      } else {
        setItems((cur) => [data.item!, ...cur])
        toast.success(`Added: ${data.item.title}`)
      }
      resetForm()
    } catch {
      toast.error('Could not save.')
    }
  }

  const doDelete = async (id: string) => {
    setConfirmId(null)
    try {
      const r = await fetch(`/api/admin/resources?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!r.ok) {
        toast.error('Could not delete.')
        return
      }
      setItems((cur) => cur.filter((it) => it.id !== id))
      toast.success('Resource removed.')
    } catch {
      toast.error('Could not delete.')
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((it) => {
      if (filter !== 'all' && it.kind !== filter) return false
      if (!q) return true
      return (it.title + ' ' + it.summary).toLowerCase().includes(q)
    })
  }, [items, query, filter])

  return (
    <div className="admin-cols">
      <Card>
        <FormHeader title={editingId ? 'Edit resource' : 'Add a resource'} editing={!!editingId} onCancel={resetForm} />
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
          <ChipRow>
            {(Object.keys(RESOURCE_KIND_LABELS) as ResourceKind[]).map((k) => {
              const Icon = KIND_ICONS[k]
              const active = kind === k
              return (
                <Chip key={k} active={active} accent={KIND_ACCENTS[k]} onClick={() => setKind(k)}>
                  <Icon size={14} strokeWidth={1.8} /> {RESOURCE_KIND_LABELS[k]}
                </Chip>
              )
            })}
          </ChipRow>

          <FormRow label="Title">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. The AI-Native Execution Engine" style={inputStyle} />
          </FormRow>
          <FormRow label="Summary">
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="One or two sentences shown on the card." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </FormRow>
          <FormRow label="URL">
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://… or upload a PDF below" style={inputStyle} />
          </FormRow>
          {kind === 'whitepaper' && (
            <FormRow label="Or upload a PDF (R2)">
              <UploadButton accept="application/pdf" uploading={uploading} label="Choose PDF" onFile={handleUpload} />
            </FormRow>
          )}
          <FormRow label="Meta (optional)">
            <input type="text" value={meta} onChange={(e) => setMeta(e.target.value)} placeholder="e.g. PDF · 18 pages" style={inputStyle} />
          </FormRow>
          <FormRow label="Body (rich text)">
            <RichTextEditor value={body} onChange={setBody} placeholder="Long-form description shown on the detail page." />
          </FormRow>
          <SubmitRow editing={!!editingId} label="resource" />
        </form>
      </Card>

      <div style={{ display: 'grid', gap: 20 }}>
      <PreviewShell hint="How this resource appears in the library and on its detail page." empty={!title && !summary}>
        <ResourcePreview kind={kind} title={title} summary={summary} meta={meta} body={body} />
      </PreviewShell>

      <Card>
        <ListHeader
          title="Resources"
          count={filtered.length}
          query={query}
          setQuery={setQuery}
          filter={
            <FilterSelect
              value={filter}
              onChange={(v) => setFilter(v as ResourceKind | 'all')}
              options={[['all', 'All types'], ...(Object.entries(RESOURCE_KIND_LABELS) as [string, string][])]}
            />
          }
        />
        {loading ? (
          <SkeletonList />
        ) : filtered.length === 0 ? (
          <Empty text="No resources match. Add one above or adjust the filter." />
        ) : (
          <ul style={listStyle}>
            {filtered.map((it) => {
              const Icon = KIND_ICONS[it.kind]
              const accent = KIND_ACCENTS[it.kind]
              return (
                <RowItem
                  key={it.id}
                  leading={
                    <span className="inline-flex items-center justify-center rounded-xl" style={{ width: 36, height: 36, background: `${accent}14`, border: `1px solid ${accent}44`, color: accent }}>
                      <Icon size={16} strokeWidth={1.8} />
                    </span>
                  }
                  title={it.title}
                  subtitle={it.summary}
                  meta={
                    <a href={it.url} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: 11, color: accent, textDecoration: 'none' }}>
                      {it.url}
                    </a>
                  }
                  onEdit={() => startEdit(it)}
                  onDelete={() => setConfirmId(it.id)}
                />
              )
            })}
          </ul>
        )}
      </Card>

      </div>

      <ConfirmDialog
        open={confirmId !== null}
        title="Remove resource?"
        message="This permanently removes the resource from the library."
        onConfirm={() => confirmId && doDelete(confirmId)}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  )
}

/* ── Jobs ─────────────────────────────────────────────────────────────── */

function JobsPanel() {
  const toast = useToast()
  const [items, setItems] = useState<JobItem[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<JobTeam | 'all'>('all')

  const [editingId, setEditingId] = useState<string | null>(null)
  const [team, setTeam] = useState<JobTeam>('engineering')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('Full-time')
  const [applyUrl, setApplyUrl] = useState('')
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const resetForm = () => {
    setEditingId(null)
    setTeam('engineering')
    setTitle('')
    setLocation('')
    setType('Full-time')
    setApplyUrl('')
  }

  const startEdit = (it: JobItem) => {
    setEditingId(it.id)
    setTeam(it.team)
    setTitle(it.title)
    setLocation(it.location)
    setType(it.type)
    setApplyUrl(it.applyUrl ?? '')
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/jobs', { cache: 'no-store' })
      const data = (await r.json()) as { items?: JobItem[] }
      setItems(data.items ?? [])
    } catch {
      toast.error('Failed to load jobs.')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    load()
  }, [load])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !location.trim()) {
      toast.error('Title and location are required.')
      return
    }
    try {
      const payload = { team, title, location, type, applyUrl }
      const r = editingId
        ? await fetch('/api/admin/jobs', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: editingId, ...payload }),
          })
        : await fetch('/api/admin/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
      const data = (await r.json()) as { item?: JobItem; error?: string }
      if (!r.ok || !data.item) {
        toast.error(data.error || 'Could not save.')
        return
      }
      if (editingId) {
        setItems((cur) => cur.map((it) => (it.id === data.item!.id ? data.item! : it)))
        toast.success(`Updated: ${data.item.title}`)
      } else {
        setItems((cur) => [data.item!, ...cur])
        toast.success(`Added: ${data.item.title}`)
      }
      resetForm()
    } catch {
      toast.error('Could not save.')
    }
  }

  const doDelete = async (id: string) => {
    setConfirmId(null)
    try {
      const r = await fetch(`/api/admin/jobs?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!r.ok) {
        toast.error('Could not delete.')
        return
      }
      setItems((cur) => cur.filter((it) => it.id !== id))
      toast.success('Job removed.')
    } catch {
      toast.error('Could not delete.')
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((it) => {
      if (filter !== 'all' && it.team !== filter) return false
      if (!q) return true
      return (it.title + ' ' + it.location).toLowerCase().includes(q)
    })
  }, [items, query, filter])

  return (
    <div className="admin-cols">
      <Card>
        <FormHeader title={editingId ? 'Edit job' : 'Add a job'} editing={!!editingId} onCancel={resetForm} />
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
          <ChipRow>
            {(Object.keys(JOB_TEAM_LABELS) as JobTeam[]).map((k) => (
              <Chip key={k} active={team === k} accent="#1A38E8" onClick={() => setTeam(k)}>
                {JOB_TEAM_LABELS[k]}
              </Chip>
            ))}
          </ChipRow>
          <FormRow label="Title">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Staff Engineer, Storage" style={inputStyle} />
          </FormRow>
          <FormRow label="Location">
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Remote (Global), Hyderabad" style={inputStyle} />
          </FormRow>
          <FormRow label="Type">
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Full-time / Contract / Internship" style={inputStyle} />
          </FormRow>
          <FormRow label="Apply URL (optional)">
            <input type="text" value={applyUrl} onChange={(e) => setApplyUrl(e.target.value)} placeholder="https://… (defaults to mailto:careers@monkdb.com)" style={inputStyle} />
          </FormRow>
          <SubmitRow editing={!!editingId} label="job" />
        </form>
      </Card>

      <div style={{ display: 'grid', gap: 20 }}>
      <PreviewShell hint="How this role appears on the careers page." empty={!title && !location}>
        <JobPreview team={team} title={title} location={location} type={type} />
      </PreviewShell>

      <Card>
        <ListHeader
          title="Jobs"
          count={filtered.length}
          query={query}
          setQuery={setQuery}
          filter={
            <FilterSelect
              value={filter}
              onChange={(v) => setFilter(v as JobTeam | 'all')}
              options={[['all', 'All teams'], ...(Object.entries(JOB_TEAM_LABELS) as [string, string][])]}
            />
          }
        />
        {loading ? (
          <SkeletonList />
        ) : filtered.length === 0 ? (
          <Empty text="No jobs match. Add one above and it appears on the careers page." />
        ) : (
          <ul style={listStyle}>
            {filtered.map((it) => (
              <RowItem
                key={it.id}
                title={it.title}
                eyebrow={JOB_TEAM_LABELS[it.team]}
                subtitle={`${it.location} · ${it.type}`}
                meta={
                  it.applyUrl ? (
                    <a href={it.applyUrl} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: 11, color: '#1A38E8', textDecoration: 'none' }}>
                      {it.applyUrl}
                    </a>
                  ) : null
                }
                onEdit={() => startEdit(it)}
                onDelete={() => setConfirmId(it.id)}
              />
            ))}
          </ul>
        )}
      </Card>

      </div>

      <ConfirmDialog
        open={confirmId !== null}
        title="Remove job?"
        message="This removes the listing from the careers page."
        onConfirm={() => confirmId && doDelete(confirmId)}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  )
}

/* ── Press ────────────────────────────────────────────────────────────── */

function PressPanel() {
  const toast = useToast()
  const [items, setItems] = useState<PressItem[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<PressCategory | 'all'>('all')

  const [editingId, setEditingId] = useState<string | null>(null)
  const [category, setCategory] = useState<PressCategory>('product')
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [date, setDate] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const resetForm = () => {
    setEditingId(null)
    setCategory('product')
    setTitle('')
    setExcerpt('')
    setDate('')
    setImageUrl('')
    setLinkUrl('')
  }

  const startEdit = (it: PressItem) => {
    setEditingId(it.id)
    setCategory(it.category)
    setTitle(it.title)
    setExcerpt(it.excerpt)
    setDate(it.date)
    setImageUrl(it.imageUrl ?? '')
    setLinkUrl(it.linkUrl ?? '')
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/press', { cache: 'no-store' })
      const data = (await r.json()) as { items?: PressItem[] }
      setItems(data.items ?? [])
    } catch {
      toast.error('Failed to load press releases.')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    load()
  }, [load])

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'press')
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = (await r.json()) as { url?: string; error?: string }
      if (!r.ok || !data.url) {
        toast.error(data.error || 'Upload failed.')
        return
      }
      setImageUrl(data.url)
      toast.success('Image uploaded to R2.')
    } catch {
      toast.error('Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !excerpt.trim() || !date.trim()) {
      toast.error('Title, excerpt, and date are required.')
      return
    }
    try {
      const payload = { category, title, excerpt, date, imageUrl, linkUrl }
      const r = editingId
        ? await fetch('/api/admin/press', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: editingId, ...payload }),
          })
        : await fetch('/api/admin/press', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
      const data = (await r.json()) as { item?: PressItem; error?: string }
      if (!r.ok || !data.item) {
        toast.error(data.error || 'Could not save.')
        return
      }
      if (editingId) {
        setItems((cur) => cur.map((it) => (it.id === data.item!.id ? data.item! : it)))
        toast.success(`Updated: ${data.item.title}`)
      } else {
        setItems((cur) => [data.item!, ...cur])
        toast.success(`Added: ${data.item.title}`)
      }
      resetForm()
    } catch {
      toast.error('Could not save.')
    }
  }

  const doDelete = async (id: string) => {
    setConfirmId(null)
    try {
      const r = await fetch(`/api/admin/press?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!r.ok) {
        toast.error('Could not delete.')
        return
      }
      setItems((cur) => cur.filter((it) => it.id !== id))
      toast.success('Press release removed.')
    } catch {
      toast.error('Could not delete.')
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((it) => {
      if (filter !== 'all' && it.category !== filter) return false
      if (!q) return true
      return (it.title + ' ' + it.excerpt).toLowerCase().includes(q)
    })
  }, [items, query, filter])

  return (
    <div className="admin-cols">
      <Card>
        <FormHeader title={editingId ? 'Edit press release' : 'Add a press release'} editing={!!editingId} onCancel={resetForm} />
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
          <ChipRow>
            {(Object.keys(PRESS_CATEGORY_LABELS) as PressCategory[]).map((k) => (
              <Chip key={k} active={category === k} accent="#1A38E8" onClick={() => setCategory(k)}>
                {PRESS_CATEGORY_LABELS[k]}
              </Chip>
            ))}
          </ChipRow>
          <FormRow label="Title">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. MonkDB launches AI-Native Operational Intelligence" style={inputStyle} />
          </FormRow>
          <FormRow label="Excerpt (rich text)">
            <RichTextEditor value={excerpt} onChange={setExcerpt} placeholder="One or two sentences shown under the headline." />
          </FormRow>
          <FormRow label="Date">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
          </FormRow>
          <FormRow label="Image">
            <div style={{ display: 'grid', gap: 10 }}>
              <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://… or upload an image below" style={inputStyle} />
              <UploadButton accept="image/*" uploading={uploading} label="Choose image (R2)" onFile={handleUpload} />
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="Press preview" style={{ width: '100%', maxWidth: 320, height: 'auto', borderRadius: 10, border: '1px solid rgba(10,34,128,0.10)' }} />
              )}
            </div>
          </FormRow>
          <FormRow label="Article link (optional)">
            <input type="text" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://… full article or release" style={inputStyle} />
          </FormRow>
          <SubmitRow editing={!!editingId} label="press release" />
        </form>
      </Card>

      <div style={{ display: 'grid', gap: 20 }}>
      <PreviewShell hint="How this appears in the press timeline." empty={!title && !excerpt}>
        <PressPreview category={category} title={title} excerpt={excerpt} date={date} imageUrl={imageUrl} />
      </PreviewShell>

      <Card>
        <ListHeader
          title="Press releases"
          count={filtered.length}
          query={query}
          setQuery={setQuery}
          filter={
            <FilterSelect
              value={filter}
              onChange={(v) => setFilter(v as PressCategory | 'all')}
              options={[['all', 'All categories'], ...(Object.entries(PRESS_CATEGORY_LABELS) as [string, string][])]}
            />
          }
        />
        {loading ? (
          <SkeletonList />
        ) : filtered.length === 0 ? (
          <Empty text="No press releases match. Add one above and it appears on the press page." />
        ) : (
          <ul style={listStyle}>
            {filtered.map((it) => (
              <RowItem
                key={it.id}
                leading={
                  <span className="inline-flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden', background: 'rgba(26,56,232,0.06)', border: '1px solid rgba(10,34,128,0.10)', color: '#1A38E8' }}>
                    {it.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <ImageIcon size={18} strokeWidth={1.6} />
                    )}
                  </span>
                }
                eyebrow={`${PRESS_CATEGORY_LABELS[it.category]} · ${it.date}`}
                title={it.title}
                subtitle={stripHtml(it.excerpt)}
                onEdit={() => startEdit(it)}
                onDelete={() => setConfirmId(it.id)}
              />
            ))}
          </ul>
        )}
      </Card>

      </div>

      <ConfirmDialog
        open={confirmId !== null}
        title="Remove press release?"
        message="This removes it from the press page."
        onConfirm={() => confirmId && doDelete(confirmId)}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  )
}

/* ── Media kit ────────────────────────────────────────────────────────── */

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function MediaKitPanel() {
  const toast = useToast()
  const [items, setItems] = useState<PressAssetItem[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  const [editingId, setEditingId] = useState<string | null>(null)
  const [label, setLabel] = useState('')
  const [size, setSize] = useState('')
  const [url, setUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const resetForm = () => {
    setEditingId(null)
    setLabel('')
    setSize('')
    setUrl('')
  }

  const startEdit = (it: PressAssetItem) => {
    setEditingId(it.id)
    setLabel(it.label)
    setSize(it.size ?? '')
    setUrl(it.url ?? '')
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/press-assets', { cache: 'no-store' })
      const data = (await r.json()) as { items?: PressAssetItem[] }
      setItems(data.items ?? [])
    } catch {
      toast.error('Failed to load media kit.')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    load()
  }, [load])

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'media-kit')
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = (await r.json()) as { url?: string; error?: string }
      if (!r.ok || !data.url) {
        toast.error(data.error || 'Upload failed.')
        return
      }
      setUrl(data.url)
      if (!size) setSize(formatBytes(file.size))
      if (!label) setLabel(file.name)
      toast.success('Asset uploaded to R2.')
    } catch {
      toast.error('Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!label.trim()) {
      toast.error('Label is required.')
      return
    }
    try {
      const payload = { label, size, url }
      const r = editingId
        ? await fetch('/api/admin/press-assets', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: editingId, ...payload }),
          })
        : await fetch('/api/admin/press-assets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
      const data = (await r.json()) as { item?: PressAssetItem; error?: string }
      if (!r.ok || !data.item) {
        toast.error(data.error || 'Could not save.')
        return
      }
      if (editingId) {
        setItems((cur) => cur.map((it) => (it.id === data.item!.id ? data.item! : it)))
        toast.success(`Updated: ${data.item.label}`)
      } else {
        setItems((cur) => [...cur, data.item!])
        toast.success(`Added: ${data.item.label}`)
      }
      resetForm()
    } catch {
      toast.error('Could not save.')
    }
  }

  const doDelete = async (id: string) => {
    setConfirmId(null)
    try {
      const r = await fetch(`/api/admin/press-assets?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!r.ok) {
        toast.error('Could not delete.')
        return
      }
      setItems((cur) => cur.filter((it) => it.id !== id))
      toast.success('Asset removed.')
    } catch {
      toast.error('Could not delete.')
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((it) => it.label.toLowerCase().includes(q))
  }, [items, query])

  return (
    <div className="admin-cols">
      <Card>
        <FormHeader title={editingId ? 'Edit media asset' : 'Add a media asset'} editing={!!editingId} onCancel={resetForm} />
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
          <FormRow label="Label">
            <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Logo pack (PNG, SVG)" style={inputStyle} />
          </FormRow>
          <FormRow label="File (R2)">
            <div style={{ display: 'grid', gap: 10 }}>
              <UploadButton accept="*/*" uploading={uploading} label="Choose file (R2)" onFile={handleUpload} />
              <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://… download URL" style={inputStyle} />
            </div>
          </FormRow>
          <FormRow label="Size (optional)">
            <input type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder="e.g. 4.2 MB (auto-filled on upload)" style={inputStyle} />
          </FormRow>
          <SubmitRow editing={!!editingId} label="asset" />
        </form>
      </Card>

      <div style={{ display: 'grid', gap: 20 }}>
      <PreviewShell hint="How this asset appears in the press media kit." empty={!label}>
        <MediaPreview label={label} size={size} url={url} />
      </PreviewShell>

      <Card>
        <ListHeader title="Media kit" count={filtered.length} query={query} setQuery={setQuery} />
        {loading ? (
          <SkeletonList />
        ) : filtered.length === 0 ? (
          <Empty text="No media assets yet. Add one above and it appears in the press media kit." />
        ) : (
          <ul style={listStyle}>
            {filtered.map((it) => (
              <RowItem
                key={it.id}
                leading={
                  <span className="inline-flex items-center justify-center rounded-xl" style={{ width: 36, height: 36, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.30)', color: '#7C3AED' }}>
                    <Download size={16} strokeWidth={1.8} />
                  </span>
                }
                title={it.label}
                subtitle={it.size || 'No size set'}
                meta={
                  it.url ? (
                    <a href={it.url} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: 11, color: '#7C3AED', textDecoration: 'none' }}>
                      {it.url}
                    </a>
                  ) : (
                    <span style={{ fontSize: 11, color: '#DC2626' }}>No file attached yet</span>
                  )
                }
                onEdit={() => startEdit(it)}
                onDelete={() => setConfirmId(it.id)}
              />
            ))}
          </ul>
        )}
      </Card>

      </div>

      <ConfirmDialog
        open={confirmId !== null}
        title="Remove media asset?"
        message="This removes it from the press media kit."
        onConfirm={() => confirmId && doDelete(confirmId)}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  )
}

/* ── Settings ─────────────────────────────────────────────────────────── */

function SettingsPanel() {
  const toast = useToast()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (next.length < 8) {
      toast.error('New password must be at least 8 characters.')
      return
    }
    if (next !== confirm) {
      toast.error('New passwords do not match.')
      return
    }
    setBusy(true)
    try {
      const r = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current, next }),
      })
      const data = (await r.json()) as { ok?: boolean; error?: string }
      if (!r.ok || !data.ok) {
        const msg =
          data.error === 'wrong_current'
            ? 'Current password is incorrect.'
            : data.error === 'too_short'
              ? 'New password is too short.'
              : 'Could not change password.'
        toast.error(msg)
        return
      }
      toast.success('Password changed.')
      setCurrent('')
      setNext('')
      setConfirm('')
    } catch {
      toast.error('Could not change password.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-cols">
      <Card>
        <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
          <span className="inline-flex items-center justify-center" style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(26,56,232,0.10)', color: '#1A38E8' }}>
            <KeyRound size={18} strokeWidth={1.9} />
          </span>
          <div>
            <h2 className="text-[#0A2280]" style={{ fontSize: 17, fontWeight: 600, margin: 0 }}>Change admin password</h2>
            <p style={{ fontSize: 13, color: '#6b7280', margin: '2px 0 0 0' }}>Used to sign in to this console.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
          <FormRow label="Current password">
            <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} style={inputStyle} autoComplete="current-password" />
          </FormRow>
          <FormRow label="New password">
            <input type="password" value={next} onChange={(e) => setNext(e.target.value)} style={inputStyle} autoComplete="new-password" placeholder="At least 8 characters" />
          </FormRow>
          <FormRow label="Confirm new password">
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} style={inputStyle} autoComplete="new-password" />
          </FormRow>
          <div>
            <button type="submit" disabled={busy} className="admin-primary" style={{ borderRadius: 999, padding: '11px 24px', fontWeight: 600, fontSize: 14, background: busy ? 'rgba(26,56,232,0.6)' : '#1A38E8', color: '#fff', border: 'none', cursor: busy ? 'wait' : 'pointer' }}>
              {busy ? 'Saving…' : 'Update password'}
            </button>
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="text-[#0A2280]" style={{ fontSize: 17, fontWeight: 600, margin: '0 0 4px 0' }}>Security guidance</h2>
        <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 16px 0' }}>Best practices for this shared admin account.</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
          <TipRow text="Use at least 12 characters with a mix of letters, numbers, and symbols." />
          <TipRow text="Do not reuse a password from another service." />
          <TipRow text="Rotate the password if anyone leaves the team or it may be exposed." />
          <TipRow text="Sign out when working on a shared or public computer." />
        </ul>
      </Card>
    </div>
  )
}

function TipRow({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="inline-flex items-center justify-center" style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(5,150,105,0.10)', color: '#047857', flexShrink: 0, marginTop: 1 }}>
        <Check size={13} strokeWidth={2.4} />
      </span>
      <span style={{ fontSize: 13.5, color: '#4b5563', lineHeight: 1.55 }}>{text}</span>
    </li>
  )
}

/* ── Shared UI ────────────────────────────────────────────────────────── */

const inputStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 10,
  border: '1px solid rgba(10,34,128,0.20)',
  padding: '10px 12px',
  fontSize: 14,
  outline: 'none',
  background: '#fff',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#0A2280',
  marginBottom: 6,
}

const listStyle: React.CSSProperties = { listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }

function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="admin-card" style={{ background: '#fff', border: '1px solid rgba(10,34,128,0.08)', borderRadius: 16, padding: 'clamp(18px, 2.2vw, 26px)' }}>
      {children}
    </section>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[#0A2280]" style={{ fontSize: 17, fontWeight: 600, margin: 0 }}>{children}</h2>
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

function FormHeader({ title, editing, onCancel }: { title: string; editing: boolean; onCancel: () => void }) {
  return (
    <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
      <SectionTitle>{title}</SectionTitle>
      {editing && (
        <button type="button" onClick={onCancel} className="inline-flex items-center gap-1" style={{ borderRadius: 999, padding: '6px 12px', fontSize: 12, fontWeight: 500, background: 'rgba(10,34,128,0.06)', color: '#0A2280', border: '1px solid rgba(10,34,128,0.12)', cursor: 'pointer' }}>
          <X size={12} strokeWidth={2} /> Cancel edit
        </button>
      )}
    </div>
  )
}

function SubmitRow({ editing, label }: { editing: boolean; label: string }) {
  return (
    <div>
      <button type="submit" className="admin-primary inline-flex items-center gap-2" style={{ borderRadius: 999, padding: '11px 24px', fontWeight: 600, fontSize: 14, background: '#1A38E8', color: '#fff', border: 'none', cursor: 'pointer' }}>
        <Plus size={15} strokeWidth={2} />
        {editing ? `Update ${label}` : `Save ${label}`}
      </button>
    </div>
  )
}

function ChipRow({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8 }}>{children}</div>
}

function Chip({ active, accent, onClick, children }: { active: boolean; accent: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="admin-chip inline-flex items-center gap-2 justify-center" style={{ borderRadius: 999, padding: '8px 14px', fontSize: 13, fontWeight: 500, background: active ? accent : 'rgba(10,34,128,0.06)', color: active ? '#fff' : '#0A2280', border: active ? `1px solid ${accent}` : '1px solid rgba(10,34,128,0.12)', cursor: 'pointer' }}>
      {children}
    </button>
  )
}

function UploadButton({ accept, uploading, label, onFile }: { accept: string; uploading: boolean; label: string; onFile: (f: File) => void }) {
  return (
    <label className="inline-flex items-center gap-2" style={{ borderRadius: 10, border: '1px dashed rgba(10,34,128,0.30)', padding: '12px 14px', cursor: uploading ? 'wait' : 'pointer', color: '#0A2280', fontSize: 13, background: 'rgba(26,56,232,0.04)', width: 'fit-content' }}>
      <Upload size={14} strokeWidth={1.8} />
      {uploading ? 'Uploading…' : label}
      <input
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        disabled={uploading}
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onFile(f)
          e.target.value = ''
        }}
      />
    </label>
  )
}

function ListHeader({
  title,
  count,
  query,
  setQuery,
  filter,
}: {
  title: string
  count: number
  query: string
  setQuery: (v: string) => void
  filter?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 justify-between" style={{ marginBottom: 16 }}>
      <SectionTitle>
        {title} <span style={{ color: '#9ca3af', fontWeight: 400 }}>({count})</span>
      </SectionTitle>
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-2" style={{ borderRadius: 999, border: '1px solid rgba(10,34,128,0.16)', padding: '7px 12px', background: '#fff' }}>
          <Search size={14} style={{ color: '#9ca3af' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            style={{ border: 'none', outline: 'none', fontSize: 13, width: 'clamp(100px, 30vw, 180px)', background: 'transparent' }}
          />
        </div>
        {filter}
      </div>
    </div>
  )
}

function FilterSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ borderRadius: 999, border: '1px solid rgba(10,34,128,0.16)', padding: '8px 12px', fontSize: 13, background: '#fff', color: '#0A2280', cursor: 'pointer', outline: 'none' }}
    >
      {options.map(([v, l]) => (
        <option key={v} value={v}>
          {l}
        </option>
      ))}
    </select>
  )
}

function RowItem({
  leading,
  eyebrow,
  title,
  subtitle,
  meta,
  onEdit,
  onDelete,
}: {
  leading?: React.ReactNode
  eyebrow?: string
  title: string
  subtitle?: string
  meta?: React.ReactNode
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <li
      className="admin-row"
      style={{
        display: 'grid',
        gridTemplateColumns: leading ? 'auto 1fr auto' : '1fr auto',
        gap: 14,
        alignItems: 'start',
        padding: 14,
        border: '1px solid rgba(10,34,128,0.08)',
        borderRadius: 12,
        background: '#FAFBFF',
      }}
    >
      {leading}
      <div style={{ minWidth: 0 }}>
        {eyebrow && (
          <div style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1A38E8', marginBottom: 4 }}>
            {eyebrow}
          </div>
        )}
        <div className="text-[#0A2280]" style={{ fontSize: 14, fontWeight: 500 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 12, color: '#6b7280', margin: '2px 0 4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '52ch' }}>
            {subtitle}
          </div>
        )}
        {meta && <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '52ch' }}>{meta}</div>}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={onEdit} title="Edit" className="admin-iconbtn" style={{ border: '1px solid rgba(10,34,128,0.20)', background: 'rgba(26,56,232,0.06)', color: '#0A2280', borderRadius: 8, padding: '8px 10px', cursor: 'pointer' }}>
          <Pencil size={14} strokeWidth={1.8} />
        </button>
        <button onClick={onDelete} title="Remove" className="admin-iconbtn" style={{ border: '1px solid rgba(220,38,38,0.30)', background: 'rgba(220,38,38,0.06)', color: '#DC2626', borderRadius: 8, padding: '8px 10px', cursor: 'pointer' }}>
          <Trash2 size={14} strokeWidth={1.8} />
        </button>
      </div>
    </li>
  )
}

function Empty({ text }: { text: string }) {
  return <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>{text}</p>
}

/** Strip HTML tags for compact list previews of rich-text fields. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function isHtml(s: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(s)
}

function prettyDate(iso: string): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const previewHintStyle: React.CSSProperties = { fontSize: 12, color: '#9aa3b2', margin: '2px 0 18px 0' }

function PreviewShell({ hint, empty, children }: { hint: string; empty: boolean; children: React.ReactNode }) {
  return (
    <Card>
      <div className="flex items-center gap-2" style={{ marginBottom: 2 }}>
        <Eye size={15} strokeWidth={1.9} style={{ color: '#1A38E8' }} />
        <SectionTitle>Live preview</SectionTitle>
      </div>
      <p style={previewHintStyle}>{hint}</p>
      <div
        style={{
          border: '1px dashed rgba(10,34,128,0.16)',
          borderRadius: 14,
          padding: 'clamp(16px, 2vw, 22px)',
          background: '#fff',
        }}
      >
        {empty ? (
          <p style={{ fontSize: 13, color: '#9ca3af', fontStyle: 'italic', margin: 0 }}>
            Fill in the form to see a live preview here.
          </p>
        ) : (
          children
        )}
      </div>
    </Card>
  )
}

const catPillStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: '#1A38E8',
  padding: '3px 8px',
  borderRadius: 4,
  background: 'rgba(26,56,232,0.06)',
  border: '1px solid rgba(26,56,232,0.16)',
}

function PressPreview({ category, title, excerpt, date, imageUrl }: { category: PressCategory; title: string; excerpt: string; date: string; imageUrl: string }) {
  return (
    <div style={{ position: 'relative', paddingLeft: 26 }}>
      <span aria-hidden style={{ position: 'absolute', left: 0, top: 6, width: 13, height: 13, borderRadius: '50%', background: '#fff', border: '2px solid #1A38E8', boxShadow: '0 0 0 4px rgba(26,56,232,0.10)' }} />
      <div className="flex items-center gap-3 flex-wrap" style={{ marginBottom: 8 }}>
        <time style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.06em', color: 'rgba(10,34,128,0.55)' }}>{prettyDate(date)}</time>
        <span style={catPillStyle}>{PRESS_CATEGORY_LABELS[category]}</span>
      </div>
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" style={{ width: '100%', maxWidth: 420, aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(10,34,128,0.10)', margin: '0 0 12px 0', display: 'block' }} />
      )}
      <h3 style={{ color: '#0A2280', fontSize: 'clamp(18px, 1.6vw, 22px)', fontWeight: 500, letterSpacing: '-0.012em', lineHeight: 1.25, margin: '0 0 8px 0' }}>
        {title || 'Untitled release'}
      </h3>
      {excerpt && (isHtml(excerpt) ? (
        <div className="richtext" style={{ color: '#4b5563', fontSize: 15 }} dangerouslySetInnerHTML={{ __html: excerpt }} />
      ) : (
        <p style={{ color: '#4b5563', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{excerpt}</p>
      ))}
    </div>
  )
}

function ResourcePreview({ kind, title, summary, meta, body }: { kind: ResourceKind; title: string; summary: string; meta: string; body: string }) {
  const Icon = KIND_ICONS[kind]
  const accent = KIND_ACCENTS[kind]
  return (
    <div>
      <div style={{ border: '1px solid rgba(10,34,128,0.10)', borderRadius: 16, padding: 18, background: '#FAFBFF' }}>
        <span className="inline-flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: `${accent}14`, border: `1px solid ${accent}44`, color: accent, marginBottom: 12 }}>
          <Icon size={18} strokeWidth={1.8} />
        </span>
        <div style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 6 }}>
          {RESOURCE_KIND_LABELS[kind]}
        </div>
        <h3 style={{ color: '#0A2280', fontSize: 18, fontWeight: 500, lineHeight: 1.3, margin: '0 0 6px 0' }}>{title || 'Untitled resource'}</h3>
        {summary && <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{summary}</p>}
        {meta && <div style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: 11, color: 'rgba(10,34,128,0.5)', marginTop: 10 }}>{meta}</div>}
      </div>
      {body && isHtml(body) && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0A2280', marginBottom: 8 }}>Detail page body</div>
          <div className="richtext" style={{ color: '#4b5563', fontSize: 15 }} dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      )}
    </div>
  )
}

function JobPreview({ team, title, location, type }: { team: JobTeam; title: string; location: string; type: string }) {
  return (
    <div style={{ border: '1px solid rgba(10,34,128,0.10)', borderRadius: 14, padding: 18, background: '#FAFBFF' }}>
      <div style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1A38E8', marginBottom: 6 }}>
        {JOB_TEAM_LABELS[team]}
      </div>
      <h3 style={{ color: '#0A2280', fontSize: 19, fontWeight: 500, lineHeight: 1.3, margin: '0 0 6px 0' }}>{title || 'Untitled role'}</h3>
      <div style={{ color: '#6b7280', fontSize: 14 }}>{location || 'Location'} · {type || 'Full-time'}</div>
    </div>
  )
}

function MediaPreview({ label, size, url }: { label: string; size: string; url: string }) {
  return (
    <div style={{ background: '#F8F4F0', border: '1px solid rgba(10,34,128,0.10)', borderRadius: 16, padding: 18 }}>
      <div className="flex items-center justify-between gap-3" style={{ padding: '10px 14px', background: '#fff', borderRadius: 10, border: '1px solid rgba(10,34,128,0.08)' }}>
        <span style={{ fontWeight: 500, fontSize: 14, color: '#374151' }}>{label || 'Asset label'}</span>
        <span className="flex items-center gap-2">
          {size && <span style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: 10.5, fontWeight: 500, color: 'rgba(10,34,128,0.5)' }}>{size}</span>}
          <Download size={14} style={{ color: url ? '#1A38E8' : '#c2c8d6' }} />
        </span>
      </div>
      {!url && <p style={{ fontSize: 11.5, color: '#9ca3af', margin: '10px 0 0 0' }}>No file attached yet, the download link will be inactive.</p>}
    </div>
  )
}

function SkeletonList() {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ height: 64, borderRadius: 12, background: 'linear-gradient(90deg, #f3f4f6 25%, #e9ecf5 37%, #f3f4f6 63%)', backgroundSize: '400% 100%', animation: 'admin-shimmer 1.4s ease infinite' }} />
      ))}
      <style>{`@keyframes admin-shimmer { 0% { background-position: 100% 0 } 100% { background-position: 0 0 } }`}</style>
    </div>
  )
}
