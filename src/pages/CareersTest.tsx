import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { saveJobApplication } from "../api/jobApplication";
import { User, Mail, Phone, Briefcase, FileText, CheckCircle, Users } from "lucide-react";

const CareersTest = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    skills: "",
    coverLetter: "",
    resume: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      const result = await saveJobApplication(formData);
      
      if (result.success) {
        toast({
          title: "Application Submitted Successfully!",
          description: result.message,
        });

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          skills: "",
          coverLetter: "",
          resume: ""
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Join Our Team
            </h1>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              We're looking for talented individuals to join our growing team. 
              Apply now and be part of something amazing!
            </p>
          </div>

          {/* Company Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center shadow-card hover:shadow-hover transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Growing Team</h3>
              <p className="text-muted-foreground">
                Join our dynamic team of professionals and grow your career with us.
              </p>
            </Card>

            <Card className="p-8 text-center shadow-card hover:shadow-hover transition-all duration-300">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Great Benefits</h3>
              <p className="text-muted-foreground">
                Competitive salary, health benefits, and performance-based bonuses.
              </p>
            </Card>

            <Card className="p-8 text-center shadow-card hover:shadow-hover transition-all duration-300">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Remote Work</h3>
              <p className="text-muted-foreground">
                Work from anywhere with flexible hours and modern tools.
              </p>
            </Card>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-foreground text-center mb-8">
              Open Positions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Senior Designer
                      </h3>
                      <p className="text-lg text-primary font-medium">
                        Design Team
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Full-time
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <span>Remote</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>5+ years</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Lead design projects and mentor junior designers. Create beautiful, 
                    user-friendly interfaces that delight our customers.
                  </p>
                </div>
              </Card>

              <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Full Stack Developer
                      </h3>
                      <p className="text-lg text-primary font-medium">
                        Engineering Team
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Full-time
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <span>Remote</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>3+ years</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Build scalable web applications using modern technologies. 
                    Work with React, Node.js, and cloud platforms.
                  </p>
                </div>
              </Card>

              <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Content Writer
                      </h3>
                      <p className="text-lg text-primary font-medium">
                        Marketing Team
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Part-time
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <span>Remote</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>2+ years</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Create engaging content for our blog, social media, and marketing materials. 
                    Help us tell our story effectively.
                  </p>
                </div>
              </Card>

              <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Project Manager
                      </h3>
                      <p className="text-lg text-primary font-medium">
                        Operations Team
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Full-time
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <span>Hybrid</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>4+ years</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Lead cross-functional teams and ensure project delivery on time and within budget. 
                    Drive process improvements and team collaboration.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Application Form */}
          <Card className="max-w-4xl mx-auto shadow-card">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Job Application Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                    <User className="w-6 h-6 mr-2" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="fullName" className="text-base font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-base font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                    <Briefcase className="w-6 h-6 mr-2" />
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="position" className="text-base font-medium">
                        Position Applied For *
                      </Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience" className="text-base font-medium">
                        Years of Experience *
                      </Label>
                      <Input
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="skills" className="text-base font-medium">
                        Skills & Technologies
                      </Label>
                      <Input
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        className="mt-2"
                        placeholder="e.g., React, Node.js, Python, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                    <FileText className="w-6 h-6 mr-2" />
                    Cover Letter
                  </h3>
                  <div>
                    <Label htmlFor="coverLetter" className="text-base font-medium">
                      Tell us why you want to join our team
                    </Label>
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows={6}
                      className="mt-2"
                      placeholder="Write your cover letter here..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareersTest;
