import { NextRequest } from 'next/server'
import { courierSchema } from '@/lib/validation'
import { captchaFailure, verifyCaptcha } from '@/lib/captcha'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try { const payload = await request.json(); const captcha = await verifyCaptcha(payload.captchaToken, payload.captchaV2Token); if (!captcha.ok) return captchaFailure(); const parsed = courierSchema.safeParse(payload); if (!parsed.success) return Response.json({ error: 'Please check your application details.', fields: parsed.error.flatten() }, { status: 400 }); await sendEmail({ to: parsed.data.email, subject: 'We received your Gideon Freight courier application', text: `Hi ${parsed.data.name}, we received your application to join the Gideon Freight courier network in ${parsed.data.county}. Our team will contact you after reviewing your details.` }); return Response.json({ message: 'Application received. We will contact you after reviewing your details.' }, { status: 201 }) } catch { return Response.json({ error: 'We could not send your application. Please try again.' }, { status: 500 }) }
}
