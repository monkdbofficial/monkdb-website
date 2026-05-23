'use client'

import { useCallback, useEffect, useState } from 'react'
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
  type LucideIcon,
} from 'lucide-react'
import type {
  ResourceItem,
  ResourceKind,
} from '@/content/resourceLibrary'
import { RESOURCE_KIND_LABELS } from '@/content/resourceLibrary'
import type { JobItem, JobTeam } from '@/content/jobs'
import { JOB_TEAM_LABELS } from '@/content/jobs'

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

type AuthState = 'unknown' | 'in' | 'out'
type AdminTab = 'resources' | 'jobs'

export default function AdminPage() {
  const [auth, setAuth] = useState<AuthState>('unknown')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [busy, setBusy] = useState(false)
  const [tab, setTab] = useState<AdminTab>('resources')

  const [items, setItems] = useState<ResourceItem[]>([])
  const [loading, setLoading] = useState(false)
  const [listError, setListError] = useState('')

  const [editingId, setEditingId] = useState<string | null>(null)
  const [kind, setKind] = useState<ResourceKind>('whitepaper')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [meta, setMeta] = useState('')
  const [body, setBody] = useState('')
  const [formError, setFormError] = useState('')
  const [formOk, setFormOk] = useState('')
  const [uploading, setUploading] = useState(false)

  const resetForm = () => {
    setEditingId(null)
    setKind('whitepaper')
    setTitle('')
    setSummary('')
    setUrl('')
    setMeta('')
    setBody('')
    setFormError('')
    setFormOk('')
  }

  const startEdit = (it: ResourceItem) => {
    setEditingId(it.id)
    setKind(it.kind)
    setTitle(it.title)
    setSummary(it.summary)
    setUrl(it.url)
    setMeta(it.meta ?? '')
    setBody(it.body ?? '')
    setFormError('')
    setFormOk('')
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const loadItems = useCallback(async () => {
    setLoading(true)
    setListError('')
    try {
      const r = await fetch('/api/admin/resources', { cache: 'no-store' })
      if (r.status === 401) {
        setAuth('out')
        return
      }
      const data = (await r.json()) as { items?: ResourceItem[] }
      setItems(data.items ?? [])
      setAuth('in')
    } catch {
      setListError('Failed to load resources.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadItems()
  }, [loadItems])

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
      await loadItems()
    } catch {
      setLoginError('Login failed.')
    } finally {
      setBusy(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setAuth('out')
    setItems([])
  }

  const handleUpload = async (file: File) => {
    setUploading(true)
    setFormError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', kind === 'whitepaper' ? 'whitepapers' : 'resources')
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = (await r.json()) as { url?: string; error?: string }
      if (!r.ok || !data.url) {
        setFormError(data.error || 'Upload failed.')
        return
      }
      setUrl(data.url)
    } catch {
      setFormError('Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setFormOk('')
    if (!title.trim() || !summary.trim() || !url.trim()) {
      setFormError('Title, summary, and URL are required.')
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
      const data = (await r.json()) as {
        item?: ResourceItem
        error?: string
      }
      if (!r.ok || !data.item) {
        setFormError(data.error || 'Could not save.')
        return
      }
      if (editingId) {
        setItems((cur) =>
          cur.map((it) => (it.id === data.item!.id ? data.item! : it)),
        )
        setFormOk(`Updated: ${data.item.title}`)
        resetForm()
      } else {
        setItems((cur) => [data.item!, ...cur])
        setFormOk(`Added: ${data.item.title}`)
        setTitle('')
        setSummary('')
        setUrl('')
        setMeta('')
        setBody('')
      }
    } catch {
      setFormError('Could not save.')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this resource?')) return
    try {
      const r = await fetch(
        `/api/admin/resources?id=${encodeURIComponent(id)}`,
        { method: 'DELETE' },
      )
      if (!r.ok) return
      setItems((cur) => cur.filter((it) => it.id !== id))
    } catch {
      // ignore
    }
  }

  if (auth === 'unknown') {
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        <p>Loading…</p>
      </div>
    )
  }

  if (auth === 'out') {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white rounded-2xl"
          style={{
            border: '1px solid rgba(10,34,128,0.10)',
            padding: 28,
            boxShadow: '0 24px 60px rgba(10,20,80,0.10)',
          }}
        >
          <h1
            className="text-[#0A2280]"
            style={{
              fontSize: 'clamp(22px, 2.4vw, 28px)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              margin: '0 0 6px 0',
            }}
          >
            Admin sign-in
          </h1>
          <p
            className="text-gray-500"
            style={{ fontSize: 13, margin: '0 0 20px 0', lineHeight: 1.5 }}
          >
            Enter the shared admin password to manage the resource library.
          </p>
          <label
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0A2280',
              marginBottom: 6,
            }}
          >
            Password
          </label>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              borderRadius: 10,
              border: '1px solid rgba(10,34,128,0.20)',
              padding: '10px 12px',
              fontSize: 14,
              outline: 'none',
              marginBottom: 14,
            }}
          />
          {loginError && (
            <p
              style={{
                fontSize: 12,
                color: '#DC2626',
                margin: '0 0 12px 0',
              }}
            >
              {loginError}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || !password}
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header
        style={{
          background: '#0A2280',
          color: '#fff',
          padding: '18px clamp(16px, 4vw, 40px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            MonkDB / Admin
          </span>
          <h1
            style={{
              fontSize: 'clamp(20px, 2vw, 26px)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              margin: '4px 0 0 0',
            }}
          >
            {tab === 'resources' ? 'Resource library' : 'Job listings'}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2"
          style={{
            borderRadius: 999,
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.10)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.20)',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <LogOut size={14} strokeWidth={2} /> Sign out
        </button>
      </header>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(20px, 3vw, 40px) clamp(16px, 4vw, 40px)',
          display: 'grid',
          gap: 28,
          gridTemplateColumns: '1fr',
        }}
      >
        {/* Tabs */}
        <nav
          style={{
            display: 'inline-flex',
            gap: 8,
            background: '#fff',
            border: '1px solid rgba(10,34,128,0.10)',
            borderRadius: 999,
            padding: 6,
            alignSelf: 'start',
          }}
        >
          {(
            [
              { id: 'resources' as const, label: 'Resources', Icon: Library },
              { id: 'jobs' as const, label: 'Jobs', Icon: Briefcase },
            ]
          ).map(({ id, label, Icon }) => {
            const active = tab === id
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="inline-flex items-center gap-2"
                style={{
                  borderRadius: 999,
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 500,
                  background: active ? '#1A38E8' : 'transparent',
                  color: active ? '#fff' : '#0A2280',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Icon size={14} strokeWidth={1.8} />
                {label}
              </button>
            )
          })}
        </nav>

        {tab === 'jobs' && <JobsAdminPanel />}

        {tab === 'resources' && (
          <>
        {/* Add form */}
        <section
          style={{
            background: '#fff',
            border: '1px solid rgba(10,34,128,0.10)',
            borderRadius: 16,
            padding: 'clamp(20px, 2.2vw, 28px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '0 0 18px 0',
            }}
          >
            <h2
              className="text-[#0A2280]"
              style={{ fontSize: 18, fontWeight: 500, margin: 0 }}
            >
              {editingId ? 'Edit resource' : 'Add a resource'}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-1"
                style={{
                  borderRadius: 999,
                  padding: '6px 12px',
                  fontSize: 12,
                  fontWeight: 500,
                  background: 'rgba(10,34,128,0.06)',
                  color: '#0A2280',
                  border: '1px solid rgba(10,34,128,0.12)',
                  cursor: 'pointer',
                }}
              >
                <X size={12} strokeWidth={2} /> Cancel edit
              </button>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'grid', gap: 14 }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: 8,
              }}
            >
              {(Object.keys(RESOURCE_KIND_LABELS) as ResourceKind[]).map(
                (k) => {
                  const Icon = KIND_ICONS[k]
                  const active = kind === k
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setKind(k)}
                      className="inline-flex items-center gap-2 justify-center"
                      style={{
                        borderRadius: 999,
                        padding: '8px 14px',
                        fontSize: 13,
                        fontWeight: 500,
                        background: active
                          ? KIND_ACCENTS[k]
                          : 'rgba(10,34,128,0.06)',
                        color: active ? '#fff' : '#0A2280',
                        border: active
                          ? `1px solid ${KIND_ACCENTS[k]}`
                          : '1px solid rgba(10,34,128,0.12)',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon size={14} strokeWidth={1.8} />
                      {RESOURCE_KIND_LABELS[k]}
                    </button>
                  )
                },
              )}
            </div>

            <FormRow label="Title">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The AI-Native Execution Engine"
                style={inputStyle}
              />
            </FormRow>

            <FormRow label="Summary">
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="One or two sentences shown on the card."
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </FormRow>

            <FormRow label="URL">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://… or upload a PDF below"
                style={inputStyle}
              />
            </FormRow>

            {kind === 'whitepaper' && (
              <FormRow label="Or upload a PDF (R2)">
                <label
                  className="inline-flex items-center gap-2"
                  style={{
                    borderRadius: 10,
                    border: '1px dashed rgba(10,34,128,0.30)',
                    padding: '12px 14px',
                    cursor: uploading ? 'wait' : 'pointer',
                    color: '#0A2280',
                    fontSize: 13,
                    background: 'rgba(26,56,232,0.04)',
                  }}
                >
                  <Upload size={14} strokeWidth={1.8} />
                  {uploading ? 'Uploading…' : 'Choose PDF'}
                  <input
                    type="file"
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) handleUpload(f)
                      e.target.value = ''
                    }}
                  />
                </label>
              </FormRow>
            )}

            <FormRow label="Meta (optional)">
              <input
                type="text"
                value={meta}
                onChange={(e) => setMeta(e.target.value)}
                placeholder="e.g. PDF · 18 pages, Repo · TypeScript, YouTube · 12 min"
                style={inputStyle}
              />
            </FormRow>

            <FormRow label="Body (optional)">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Long-form description shown on the detail page. Separate paragraphs with a blank line."
                rows={6}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.55 }}
              />
            </FormRow>

            {formError && (
              <p style={{ fontSize: 12, color: '#DC2626', margin: 0 }}>
                {formError}
              </p>
            )}
            {formOk && (
              <p style={{ fontSize: 12, color: '#059669', margin: 0 }}>
                {formOk}
              </p>
            )}

            <div>
              <button
                type="submit"
                style={{
                  borderRadius: 999,
                  padding: '11px 24px',
                  fontWeight: 600,
                  fontSize: 14,
                  background: '#1A38E8',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {editingId ? 'Update resource' : 'Save resource'}
              </button>
            </div>
          </form>
        </section>

        {/* List */}
        <section
          style={{
            background: '#fff',
            border: '1px solid rgba(10,34,128,0.10)',
            borderRadius: 16,
            padding: 'clamp(20px, 2.2vw, 28px)',
          }}
        >
          <h2
            className="text-[#0A2280]"
            style={{
              fontSize: 18,
              fontWeight: 500,
              margin: '0 0 18px 0',
            }}
          >
            Current resources ({items.length})
          </h2>
          {loading && <p style={{ fontSize: 13, color: '#6b7280' }}>Loading…</p>}
          {listError && (
            <p style={{ fontSize: 13, color: '#DC2626' }}>{listError}</p>
          )}
          {!loading && items.length === 0 && (
            <p style={{ fontSize: 13, color: '#6b7280' }}>
              No resources yet. Add one above.
            </p>
          )}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
            {items.map((it) => {
              const Icon = KIND_ICONS[it.kind]
              const accent = KIND_ACCENTS[it.kind]
              return (
                <li
                  key={it.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr auto',
                    gap: 14,
                    alignItems: 'start',
                    padding: 14,
                    border: '1px solid rgba(10,34,128,0.08)',
                    borderRadius: 12,
                    background: '#FAFAFA',
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center rounded-xl"
                    style={{
                      width: 36,
                      height: 36,
                      background: `${accent}14`,
                      border: `1px solid ${accent}44`,
                      color: accent,
                    }}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div
                      className="text-[#0A2280]"
                      style={{ fontSize: 14, fontWeight: 500 }}
                    >
                      {it.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#6b7280',
                        margin: '2px 0 4px 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {it.summary}
                    </div>
                    <a
                      href={it.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                        fontSize: 11,
                        color: accent,
                        textDecoration: 'none',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'inline-block',
                        maxWidth: '100%',
                      }}
                    >
                      {it.url}
                    </a>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => startEdit(it)}
                      title="Edit"
                      style={{
                        border: '1px solid rgba(10,34,128,0.20)',
                        background: 'rgba(26,56,232,0.06)',
                        color: '#0A2280',
                        borderRadius: 8,
                        padding: '8px 10px',
                        cursor: 'pointer',
                      }}
                    >
                      <Pencil size={14} strokeWidth={1.8} />
                    </button>
                    <button
                      onClick={() => handleDelete(it.id)}
                      title="Remove"
                      style={{
                        border: '1px solid rgba(220,38,38,0.30)',
                        background: 'rgba(220,38,38,0.06)',
                        color: '#DC2626',
                        borderRadius: 8,
                        padding: '8px 10px',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={14} strokeWidth={1.8} />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
          </>
        )}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 10,
  border: '1px solid rgba(10,34,128,0.20)',
  padding: '10px 12px',
  fontSize: 14,
  outline: 'none',
  background: '#fff',
}

function FormRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#0A2280',
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

/* ── Jobs admin panel ─────────────────────────────────────────────────── */

function JobsAdminPanel() {
  const [items, setItems] = useState<JobItem[]>([])
  const [loading, setLoading] = useState(false)
  const [listError, setListError] = useState('')

  const [editingId, setEditingId] = useState<string | null>(null)
  const [team, setTeam] = useState<JobTeam>('engineering')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('Full-time')
  const [applyUrl, setApplyUrl] = useState('')
  const [formError, setFormError] = useState('')
  const [formOk, setFormOk] = useState('')

  const resetForm = () => {
    setEditingId(null)
    setTeam('engineering')
    setTitle('')
    setLocation('')
    setType('Full-time')
    setApplyUrl('')
    setFormError('')
    setFormOk('')
  }

  const startEdit = (it: JobItem) => {
    setEditingId(it.id)
    setTeam(it.team)
    setTitle(it.title)
    setLocation(it.location)
    setType(it.type)
    setApplyUrl(it.applyUrl ?? '')
    setFormError('')
    setFormOk('')
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const load = useCallback(async () => {
    setLoading(true)
    setListError('')
    try {
      const r = await fetch('/api/admin/jobs', { cache: 'no-store' })
      const data = (await r.json()) as { items?: JobItem[] }
      setItems(data.items ?? [])
    } catch {
      setListError('Failed to load jobs.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setFormOk('')
    if (!title.trim() || !location.trim()) {
      setFormError('Title and location are required.')
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
        setFormError(data.error || 'Could not save.')
        return
      }
      if (editingId) {
        setItems((cur) =>
          cur.map((it) => (it.id === data.item!.id ? data.item! : it)),
        )
        setFormOk(`Updated: ${data.item.title}`)
        resetForm()
      } else {
        setItems((cur) => [data.item!, ...cur])
        setFormOk(`Added: ${data.item.title}`)
        setTitle('')
        setLocation('')
        setApplyUrl('')
      }
    } catch {
      setFormError('Could not save.')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this job?')) return
    try {
      const r = await fetch(`/api/admin/jobs?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (!r.ok) return
      setItems((cur) => cur.filter((it) => it.id !== id))
    } catch {
      // ignore
    }
  }

  return (
    <>
      <section
        style={{
          background: '#fff',
          border: '1px solid rgba(10,34,128,0.10)',
          borderRadius: 16,
          padding: 'clamp(20px, 2.2vw, 28px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '0 0 18px 0',
          }}
        >
          <h2
            className="text-[#0A2280]"
            style={{ fontSize: 18, fontWeight: 500, margin: 0 }}
          >
            {editingId ? 'Edit job' : 'Add a job'}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-1"
              style={{
                borderRadius: 999,
                padding: '6px 12px',
                fontSize: 12,
                fontWeight: 500,
                background: 'rgba(10,34,128,0.06)',
                color: '#0A2280',
                border: '1px solid rgba(10,34,128,0.12)',
                cursor: 'pointer',
              }}
            >
              <X size={12} strokeWidth={2} /> Cancel edit
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 8,
            }}
          >
            {(Object.keys(JOB_TEAM_LABELS) as JobTeam[]).map((k) => {
              const active = team === k
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTeam(k)}
                  style={{
                    borderRadius: 999,
                    padding: '8px 14px',
                    fontSize: 13,
                    fontWeight: 500,
                    background: active ? '#1A38E8' : 'rgba(10,34,128,0.06)',
                    color: active ? '#fff' : '#0A2280',
                    border: active
                      ? '1px solid #1A38E8'
                      : '1px solid rgba(10,34,128,0.12)',
                    cursor: 'pointer',
                  }}
                >
                  {JOB_TEAM_LABELS[k]}
                </button>
              )
            })}
          </div>

          <FormRow label="Title">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Staff Engineer, Storage"
              style={inputStyle}
            />
          </FormRow>

          <FormRow label="Location">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Remote (Global), Hyderabad, London"
              style={inputStyle}
            />
          </FormRow>

          <FormRow label="Type">
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Full-time / Contract / Internship"
              style={inputStyle}
            />
          </FormRow>

          <FormRow label="Apply URL (optional)">
            <input
              type="text"
              value={applyUrl}
              onChange={(e) => setApplyUrl(e.target.value)}
              placeholder="https://… (defaults to mailto:careers@monkdb.com)"
              style={inputStyle}
            />
          </FormRow>

          {formError && (
            <p style={{ fontSize: 12, color: '#DC2626', margin: 0 }}>
              {formError}
            </p>
          )}
          {formOk && (
            <p style={{ fontSize: 12, color: '#059669', margin: 0 }}>
              {formOk}
            </p>
          )}

          <div>
            <button
              type="submit"
              style={{
                borderRadius: 999,
                padding: '11px 24px',
                fontWeight: 600,
                fontSize: 14,
                background: '#1A38E8',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {editingId ? 'Update job' : 'Save job'}
            </button>
          </div>
        </form>
      </section>

      <section
        style={{
          background: '#fff',
          border: '1px solid rgba(10,34,128,0.10)',
          borderRadius: 16,
          padding: 'clamp(20px, 2.2vw, 28px)',
        }}
      >
        <h2
          className="text-[#0A2280]"
          style={{ fontSize: 18, fontWeight: 500, margin: '0 0 18px 0' }}
        >
          Current jobs ({items.length})
        </h2>
        {loading && <p style={{ fontSize: 13, color: '#6b7280' }}>Loading…</p>}
        {listError && (
          <p style={{ fontSize: 13, color: '#DC2626' }}>{listError}</p>
        )}
        {!loading && items.length === 0 && (
          <p style={{ fontSize: 13, color: '#6b7280' }}>
            No openings as of now. Add one above and it will appear on the careers page.
          </p>
        )}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: 10,
          }}
        >
          {items.map((it) => (
            <li
              key={it.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 14,
                alignItems: 'start',
                padding: 14,
                border: '1px solid rgba(10,34,128,0.08)',
                borderRadius: 12,
                background: '#FAFAFA',
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                    fontSize: 10.5,
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#1A38E8',
                    marginBottom: 4,
                  }}
                >
                  {JOB_TEAM_LABELS[it.team]}
                </div>
                <div
                  className="text-[#0A2280]"
                  style={{ fontSize: 14, fontWeight: 500 }}
                >
                  {it.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: '#6b7280',
                    margin: '2px 0 0 0',
                  }}
                >
                  {it.location} · {it.type}
                  {it.applyUrl ? ' · ' : ''}
                  {it.applyUrl && (
                    <a
                      href={it.applyUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: 11,
                        color: '#1A38E8',
                        textDecoration: 'none',
                      }}
                    >
                      {it.applyUrl}
                    </a>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => startEdit(it)}
                  title="Edit"
                  style={{
                    border: '1px solid rgba(10,34,128,0.20)',
                    background: 'rgba(26,56,232,0.06)',
                    color: '#0A2280',
                    borderRadius: 8,
                    padding: '8px 10px',
                    cursor: 'pointer',
                  }}
                >
                  <Pencil size={14} strokeWidth={1.8} />
                </button>
                <button
                  onClick={() => handleDelete(it.id)}
                  title="Remove"
                  style={{
                    border: '1px solid rgba(220,38,38,0.30)',
                    background: 'rgba(220,38,38,0.06)',
                    color: '#DC2626',
                    borderRadius: 8,
                    padding: '8px 10px',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size={14} strokeWidth={1.8} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
