export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      exercises: {
        Row: {
          correct_answer: string
          explanation_ar: string | null
          id: string
          level_id: string | null
          options: Json
          order_index: number
          question: string
          quiz_id: string | null
          story_id: string | null
          type: string
          unit_id: string | null
        }
        Insert: {
          correct_answer: string
          explanation_ar?: string | null
          id?: string
          level_id?: string | null
          options?: Json
          order_index?: number
          question: string
          quiz_id?: string | null
          story_id?: string | null
          type: string
          unit_id?: string | null
        }
        Update: {
          correct_answer?: string
          explanation_ar?: string | null
          id?: string
          level_id?: string | null
          options?: Json
          order_index?: number
          question?: string
          quiz_id?: string | null
          story_id?: string | null
          type?: string
          unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercises_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      grammar_lessons: {
        Row: {
          examples: Json
          explanation_ar: string
          id: string
          title_ar: string
          unit_id: string
        }
        Insert: {
          examples?: Json
          explanation_ar: string
          id?: string
          title_ar: string
          unit_id: string
        }
        Update: {
          examples?: Json
          explanation_ar?: string
          id?: string
          title_ar?: string
          unit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "grammar_lessons_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      levels: {
        Row: {
          code: string
          description_ar: string
          id: string
          order_index: number
          title_ar: string
          title_en: string
        }
        Insert: {
          code: string
          description_ar?: string
          id?: string
          order_index: number
          title_ar: string
          title_en: string
        }
        Update: {
          code?: string
          description_ar?: string
          id?: string
          order_index?: number
          title_ar?: string
          title_en?: string
        }
        Relationships: []
      }
      quizzes: {
        Row: {
          id: string
          kind: string
          level_id: string | null
          title: string
          unit_id: string | null
        }
        Insert: {
          id?: string
          kind: string
          level_id?: string | null
          title: string
          unit_id?: string | null
        }
        Update: {
          id?: string
          kind?: string
          level_id?: string | null
          title?: string
          unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      sentences: {
        Row: {
          id: string
          note_ar: string | null
          order_index: number
          text_ar: string
          text_en: string
          unit_id: string
        }
        Insert: {
          id?: string
          note_ar?: string | null
          order_index?: number
          text_ar: string
          text_en: string
          unit_id: string
        }
        Update: {
          id?: string
          note_ar?: string | null
          order_index?: number
          text_ar?: string
          text_en?: string
          unit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sentences_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      stories: {
        Row: {
          body_ar: string
          body_en: string
          id: string
          title_ar: string
          title_en: string
          unit_id: string
        }
        Insert: {
          body_ar: string
          body_en: string
          id?: string
          title_ar: string
          title_en: string
          unit_id: string
        }
        Update: {
          body_ar?: string
          body_en?: string
          id?: string
          title_ar?: string
          title_en?: string
          unit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stories_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          description_ar: string
          icon: string
          id: string
          level_id: string
          order_index: number
          title_ar: string
          title_en: string
        }
        Insert: {
          description_ar?: string
          icon?: string
          id?: string
          level_id: string
          order_index: number
          title_ar: string
          title_en: string
        }
        Update: {
          description_ar?: string
          icon?: string
          id?: string
          level_id?: string
          order_index?: number
          title_ar?: string
          title_en?: string
        }
        Relationships: [
          {
            foreignKeyName: "units_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed: boolean
          score: number
          section: string
          unit_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          score?: number
          section: string
          unit_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          score?: number
          section?: string
          unit_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          correct_answers: number
          current_level_id: string | null
          last_active_date: string | null
          placement_done: boolean
          streak_days: number
          total_answers: number
          user_id: string
          xp: number
        }
        Insert: {
          correct_answers?: number
          current_level_id?: string | null
          last_active_date?: string | null
          placement_done?: boolean
          streak_days?: number
          total_answers?: number
          user_id: string
          xp?: number
        }
        Update: {
          correct_answers?: number
          current_level_id?: string | null
          last_active_date?: string | null
          placement_done?: boolean
          streak_days?: number
          total_answers?: number
          user_id?: string
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_current_level_id_fkey"
            columns: ["current_level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
        ]
      }
      user_vocab_review: {
        Row: {
          box: number
          correct_count: number
          next_review_at: string
          user_id: string
          vocab_id: string
          wrong_count: number
        }
        Insert: {
          box?: number
          correct_count?: number
          next_review_at?: string
          user_id: string
          vocab_id: string
          wrong_count?: number
        }
        Update: {
          box?: number
          correct_count?: number
          next_review_at?: string
          user_id?: string
          vocab_id?: string
          wrong_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_vocab_review_vocab_id_fkey"
            columns: ["vocab_id"]
            isOneToOne: false
            referencedRelation: "vocabulary"
            referencedColumns: ["id"]
          },
        ]
      }
      vocabulary: {
        Row: {
          example_ar: string | null
          example_en: string | null
          id: string
          order_index: number
          part_of_speech: string | null
          phonetic: string | null
          translation_ar: string
          unit_id: string
          word: string
        }
        Insert: {
          example_ar?: string | null
          example_en?: string | null
          id?: string
          order_index?: number
          part_of_speech?: string | null
          phonetic?: string | null
          translation_ar: string
          unit_id: string
          word: string
        }
        Update: {
          example_ar?: string | null
          example_en?: string | null
          id?: string
          order_index?: number
          part_of_speech?: string | null
          phonetic?: string | null
          translation_ar?: string
          unit_id?: string
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "vocabulary_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_xp: {
        Args: { amount: number; answers?: number; correct?: number }
        Returns: {
          correct_answers: number
          current_level_id: string | null
          last_active_date: string | null
          placement_done: boolean
          streak_days: number
          total_answers: number
          user_id: string
          xp: number
        }
        SetofOptions: {
          from: "*"
          to: "user_stats"
          isOneToOne: true
          isSetofReturn: false
        }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
