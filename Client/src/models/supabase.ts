export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      friends: {
        Row: {
          friendid: string
          status: string
          userid: string
        }
        Insert: {
          friendid: string
          status?: string
          userid: string
        }
        Update: {
          friendid?: string
          status?: string
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: 'friends_friendid_fkey'
            columns: ['friendid']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'friends_userid_fkey'
            columns: ['userid']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          address: string | null
          age: number | null
          birthdate: string | null
          city: string | null
          country: string | null
          email: string
          firstname: string
          gender: string | null
          id: string
          image: string | null
          ip: string | null
          lastname: string
          macaddress: string | null
          phone: string | null
          role: string | null
          state: string | null
          username: string
        }
        Insert: {
          address?: string | null
          age?: number | null
          birthdate?: string | null
          city?: string | null
          country?: string | null
          email: string
          firstname: string
          gender?: string | null
          id: string
          image?: string | null
          ip?: string | null
          lastname: string
          macaddress?: string | null
          phone?: string | null
          role?: string | null
          state?: string | null
          username: string
        }
        Update: {
          address?: string | null
          age?: number | null
          birthdate?: string | null
          city?: string | null
          country?: string | null
          email?: string
          firstname?: string
          gender?: string | null
          id?: string
          image?: string | null
          ip?: string | null
          lastname?: string
          macaddress?: string | null
          phone?: string | null
          role?: string | null
          state?: string | null
          username?: string
        }
        Relationships: []
      }
      workouts: {
        Row: {
          calories: number | null
          comment: string | null
          distance: number | null
          duration: number
          id: string
          name: string
          type: string
          userid: string | null
          workoutdate: string
        }
        Insert: {
          calories?: number | null
          comment?: string | null
          distance?: number | null
          duration: number
          id?: string
          name: string
          type: string
          userid?: string | null
          workoutdate: string
        }
        Update: {
          calories?: number | null
          comment?: string | null
          distance?: number | null
          duration?: number
          id?: string
          name?: string
          type?: string
          userid?: string | null
          workoutdate?: string
        }
        Relationships: [
          {
            foreignKeyName: 'workouts_userid_fkey'
            columns: ['userid']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_friends: {
        Args: {
          userid_param: string
        }
        Returns: {
          friendid: string
          status: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
