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
      Autonomos: {
        Row: {
          id: number
          created_at: string | null
          nome: string
          cpf: string
          banco: string | null
          agencia: number | null
          conta: string | null
          operacao: string | null
          pix: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          nome: string
          cpf: string
          banco?: string | null
          agencia?: number | null
          conta?: string | null
          operacao?: string | null
          pix?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          nome?: string
          cpf?: string
          banco?: string | null
          agencia?: number | null
          conta?: string | null
          operacao?: string | null
          pix?: string | null
        }
      }
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
      Contratos: {
        Row: {
          id: number
          created_at: string | null
          vigenciaInicio: string
          vigenciaFim: string
          valorVT: number | null
          valorVR: number | null
          valorDiaria: number | null
          encerradoManualmente: boolean
          idAutonomo: number
          idCargo: number
        }
        Insert: {
          id?: number
          created_at?: string | null
          vigenciaInicio: string
          vigenciaFim: string
          valorVT?: number | null
          valorVR?: number | null
          valorDiaria?: number | null
          encerradoManualmente?: boolean
          idAutonomo: number
          idCargo: number
        }
        Update: {
          id?: number
          created_at?: string | null
          vigenciaInicio?: string
          vigenciaFim?: string
          valorVT?: number | null
          valorVR?: number | null
          valorDiaria?: number | null
          encerradoManualmente?: boolean
          idAutonomo?: number
          idCargo?: number
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
