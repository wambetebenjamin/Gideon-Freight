import { NextRequest } from 'next/server'
import { getDeliveryByReference } from '@/lib/data'

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get('ref')
  if (!reference || reference.trim().length < 4) return Response.json({ error: 'Enter a valid tracking reference.' }, { status: 400 })
  const delivery = getDeliveryByReference(reference)
  if (!delivery) return Response.json({ error: 'No shipment was found with that reference.' }, { status: 404 })
  return Response.json({ delivery })
}
