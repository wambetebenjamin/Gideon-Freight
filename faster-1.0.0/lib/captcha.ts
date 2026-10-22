type CaptchaResult = { ok: boolean; requireV2?: boolean }

export async function verifyCaptcha(token?: string, v2Token?: string): Promise<CaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  // Local development can operate without keys. Production requires a verified token.
  if (!secret) return { ok: true }
  const responseToken = v2Token || token
  if (!responseToken) return { ok: false, requireV2: true }
  try {
    const body = new URLSearchParams({ secret, response: responseToken })
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'POST', body, cache: 'no-store' })
    const data = await response.json() as { success?: boolean; score?: number }
    if (!data.success) return { ok: false, requireV2: true }
    if (!v2Token && typeof data.score === 'number' && data.score < .5) return { ok: false, requireV2: true }
    return { ok: true }
  } catch { return { ok: false, requireV2: true } }
}

export function captchaFailure() { return Response.json({ error: 'We need an extra verification before continuing.', requireV2: true }, { status: 403 }) }
