'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

type Preferences = { necessary: true; functional: boolean; analytics: boolean; marketing: boolean }
const key = 'gideon-freight-cookie-consent'
const initial: Preferences = { necessary: true, functional: false, analytics: false, marketing: false }

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [manage, setManage] = useState(false)
  const [preferences, setPreferences] = useState<Preferences>(initial)
  useEffect(() => { if (!localStorage.getItem(key)) setVisible(true) }, [])
  const save = (all = false) => {
    const data = all ? { necessary: true, functional: true, analytics: true, marketing: true } : preferences
    localStorage.setItem(key, JSON.stringify({ ...data, consentedAt: new Date().toISOString() }))
    setVisible(false); setManage(false)
  }
  if (!visible) return null
  return <>
    <section className="fixed inset-x-0 bottom-0 z-[9997] border-t-4 border-primary bg-white px-4 py-4 pb-safe shadow-[0_-10px_30px_rgba(31,31,46,.14)]" aria-label="Cookie consent">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:px-2">
        <div className="pr-6"><p className="font-bold text-dark">Your privacy matters</p><p className="mt-1 max-w-3xl text-sm">We use necessary cookies to run Gideon Freight. Optional cookies help us improve the platform in line with the Kenya Data Protection Act, 2019.</p></div>
        <div className="flex flex-col gap-2 sm:flex-row"><button className="btn-outline w-full sm:w-auto" onClick={() => setManage(true)}>Manage preferences</button><button className="btn-primary w-full sm:w-auto" onClick={() => save(true)}>Accept all</button></div>
      </div>
    </section>
    {manage && <div className="fixed inset-0 z-[9999] flex items-end bg-black/45 sm:items-center sm:justify-center" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div className="w-full rounded-t-2xl bg-white p-5 shadow-2xl sm:max-w-lg sm:rounded-2xl"><div className="flex items-start justify-between gap-4"><div><h2 id="cookie-title" className="text-xl font-bold text-dark">Cookie preferences</h2><p className="mt-1 text-sm">Choose the cookies you allow.</p></div><button className="grid min-h-[44px] min-w-[44px] place-items-center" onClick={() => setManage(false)} aria-label="Close preferences"><X /></button></div>
        <div className="mt-5 space-y-3">{([['necessary', 'Necessary', 'Required for secure operation'], ['functional', 'Functional', 'Remember useful settings'], ['analytics', 'Analytics', 'Help us understand site usage'], ['marketing', 'Marketing', 'Measure relevant campaign activity']] as const).map(([name, label, description]) => <label key={name} className="flex min-h-[58px] cursor-pointer items-center justify-between border border-[#e6e6ea] p-3"><span><span className="block font-bold text-dark">{label}</span><span className="text-xs">{description}</span></span><input type="checkbox" className="h-5 w-5 accent-[#FF4800]" checked={preferences[name]} disabled={name === 'necessary'} onChange={(e) => setPreferences({ ...preferences, [name]: e.target.checked })} /></label>)}</div>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button className="btn-outline" onClick={() => save(false)}>Save preferences</button><button className="btn-primary" onClick={() => save(true)}>Accept all</button></div>
      </div>
    </div>}
  </>
}
