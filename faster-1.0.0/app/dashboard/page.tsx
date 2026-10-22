import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { DashboardContent } from '@/components/dashboard-content'
import { getRecentDeliveries } from '@/lib/data'
export const metadata = { title: 'Delivery dashboard' }
export default async function DashboardPage() { const session = await auth(); if (!session) redirect('/login?callbackUrl=/dashboard'); return <DashboardContent deliveries={getRecentDeliveries()} /> }
