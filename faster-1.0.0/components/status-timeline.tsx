'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { DeliveryStatus } from '@/lib/data'
import { Check } from 'lucide-react'

const steps: DeliveryStatus[] = ['Booked', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered']
export function StatusTimeline({ status }: { status: DeliveryStatus }) {
  const ref = useRef<HTMLDivElement>(null)
  const active = steps.indexOf(status)
  useEffect(() => { if (ref.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.fromTo(ref.current.querySelectorAll('.timeline-step'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: .12, duration: .35, ease: 'power2.out' }) }, [status])
  return <div ref={ref} className="flex flex-col gap-4 md:flex-row md:items-start md:gap-0">{steps.map((item, index) => <div key={item} className="timeline-step flex flex-1 items-center gap-3 md:flex-col md:items-start md:gap-3"><div className="flex items-center md:w-full"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-xs font-black ${index <= active ? 'border-primary bg-primary text-white' : 'border-[#d7d7dc] bg-white text-[#757575]'}`}>{index < active ? <Check size={15}/> : index + 1}</span>{index < steps.length - 1 && <span className={`ml-3 h-8 w-0.5 ${index < active ? 'timeline-line' : 'bg-[#dfdfe4]'} md:ml-0 md:mt-0 md:h-0.5 md:w-full`}/>}</div><div className="md:pr-3"><p className={`text-sm font-bold ${index <= active ? 'text-dark' : 'text-[#898991]'}`}>{item}</p><p className="mt-1 text-xs leading-5 text-[#757575]">{index <= active ? index === active ? 'Current shipment status' : 'Completed' : 'Upcoming'}</p></div></div>)}</div>
}
