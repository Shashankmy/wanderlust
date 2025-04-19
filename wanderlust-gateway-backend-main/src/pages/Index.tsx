
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import DestinationCard from "@/components/DestinationCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import database, { Destination } from "@/services/supabaseDatabase";
import { MapPin, Calendar, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const navigate = useNavigate();
  
  const { data: featuredDestinations, isLoading } = useQuery({
    queryKey: ['featuredDestinations'],
    queryFn: () => database.getFeaturedDestinations(3),
  });
  
  return (
    <Layout>
      <Hero
        title="Explore the World with Wanderlust"
        subtitle="Discover extraordinary destinations and create unforgettable memories"
        imageSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        buttonText="Start Your Journey"
      />
      
      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of the most breathtaking destinations around the world
            </p>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <p>Loading featured destinations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDestinations?.map((destination: Destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate("/destinations")}
              className="bg-wanderlust-primary hover:bg-wanderlust-primary/90"
            >
              View All Destinations
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Planning your next adventure is easy with Wanderlust
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-wanderlust-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-wanderlust-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Destination</h3>
              <p className="text-gray-600">
                Browse through our curated list of destinations and find the perfect match for your travel style
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-wanderlust-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-wanderlust-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plan Your Trip</h3>
              <p className="text-gray-600">
                Select your travel dates and customize your journey with our expert-recommended activities
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-wanderlust-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-wanderlust-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Travel with Confidence</h3>
              <p className="text-gray-600">
                Enjoy your journey with our 24/7 travel support and carefully selected local partners
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-wanderlust-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/80 mb-8">
              Get exclusive travel tips, destination guides, and special offers delivered directly to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md focus:outline-none"
              />
              <Button className="bg-wanderlust-accent text-wanderlust-dark hover:bg-wanderlust-accent/90 px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
