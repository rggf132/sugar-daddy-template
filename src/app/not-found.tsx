'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PageUrls } from 'src/core/page-urls'

export default function NotFound() {
  const router = useRouter()
  return (
    <div className='global'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href='' onClick={() => router.push(PageUrls.home())}>
        Return Home
      </Link>
    </div>
  )
}
