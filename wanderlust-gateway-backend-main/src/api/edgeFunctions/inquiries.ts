
// This file defines the API interface for the Inquiries Edge Function
// The actual implementation is deployed on Supabase Edge Functions

export interface InquiryRequest {
  name: string;
  email: string;
  destination: string;
  message: string;
}

export interface InquiryResponse {
  id: string;
  name: string;
  email: string;
  destination: string;
  message: string;
  createdAt: string;
}

// The API endpoints available in the Edge Function
export const inquiriesEdgeEndpoints = {
  create: '/inquiries',
  getAll: '/inquiries',
  getById: '/inquiries/:id',
  delete: '/inquiries/:id'
};

// Helper function to build Edge Function URL (same as in destinations)
export const buildEdgeFunctionUrl = (baseUrl: string, endpoint: string, params?: Record<string, string>): string => {
  let url = `${baseUrl}${endpoint}`;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
  }
  
  return url;
};
