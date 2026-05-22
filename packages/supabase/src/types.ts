export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// Généré automatiquement par Supabase CLI (`supabase gen types typescript`)
// Ce fichier sera mis à jour à chaque migration de schéma
export interface Database {
  public: {
    Tables: Record<string, never>
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
