'use client'

import { MessageCircle, Volume2, VolumeX, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const script = 'Welcome to Gideon Freight, the delivery management platform built for Kenyan SMEs. Book same-day or next-day deliveries across Kenya, track your shipments in real time, and get automated notifications every step of the way. No more lost parcels. No more chasing riders. Just reliable logistics that keeps your business moving. Scroll down to book your first delivery or get a quote today.'

export function FloatingActions() {
  const [speaking, setSpeaking] = useState(false)
  const [muted, setMuted] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const utterance = useRef<SpeechSynthesisUtterance | null>(null)
  const startTour = () => {
    if (!('speechSynthesis' in window) || muted || hasPlayed) return
    const voice = new SpeechSynthesisUtterance(script)
    voice.rate = .95; voice.pitch = 1.1; voice.lang = 'en-KE'
    voice.onend = () => setSpeaking(false)
    voice.onerror = () => setSpeaking(false)
    utterance.current = voice; setHasPlayed(true); setSpeaking(true)
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(voice)
  }
  useEffect(() => {
    const once = () => startTour()
    window.addEventListener('scroll', once, { once: true, passive: true })
    window.addEventListener('click', once, { once: true })
    return () => { window.removeEventListener('scroll', once); window.removeEventListener('click', once); window.speechSynthesis?.cancel() }
  // A single introduction is intentionally played after the visitor first interacts.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muted, hasPlayed])
  const toggle = () => {
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); setMuted(true); return }
    if (hasPlayed) { setMuted(false); setHasPlayed(false); requestAnimationFrame(startTour); return }
    setMuted((value) => !value)
  }
  return <>
    <a href="https://wa.me/254112272061?text=Hi%20Gideon%20Freight%2C%20I%27d%20like%20to%20book%20a%20delivery" target="_blank" rel="noreferrer" title="Chat with us on WhatsApp" aria-label="Chat with us on WhatsApp" className="whatsapp-pulse bottom-safe fixed bottom-6 right-6 z-[9998] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105"><MessageCircle size={27} /></a>
    <button type="button" onClick={toggle} title="Hear what this site is about" aria-label="Site voice tour, click to mute" className={`bottom-safe fixed bottom-6 left-6 z-[9998] grid h-14 w-14 place-items-center rounded-full bg-primary text-white shadow-lg hover:scale-105 ${speaking ? 'voice-ring' : ''}`}>
      {speaking ? <Volume2 size={25} /> : hasPlayed ? <RotateCcw size={23} /> : muted ? <VolumeX size={25} /> : <Volume2 size={25} />}
    </button>
  </>
}
