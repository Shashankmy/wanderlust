import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import DestinationSlider from "@/components/DestinationSlider";
import InquiryForm from "@/components/InquiryForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, DollarSign, Star, Clock, Activity, Info } from "lucide-react";
import database from "@/services/database";
import { Destination } from "@/services/database";
import { useQuery } from "@tanstack/react-query";

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: destination, isLoading, error } = useQuery({
    queryKey: ['destination', id],
    queryFn: () => id ? database.getDestinationById(id) : undefined,
    enabled: !!id,
  });
  
  useEffect(() => {
    if (!id) {
      navigate("/destinations");
    }
  }, [id, navigate]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-lg">Loading destination information...</p>
        </div>
      </Layout>
    );
  }
  
  if (error || !destination) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-lg text-red-600">Destination not found</p>
          <Button 
            onClick={() => navigate("/destinations")}
            className="mt-4 bg-wanderlust-primary hover:bg-wanderlust-primary/90"
          >
            Back to Destinations
          </Button>
        </div>
      </Layout>
    );
  }
  
  const images = [
    destination.imageUrl,
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{destination.name}, {destination.country}</h1>
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="text-wanderlust-primary w-5 h-5" />
            <span className="text-gray-600">{destination.country}</span>
            <span className="mx-2 text-gray-400">|</span>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="ml-1">{destination.rating}/5</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DestinationSlider images={images} altText={destination.name} />
            
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">About {destination.name}</h2>
              <p className="text-gray-700 leading-relaxed">{destination.description}</p>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">Activities & Experiences</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {destination.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 border border-gray-200 rounded-md"
                    >
                      <Activity className="text-wanderlust-primary w-5 h-5" />
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">Practical Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-wanderlust-primary w-5 h-5 mt-1" />
                    <div>
                      <h4 className="font-medium">Best Time to Visit</h4>
                      <p className="text-gray-600 text-sm">June to September</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-wanderlust-primary w-5 h-5 mt-1" />
                    <div>
                      <h4 className="font-medium">Recommended Duration</h4>
                      <p className="text-gray-600 text-sm">5-7 days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Info className="text-wanderlust-primary w-5 h-5 mt-1" />
                    <div>
                      <h4 className="font-medium">Language</h4>
                      <p className="text-gray-600 text-sm">Local + English widely spoken</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="text-wanderlust-primary w-5 h-5 mt-1" />
                    <div>
                      <h4 className="font-medium">Currency</h4>
                      <p className="text-gray-600 text-sm">{destination.currency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Price</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-wanderlust-primary">${destination.price}</span>
                  <span className="ml-2 text-gray-500">per person</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">*Price may vary based on season</p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <Button className="w-full bg-wanderlust-primary hover:bg-wanderlust-primary/90">
                  Book Now
                </Button>
                <Button variant="outline" className="w-full">
                  Add to Wishlist
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Inquiry Form</h3>
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DestinationDetail;
