import { redirect } from 'next/navigation'
import { AdminDashboard } from './AdminDashboard'

export const metadata = { title: 'Dashboard Admin — Instant Dessert' }

export default async function AdminPage() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { createClient } = await import('@instantdessert/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/admin/connexion')
  }

  return <AdminDashboard />
}
