'use client'

import { useState } from 'react'
import { AdminShell } from '../AdminShell'

interface Product {
  id: string
  nom: string
  categorie: string
  description: string
  prix: number
  poids: string
  allergenes: string[]
  actif: boolean
}

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', nom: 'Tarte au citron meringuée',   categorie: 'Tartes',          description: 'Citron de Sicile, meringue italienne dorée au chalumeau',        prix: 6.90, poids: '120g', allergenes: ['Gluten', 'Œufs', 'Lait'],                           actif: true },
  { id: '2', nom: 'Paris-Brest praliné',           categorie: 'Choux',           description: 'Praliné maison, crème mousseline, noisettes du Piémont',          prix: 7.50, poids: '150g', allergenes: ['Gluten', 'Œufs', 'Lait', 'Fruits à coque'],         actif: true },
  { id: '3', nom: 'Fondant chocolat noir 70%',    categorie: 'Chocolat',        description: 'Cœur coulant, chocolat Valrhona Grand Cru, fleur de sel',          prix: 5.90, poids: '80g',  allergenes: ['Gluten', 'Œufs', 'Lait'],                           actif: true },
  { id: '4', nom: 'Millefeuille vanille Bourbon', categorie: 'Classiques',      description: 'Feuilletage caramélisé, crème pâtissière vanille Bourbon',         prix: 7.20, poids: '130g', allergenes: ['Gluten', 'Œufs', 'Lait'],                           actif: true },
  { id: '5', nom: 'Éclair café',                  categorie: 'Choux',           description: 'Pâte à choux dorée, crème café, glaçage fondant',                  prix: 5.50, poids: '90g',  allergenes: ['Gluten', 'Œufs', 'Lait'],                           actif: true },
  { id: '6', nom: 'Tarte framboise & rose',       categorie: 'Tartes',          description: 'Framboises fraîches, crème légère à l\'eau de rose',               prix: 7.90, poids: '125g', allergenes: ['Gluten', 'Œufs', 'Lait', 'Fruits à coque'],         actif: true },
  { id: '7', nom: 'Mousse chocolat au lait',      categorie: 'Chocolat',        description: 'Chocolat au lait Jivara, texture aérienne, éclats cacao',          prix: 5.20, poids: '100g', allergenes: ['Œufs', 'Lait'],                                     actif: true },
  { id: '8', nom: 'Financier amande & miel',      categorie: 'Petits gâteaux',  description: 'Beurre noisette, amandes, miel de fleurs',                         prix: 3.50, poids: '60g',  allergenes: ['Gluten', 'Œufs', 'Lait', 'Fruits à coque'],         actif: true },
]

const CATEGORIES = ['Tartes', 'Choux', 'Chocolat', 'Classiques', 'Petits gâteaux']

const EMPTY_PRODUCT: Omit<Product, 'id' | 'actif'> = {
  nom: '', categorie: 'Tartes', description: '', prix: 0, poids: '', allergenes: [],
}

type ModalState =
  | { mode: 'closed' }
  | { mode: 'edit'; product: Product }
  | { mode: 'add' }

