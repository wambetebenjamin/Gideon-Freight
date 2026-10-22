'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bike, Box, Building2, CheckCircle2, Clock3, MapPinned, Package, Refrigerator, Route, ShieldCheck, Truck, Warehouse, ArrowRight, Quote } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const services = [
  ['Same-Day Nairobi', Bike, 'Fast city delivery'], ['Next-Day Nationwide', MapPinned, 'Kenya, connected'], ['Bulk Freight', Warehouse, 'Moves that scale'], ['Cold Chain', Refrigerator, 'Coming soon'], ['Motorbike Courier', Route, 'Agile dispatch'], ['Pickup Station', Package, 'Collection made easy'],
] as const
const numbers = [{ value: 18000, suffix: '+', label: 'Deliveries completed' }, { value: 420, suffix: '+', label: 'Active couriers' }, { value: 34, suffix: '', label: 'Counties covered' }, { value: 28, suffix: ' hrs', label: 'Average delivery time' }]

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const el = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState('0')
  useEffect(() => {
    const target = el.current
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { const object = { value: 0 }; gsap.to(object, { value, duration: 1.4, ease: 'power2.out', onUpdate: () => setShown(Math.round(object.value).toLocaleString()) }); observer.disconnect() } }, { threshold: .55 })
    observer.observe(target); return () => observer.disconnect()
  }, [value])
  return <span ref={el}>{shown}{suffix}</span>
}

