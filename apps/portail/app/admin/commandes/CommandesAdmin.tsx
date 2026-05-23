'use client'

import { useState } from 'react'
import { AdminShell } from '../AdminShell'

type Statut = 'En attente' | 'En préparation' | 'En livraison' | 'Livré' | 'Annulé'
type Type = 'B2C' | 'B2B'

interface OrderItem {
  nom: string
  quantite: number
  prix: number
}

interface Order {
  id: string
  type: Type
  client: string
  email: string
  adresse: string
  date: string
  total: number
  statut: Statut
  items: OrderItem[]
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'B2C-2026-0041', type: 'B2C', client: 'Marie Dupont', email: 'marie.dupont@email.com',
    adresse: '12 rue des Lilas, 92100 Boulogne-Billancourt', date: '23/05/2026', total: 28.60, statut: 'En préparation',
    items: [
      { nom: 'Paris-Brest praliné', quantite: 2, prix: 7.50 },
      { nom: 'Tarte au citron meringuée', quantite: 1, prix: 6.90 },
      { nom: 'Éclair café', quantite: 1, prix: 5.50 },
    ],
  },
  {
    id: 'PRO-2026-0018', type: 'B2B', client: 'Le Petit Bistrot', email: 'commandes@lepetitbistrot.fr',
    adresse: '8 avenue Victor Hugo, 92200 Neuilly-sur-Seine', date: '23/05/2026', total: 184.50, statut: 'En attente',
    items: [
      { nom: 'Millefeuille vanille Bourbon', quantite: 12, prix: 7.20 },
      { nom: 'Tarte framboise & rose', quantite: 10, prix: 7.90 },
    ],
  },
  {
    id: 'B2C-2026-0040', type: 'B2C', client: 'Lucas Bernard', email: 'lucas.b@gmail.com',
    adresse: '3 impasse du Moulin, 92140 Clamart', date: '23/05/2026', total: 13.80, statut: 'Livré',
    items: [
      { nom: 'Fondant chocolat noir 70%', quantite: 1, prix: 5.90 },
      { nom: 'Financier amande & miel', quantite: 2, prix: 3.50 },
    ],
  },
  {
    id: 'PRO-2026-0017', type: 'B2B', client: 'Brasserie du Parc', email: 'direction@brasserieduparc.fr',
    adresse: '45 boulevard du Parc, 92200 Neuilly-sur-Seine', date: '22/05/2026', total: 312.00, statut: 'Livré',
    items: [
      { nom: 'Paris-Brest praliné', quantite: 20, prix: 7.50 },
      { nom: 'Tarte au citron meringuée', quantite: 16, prix: 6.90 },
    ],
  },
  {
    id: 'B2C-2026-0039', type: 'B2C', client: 'Sophie Martin', email: 'sophie.martin@outlook.fr',
    adresse: '27 rue de la Paix, 92300 Levallois-Perret', date: '22/05/2026', total: 21.40, statut: 'Livré',
    items: [
      { nom: 'Mousse chocolat au lait', quantite: 2, prix: 5.20 },
      { nom: 'Éclair café', quantite: 2, prix: 5.50 },
    ],
  },
  {
    id: 'B2C-2026-0038', type: 'B2C', client: 'Théo Lefebvre', email: 'theo.lefebvre@gmail.com',
    adresse: '9 rue Georges Clemenceau, 92600 Asnières', date: '22/05/2026', total: 34.70, statut: 'En livraison',
    items: [
      { nom: 'Tarte framboise & rose', quantite: 2, prix: 7.90 },
      { nom: 'Millefeuille vanille Bourbon', quantite: 2, prix: 7.20 },
      { nom: 'Fondant chocolat noir 70%', quantite: 1, prix: 5.90 },
    ],
  },
  {
    id: 'PRO-2026-0016', type: 'B2B', client: 'Café Voltaire', email: 'achat@cafevoltaire.fr',
    adresse: '2 place Voltaire, 92130 Issy-les-Moulineaux', date: '21/05/2026', total: 96.00, statut: 'Livré',
    items: [
      { nom: 'Financier amande & miel', quantite: 16, prix: 3.50 },
      { nom: 'Éclair café', quantite: 8, prix: 5.50 },
    ],
  },
  {
    id: 'B2C-2026-0037', type: 'B2C', client: 'Emma Rousseau', email: 'emma.r@icloud.com',
    adresse: '54 avenue des Fleurs, 92110 Clichy', date: '21/05/2026', total: 17.90, statut: 'Livré',
    items: [
      { nom: 'Tarte au citron meringuée', quantite: 1, prix: 6.90 },
      { nom: 'Mousse chocolat au lait', quantite: 2, prix: 5.20 },
    ],
  },
]

