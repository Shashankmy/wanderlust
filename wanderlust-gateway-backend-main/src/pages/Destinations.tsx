
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import DestinationCard from "@/components/DestinationCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import database from "@/services/database"; // Use mock database for now
import { Destination } from "@/services/database";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string>("all");
  
  const { data: allDestinations, isLoading, error } = useQuery({
    queryKey: ['destinations'],
    queryFn: () => database.getDestinations(),
  });
  
  useEffect(() => {
    if (allDestinations && selectedContinent === "all") {
      setDestinations(allDestinations);
    }
  }, [allDestinations, selectedContinent]);
  
  const handleContinentChange = async (continent: string) => {
    setSelectedContinent(continent);
    
    if (continent === "all" && allDestinations) {
      setDestinations(allDestinations);
    } else {
      const filteredDestinations = await database.getDestinationsByContinent(continent);
      setDestinations(filteredDestinations);
    }
  };
  
  return (
    <Layout>
      <Hero
        title="Discover Amazing Destinations"
        subtitle="Explore the world's most captivating locations"
        imageSrc="https://images.unsplash.com/photo-1501854140801-50d01698950b"
        showButton={false}
      />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Find Your Next Adventure
          </h2>
          
          {/* Filter by Continent */}
          <div className="mb-12">
            <Tabs defaultValue="all" className="w-full max-w-3xl mx-auto">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-7">
                <TabsTrigger 
                  value="all" 
                  onClick={() => handleContinentChange("all")}
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="asia"
                  onClick={() => handleContinentChange("asia")}
                >
                  Asia
                </TabsTrigger>
                <TabsTrigger 
                  value="europe"
                  onClick={() => handleContinentChange("europe")}
                >
                  Europe
                </TabsTrigger>
                <TabsTrigger 
                  value="north america"
                  onClick={() => handleContinentChange("north america")}
                >
                  N. America
                </TabsTrigger>
                <TabsTrigger 
                  value="south america"
                  onClick={() => handleContinentChange("south america")}
                >
                  S. America
                </TabsTrigger>
                <TabsTrigger 
                  value="africa"
                  onClick={() => handleContinentChange("africa")}
                >
                  Africa
                </TabsTrigger>
                <TabsTrigger 
                  value="australia"
                  onClick={() => handleContinentChange("australia")}
                >
                  Australia
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                Loading destinations...
              </p>
            </div>
          )}
          
          {/* Error state */}
          {error && (
            <div className="text-center py-12">
              <p className="text-lg text-red-600">
                Error loading destinations. Please try again later.
              </p>
            </div>
          )}
          
          {/* Destinations Grid */}
          {!isLoading && !error && destinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          ) : !isLoading && !error && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                No destinations found for this region. Please try another filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Destinations;
