'use client'

import Link from 'next/link'
import { Logo } from '@instantdessert/ui'

const STATS = [
  {
    label: "Commandes aujourd'hui",
    value: '14',
    sub: '+3 depuis hier',
    color: 'text-rose',
    bg: 'bg-rose/10',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  {
    label: 'CA cette semaine',
    value: '1 247 €',
    sub: '↑ 18% vs semaine passée',
    color: 'text-caramel',
    bg: 'bg-caramel/10',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    label: 'En attente',
    value: '4',
    sub: 'À traiter',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Nouveaux clients',
    value: '7',
    sub: 'Cette semaine',
    color: 'text-green-700',
    bg: 'bg-green-50',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
]

const ORDERS = [
  { id: 'B2C-2026-0041', type: 'B2C', client: 'Marie Dupont', date: '23/05/2026', total: 28.60, statut: 'En préparation' },
  { id: 'PRO-2026-0018', type: 'B2B', client: 'Le Petit Bistrot', date: '23/05/2026', total: 184.50, statut: 'En attente' },
  { id: 'B2C-2026-0040', type: 'B2C', client: 'Lucas Bernard', date: '23/05/2026', total: 13.80, statut: 'Livré' },
  { id: 'PRO-2026-0017', type: 'B2B', client: 'Brasserie du Parc', date: '22/05/2026', total: 312.00, statut: 'Livré' },
  { id: 'B2C-2026-0039', type: 'B2C', client: 'Sophie Martin', date: '22/05/2026', total: 21.40, statut: 'Livré' },
  { id: 'B2C-2026-0038', type: 'B2C', client: 'Théo Lefebvre', date: '22/05/2026', total: 34.70, statut: 'En attente' },
  { id: 'PRO-2026-0016', type: 'B2B', client: 'Café Voltaire', date: '21/05/2026', total: 96.00, statut: 'Livré' },
  { id: 'B2C-2026-0037', type: 'B2C', client: 'Emma Rousseau', date: '21/05/2026', total: 17.90, statut: 'Livré' },
]

const NAV = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    href: '/admin/catalogue',
    label: 'Catalogue',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
  {
    href: '/admin/commandes',
    label: 'Commandes',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
]

const STATUT_STYLE: Record<string, string> = {
  'Livré': 'bg-green-50 text-green-700 border-green-200',
  'En préparation': 'bg-blue-50 text-blue-700 border-blue-200',
  'En attente': 'bg-amber-50 text-amber-700 border-amber-200',
}

export function AdminDashboard() {
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1)

  return (
    <div className="min-h-screen bg-creme flex">

      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-blush flex flex-col min-h-screen sticky top-0">
        <div className="px-5 py-5 border-b border-blush">
          <Logo size={24} />
          <p className="font-body text-xs text-chocolat/40 mt-1.5 uppercase tracking-widest">Administration</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm text-chocolat/70 hover:bg-blush/50 hover:text-chocolat transition-colors group"
            >
              <span className="text-chocolat/40 group-hover:text-rose transition-colors">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-blush">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl font-body text-sm text-chocolat/50 hover:bg-blush/50 hover:text-chocolat transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-creme/80 backdrop-blur sticky top-0 z-10 border-b border-blush px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl text-chocolat">Tableau de bord</h1>
            <p className="font-body text-xs text-chocolat/40">{todayCapitalized}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body text-xs text-chocolat/40">Admin</span>
            <div className="w-8 h-8 rounded-full bg-rose flex items-center justify-center">
              <span className="font-display text-sm text-white">A</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-8 py-8 space-y-8">

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map(stat => (
              <div key={stat.label} className="bg-white border border-blush rounded-2xl p-5 space-y-3">
                <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className={`font-display text-2xl ${stat.color}`}>{stat.value}</p>
                  <p className="font-body text-xs text-chocolat/60">{stat.label}</p>
                </div>
                <p className="font-body text-xs text-chocolat/40">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Répartition rapide */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-blush rounded-2xl p-5">
              <p className="font-body text-xs text-rose uppercase tracking-widest mb-1">Dark Kitchen</p>
              <p className="font-display text-3xl text-chocolat">847 €</p>
              <p className="font-body text-xs text-chocolat/40 mt-1">B2C · 9 commandes cette semaine</p>
            </div>
            <div className="bg-white border border-blush rounded-2xl p-5">
              <p className="font-body text-xs text-caramel uppercase tracking-widest mb-1">Espace Pro</p>
              <p className="font-display text-3xl text-chocolat">400 €</p>
              <p className="font-body text-xs text-chocolat/40 mt-1">B2B · 3 commandes cette semaine</p>
            </div>
          </div>

          {/* Commandes récentes */}
          <div className="bg-white border border-blush rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-blush">
              <h2 className="font-display text-lg text-chocolat">Commandes récentes</h2>
              <Link href="/admin/commandes"
                className="font-body text-xs text-rose hover:underline underline-offset-2">
                Voir tout →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blush/20">
                    <th className="text-left font-body text-xs text-chocolat/50 uppercase tracking-wide px-6 py-3">Référence</th>
                    <th className="text-left font-body text-xs text-chocolat/50 uppercase tracking-wide px-4 py-3">Type</th>
                    <th className="text-left font-body text-xs text-chocolat/50 uppercase tracking-wide px-4 py-3">Client</th>
                    <th className="text-left font-body text-xs text-chocolat/50 uppercase tracking-wide px-4 py-3">Date</th>
                    <th className="text-right font-body text-xs text-chocolat/50 uppercase tracking-wide px-4 py-3">Total</th>
                    <th className="text-left font-body text-xs text-chocolat/50 uppercase tracking-wide px-6 py-3">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blush/60">
                  {ORDERS.map(order => (
                    <tr key={order.id} className="hover:bg-blush/10 transition-colors">
                      <td className="px-6 py-3.5">
                        <span className="font-body text-sm text-chocolat font-medium">#{order.id}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`font-body text-xs px-2 py-0.5 rounded-full border font-medium ${
                          order.type === 'B2C'
                            ? 'bg-rose/10 text-rose border-rose/20'
                            : 'bg-caramel/10 text-caramel border-caramel/20'
                        }`}>
                          {order.type}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-body text-sm text-chocolat/80">{order.client}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-body text-xs text-chocolat/50">{order.date}</span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className="font-display text-sm text-chocolat">{order.total.toFixed(2)} €</span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`font-body text-xs px-2.5 py-1 rounded-full border ${STATUT_STYLE[order.statut] ?? ''}`}>
                          {order.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Accès rapides */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/catalogue"
              className="group bg-white border border-blush rounded-2xl p-6 hover:shadow-md hover:border-rose/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center text-rose">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                </div>
                <h3 className="font-display text-lg text-chocolat">Gérer le catalogue</h3>
              </div>
              <p className="font-body text-xs text-chocolat/50">Ajouter, modifier ou désactiver des produits</p>
            </Link>
            <Link href="/admin/commandes"
              className="group bg-white border border-blush rounded-2xl p-6 hover:shadow-md hover:border-caramel/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-caramel/10 flex items-center justify-center text-caramel">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                  </svg>
                </div>
                <h3 className="font-display text-lg text-chocolat">Gérer les commandes</h3>
              </div>
              <p className="font-body text-xs text-chocolat/50">Changer les statuts et voir les détails</p>
            </Link>
          </div>

        </main>
      </div>
    </div>
  )
}
