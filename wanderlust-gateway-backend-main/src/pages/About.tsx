
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { MapPin, Users, Award, Globe } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <Hero
        title="About Wanderlust"
        subtitle="Your trusted travel companion since 2010"
        imageSrc="https://images.unsplash.com/photo-1517022812141-23620dba5c23"
        showButton={false}
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Founded in 2010, Wanderlust was born from a simple passion: to help people explore the world in the most authentic and memorable way possible. What started as a small travel blog run by two friends with a love for adventure has grown into a trusted travel company serving thousands of travelers from around the globe.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Over the years, we've curated our collection of destinations carefully, focusing on unique experiences that go beyond the typical tourist paths. Our team has personally visited every location we feature, ensuring that we can offer genuine insights and recommendations.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, Wanderlust continues to be driven by our original mission: to connect travelers with authentic experiences that create lasting memories. We believe that travel has the power to transform perspectives, foster cultural understanding, and enrich lives in meaningful ways.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Wanderlust</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-wanderlust-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-wanderlust-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Authentic Destinations</h3>
              <p className="text-gray-600">
                We personally vet every destination to ensure authentic and unique experiences
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-wanderlust-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-wanderlust-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Local Guides</h3>
              <p className="text-gray-600">
                Our guides are local experts who share deep knowledge and passion for their regions
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-wanderlust-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-wanderlust-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Service</h3>
              <p className="text-gray-600">
                24/7 support and carefully selected partners to ensure the highest quality experience
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-wanderlust-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-wanderlust-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainable Travel</h3>
              <p className="text-gray-600">
                Committed to responsible tourism that benefits local communities and environments
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h2>
            <p className="text-gray-700 mb-12 text-center">
              Our diverse team of travel enthusiasts is dedicated to crafting the perfect journey for you
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1506744476757-2fa94c462582"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                <p className="text-wanderlust-primary">CEO & Founder</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Michael Chen</h3>
                <p className="text-wanderlust-primary">Travel Director</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1579017331263-ef82f0bbc748"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Anya Patel</h3>
                <p className="text-wanderlust-primary">Customer Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
