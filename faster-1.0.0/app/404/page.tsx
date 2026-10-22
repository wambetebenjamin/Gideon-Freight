import { ErrorPage } from '@/components/error-page'
export const metadata = { title: 'Page not found' }
export default function FourOhFourPage() { return <ErrorPage code="404" title="This route has moved on" text="The page you are looking for does not exist, but your next delivery can still get where it is going." /> }
