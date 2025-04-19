
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/supabase";
import { InquiryRequest, InquiryResponse } from "./edgeFunctions/inquiries";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  destination: string;
  message: string;
  createdAt: string;
}

// Environment variable to toggle between direct database access and edge functions
const USE_EDGE_FUNCTIONS = import.meta.env.VITE_USE_EDGE_FUNCTIONS === 'true';
const EDGE_FUNCTION_URL = import.meta.env.VITE_EDGE_FUNCTION_URL || 'https://vyozztclqdavbnurspjp.supabase.co/functions/v1';

// Convert Supabase row to our API model
const mapInquiryFromRow = (row: Database['public']['Tables']['inquiries']['Row']): Inquiry => {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    destination: row.destination,
    message: row.message,
    createdAt: row.created_at
  };
};

// Convert API response to our model
const mapInquiryFromResponse = (response: InquiryResponse): Inquiry => {
  return {
    id: response.id,
    name: response.name,
    email: response.email,
    destination: response.destination,
    message: response.message,
    createdAt: response.createdAt
  };
};

// API functions for Inquiries
export const inquiriesAPI = {
  // Submit an inquiry
  create: async (inquiry: Omit<Inquiry, "id" | "createdAt">): Promise<Inquiry> => {
    if (USE_EDGE_FUNCTIONS) {
      const response = await fetch(`${EDGE_FUNCTION_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiry)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit inquiry');
      }
      
      const data = await response.json();
      return mapInquiryFromResponse(data.inquiry);
    } else {
      // Use direct Supabase client
      const { data, error } = await supabase
        .from('inquiries')
        .insert({
          name: inquiry.name,
          email: inquiry.email,
          destination: inquiry.destination,
          message: inquiry.message,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("API Error:", error);
        throw new Error(`Failed to submit inquiry: ${error.message}`);
      }

      if (!data) {
        throw new Error("Failed to submit inquiry");
      }

      return mapInquiryFromRow(data);
    }
  },

  // Get all inquiries (admin only)
  getAll: async (): Promise<Inquiry[]> => {
    if (USE_EDGE_FUNCTIONS) {
      const response = await fetch(`${EDGE_FUNCTION_URL}/inquiries`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch inquiries');
      }
      
      const data = await response.json();
      return data.inquiries.map(mapInquiryFromResponse);
    } else {
      // Use direct Supabase client
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("API Error:", error);
        throw new Error(`Failed to fetch inquiries: ${error.message}`);
      }

      return data ? data.map(mapInquiryFromRow) : [];
    }
  },

  // Get inquiry by ID
  getById: async (id: string): Promise<Inquiry> => {
    if (USE_EDGE_FUNCTIONS) {
      const response = await fetch(`${EDGE_FUNCTION_URL}/inquiries/${id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch inquiry');
      }
      
      const data = await response.json();
      return mapInquiryFromResponse(data.inquiry);
    } else {
      // Use direct Supabase client
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("API Error:", error);
        throw new Error(`Failed to fetch inquiry: ${error.message}`);
      }

      if (!data) {
        throw new Error("Inquiry not found");
      }

      return mapInquiryFromRow(data);
    }
  },

  // Delete an inquiry (admin only)
  delete: async (id: string): Promise<void> => {
    if (USE_EDGE_FUNCTIONS) {
      const response = await fetch(`${EDGE_FUNCTION_URL}/inquiries/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete inquiry');
      }
    } else {
      // Use direct Supabase client
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("API Error:", error);
        throw new Error(`Failed to delete inquiry: ${error.message}`);
      }
    }
  }
};
