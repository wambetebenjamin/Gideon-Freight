'use client'

import { useEffect } from 'react'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) { useEffect(() => { /* Error reporting can be connected here. */ }, []); return <html lang="en"><body style={{ margin: 0, fontFamily: 'Poppins, sans-serif', background: '#F2F2F4', color: '#1F1F2E' }}><main style={{ maxWidth: 620, margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}><p style={{ color: '#FF4800', fontSize: 72, fontWeight: 900, margin: 0 }}>500</p><h1>We hit a dispatch delay</h1><p>Please try again, or contact Gideon Freight on WhatsApp at +254 112 272 061.</p><button onClick={reset} style={{ minHeight: 44, padding: '10px 18px', border: 0, background: '#FF4800', color: 'white', fontWeight: 700, cursor: 'pointer' }}>Try again</button></main></body></html> }
