export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Message: {
        Row: {
          content: string
          contentType: string
          createdAt: string
          id: string
          isDisliked: boolean
          isLiked: boolean
          status: string
          updatedAt: string
          userId: string
        }
        Insert: {
          content?: string
          contentType?: string
          createdAt?: string
          id: string
          isDisliked?: boolean
          isLiked?: boolean
          status?: string
          updatedAt: string
          userId: string
        }
        Update: {
          content?: string
          contentType?: string
          createdAt?: string
          id?: string
          isDisliked?: boolean
          isLiked?: boolean
          status?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Message_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      User: {
        Row: {
          createdAt: string
          email: string
          id: string
          name: string | null
          password: string
          phoneNumber: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email: string
          id: string
          name?: string | null
          password: string
          phoneNumber?: string | null
          updatedAt: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
          name?: string | null
          password?: string
          phoneNumber?: string | null
          updatedAt?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