const STATUTS: Statut[] = ['En attente', 'En préparation', 'En livraison', 'Livré', 'Annulé']

const STATUT_STYLE: Record<Statut, string> = {
  'En attente':     'bg-amber-50 text-amber-700 border-amber-200',
  'En préparation': 'bg-blue-50 text-blue-700 border-blue-200',
  'En livraison':   'bg-purple-50 text-purple-700 border-purple-200',
  'Livré':          'bg-green-50 text-green-700 border-green-200',
  'Annulé':         'bg-red-50 text-red-400 border-red-200',
}

export function CommandesAdmin() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS)
  const [selected, setSelected] = useState<Order | null>(null)
  const [filterType, setFilterType] = useState<string>('Tout')
  const [filterStatut, setFilterStatut] = useState<string>('Tout')

  const filtered = orders.filter(o => {
    if (filterType !== 'Tout' && o.type !== filterType) return false
    if (filterStatut !== 'Tout' && o.statut !== filterStatut) return false
    return true
  })

  const enAttente = orders.filter(o => o.statut === 'En attente').length
  const enCours = orders.filter(o => o.statut === 'En préparation' || o.statut === 'En livraison').length

  function updateStatut(id: string, statut: Statut) {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, statut } : o))
    setSelected(prev => prev?.id === id ? { ...prev, statut } : prev)
  }

  return (
    <AdminShell>
      <header className="bg-creme/80 backdrop-blur sticky top-0 z-10 border-b border-blush px-8 h-16 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl text-chocolat">Commandes</h1>
          <p className="font-body text-xs text-chocolat/40">
            {enAttente > 0 && `${enAttente} en attente`}
            {enAttente > 0 && enCours > 0 && ' · '}
            {enCours > 0 && `${enCours} en cours`}
            {enAttente === 0 && enCours === 0 && 'Tout est traité'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-body text-xs text-chocolat/40">Admin</span>
          <div className="w-8 h-8 rounded-full bg-rose flex items-center justify-center">
            <span className="font-display text-sm text-white">A</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex min-w-0 min-h-0">

        {/* Liste */}
        <div className={`flex flex-col ${selected ? 'w-[55%]' : 'flex-1'} transition-all`}>
          {/* Filtres */}
          <div className="px-8 py-4 border-b border-blush flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 bg-white border border-blush rounded-xl px-1 py-1">
              {['Tout', 'B2C', 'B2B'].map(f => (
                <button key={f} onClick={() => setFilterType(f)}
                  className={`px-3 py-1.5 rounded-lg font-body text-xs transition-colors ${
                    filterType === f ? 'bg-chocolat text-white' : 'text-chocolat/60 hover:bg-blush/50'
                  }`}>{f}</button>
              ))}
            </div>
            <div className="flex items-center gap-1 bg-white border border-blush rounded-xl px-1 py-1 flex-wrap">
              {['Tout', ...STATUTS].map(f => (
                <button key={f} onClick={() => setFilterStatut(f)}
                  className={`px-3 py-1.5 rounded-lg font-body text-xs transition-colors ${
                    filterStatut === f ? 'bg-chocolat text-white' : 'text-chocolat/60 hover:bg-blush/50'
                  }`}>{f}</button>
              ))}
            </div>
            <p className="font-body text-xs text-chocolat/40 ml-auto">{filtered.length} commande{filtered.length > 1 ? 's' : ''}</p>
          </div>

          {/* Tableau */}
          <div className="flex-1 overflow-auto px-8 py-6">
            <div className="bg-white border border-blush rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-blush/20 border-b border-blush">
                    <th className="text-left font-body text-xs text-chocolat/50 uppercase tracking-wide px-5 py-3">Référence</th>
                    <th className="text-left font-body text-xs text-chocolat/50 uppercase tracking-wide px-4 py-3">Type</th>
                    <th className="text-left font-body text-xs text-chocolat/50 uppercase tracking-wide px-4 py-3">Client</th>
                    <th className="text-left font-body text-xs text-chocolat/50 uppercase tracking-wide px-4 py-3">Date</th>
                    <th className="text-right font-body text-xs text-chocolat/50 uppercase tracking-wide px-4 py-3">Total</th>
                    <th className="text-left font-body text-xs text-chocolat/50 uppercase tracking-wide px-5 py-3">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blush/60">
                  {filtered.map(order => (
                    <tr key={order.id}
                      onClick={() => setSelected(selected?.id === order.id ? null : order)}
                      className={`cursor-pointer transition-colors ${
                        selected?.id === order.id ? 'bg-blush/30' : 'hover:bg-blush/10'
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <span className="font-body text-sm text-chocolat font-medium">#{order.id}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`font-body text-xs px-2 py-0.5 rounded-full border font-medium ${
                          order.type === 'B2C' ? 'bg-rose/10 text-rose border-rose/20' : 'bg-caramel/10 text-caramel border-caramel/20'
                        }`}>{order.type}</span>
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
                      <td className="px-5 py-3.5">
                        <span className={`font-body text-xs px-2.5 py-1 rounded-full border ${STATUT_STYLE[order.statut]}`}>
                          {order.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center font-body text-sm text-chocolat/30">
                        Aucune commande correspondante
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Panneau détail */}
        {selected && (
          <div className="w-[45%] border-l border-blush bg-white flex flex-col overflow-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-blush sticky top-0 bg-white z-10">
              <div>
                <p className="font-body text-xs text-chocolat/40 uppercase tracking-wide">Détail commande</p>
                <p className="font-body text-sm text-chocolat font-medium">#{selected.id}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-chocolat/40 hover:text-chocolat transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="flex-1 px-6 py-5 space-y-6">

              {/* Infos client */}
              <section className="space-y-3">
                <p className="font-body text-xs text-chocolat/40 uppercase tracking-widest">Client</p>
                <div className="bg-blush/20 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-body text-xs px-2 py-0.5 rounded-full border font-medium ${
                      selected.type === 'B2C' ? 'bg-rose/10 text-rose border-rose/20' : 'bg-caramel/10 text-caramel border-caramel/20'
                    }`}>{selected.type}</span>
                    <p className="font-body text-sm text-chocolat font-medium">{selected.client}</p>
                  </div>
                  <p className="font-body text-xs text-chocolat/60">{selected.email}</p>
                  <p className="font-body text-xs text-chocolat/60">{selected.adresse}</p>
                </div>
              </section>

              {/* Articles */}
              <section className="space-y-3">
                <p className="font-body text-xs text-chocolat/40 uppercase tracking-widest">Articles</p>
                <div className="border border-blush rounded-xl divide-y divide-blush overflow-hidden">
                  {selected.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="font-body text-sm text-chocolat">{item.nom}</p>
                        <p className="font-body text-xs text-chocolat/40">×{item.quantite} · {item.prix.toFixed(2)} € / pièce</p>
                      </div>
                      <p className="font-display text-sm text-caramel shrink-0 ml-4">
                        {(item.prix * item.quantite).toFixed(2)} €
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between px-4 py-3 bg-blush/10">
                    <span className="font-display text-sm text-chocolat">Total</span>
                    <span className="font-display text-base text-chocolat">{selected.total.toFixed(2)} €</span>
                  </div>
                </div>
              </section>

              {/* Changement de statut */}
              <section className="space-y-3">
                <p className="font-body text-xs text-chocolat/40 uppercase tracking-widest">Changer le statut</p>
                <div className="grid grid-cols-1 gap-2">
                  {STATUTS.map(statut => (
                    <button key={statut}
                      onClick={() => updateStatut(selected.id, statut)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border font-body text-sm transition-all ${
                        selected.statut === statut
                          ? `${STATUT_STYLE[statut]} font-medium`
                          : 'border-blush text-chocolat/50 hover:border-chocolat/30 hover:text-chocolat hover:bg-blush/20'
                      }`}
                    >
                      <span>{statut}</span>
                      {selected.statut === statut && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </section>

            </div>
          </div>
        )}

      </main>
    </AdminShell>
  )
}
