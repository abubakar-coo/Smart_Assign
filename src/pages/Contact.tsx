import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
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
      submitData.append("Subject", formData.subject);
      submitData.append("Message", formData.message);
      submitData.append("Submitted At", new Date().toLocaleString());
      submitData.append("Source", "Contact Form");
      submitData.append("_subject", `Contact Form: ${formData.subject}`);
      submitData.append("_template", "table");

      // Send to FormSubmit.co
      const response = await fetch("https://formsubmit.co/ajax/abubakararif164@gmail.com", {
        method: "POST",
        body: submitData
      });

      if (response.ok) {
        toast({
          title: "Message Sent Successfully",
          description: "Your information has been received! We'll contact you soon.",
        });
        // Reset form
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending contact:", error);
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
            Contact Smart Assign
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Ready to streamline your business operations? Get in touch with our team 
            for a custom quote and professional consultation.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-8">
                Send us a Message
              </h2>
              <Card className="p-8 shadow-card border-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What can we help you with?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us about your project requirements..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-primary hover:shadow-hover"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-8">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We're here to help you succeed. Whether you need a custom quote, 
                  have questions about our services, or want to discuss your project 
                  requirements, our team is ready to assist you.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <Card className="p-6 shadow-card border-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-muted-foreground">admin@smartassign.info</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 shadow-card border-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <p className="text-muted-foreground">+92 3098091819</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 shadow-card border-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Location</h3>
                      <p className="text-muted-foreground">Remote</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open("https://www.linkedin.com/company/smartassign/", "_blank")}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open("https://www.instagram.com/assignsmart?igsh=MTgyNmpvb3gwdzJjcw==", "_blank")}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open("https://www.facebook.com/share/16zKaZ9JuK/", "_blank")}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open("https://www.threads.com/@assignsmart", "_blank")}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Threads
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;