export function CatalogueAdmin() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [modal, setModal] = useState<ModalState>({ mode: 'closed' })
  const [filterCategorie, setFilterCategorie] = useState<string>('Tout')
  const [filterActif, setFilterActif] = useState<string>('Tout')

  const filtered = products.filter(p => {
    if (filterCategorie !== 'Tout' && p.categorie !== filterCategorie) return false
    if (filterActif === 'Actif' && !p.actif) return false
    if (filterActif === 'Inactif' && p.actif) return false
    return true
  })

  function toggleActif(id: string) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, actif: !p.actif } : p))
  }

  function saveProduct(data: Omit<Product, 'id' | 'actif'>) {
    if (modal.mode === 'edit') {
      setProducts(prev => prev.map(p => p.id === modal.product.id ? { ...p, ...data } : p))
    } else if (modal.mode === 'add') {
      const newId = String(Math.max(...products.map(p => Number(p.id))) + 1)
      setProducts(prev => [...prev, { ...data, id: newId, actif: true }])
    }
    setModal({ mode: 'closed' })
  }

  const activeCount = products.filter(p => p.actif).length

  return (
    <AdminShell>
      <header className="bg-creme/80 backdrop-blur sticky top-0 z-10 border-b border-blush px-8 h-16 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl text-chocolat">Catalogue</h1>
          <p className="font-body text-xs text-chocolat/40">{activeCount} produit{activeCount > 1 ? 's' : ''} actif{activeCount > 1 ? 's' : ''} sur {products.length}</p>
        </div>
        <button
          onClick={() => setModal({ mode: 'add' })}
          className="min-h-[40px] px-5 inline-flex items-center gap-2 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Ajouter un produit
        </button>
      </header>

      <main className="flex-1 px-8 py-8 space-y-6">

        {/* Filtres */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 bg-white border border-blush rounded-xl px-1 py-1">
            {['Tout', ...CATEGORIES].map(cat => (
              <button key={cat}
                onClick={() => setFilterCategorie(cat)}
                className={`px-3 py-1.5 rounded-lg font-body text-xs transition-colors ${
                  filterCategorie === cat ? 'bg-chocolat text-white' : 'text-chocolat/60 hover:bg-blush/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-white border border-blush rounded-xl px-1 py-1">
            {['Tout', 'Actif', 'Inactif'].map(f => (
              <button key={f}
                onClick={() => setFilterActif(f)}
                className={`px-3 py-1.5 rounded-lg font-body text-xs transition-colors ${
                  filterActif === f ? 'bg-chocolat text-white' : 'text-chocolat/60 hover:bg-blush/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="font-body text-xs text-chocolat/40 ml-auto">{filtered.length} résultat{filtered.length > 1 ? 's' : ''}</p>
        </div>

        {/* Tableau */}
        <div className="bg-white border border-blush rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-blush/20 border-b border-blush">
                <th className="text-left font-body text-xs text-chocolat/50 uppercase tracking-wide px-6 py-3">Produit</th>
                <th className="text-left font-body text-xs text-chocolat/50 uppercase tracking-wide px-4 py-3">Catégorie</th>
                <th className="text-right font-body text-xs text-chocolat/50 uppercase tracking-wide px-4 py-3">Prix</th>
                <th className="text-left font-body text-xs text-chocolat/50 uppercase tracking-wide px-4 py-3">Poids</th>
                <th className="text-center font-body text-xs text-chocolat/50 uppercase tracking-wide px-4 py-3">Statut</th>
                <th className="text-right font-body text-xs text-chocolat/50 uppercase tracking-wide px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush/60">
              {filtered.map(product => (
                <tr key={product.id} className={`transition-colors ${product.actif ? 'hover:bg-blush/10' : 'bg-chocolat/[0.02] hover:bg-chocolat/5'}`}>
                  <td className="px-6 py-4">
                    <p className={`font-body text-sm font-medium ${product.actif ? 'text-chocolat' : 'text-chocolat/40'}`}>
                      {product.nom}
                    </p>
                    <p className="font-body text-xs text-chocolat/40 mt-0.5 line-clamp-1">{product.description}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-body text-xs bg-blush/50 text-chocolat/70 px-2.5 py-1 rounded-full">
                      {product.categorie}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className={`font-display text-sm ${product.actif ? 'text-caramel' : 'text-chocolat/30'}`}>
                      {product.prix.toFixed(2)} €
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-body text-xs text-chocolat/50">{product.poids}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => toggleActif(product.id)}
                      title={product.actif ? 'Désactiver' : 'Activer'}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                        product.actif ? 'bg-rose' : 'bg-chocolat/20'
                      }`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                        product.actif ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setModal({ mode: 'edit', product })}
                      className="font-body text-xs text-chocolat/50 hover:text-rose transition-colors px-3 py-1.5 rounded-lg hover:bg-blush/50"
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center font-body text-sm text-chocolat/30">
                    Aucun produit correspondant aux filtres
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal édition / ajout */}
      {modal.mode !== 'closed' && (
        <ProductModal
          mode={modal.mode}
          product={modal.mode === 'edit' ? modal.product : undefined}
          onSave={saveProduct}
          onClose={() => setModal({ mode: 'closed' })}
        />
      )}
    </AdminShell>
  )
}

function ProductModal({
  mode,
  product,
  onSave,
  onClose,
}: {
  mode: 'edit' | 'add'
  product?: Product
  onSave: (data: Omit<Product, 'id' | 'actif'>) => void
  onClose: () => void
}) {
  const initial = product ?? { ...EMPTY_PRODUCT }
  const [nom, setNom] = useState(initial.nom)
  const [categorie, setCategorie] = useState(initial.categorie)
  const [description, setDescription] = useState(initial.description)
  const [prix, setPrix] = useState(String(initial.prix))
  const [poids, setPoids] = useState(initial.poids)
  const [allergenesInput, setAllergenesInput] = useState(initial.allergenes.join(', '))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave({
      nom: nom.trim(),
      categorie,
      description: description.trim(),
      prix: parseFloat(prix) || 0,
      poids: poids.trim(),
      allergenes: allergenesInput.split(',').map(a => a.trim()).filter(Boolean),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-chocolat/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-blush">
          <h2 className="font-display text-xl text-chocolat">
            {mode === 'edit' ? 'Modifier le produit' : 'Nouveau produit'}
          </h2>
          <button onClick={onClose} className="text-chocolat/40 hover:text-chocolat transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <Field label="Nom du produit">
            <input required value={nom} onChange={e => setNom(e.target.value)}
              className="w-full font-body text-sm border border-blush rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose transition-colors"
              placeholder="Ex : Tarte au citron meringuée" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Catégorie">
              <select value={categorie} onChange={e => setCategorie(e.target.value)}
                className="w-full font-body text-sm border border-blush rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose transition-colors bg-white">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Prix (€)">
              <input required type="number" step="0.01" min="0" value={prix} onChange={e => setPrix(e.target.value)}
                className="w-full font-body text-sm border border-blush rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose transition-colors" />
            </Field>
          </div>

          <Field label="Description courte">
            <input value={description} onChange={e => setDescription(e.target.value)}
              className="w-full font-body text-sm border border-blush rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose transition-colors"
              placeholder="Ingrédients principaux, caractéristiques" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Poids">
              <input value={poids} onChange={e => setPoids(e.target.value)}
                className="w-full font-body text-sm border border-blush rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose transition-colors"
                placeholder="Ex : 120g" />
            </Field>
            <Field label="Allergènes (séparés par ,)">
              <input value={allergenesInput} onChange={e => setAllergenesInput(e.target.value)}
                className="w-full font-body text-sm border border-blush rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose transition-colors"
                placeholder="Gluten, Œufs, Lait" />
            </Field>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 min-h-[44px] font-body text-sm border border-blush text-chocolat/60 rounded-full hover:border-chocolat hover:text-chocolat transition-colors">
              Annuler
            </button>
            <button type="submit"
              className="flex-1 min-h-[44px] font-body text-sm bg-rose text-white rounded-full hover:opacity-90 transition-opacity">
              {mode === 'edit' ? 'Enregistrer' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="font-body text-xs text-chocolat/50 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}
