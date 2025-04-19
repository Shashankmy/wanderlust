
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DestinationSliderProps {
  images: string[];
  altText: string;
}

const DestinationSlider = ({ images, altText }: DestinationSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };
  
  const goToPrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  // If no images provided, use a placeholder
  if (!images || images.length === 0) {
    images = ["https://images.unsplash.com/photo-1506744038136-46273834b3fb"];
  }
  
  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg">
      {/* Image */}
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={image}
            alt={`${altText || 'Destination'} - Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Navigation buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              index === currentIndex ? "bg-white" : "bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationSlider;
