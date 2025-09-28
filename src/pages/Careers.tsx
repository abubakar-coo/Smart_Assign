import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { saveJobApplication } from "../api/jobApplication";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Upload,
  CheckCircle,
  Star,
  Users,
  Award,
  Clock
} from "lucide-react";

const Careers = () => {
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

  const openPositions = [
    {
      title: "Senior Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
      experience: "5+ years",
      description: "Create stunning visual designs and user experiences for our clients.",
      requirements: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping"]
    },
    {
      title: "Full Stack Developer",
      department: "Development",
      type: "Full-time",
      location: "Hybrid",
      experience: "3+ years",
      description: "Build scalable web applications and maintain existing systems.",
      requirements: ["React", "Node.js", "TypeScript", "Database Management"]
    },
    {
      title: "Project Manager",
      department: "Operations",
      type: "Full-time",
      location: "Remote",
      experience: "4+ years",
      description: "Lead project execution and ensure timely delivery of client projects.",
      requirements: ["Project Management", "Agile", "Client Communication", "Team Leadership"]
    },
    {
      title: "Content Strategist",
      department: "Marketing",
      type: "Part-time",
      location: "Remote",
      experience: "2+ years",
      description: "Develop content strategies and create engaging copy for various platforms.",
      requirements: ["Content Writing", "SEO", "Social Media", "Brand Strategy"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-hero py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-foreground mb-6">
            Join Our Team
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Be part of a dynamic team that's revolutionizing how businesses access 
            professional micro-services. We're looking for talented individuals to join our mission.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-foreground mb-4">
              Why Work With Us?
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              We offer more than just a job - we provide opportunities for growth, 
              innovation, and making a real impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center shadow-card hover:shadow-hover transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Great Team</h3>
              <p className="text-muted-foreground">
                Work with talented professionals from around the world in a collaborative environment.
              </p>
            </Card>

            <Card className="p-8 text-center shadow-card hover:shadow-hover transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Growth Opportunities</h3>
              <p className="text-muted-foreground">
                Continuous learning and development opportunities to advance your career.
              </p>
            </Card>

            <Card className="p-8 text-center shadow-card hover:shadow-hover transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Flexible Work</h3>
              <p className="text-muted-foreground">
                Remote and hybrid work options with flexible schedules that fit your lifestyle.
              </p>
            </Card>

            <Card className="p-8 text-center shadow-card hover:shadow-hover transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Competitive Benefits</h3>
              <p className="text-muted-foreground">
                Competitive salary, health benefits, and performance-based bonuses.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Explore our current job openings and find the perfect role for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {openPositions.map((position, index) => (
              <Card key={index} className="p-8 shadow-card hover:shadow-hover transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {position.title}
                      </h3>
                      <p className="text-lg text-primary font-medium">
                        {position.department}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {position.type}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{position.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{position.experience}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground">
                    {position.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {position.requirements.map((req, reqIndex) => (
                        <Badge key={reqIndex} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-foreground mb-4">
              Apply Now
            </h2>
            <p className="text-2xl text-muted-foreground">
              Fill out the form below to submit your application.
            </p>
          </div>

          <Card className="p-8 shadow-card">
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
                  <div className="md:col-span-2">
                    <Label htmlFor="location" className="text-base font-medium">
                      Location *
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
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
                    <Label htmlFor="education" className="text-base font-medium">
                      Education *
                    </Label>
                    <Input
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="skills" className="text-base font-medium">
                      Skills & Technologies *
                    </Label>
                    <Textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      required
                      className="mt-2"
                      rows={3}
                      placeholder="List your key skills and technologies..."
                    />
                  </div>
                </div>
              </div>

              {/* Application Materials */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-2" />
                  Application Materials
                </h3>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="resume" className="text-base font-medium">
                      Resume/CV *
                    </Label>
                    <div className="mt-2 flex items-center space-x-4">
                      <Input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                      />
                      <Upload className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      PDF, DOC, or DOCX files only (Max 10MB)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="coverLetter" className="text-base font-medium">
                      Cover Letter *
                    </Label>
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      required
                      className="mt-2"
                      rows={6}
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="portfolio" className="text-base font-medium">
                      Portfolio/Website URL
                    </Label>
                    <Input
                      id="portfolio"
                      name="portfolio"
                      type="url"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="mt-2"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin" className="text-base font-medium">
                      LinkedIn Profile
                    </Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      type="url"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="mt-2"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2" />
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="expectedSalary" className="text-base font-medium">
                      Expected Salary
                    </Label>
                    <Input
                      id="expectedSalary"
                      name="expectedSalary"
                      value={formData.expectedSalary}
                      onChange={handleInputChange}
                      className="mt-2"
                      placeholder="e.g., $50,000 - $70,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability" className="text-base font-medium">
                      Availability
                    </Label>
                    <Input
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="mt-2"
                      placeholder="e.g., Immediately, 2 weeks notice"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="references" className="text-base font-medium">
                      References
                    </Label>
                    <Textarea
                      id="references"
                      name="references"
                      value={formData.references}
                      onChange={handleInputChange}
                      className="mt-2"
                      rows={3}
                      placeholder="Name, Position, Company, Contact Information"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-primary hover:shadow-hover text-xl py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting Application...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Submit Application</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
