'use client'

import { AlertTriangle } from 'lucide-react'

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}) {
  if (!open) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(10,20,60,0.45)',
        display: 'grid',
        placeItems: 'center',
        padding: 16,
        animation: 'admin-fade-in 0.15s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: 24,
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 30px 70px rgba(10,20,80,0.30)',
        }}
      >
        <div className="flex items-start gap-3" style={{ marginBottom: 16 }}>
          <span
            className="inline-flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'rgba(220,38,38,0.10)',
              color: '#DC2626',
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={20} strokeWidth={2} />
          </span>
          <div>
            <h3 className="text-[#0A2280]" style={{ fontSize: 16, fontWeight: 600, margin: '2px 0 4px 0' }}>
              {title}
            </h3>
            <p style={{ fontSize: 13.5, color: '#6b7280', margin: 0, lineHeight: 1.55 }}>
              {message}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            style={{
              borderRadius: 999,
              padding: '9px 18px',
              fontSize: 13.5,
              fontWeight: 500,
              background: 'rgba(10,34,128,0.06)',
              color: '#0A2280',
              border: '1px solid rgba(10,34,128,0.12)',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              borderRadius: 999,
              padding: '9px 18px',
              fontSize: 13.5,
              fontWeight: 600,
              background: '#DC2626',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
      <style>{`@keyframes admin-fade-in { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  )
}
