import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Clock, Mail, Phone, User } from "lucide-react";

const ScheduleConsultation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirements: "",
    preferredDate: "",
    preferredTime: "",
    additionalNotes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for FormSubmit.co
      const submitData = new FormData();
      submitData.append("Name", formData.name);
      submitData.append("Email", formData.email);
      submitData.append("Phone", formData.phone);
      submitData.append("Company", formData.company);
      submitData.append("Requirements", formData.requirements);
      submitData.append("Preferred Date", formData.preferredDate);
      submitData.append("Preferred Time", formData.preferredTime);
      submitData.append("Additional Notes", formData.additionalNotes);
      submitData.append("Submitted At", new Date().toLocaleString());
      submitData.append("Source", "Schedule Consultation Form");
      submitData.append("_subject", `Consultation Request from ${formData.name}`);
      submitData.append("_template", "table");

      // Send to FormSubmit.co
      const response = await fetch("https://formsubmit.co/ajax/abubakararif164@gmail.com", {
        method: "POST",
        body: submitData
      });

      if (response.ok) {
        toast({
          title: "Consultation Request Sent Successfully",
          description: "We've received your request! Our team will contact you soon to schedule your consultation.",
        });
        // Reset form
        setFormData({ 
          name: "", 
          email: "", 
          phone: "", 
          company: "",
          requirements: "", 
          preferredDate: "", 
          preferredTime: "",
          additionalNotes: ""
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending consultation request:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-hero py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-foreground mb-6">
            Schedule Consultation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Let's discuss how our expert team can help you achieve your business goals. 
            Fill out the form below and we'll get back to you to schedule a consultation.
          </p>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12 shadow-card border-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    className="h-12"
                  />
                </div>
              </div>

              {/* Phone and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+92 300 1234567"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name (optional)"
                    className="h-12"
                  />
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <Label htmlFor="requirements">Project Requirements *</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  required
                  placeholder="Please describe your project requirements, what services you need, and any specific details..."
                  className="min-h-[120px]"
                />
              </div>

              {/* Preferred Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Preferred Date
                  </Label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredTime" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Preferred Time
                  </Label>
                  <Input
                    id="preferredTime"
                    name="preferredTime"
                    type="time"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="h-12"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Any additional information you'd like to share..."
                  className="min-h-[100px]"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-primary hover:shadow-hover h-12 text-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
              </Button>
            </form>
          </Card>

          {/* Info Section */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              <strong>Note:</strong> We typically respond within 24 hours to schedule your consultation. 
              Please ensure all required fields are filled accurately.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ScheduleConsultation;

