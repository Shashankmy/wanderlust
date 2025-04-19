
import { Destination } from "@/services/database";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <Link to={`/destinations/${destination.id}`} className="destination-card group block">
      <div className="relative h-64 overflow-hidden rounded-t-lg">
        <img 
          src={destination.imageUrl} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">{destination.name}</h3>
          <div className="flex items-center mt-1">
            <span className="text-sm text-white">{destination.country}</span>
            <span className="mx-2 text-white">•</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm text-white">{destination.rating}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-b-lg shadow">
        <p className="text-sm text-gray-600 line-clamp-2">{destination.shortDescription}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-wanderlust-primary font-semibold">${destination.price}</span>
          <span className="text-xs text-gray-500">per person</span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
