import { ReactNode } from 'react'

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <section className="bg-dark py-14 text-white sm:py-18"><div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><p className="kicker">{eyebrow}</p><h1 className="mt-3 max-w-3xl text-3xl font-black sm:text-4xl md:text-5xl">{title}</h1>{children && <div className="mt-4 max-w-2xl text-sm text-[#d8d8dd] sm:text-base">{children}</div>}</div></section>
}
