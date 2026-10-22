import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react'
import { Brand } from './brand'

export function Footer() {
  return <footer className="mt-16 bg-dark text-white">
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
      <div>
        <Brand inverse />
        <p className="mt-4 max-w-xs text-sm leading-6 text-[#c9c9d0]">Move goods. Build business. Reliable delivery management for Kenyan SMEs.</p>
      </div>
      <div>
        <h2 className="text-base font-bold text-white">Platform</h2>
        <div className="mt-4 flex flex-col gap-2 text-sm text-[#c9c9d0]">
          <Link href="/book" className="min-h-[32px] hover:text-primary">Book a delivery</Link><Link href="/track" className="min-h-[32px] hover:text-primary">Track shipment</Link><Link href="/pricing" className="min-h-[32px] hover:text-primary">Pricing</Link><Link href="/couriers" className="min-h-[32px] hover:text-primary">Join as a courier</Link>
        </div>
      </div>
      <div>
        <h2 className="text-base font-bold text-white">Legal</h2>
        <div className="mt-4 flex flex-col gap-2 text-sm text-[#c9c9d0]">
          <Link href="/legal/privacy-policy" className="min-h-[32px] hover:text-primary">Privacy policy</Link><Link href="/legal/terms" className="min-h-[32px] hover:text-primary">Terms of service</Link><Link href="/legal/cookie-policy" className="min-h-[32px] hover:text-primary">Cookie policy</Link>
        </div>
      </div>
      <div>
        <h2 className="text-base font-bold text-white">Talk to us</h2>
        <a className="mt-4 flex min-h-[32px] items-center gap-2 text-sm text-[#c9c9d0] hover:text-primary" href="mailto:hello@gideonfreight.co.ke"><Mail size={16} />hello@gideonfreight.co.ke</a>
        <a className="mt-2 flex min-h-[32px] items-center gap-2 text-sm text-[#c9c9d0] hover:text-primary" href="https://wa.me/254112272061"><MessageCircle size={16} />+254 112 272 061</a>
        <div className="mt-4 flex gap-2"><a className="grid min-h-[44px] min-w-[44px] place-items-center border border-white/20 hover:bg-primary" href="#" aria-label="Gideon Freight on Facebook"><Facebook size={17}/></a><a className="grid min-h-[44px] min-w-[44px] place-items-center border border-white/20 hover:bg-primary" href="#" aria-label="Gideon Freight on Instagram"><Instagram size={17}/></a><a className="grid min-h-[44px] min-w-[44px] place-items-center border border-white/20 hover:bg-primary" href="#" aria-label="Gideon Freight on LinkedIn"><Linkedin size={17}/></a></div>
      </div>
    </div>
    <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-[#a6a6ae]">© {new Date().getFullYear()} Gideon Freight. Built for business in Kenya.</div>
  </footer>
}
