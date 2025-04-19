import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { z } from "zod";
import database from "@/services/supabaseDatabase";
import { useQuery } from "@tanstack/react-query";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  destination: z.string().min(1, "Please select a destination"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const InquiryForm = () => {
  const { data: destinations = [] } = useQuery({
    queryKey: ['destinations'],
    queryFn: () => database.getDestinations(),
  });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field if exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleDestinationChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      destination: value,
    }));
    
    // Clear error for this field if exists
    if (errors.destination) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.destination;
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      inquirySchema.parse(formData);
      setIsSubmitting(true);
      
      // Submit inquiry to Supabase
      await database.submitInquiry(formData);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        destination: "",
        message: "",
      });
      
      setIsSubmitting(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Full Name
        </label>
        <Input
          id="name"
          name="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="destination" className="text-sm font-medium">
          Destination of Interest
        </label>
        <Select 
          value={formData.destination} 
          onValueChange={handleDestinationChange}
        >
          <SelectTrigger className={errors.destination ? "border-red-500" : ""}>
            <SelectValue placeholder="Select a destination" />
          </SelectTrigger>
          <SelectContent>
            {destinations.map((dest) => (
              <SelectItem key={dest.id} value={dest.name}>
                {dest.name}, {dest.country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.destination && <p className="text-sm text-red-500">{errors.destination}</p>}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your travel plans, questions, or special requirements..."
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
      </div>
      
      <Button
        type="submit"
        className="w-full bg-wanderlust-primary hover:bg-wanderlust-primary/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Submit Inquiry"}
      </Button>
    </form>
  );
};

export default InquiryForm;