export function HomeContent() {
  const howRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = howRef.current
    gsap.registerPlugin(ScrollTrigger)
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const context = gsap.context(() => { gsap.from('.how-step', { opacity: 0, x: -24, duration: .6, stagger: .18, scrollTrigger: { trigger: container, start: 'top 78%' } }) }, container)
    return () => context.revert()
  }, [])
  return <>
    <section className="relative min-h-[580px] overflow-hidden bg-dark">
      <Image src="/images/nairobi-courier.jpg" alt="Courier managing packages for delivery" fill priority sizes="100vw" className="object-cover object-center" />
      <div className="hero-grid absolute inset-0" />
      <div className="relative mx-auto flex min-h-[580px] w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: 'easeOut' }} className="max-w-3xl">
          <p className="kicker">Move goods. Build business.</p><h1 className="mt-4 max-w-2xl text-3xl font-black leading-[1.04] text-white sm:text-4xl md:text-5xl lg:text-6xl">Reliable delivery, every time</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#e4e4e7] sm:text-base">Book verified couriers, track shipments in real time and automate dispatch across Kenya. Everything your business needs to move with confidence.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"><Link href="/book" className="btn-primary w-full sm:w-auto">Book a Delivery <ArrowRight size={17} /></Link><Link href="/pricing" className="btn-outline w-full border-white bg-white sm:w-auto">Get a Quote</Link></div>
        </motion.div>
      </div>
    </section>
    <section className="border-b border-[#e8e8ed] bg-[#f7f7f9]"><div className="mx-auto grid w-full max-w-7xl grid-cols-2 divide-x divide-y divide-[#e1e1e6] px-4 sm:grid-cols-4 sm:px-6 lg:px-8"><Trust icon={<ShieldCheck />} label="Verified Couriers"/><Trust icon={<Route />} label="Real-Time Tracking"/><Trust icon={<Clock3 />} label="Automated Notifications"/><Trust icon={<MapPinned />} label="Nationwide Coverage"/></div></section>
    <section className="py-16 sm:py-20"><div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-xl"><p className="kicker">Every kind of move</p><h2 className="section-heading mt-3 font-black">A delivery service that fits the job</h2><p className="mt-4 text-sm sm:text-base">From a single document to a full stock transfer, choose a dependable route for the work ahead.</p></div><div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3">{services.map(([name, Icon, detail], index) => <motion.div key={name} initial={{ opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .06 }} className="card group p-4 sm:p-5"><span className="grid h-11 w-11 place-items-center bg-primary text-white"><Icon size={22} /></span><h3 className="mt-4 text-lg font-bold text-dark sm:text-xl">{name}</h3><p className="mt-1 text-xs sm:text-sm">{detail}</p></motion.div>)}</div></div></section>
    <section className="bg-[#f5f5f7] py-16 sm:py-20"><div ref={howRef} className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-xl"><p className="kicker">Simple by design</p><h2 className="section-heading mt-3 font-black">From booking to delivery in three clear steps</h2></div><div className="mt-10 grid gap-6 md:grid-cols-3">{[['01', 'Book online', 'Enter the pickup, recipient and package details in minutes.'], ['02', 'Courier picks up', 'A verified courier is assigned and confirms collection.'], ['03', 'Track to delivery', 'Follow each milestone and share updates with your customer.']].map(([n, title, text]) => <article key={n} className="how-step relative bg-white p-6"><span className="text-5xl font-black text-primary/20">{n}</span><div className="orange-rule mt-4"/><h3 className="mt-4 text-lg font-bold text-dark sm:text-xl">{title}</h3><p className="mt-2 text-sm leading-6">{text}</p></article>)}</div></div></section>
    <section className="py-16 sm:py-20"><div className="mx-auto grid w-full max-w-7xl items-center gap-9 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"><div><p className="kicker">Straightforward pricing</p><h2 className="section-heading mt-3 font-black">Clear prices before your parcels move</h2><p className="mt-4 max-w-lg text-sm leading-7 sm:text-base">No unexpected calls. No uncertain rates. See a delivery estimate at booking, then keep your receipt and live status in one place.</p><Link href="/pricing" className="btn-primary mt-7">View the rate card <ArrowRight size={17}/></Link></div><div className="grid gap-3"><Price price="KES 250" title="Within Nairobi" description="Same-day options for urgent city deliveries."/><Price price="KES 600" title="Upcountry" description="Next-day nationwide routes from Nairobi."/><Price price="Custom" title="Bulk freight" description="Built around volume, route and handling needs."/></div></div></section>
    <section className="bg-dark py-16 text-white sm:py-20"><div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><p className="kicker">What businesses say</p><h2 className="mt-3 max-w-xl text-2xl font-black sm:text-3xl lg:text-4xl">Built for owners who cannot afford delivery delays</h2><div className="mt-10 grid gap-4 md:grid-cols-3"><Testimonial image="/images/kenyan-portrait-1.jpg" quote="I can tell a customer where their order is without calling three riders. That alone has changed our day." name="Wanjiku M." business="Online retailer, Nairobi"/><Testimonial image="/images/kenyan-portrait-2.jpg" quote="The booking flow is quick, the courier arrives and our customers get updates. It feels like a proper operations team." name="Brian O." business="Food supplier, Kiambu"/><Testimonial image="/images/kenyan-portrait-3.jpg" quote="Gideon Freight makes our upcountry orders less stressful. We know what is moving and when it should arrive." name="Aisha A." business="Beauty business, Mombasa"/></div></div></section>
    <section className="py-16 sm:py-20"><div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{numbers.map((item) => <div key={item.label} className="border-l-4 border-primary bg-[#f6f6f8] p-4 sm:p-6"><strong className="block text-2xl font-black text-dark sm:text-3xl"><CountUp value={item.value} suffix={item.suffix}/></strong><span className="mt-1 block text-xs font-semibold sm:text-sm">{item.label}</span></div>)}</div></div></section>
    <section className="bg-primary py-12 text-white"><div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-5 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"><div><p className="text-sm font-bold uppercase tracking-[.13em]">Ready when you are</p><h2 className="mt-1 text-2xl font-black sm:text-3xl">Get your next delivery moving.</h2></div><Link href="/book" className="btn-dark w-full border-white bg-white text-dark hover:bg-dark hover:text-white sm:w-auto">Book a Delivery <ArrowRight size={17}/></Link></div></section>
  </>
}
function Trust({ icon, label }: { icon: React.ReactNode; label: string }) { return <div className="flex min-h-24 flex-col items-center justify-center gap-2 p-3 text-center text-xs font-bold text-dark sm:flex-row sm:text-left sm:text-sm"><span className="text-primary">{icon}</span>{label}</div> }
function Price({ price, title, description }: { price: string; title: string; description: string }) { return <article className="card flex items-center gap-4 border-l-4 border-l-primary p-5"><Box className="shrink-0 text-primary"/><div><p className="text-2xl font-black text-dark">{price}</p><h3 className="font-bold text-dark">{title}</h3><p className="text-xs sm:text-sm">{description}</p></div></article> }
function Testimonial({ image, quote, name, business }: { image: string; quote: string; name: string; business: string }) { return <figure className="bg-white p-5 text-dark"><Quote className="text-primary" size={25}/><blockquote className="mt-4 text-sm leading-7">“{quote}”</blockquote><figcaption className="mt-5 flex items-center gap-3"><Image src={image} alt={`${name}, Gideon Freight customer`} width={48} height={48} className="h-12 w-12 rounded-full object-cover"/><span><strong className="block text-sm">{name}</strong><span className="text-xs text-[#757575]">{business}</span></span></figcaption></figure> }
