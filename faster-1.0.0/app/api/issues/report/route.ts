import { NextRequest } from 'next/server'
import { issueSchema } from '@/lib/validation'
import { captchaFailure, verifyCaptcha } from '@/lib/captcha'

export async function POST(request: NextRequest) {
  try { const payload = await request.json(); const captcha = await verifyCaptcha(payload.captchaToken, payload.captchaV2Token); if (!captcha.ok) return captchaFailure(); const parsed = issueSchema.safeParse(payload); if (!parsed.success) return Response.json({ error: 'Please complete the issue report.', fields: parsed.error.flatten() }, { status: 400 }); return Response.json({ message: 'Your issue has been received. Our team will contact you shortly.', caseNumber: `GF-I-${Math.floor(10000 + Math.random() * 89999)}` }, { status: 201 }) } catch { return Response.json({ error: 'We could not send the report. Please try again.' }, { status: 500 }) }
}
