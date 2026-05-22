'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Product } from './products'

export interface CartItem {
  productId: string
  nom: string
  prix: number
  quantite: number
}

interface CartCtx {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, qty: number) => void
  clear: () => void
  total: number
  count: number
}

const CART_KEY = 'instantdessert_cart'
const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  function persist(next: CartItem[]) {
    setItems(next)
    localStorage.setItem(CART_KEY, JSON.stringify(next))
  }

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === product.id)
      const next = existing
        ? prev.map(i => i.productId === product.id ? { ...i, quantite: i.quantite + 1 } : i)
        : [...prev, { productId: product.id, nom: product.nom, prix: product.prix, quantite: 1 }]
      localStorage.setItem(CART_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems(prev => {
      const next = prev.filter(i => i.productId !== productId)
      localStorage.setItem(CART_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const updateQuantity = useCallback((productId: string, qty: number) => {
    if (qty <= 0) { removeItem(productId); return }
    setItems(prev => {
      const next = prev.map(i => i.productId === productId ? { ...i, quantite: qty } : i)
      localStorage.setItem(CART_KEY, JSON.stringify(next))
      return next
    })
  }, [removeItem])

  const clear = useCallback(() => {
    persist([])
  }, [])

  const total = items.reduce((s, i) => s + i.prix * i.quantite, 0)
  const count = items.reduce((s, i) => s + i.quantite, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clear, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
