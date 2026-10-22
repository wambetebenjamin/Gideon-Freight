import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { BookingForm } from '@/components/booking-form'
import { PageHero } from '@/components/page-hero'

export const metadata = { title: 'Book a delivery' }
export default async function BookPage() { const session = await auth(); if (!session) redirect('/login?callbackUrl=/book'); return <><PageHero eyebrow="Secure booking" title="Book a delivery"><p>Tell us where your package is going. We will do the rest.</p></PageHero><section className="bg-[#f5f5f7] py-10 sm:py-14"><div className="mx-auto w-full max-w-3xl px-4 sm:px-6"><BookingForm /></div></section></> }
