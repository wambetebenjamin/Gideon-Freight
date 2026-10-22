'use client'

import Link from 'next/link'
import { Menu, X, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Brand } from './brand'

const links = [
  { href: '/', label: 'Home' },
  { href: '/track', label: 'Track' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/couriers', label: 'Couriers' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  return <>
    <div className="bg-dark text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-xs sm:justify-between sm:px-6 lg:px-8">
        <span>Reliable logistics for Kenyan SMEs</span>
        <a href="https://wa.me/254112272061" className="min-h-[24px] py-1 font-semibold hover:text-primary">WhatsApp +254 112 272 061</a>
      </div>
    </div>
    <header className="sticky top-0 z-40 border-b border-[#ececf0] bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className="min-h-[68px] px-3 py-6 text-sm font-bold text-dark hover:bg-primary hover:text-white">{link.label}</Link>)}
        </nav>
        <div className="hidden md:flex md:items-center md:gap-2">
          <Link href="/login" className="btn-outline">Log in</Link>
          <Link href="/book" className="btn-primary">Book a delivery</Link>
        </div>
        <button type="button" onClick={() => setOpen(!open)} className="grid min-h-[44px] min-w-[44px] place-items-center text-dark md:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && <div className="border-t border-[#ececf0] bg-white px-4 pb-4 md:hidden">
        <nav className="mx-auto flex w-full max-w-7xl flex-col" aria-label="Mobile navigation">
          {links.map((link) => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className="flex min-h-[48px] items-center justify-between border-b border-[#f0f0f2] py-3 font-bold text-dark">{link.label}<ChevronRight size={16} className="text-primary" /></Link>)}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link onClick={() => setOpen(false)} href="/login" className="btn-outline w-full sm:w-auto">Log in</Link>
            <Link onClick={() => setOpen(false)} href="/book" className="btn-primary w-full sm:w-auto">Book a delivery</Link>
          </div>
        </nav>
      </div>}
    </header>
  </>
}
