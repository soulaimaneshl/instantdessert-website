export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// Généré manuellement — à remplacer par `supabase gen types typescript` après connexion
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          nom: string
          description: string
          prix_b2b: number
          prix_b2c: number
          categorie: string
          actif: boolean
          dlc: string
          allergenes: string[]
          conditionnement: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      restaurants: {
        Row: {
          id: string
          user_id: string | null
          nom: string
          adresse: string
          telephone: string
          statut_validation: 'en_attente' | 'valide' | 'refuse'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['restaurants']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['restaurants']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
