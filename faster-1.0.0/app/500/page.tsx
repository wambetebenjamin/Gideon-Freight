import { ErrorPage } from '@/components/error-page'
export const metadata = { title: 'Service issue' }
export default function FiveHundredPage() { return <ErrorPage code="500" title="We hit a dispatch delay" text="Our team is working on it. Please try again, or message us directly on WhatsApp at +254 112 272 061." server /> }
