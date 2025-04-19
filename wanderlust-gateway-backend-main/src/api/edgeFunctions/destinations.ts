
// This file defines the API interface for the Destinations Edge Function
// The actual implementation is deployed on Supabase Edge Functions

export interface DestinationRequest {
  name: string;
  country: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  rating: number;
  activities: string[];
  price: number;
  currency: string;
  continent: string;
}

export interface DestinationResponse {
  id: string;
  name: string;
  country: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  rating: number;
  activities: string[];
  price: number;
  currency: string;
  continent: string;
}

// The API endpoints available in the Edge Function
export const destinationsEdgeEndpoints = {
  getAll: '/destinations',
  getById: '/destinations/:id',
  getByContinent: '/destinations/continent/:continent',
  create: '/destinations',
  update: '/destinations/:id',
  delete: '/destinations/:id'
};

// Helper function to build Edge Function URL
export const buildEdgeFunctionUrl = (baseUrl: string, endpoint: string, params?: Record<string, string>): string => {
  let url = `${baseUrl}${endpoint}`;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
  }
  
  return url;
};
