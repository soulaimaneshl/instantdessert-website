'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@instantdessert/ui'

const NAV = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    href: '/admin/catalogue',
    label: 'Catalogue',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
  {
    href: '/admin/commandes',
    label: 'Commandes',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-creme flex">
      <aside className="w-56 shrink-0 bg-white border-r border-blush flex flex-col min-h-screen sticky top-0">
        <div className="px-5 py-5 border-b border-blush">
          <Logo size={24} />
          <p className="font-body text-xs text-chocolat/40 mt-1.5 uppercase tracking-widest">Administration</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(item => {
            const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-colors ${
                  isActive
                    ? 'bg-blush text-chocolat'
                    : 'text-chocolat/60 hover:bg-blush/50 hover:text-chocolat'
                }`}
              >
                <span className={`transition-colors ${isActive ? 'text-rose' : 'text-chocolat/40'}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-blush">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl font-body text-sm text-chocolat/50 hover:bg-blush/50 hover:text-chocolat transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Se déconnecter
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  )
}
