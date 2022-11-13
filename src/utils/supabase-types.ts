export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Cargos: {
        Row: {
          id: number
          createdAt: string
          nome: string
          codigoCentroCusto: string | null
          descricaoCentroCusto: string | null
        }
        Insert: {
          id?: number
          createdAt?: string
          nome: string
          codigoCentroCusto?: string | null
          descricaoCentroCusto?: string | null
        }
        Update: {
          id?: number
          createdAt?: string
          nome?: string
          codigoCentroCusto?: string | null
          descricaoCentroCusto?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
