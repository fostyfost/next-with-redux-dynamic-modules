import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const links = [
  {
    href: '/',
    label: 'Index page',
  },
  {
    href: '/clock',
    label: 'Clock page',
  },
  {
    href: '/count',
    label: 'Count page',
  },
  {
    href: '/users',
    label: 'Users page',
  },
  {
    href: '/users2',
    label: 'User page 2',
  },
  {
    href: '/picsum',
    label: 'Picsum page',
  },
  {
    href: '/xkcd',
    label: 'XKCD page',
  },
  {
    href: '/intersection-observer',
    label: 'Intersection observer',
  },
]

const Navigation = () => {
  const router = useRouter()

  return (
    <nav>
      {links.map(({ href, label }) =>
        router.pathname === href ? (
          <span key={href} style={{ padding: '10px' }}>
            {label}
          </span>
        ) : (
          <Link key={href} href={href}>
            <a style={{ padding: '10px' }}>{label}</a>
          </Link>
        ),
      )}
    </nav>
  )
}

export { Navigation }
