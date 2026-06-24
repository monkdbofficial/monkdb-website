'use client'

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

type ToastKind = 'success' | 'error' | 'info'
type Toast = { id: number; kind: ToastKind; message: string }

type ToastApi = {
  success: (m: string) => void
  error: (m: string) => void
  info: (m: string) => void
}

const ToastContext = createContext<ToastApi | null>(null)

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

const ACCENTS = {
  success: '#059669',
  error: '#DC2626',
  info: '#1A38E8',
}

let counter = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const remove = useCallback((id: number) => {
    setToasts((cur) => cur.filter((t) => t.id !== id))
  }, [])

  const push = useCallback(
    (kind: ToastKind, message: string) => {
      const id = ++counter
      setToasts((cur) => [...cur, { id, kind, message }])
      setTimeout(() => remove(id), 4000)
    },
    [remove],
  )

  const api: ToastApi = {
    success: (m) => push('success', m),
    error: (m) => push('error', m),
    info: (m) => push('info', m),
  }

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          maxWidth: 'min(92vw, 380px)',
        }}
      >
        {toasts.map((t) => {
          const Icon = ICONS[t.kind]
          const accent = ACCENTS[t.kind]
          return (
            <div
              key={t.id}
              role="status"
              className="flex items-start gap-3"
              style={{
                background: '#fff',
                borderRadius: 12,
                border: '1px solid rgba(10,34,128,0.10)',
                borderLeft: `3px solid ${accent}`,
                boxShadow: '0 16px 40px rgba(10,20,80,0.16)',
                padding: '12px 14px',
                animation: 'admin-toast-in 0.25s ease',
              }}
            >
              <Icon size={18} strokeWidth={2} style={{ color: accent, flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 13.5, color: '#1f2937', lineHeight: 1.5, flex: 1 }}>
                {t.message}
              </span>
              <button
                onClick={() => remove(t.id)}
                aria-label="Dismiss"
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: 0,
                  lineHeight: 0,
                }}
              >
                <X size={15} strokeWidth={2} />
              </button>
            </div>
          )
        })}
      </div>
      <style>{`
        @keyframes admin-toast-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  )
}
