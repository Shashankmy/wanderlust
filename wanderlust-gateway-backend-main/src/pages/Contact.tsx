
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Contact form submitted:", formData);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <Layout>
      <Hero
        title="Contact Us"
        subtitle="We'd love to hear from you"
        imageSrc="https://images.unsplash.com/photo-1501854140801-50d01698950b"
        showButton={false}
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-wanderlust-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Our Location</h3>
                    <address className="not-italic text-gray-600">
                      123 Travel Street<br />
                      Wanderlust Building, Suite 400<br />
                      New York, NY 10001
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-wanderlust-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-wanderlust-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">info@wanderlust.com</p>
                    <p className="text-gray-600">support@wanderlust.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="w-5 h-5 text-wanderlust-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Office Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9AM - 5PM</p>
                    <p className="text-gray-600">Saturday: 10AM - 2PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="bg-wanderlust-primary hover:bg-wanderlust-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Find Us On The Map</h2>
          <div className="aspect-w-16 aspect-h-9 h-[400px] rounded-lg overflow-hidden shadow-md">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <p className="text-gray-600">Interactive map would be displayed here</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
