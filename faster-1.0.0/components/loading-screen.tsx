'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setPercent(100); const timer = window.setTimeout(() => setVisible(false), 500); return () => clearTimeout(timer) }
    const start = performance.now()
    const timer = window.setInterval(() => { const next = Math.min(100, Math.round(((performance.now() - start) / 1100) * 100)); setPercent(next); if (next === 100) { clearInterval(timer); window.setTimeout(() => setVisible(false), 230) } }, 50)
    return () => clearInterval(timer)
  }, [])
  if (!visible) return null
  return <div className="fixed inset-0 z-[10000] grid place-items-center bg-white" role="status" aria-live="polite" aria-label="Loading Gideon Freight">
    <div className="flex flex-col items-center"><div className="relative h-16 w-44 overflow-hidden"><span className="loading-trail absolute left-0 top-7 h-1 w-16 bg-primary/40"/><svg className="absolute left-16 top-2 text-primary" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 15 24 7l16 8-16 8-16-8Z" fill="currentColor" opacity=".25"/><path d="M8 15v18l16 8 16-8V15M24 23v18M8 15l16 8 16-8" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/></svg></div><p className="mt-3 text-xl font-black tracking-tight text-dark">GIDEON <span className="text-primary">FREIGHT</span></p><p className="mt-2 text-sm font-bold text-primary">{percent}%</p><button type="button" onClick={() => setVisible(false)} className="mt-4 min-h-[44px] px-3 text-xs font-bold text-dark underline">Skip</button></div>
  </div>
}
