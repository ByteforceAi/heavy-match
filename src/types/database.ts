export type UserRole =
  | "requester"
  | "owner"
  | "operator"
  | "callcenter"
  | "salesperson"
  | "admin";

export type DispatchStatus =
  | "pending"
  | "exclusive_call"
  | "callcenter_call"
  | "shared_call"
  | "matched"
  | "operator_assigned"
  | "in_progress"
  | "completed"
  | "cancelled";

export type SmsType =
  | "exclusive"
  | "callcenter"
  | "shared"
  | "matched"
  | "assigned";

// Simplified Database type for Supabase client
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          phone: string;
          name: string;
          role: UserRole;
          company_name: string | null;
          business_number: string | null;
          referred_owner_id: string | null;
          callcenter_id: string | null;
          parent_id: string | null;
          region_sido: string | null;
          region_sigungu: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phone: string;
          name: string;
          role: UserRole;
          company_name?: string | null;
          business_number?: string | null;
          referred_owner_id?: string | null;
          callcenter_id?: string | null;
          parent_id?: string | null;
          region_sido?: string | null;
          region_sigungu?: string | null;
        };
        Update: {
          phone?: string;
          name?: string;
          role?: UserRole;
          company_name?: string | null;
          business_number?: string | null;
          referred_owner_id?: string | null;
          callcenter_id?: string | null;
          parent_id?: string | null;
          region_sido?: string | null;
          region_sigungu?: string | null;
        };
        Relationships: [];
      };
      equipment_types: {
        Row: {
          id: number;
          name: string;
          icon: string | null;
          sort_order: number;
        };
        Insert: {
          name: string;
          icon?: string | null;
          sort_order?: number;
        };
        Update: {
          name?: string;
          icon?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      equipment_specs: {
        Row: {
          id: number;
          equipment_type_id: number;
          spec_name: string;
          sort_order: number;
        };
        Insert: {
          equipment_type_id: number;
          spec_name: string;
          sort_order?: number;
        };
        Update: {
          equipment_type_id?: number;
          spec_name?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      time_units: {
        Row: {
          id: number;
          name: string;
          hours: number;
          sort_order: number;
        };
        Insert: {
          name: string;
          hours: number;
          sort_order?: number;
        };
        Update: {
          name?: string;
          hours?: number;
          sort_order?: number;
        };
        Relationships: [];
      };
      owner_prices: {
        Row: {
          id: number;
          owner_id: string;
          equipment_type_id: number;
          spec_id: number;
          time_unit_id: number;
          price: number;
        };
        Insert: {
          owner_id: string;
          equipment_type_id: number;
          spec_id: number;
          time_unit_id: number;
          price: number;
        };
        Update: {
          owner_id?: string;
          equipment_type_id?: number;
          spec_id?: number;
          time_unit_id?: number;
          price?: number;
        };
        Relationships: [];
      };
      dispatch_requests: {
        Row: {
          id: string;
          requester_id: string;
          equipment_type_id: number;
          spec_id: number;
          time_unit_id: number;
          price: number;
          company_name: string;
          site_address: string;
          payment_date: string | null;
          requester_name: string | null;
          requester_title: string | null;
          requester_phone: string | null;
          site_manager_name: string | null;
          site_manager_title: string | null;
          site_manager_phone: string | null;
          requester_signature: string | null;
          status: DispatchStatus;
          target_owner_id: string | null;
          matched_owner_id: string | null;
          assigned_operator_id: string | null;
          original_callcenter_id: string | null;
          exclusive_call_at: string | null;
          callcenter_call_at: string | null;
          shared_call_at: string | null;
          matched_at: string | null;
          completed_at: string | null;
          operator_signature: string | null;
          work_memo: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          requester_id: string;
          equipment_type_id: number;
          spec_id: number;
          time_unit_id: number;
          price: number;
          company_name: string;
          site_address: string;
          payment_date?: string | null;
          requester_name?: string | null;
          requester_title?: string | null;
          requester_phone?: string | null;
          site_manager_name?: string | null;
          site_manager_title?: string | null;
          site_manager_phone?: string | null;
          requester_signature?: string | null;
          status?: DispatchStatus;
          target_owner_id?: string | null;
          matched_owner_id?: string | null;
          assigned_operator_id?: string | null;
          original_callcenter_id?: string | null;
          exclusive_call_at?: string | null;
          callcenter_call_at?: string | null;
          shared_call_at?: string | null;
          matched_at?: string | null;
          completed_at?: string | null;
          operator_signature?: string | null;
          work_memo?: string | null;
        };
        Update: {
          status?: DispatchStatus;
          matched_owner_id?: string | null;
          assigned_operator_id?: string | null;
          matched_at?: string | null;
          completed_at?: string | null;
          operator_signature?: string | null;
          work_memo?: string | null;
          callcenter_call_at?: string | null;
          shared_call_at?: string | null;
        };
        Relationships: [];
      };
      commissions: {
        Row: {
          id: number;
          dispatch_id: string;
          total_price: number;
          commission_rate: number;
          total_commission: number;
          requester_reward: number;
          company_fee: number;
          callcenter_fee: number;
          salesperson_fee: number;
          callcenter_id: string | null;
          salesperson_id: string | null;
          is_cancelled: boolean;
          cancel_fee: number;
          created_at: string;
        };
        Insert: {
          dispatch_id: string;
          total_price: number;
          commission_rate?: number;
          total_commission: number;
          requester_reward: number;
          company_fee: number;
          callcenter_fee: number;
          salesperson_fee: number;
          callcenter_id?: string | null;
          salesperson_id?: string | null;
          is_cancelled?: boolean;
          cancel_fee?: number;
        };
        Update: {
          is_cancelled?: boolean;
          cancel_fee?: number;
        };
        Relationships: [];
      };
      sms_logs: {
        Row: {
          id: number;
          dispatch_id: string | null;
          recipient_phone: string;
          recipient_id: string | null;
          message_type: SmsType;
          token: string | null;
          sent_at: string;
          status: string;
        };
        Insert: {
          dispatch_id?: string | null;
          recipient_phone: string;
          recipient_id?: string | null;
          message_type: SmsType;
          token?: string | null;
          status?: string;
        };
        Update: {
          status?: string;
        };
        Relationships: [];
      };
      call_history: {
        Row: {
          id: number;
          requester_id: string;
          owner_id: string;
          equipment_type_id: number | null;
          spec_id: number | null;
          site_address: string | null;
          company_name: string | null;
          last_used_at: string;
          use_count: number;
        };
        Insert: {
          requester_id: string;
          owner_id: string;
          equipment_type_id?: number | null;
          spec_id?: number | null;
          site_address?: string | null;
          company_name?: string | null;
          use_count?: number;
        };
        Update: {
          use_count?: number;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      dispatch_status: DispatchStatus;
      sms_type: SmsType;
    };
  };
}
