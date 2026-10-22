import { PackageCheck } from 'lucide-react'
import Link from 'next/link'

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`inline-flex min-h-[44px] items-center gap-2 py-1 text-xl font-black tracking-tight ${inverse ? 'text-white' : 'text-dark'}`} aria-label="Gideon Freight home">
      <span className="grid h-9 w-9 place-items-center bg-primary text-white"><PackageCheck size={20} strokeWidth={2.6} /></span>
      <span>GIDEON <span className="text-primary">FREIGHT</span></span>
    </Link>
  )
}
