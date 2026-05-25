type ConfirmDialogProps = {
  title: string
  message: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: 'var(--color-overlay)' }}>
      <div
        className="w-full max-w-sm rounded-[2rem] border p-5 shadow-2xl"
        style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)', boxShadow: '0 25px 50px -12px var(--color-shadow)' }}
      >
        <h3 className="text-lg font-black">{title}</h3>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>{message}</p>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="theme-elevated flex-1 rounded-2xl border px-4 py-3 text-sm font-black"
            style={{ borderColor: 'var(--color-border)' }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-2xl bg-red-500 px-4 py-3 text-sm font-black text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
