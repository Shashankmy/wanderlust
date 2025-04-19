
import { toast } from "@/components/ui/use-toast";

// Types for our data models
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

// Mock database
class Database {
  private destinations: Destination[] = [
    {
      id: "1",
      name: "Bali",
      country: "Indonesia",
      description: "Bali is a beautiful Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns. The island is also known for its yoga and meditation retreats.",
      shortDescription: "A tropical paradise with beautiful beaches and rich culture",
      imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      rating: 4.7,
      activities: ["Surfing", "Temple Visits", "Rice Terrace Tours", "Beach Relaxation"],
      price: 1200,
      currency: "USD",
      continent: "Asia"
    },
    {
      id: "2",
      name: "Paris",
      country: "France",
      description: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.",
      shortDescription: "The City of Light with iconic landmarks and amazing cuisine",
      imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      rating: 4.5,
      activities: ["Eiffel Tower Visit", "Louvre Museum", "Seine River Cruise", "Cafe Hopping"],
      price: 1800,
      currency: "USD",
      continent: "Europe"
    },
    {
      id: "3",
      name: "New York",
      country: "United States",
      description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park.",
      shortDescription: "The Big Apple with iconic skyscrapers and vibrant culture",
      imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      rating: 4.6,
      activities: ["Central Park Tour", "Broadway Show", "Museum Visits", "Shopping"],
      price: 2200,
      currency: "USD",
      continent: "North America"
    },
    {
      id: "4",
      name: "Tokyo",
      country: "Japan",
      description: "Tokyo, Japan's busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens. The city's many museums offer exhibits ranging from classical art (in the Tokyo National Museum) to a reconstructed kabuki theater (in the Edo-Tokyo Museum).",
      shortDescription: "A futuristic city with a blend of modern and traditional",
      imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      rating: 4.8,
      activities: ["Shrine Visits", "Sushi Dining", "Shopping in Shibuya", "Cherry Blossom Viewing"],
      price: 2400,
      currency: "USD",
      continent: "Asia"
    },
    {
      id: "5",
      name: "Cairo",
      country: "Egypt",
      description: "Cairo, Egypt's sprawling capital, is set on the Nile River. At its heart is Tahrir Square and the vast Egyptian Museum, a trove of antiquities including royal mummies and gilded King Tutankhamun artifacts. Nearby, Giza is the site of the iconic pyramids and Great Sphinx, dating to the 26th century BC. In Gezira Island's leafy Zamalek district, 187m Cairo Tower affords panoramic city views.",
      shortDescription: "Ancient pyramids and a rich historical experience",
      imageUrl: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
      rating: 4.3,
      activities: ["Pyramid Tours", "Nile River Cruise", "Museum Visits", "Bazaar Shopping"],
      price: 1500,
      currency: "USD",
      continent: "Africa"
    },
    {
      id: "6",
      name: "Sydney",
      country: "Australia",
      description: "Sydney, capital of New South Wales and one of Australia's largest cities, is best known for its harbourfront Sydney Opera House, with a distinctive sail-like design. Massive Darling Harbour and the smaller Circular Quay port are hubs of waterside life, with the arched Harbour Bridge and esteemed Royal Botanic Garden nearby. Sydney Tower's outdoor platform, the Skywalk, offers 360-degree views of the city and suburbs.",
      shortDescription: "Stunning harbor views and beautiful coastal beaches",
      imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      rating: 4.6,
      activities: ["Opera House Tour", "Bondi Beach Visit", "Harbor Cruise", "Koala Encounters"],
      price: 2600,
      currency: "USD",
      continent: "Australia"
    }
  ];

  private inquiries: Inquiry[] = [];

  // Get all destinations
  public getDestinations(): Destination[] {
    return [...this.destinations];
  }

  // Get destination by ID
  public getDestinationById(id: string): Destination | undefined {
    return this.destinations.find(destination => destination.id === id);
  }

  // Filter destinations by country
  public getDestinationsByCountry(country: string): Destination[] {
    return this.destinations.filter(destination => destination.country.toLowerCase() === country.toLowerCase());
  }

  // Filter destinations by continent
  public getDestinationsByContinent(continent: string): Destination[] {
    return this.destinations.filter(destination => destination.continent.toLowerCase() === continent.toLowerCase());
  }

  // Get featured destinations (top rated)
  public getFeaturedDestinations(limit: number = 3): Destination[] {
    return [...this.destinations]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  // Submit an inquiry
  public submitInquiry(inquiry: Omit<Inquiry, "id" | "date">): boolean {
    try {
      const newInquiry = {
        ...inquiry,
        id: Math.random().toString(36).substring(2, 9),
        date: new Date().toISOString(),
      };
      this.inquiries.push(newInquiry);
      console.log("Inquiry submitted:", newInquiry);
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

  // Get all inquiries
  public getInquiries(): Inquiry[] {
    return [...this.inquiries];
  }
}

// Create a singleton instance
const database = new Database();

export default database;
