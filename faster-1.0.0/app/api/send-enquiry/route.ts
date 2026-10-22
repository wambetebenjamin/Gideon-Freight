import { NextRequest } from 'next/server'
import { enquirySchema } from '@/lib/validation'
import { captchaFailure, verifyCaptcha } from '@/lib/captcha'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try { const payload = await request.json(); const captcha = await verifyCaptcha(payload.captchaToken, payload.captchaV2Token); if (!captcha.ok) return captchaFailure(); const parsed = enquirySchema.safeParse(payload); if (!parsed.success) return Response.json({ error: 'Please check your enquiry.', fields: parsed.error.flatten() }, { status: 400 }); await sendEmail({ to: process.env.SMTP_FROM || 'operations@gideonfreight.co.ke', subject: `Gideon Freight enquiry from ${parsed.data.name}`, text: parsed.data.message }); return Response.json({ message: 'Thanks. We will get back to you shortly.' }, { status: 201 }) } catch { return Response.json({ error: 'We could not send your enquiry. Please try again.' }, { status: 500 }) }
}
