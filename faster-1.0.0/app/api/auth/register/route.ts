import { NextRequest } from 'next/server'
import { registerSchema } from '@/lib/validation'
import { captchaFailure, verifyCaptcha } from '@/lib/captcha'

export async function POST(request: NextRequest) {
  try { const payload = await request.json(); const captcha = await verifyCaptcha(payload.captchaToken, payload.captchaV2Token); if (!captcha.ok) return captchaFailure(); const parsed = registerSchema.safeParse(payload); if (!parsed.success) return Response.json({ error: 'Please check the registration details.', fields: parsed.error.flatten() }, { status: 400 }); return Response.json({ message: 'Account created. You can now sign in.', user: { businessName: parsed.data.businessName, email: parsed.data.email } }, { status: 201 }) } catch { return Response.json({ error: 'We could not create your account. Please try again.' }, { status: 500 }) }
}
