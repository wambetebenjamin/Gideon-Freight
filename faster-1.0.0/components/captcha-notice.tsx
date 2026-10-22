'use client'

import { useEffect, useState } from 'react'

declare global { interface Window { grecaptcha?: { execute: (key: string, options: { action: string }) => Promise<string>; ready?: (callback: () => void) => void } } }

function loadV3(key: string) {
  return new Promise<void>((resolve) => {
    if (window.grecaptcha?.execute) { resolve(); return }
    const existing = document.querySelector('script[data-gideon-recaptcha-v3]') as HTMLScriptElement | null
    if (existing) { existing.addEventListener('load', () => resolve(), { once: true }); return }
    const script = document.createElement('script'); script.dataset.gideonRecaptchaV3 = 'true'; script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(key)}`; script.async = true; script.defer = true; script.onload = () => resolve(); script.onerror = () => resolve(); document.head.appendChild(script)
  })
}

export async function getCaptchaToken(action: string) {
  const v2Response = (document.querySelector('textarea[name="g-recaptcha-response"]') as HTMLTextAreaElement | null)?.value
  if (v2Response) return v2Response
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!key) return undefined
  await loadV3(key)
  if (!window.grecaptcha) return undefined
  try { const captcha = window.grecaptcha; if (!captcha) return undefined; if (!captcha.ready) return (await captcha.execute(key, { action })) || undefined; return await new Promise<string>((resolve) => captcha.ready?.(() => captcha.execute(key, { action }).then(resolve).catch(() => resolve('')))) || undefined } catch { return undefined }
}

export function CaptchaNotice({ required }: { required: boolean }) {
  const [loaded, setLoaded] = useState(false)
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  useEffect(() => {
    if (!required || !key) return
    const existing = document.querySelector('script[data-gideon-recaptcha-v2]') as HTMLScriptElement | null
    if (existing) { setLoaded(true); return }
    const script = document.createElement('script'); script.dataset.gideonRecaptchaV2 = 'true'; script.src = 'https://www.google.com/recaptcha/api.js'; script.async = true; script.defer = true; script.onload = () => setLoaded(true); document.head.appendChild(script)
    return () => script.remove()
  }, [required, key])
  if (!required) return null
  return <div className="mt-4 border-l-4 border-primary bg-[#fff2ed] p-3 text-sm text-dark" role="alert"><strong>Extra verification required.</strong> Please complete the security check and submit again. {key ? <div className="mt-3 min-h-[78px]" aria-label="Visible reCAPTCHA verification">{loaded && <div className="g-recaptcha" data-sitekey={key}/>}</div> : <span className="mt-1 block text-xs">Security verification is not configured yet. Please contact support.</span>}</div>
}
