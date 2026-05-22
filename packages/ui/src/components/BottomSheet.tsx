'use client'

import { useEffect, useRef } from 'react'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    sheetRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-chocolat/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Feuille */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bottom-sheet-title"
        tabIndex={-1}
        className="fixed bottom-0 left-0 right-0 z-50 bg-creme rounded-t-2xl shadow-xl max-h-[85vh] overflow-y-auto focus:outline-none"
      >
        {/* Poignée */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-chocolat/20" />
        </div>

        {/* En-tête */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-blush">
          <h2 id="bottom-sheet-title" className="font-display text-xl text-chocolat">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-chocolat/60 hover:text-chocolat transition-colors rounded"
          >
            ✕
          </button>
        </div>

        {/* Contenu */}
        <div className="px-5 py-5">{children}</div>
      </div>
    </>
  )
}
