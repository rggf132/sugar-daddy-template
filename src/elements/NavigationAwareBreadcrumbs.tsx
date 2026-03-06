import React from 'react'
import { PageUrls } from 'src/core/page-urls'
import { Breadcrumbs, Link } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'

export const NavigationAwareBreadcrumbs: React.FC = () => {
  const router = useRouter()
  const pathName = usePathname()

  const crumbs: { href: string; label: string }[] = []

  if (pathName !== '/') {
    crumbs.push({
      href: PageUrls.home(),
      label: 'Home',
    })
  }

  const breadCrumbs = crumbs.map((c) => (
    <Link
      key={c.href}
      onClick={() => router.push(c.href)}
      underline='hover'
      sx={{
        '&:hover': {
          color: 'inherit',
          cursor: 'pointer',
        },
      }}
    >
      {c.label}
    </Link>
  ))

  return <Breadcrumbs>{breadCrumbs}</Breadcrumbs>
}
