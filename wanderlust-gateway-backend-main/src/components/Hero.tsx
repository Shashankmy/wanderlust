
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  showButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

const Hero = ({
  title,
  subtitle,
  imageSrc,
  showButton = true,
  buttonText = "Explore Destinations",
  buttonLink = "/destinations",
}: HeroProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[70vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-in">
            {title}
          </h1>
          <p className="text-xl text-white mb-8 animate-slide-in" style={{animationDelay: '0.2s'}}>
            {subtitle}
          </p>
          {showButton && (
            <Button 
              size="lg" 
              className="bg-wanderlust-primary hover:bg-wanderlust-primary/90 text-white px-8 py-6 text-lg animate-slide-in"
              style={{animationDelay: '0.3s'}}
              onClick={() => navigate(buttonLink)}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
