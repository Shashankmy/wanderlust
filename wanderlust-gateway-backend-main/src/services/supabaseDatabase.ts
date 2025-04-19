
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Database } from "@/lib/supabase";
import { destinationsAPI } from "@/api/destinations";
import { inquiriesAPI } from "@/api/inquiries";

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

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  destination: string;
  message: string;
  date: string;
}

// Database service class using Supabase
class SupabaseDatabase {
  // Get all destinations
  public async getDestinations(): Promise<Destination[]> {
    try {
      return await destinationsAPI.getAll();
    } catch (error) {
      console.error("Error fetching destinations:", error);
      toast({
        title: "Error fetching destinations",
        description: "Please try again later",
        variant: "destructive",
      });
      return [];
    }
  }

  // Get destination by ID
  public async getDestinationById(id: string): Promise<Destination | undefined> {
    try {
      return await destinationsAPI.getById(id);
    } catch (error) {
      console.error("Error fetching destination:", error);
      toast({
        title: "Error fetching destination",
        description: "Unable to load destination details",
        variant: "destructive",
      });
      return undefined;
    }
  }

  // Filter destinations by country
  public async getDestinationsByCountry(country: string): Promise<Destination[]> {
    try {
      return await destinationsAPI.getByCountry(country);
    } catch (error) {
      console.error("Error fetching destinations by country:", error);
      return [];
    }
  }

  // Filter destinations by continent
  public async getDestinationsByContinent(continent: string): Promise<Destination[]> {
    try {
      return await destinationsAPI.getByContinent(continent);
    } catch (error) {
      console.error("Error fetching destinations by continent:", error);
      return [];
    }
  }

  // Get featured destinations (top rated)
  public async getFeaturedDestinations(limit: number = 3): Promise<Destination[]> {
    try {
      return await destinationsAPI.getFeatured(limit);
    } catch (error) {
      console.error("Error fetching featured destinations:", error);
      return [];
    }
  }

  // Submit an inquiry
  public async submitInquiry(inquiry: Omit<Inquiry, "id" | "date">): Promise<boolean> {
    try {
      await inquiriesAPI.create({
        name: inquiry.name,
        email: inquiry.email,
        destination: inquiry.destination,
        message: inquiry.message
      });

      toast({
        title: "Inquiry submitted",
        description: "We'll get back to you soon!",
      });
      
      return true;
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast({
        title: "Error submitting inquiry",
        description: "Please try again later",
        variant: "destructive",
      });
      return false;
    }
  }
}

// Create a singleton instance
const database = new SupabaseDatabase();

export default database;
