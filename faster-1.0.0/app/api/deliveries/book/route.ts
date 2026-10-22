import { NextRequest } from 'next/server'
import { auth } from '@/auth'
import { bookingSchema } from '@/lib/validation'
import { captchaFailure, verifyCaptcha } from '@/lib/captcha'
import { createDelivery } from '@/lib/data'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const captcha = await verifyCaptcha(payload.captchaToken, payload.captchaV2Token)
    if (!captcha.ok) return captchaFailure()
    const parsed = bookingSchema.safeParse(payload)
    if (!parsed.success) return Response.json({ error: 'Please check the delivery details.', fields: parsed.error.flatten() }, { status: 400 })
    const delivery = createDelivery(parsed.data)
    const session = await auth()
    await sendEmail({ to: session?.user?.email || process.env.SMTP_FROM || 'operations@gideonfreight.co.ke', subject: `Your Gideon Freight delivery ${delivery.reference}`, text: `Your delivery is booked. Tracking reference: ${delivery.reference}. We will notify you as it moves from ${delivery.pickupAddress} to ${delivery.deliveryAddress}.` })
    return Response.json({ delivery, message: 'Delivery booked successfully.' }, { status: 201 })
  } catch { return Response.json({ error: 'We could not book this delivery. Please try again.' }, { status: 500 }) }
}
