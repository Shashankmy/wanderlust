
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/supabase";

// Types for our data models that match Supabase tables
export interface Destination {
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

// Convert Supabase row to our API model
const mapDestinationFromRow = (row: Database['public']['Tables']['destinations']['Row']): Destination => {
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    description: row.description,
    shortDescription: row.short_description,
    imageUrl: row.image_url,
    rating: row.rating,
    activities: row.activities,
    price: row.price,
    currency: row.currency,
    continent: row.continent
  };
};

// API functions for Destinations
export const destinationsAPI = {
  // Get all destinations
  getAll: async (): Promise<Destination[]> => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*');

    if (error) {
      console.error("API Error:", error);
      throw new Error(`Failed to fetch destinations: ${error.message}`);
    }

    return data ? data.map(mapDestinationFromRow) : [];
  },

  // Get destination by ID
  getById: async (id: string): Promise<Destination> => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("API Error:", error);
      throw new Error(`Failed to fetch destination: ${error.message}`);
    }

    if (!data) {
      throw new Error("Destination not found");
    }

    return mapDestinationFromRow(data);
  },

  // Filter destinations by country
  getByCountry: async (country: string): Promise<Destination[]> => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .ilike('country', `%${country}%`);

    if (error) {
      console.error("API Error:", error);
      throw new Error(`Failed to fetch destinations by country: ${error.message}`);
    }

    return data ? data.map(mapDestinationFromRow) : [];
  },

  // Filter destinations by continent
  getByContinent: async (continent: string): Promise<Destination[]> => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .ilike('continent', `%${continent}%`);

    if (error) {
      console.error("API Error:", error);
      throw new Error(`Failed to fetch destinations by continent: ${error.message}`);
    }

    return data ? data.map(mapDestinationFromRow) : [];
  },

  // Get featured destinations (top rated)
  getFeatured: async (limit: number = 3): Promise<Destination[]> => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) {
      console.error("API Error:", error);
      throw new Error(`Failed to fetch featured destinations: ${error.message}`);
    }

    return data ? data.map(mapDestinationFromRow) : [];
  },

  // Create a new destination
  create: async (destination: Omit<Destination, 'id'>): Promise<Destination> => {
    const { data, error } = await supabase
      .from('destinations')
      .insert({
        name: destination.name,
        country: destination.country,
        description: destination.description,
        short_description: destination.shortDescription,
        image_url: destination.imageUrl,
        rating: destination.rating,
        activities: destination.activities,
        price: destination.price,
        currency: destination.currency,
        continent: destination.continent,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error("API Error:", error);
      throw new Error(`Failed to create destination: ${error.message}`);
    }

    if (!data) {
      throw new Error("Failed to create destination");
    }

    return mapDestinationFromRow(data);
  },

  // Update a destination
  update: async (id: string, updates: Partial<Omit<Destination, 'id'>>): Promise<Destination> => {
    const updateData: any = {};
    
    if (updates.name) updateData.name = updates.name;
    if (updates.country) updateData.country = updates.country;
    if (updates.description) updateData.description = updates.description;
    if (updates.shortDescription) updateData.short_description = updates.shortDescription;
    if (updates.imageUrl) updateData.image_url = updates.imageUrl;
    if (updates.rating !== undefined) updateData.rating = updates.rating;
    if (updates.activities) updateData.activities = updates.activities;
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.currency) updateData.currency = updates.currency;
    if (updates.continent) updateData.continent = updates.continent;

    const { data, error } = await supabase
      .from('destinations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("API Error:", error);
      throw new Error(`Failed to update destination: ${error.message}`);
    }

    if (!data) {
      throw new Error("Destination not found");
    }

    return mapDestinationFromRow(data);
  },

  // Delete a destination
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('destinations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("API Error:", error);
      throw new Error(`Failed to delete destination: ${error.message}`);
    }
  }
};
