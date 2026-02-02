import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Search, Database, BookOpen, CheckCircle, 
  Palette, FileText, GraduationCap, FileCheck,
  Presentation, Briefcase, FileEdit, Users,
  ArrowRight, Sparkles, Clock, DollarSign
} from "lucide-react";

const Portfolio = () => {
  const navigate = useNavigate();

  const serviceShowcase = [
    {
      id: 1,
      title: "SEO Content Writing",
      category: "Content & Marketing",
      description: "High-quality, SEO-optimized content that helps websites rank better on search engines. Well-researched, plagiarism-free, and tailored to your target audience.",
      icon: Search,
      services: ["Blog posts", "Website content", "Articles", "Keyword optimization"],
      pricing: "$10 – $20 per 500 words",
      deliveryTime: "2-7 days",
      features: ["SEO optimization", "Plagiarism-free", "Keyword research", "Fast delivery"]
    },
    {
      id: 2,
      title: "Data Entry",
      category: "Data Management",
      description: "Accurate and fast data entry services for businesses and individuals. We ensure confidentiality, precision, and timely delivery.",
      icon: Database,
      services: ["Excel / Google Sheets", "CRM data entry", "Copy-paste tasks", "PDF to Excel/Word"],
      pricing: "$30+ per hour",
      deliveryTime: "1-3 days",
      features: ["99.9% accuracy", "Confidential handling", "Multiple formats", "Quality check"]
    },
    {
      id: 3,
      title: "Research Assistance",
      category: "Research & Analysis",
      description: "Reliable research support with authentic sources, helping clients save time and make informed decisions.",
      icon: BookOpen,
      services: ["Academic research", "Market research", "Online research", "Data collection"],
      pricing: "$30+ per hour",
      deliveryTime: "2-5 days",
      features: ["Credible sources", "Comprehensive reports", "Data analysis", "Source verification"]
    },
    {
      id: 4,
      title: "Proofreading & Editing",
      category: "Quality Assurance",
      description: "We improve clarity, grammar, and structure while maintaining your original tone and meaning.",
      icon: CheckCircle,
      services: ["Grammar correction", "Sentence improvement", "Academic & business editing"],
      pricing: "$20+ per 1,000 words",
      deliveryTime: "1-3 days",
      features: ["Grammar check", "Style consistency", "Track changes", "Professional polish"]
    },
    {
      id: 5,
      title: "Canva Designing",
      category: "Graphic Design",
      description: "Eye-catching and professional designs created using Canva for digital and print use.",
      icon: Palette,
      services: ["Social media posts", "Presentations", "Flyers & posters", "CVs & resumes"],
      pricing: "$15+ per design",
      deliveryTime: "1-3 days",
      features: ["High-resolution files", "Multiple formats", "Unlimited revisions", "Source file"]
    },
    {
      id: 6,
      title: "Typing & Formatting",
      category: "Document Services",
      description: "Clean, professional typing and formatting according to academic or business standards.",
      icon: FileText,
      services: ["PDF to Word", "Formatting documents", "Reports & assignments"],
      pricing: "$20+ per document (up to 12 pages)",
      deliveryTime: "1-2 days",
      features: ["Accurate typing", "Professional formatting", "Error-free output", "Format consistency"]
    },
    {
      id: 7,
      title: "Assignment Writing",
      category: "Academic Services",
      description: "Custom-written assignments with proper structure, references, and plagiarism-free content.",
      icon: GraduationCap,
      services: ["Essays", "Case studies", "Reports", "Coursework"],
      pricing: "$10 – $20 per 500 words",
      deliveryTime: "3-7 days",
      features: ["Plagiarism-free", "Proper references", "Academic structure", "Quality assurance"]
    },
    {
      id: 8,
      title: "Literature Review",
      category: "Academic Research",
      description: "In-depth literature reviews using credible academic sources, written in a clear and structured manner.",
      icon: FileCheck,
      services: ["Systematic reviews", "Thematic reviews", "APA / Harvard referencing"],
      pricing: "$30 – $60 (1,500–2,000 words)",
      deliveryTime: "5-10 days",
      features: ["Academic sources", "Critical analysis", "Proper referencing", "Structured format"]
    },
    {
      id: 9,
      title: "Presentation (PPT) Design",
      category: "Design & Visual",
      description: "Professionally designed PowerPoint or Google Slides presentations that are visually appealing and easy to understand.",
      icon: Presentation,
      services: ["Academic presentations", "Business & pitch decks", "Charts, icons & visuals", "Clean layouts"],
      pricing: "$20+ per presentation",
      deliveryTime: "2-5 days",
      features: ["Custom graphics", "Professional layouts", "Visual elements", "Source file"]
    },
    {
      id: 10,
      title: "Resume & Cover Letter Writing",
      category: "Career Services",
      description: "ATS-friendly resumes and persuasive cover letters that help clients stand out in job applications.",
      icon: Briefcase,
      services: ["Modern CV design", "Keyword optimization", "Job-specific cover letters"],
      pricing: "$15 – $30 per resume",
      deliveryTime: "2-4 days",
      features: ["ATS-optimized", "Professional formatting", "Keyword optimization", "Job-specific"]
    },
    {
      id: 11,
      title: "Academic Formatting",
      category: "Academic Services",
      description: "We format documents according to international academic standards with proper citations and references.",
      icon: FileEdit,
      services: ["In-text citations", "Reference lists", "Proper margins & headings"],
      pricing: "$5 – $10 per document",
      deliveryTime: "1-3 days",
      features: ["APA/MLA/Harvard", "Proper citations", "Style guide adherence", "Format consistency"]
    },
    {
      id: 12,
      title: "Virtual Assistance",
      category: "Business Support",
      description: "Reliable virtual assistance for small business and professional daily tasks.",
      icon: Users,
      services: ["Email handling", "Data management", "Online research", "Admin support"],
      pricing: "$10+ per hour",
      deliveryTime: "1-3 days",
      features: ["Task completion", "Regular updates", "Professional service", "Organized results"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Header */}
      <section className="bg-gradient-hero py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Our Services Showcase
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive range of professional micro-services designed to help 
            businesses and individuals achieve their goals with quality, reliability, and excellence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceShowcase.map((service) => {
              const ServiceIcon = service.icon;
              const titleToSlug = (title: string): string => {
                const serviceSlugMap: Record<string, string> = {
                  "Presentation (PPT) Design": "presentation-ppt-design",
                  "Academic Formatting (APA / MLA / Harvard)": "academic-formatting",
                  "Virtual Assistance (Small Tasks)": "virtual-assistance",
                };
                if (serviceSlugMap[title]) return serviceSlugMap[title];
                return title
                  .replace(/\([^)]*\)/g, '')
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-+|-+$/g, '')
                  .replace(/-+/g, '-');
              };

              return (
                <Card 
                  key={service.id} 
                  className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 border-0 h-full flex flex-col group cursor-pointer"
                  onClick={() => navigate(`/services/${titleToSlug(service.title)}`)}
                >
                  {/* Service Icon Header */}
                  <div className="h-48 bg-gradient-hero flex items-center justify-center relative overflow-hidden">
                    <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <ServiceIcon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Service Header */}
                    <div className="mb-4">
                      <Badge variant="secondary" className="mb-2">
                        {service.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Services Include */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-foreground text-sm mb-2">Includes:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {service.services.slice(0, 3).map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                        {service.services.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{service.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4 flex-1">
                      <div className="space-y-2">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-auto pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-semibold text-foreground">{service.pricing}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{service.deliveryTime}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-gradient-primary hover:shadow-hover"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/services/${titleToSlug(service.title)}`);
                        }}
                      >
                        Request This Service
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose any service above or browse our complete service catalog to find the perfect solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-hover"
              onClick={() => navigate("/services")}
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;