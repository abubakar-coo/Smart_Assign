import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Calendar, Users, TrendingUp, Award, CheckCircle, Video, FileText, Palette, Database, Search, ShoppingCart } from "lucide-react";

const PortfolioDetail = () => {
  const { projectId } = useParams();
  
  // Portfolio projects data (same as in Portfolio.tsx)
  const portfolioProjects = [
    {
      id: 1,
      title: "E-Commerce Store Transformation",
      client: "TechGadgets Plus",
      category: "E-Commerce Development",
      description: "Complete overhaul of an electronics e-commerce platform, implementing modern design principles and advanced functionality for improved user experience and conversion rates.",
      longDescription: "We completely transformed TechGadgets Plus's online presence by redesigning their e-commerce platform from the ground up. The project involved modernizing the user interface, implementing advanced search functionality, optimizing the checkout process, and integrating multiple payment gateways. The result was a 150% increase in conversion rates and a 200% boost in mobile traffic.",
      image: "/api/placeholder/600/400",
      services: ["Store Setup", "Payment Integration", "SEO Optimization", "Mobile Responsive Design"],
      results: {
        metric1: { label: "Conversion Rate", value: "+150%", icon: TrendingUp },
        metric2: { label: "Page Load Speed", value: "2.3s", icon: Award },
        metric3: { label: "Mobile Traffic", value: "+200%", icon: Users }
      },
      duration: "6 weeks",
      year: "2024",
      testimonial: "Smart Assign delivered exactly what we needed. Our sales have tripled since the new store went live.",
      tags: ["E-Commerce", "Shopify", "SEO", "Mobile-First"],
      challenges: [
        "Legacy system integration",
        "Mobile responsiveness optimization",
        "Payment gateway compatibility",
        "SEO migration without traffic loss"
      ],
      solutions: [
        "Custom API development for seamless integration",
        "Progressive Web App implementation",
        "Multi-gateway payment system",
        "301 redirect strategy for SEO preservation"
      ],
      technologies: ["Shopify Plus", "React", "Node.js", "Stripe", "PayPal", "Google Analytics"]
    },
    {
      id: 2,
      title: "Corporate Video Campaign",
      client: "InnovateNow Corp",
      category: "Video Production",
      description: "Professional video editing and motion graphics for a comprehensive corporate marketing campaign spanning multiple platforms and target audiences.",
      longDescription: "Created a comprehensive video marketing campaign for InnovateNow Corp that included promotional videos, social media content, and presentation materials. The project involved script writing, video production, motion graphics design, and multi-platform optimization. The campaign achieved 2.5M+ views and increased brand awareness by 180%.",
      image: "/api/placeholder/600/400",
      services: ["Video Editing", "Motion Graphics", "Color Grading", "Audio Enhancement"],
      results: {
        metric1: { label: "Video Views", value: "2.5M+", icon: Video },
        metric2: { label: "Engagement Rate", value: "+320%", icon: TrendingUp },
        metric3: { label: "Brand Awareness", value: "+180%", icon: Award }
      },
      duration: "4 weeks",
      year: "2024",
      testimonial: "The video quality exceeded our expectations. The engagement on our campaigns has never been higher.",
      tags: ["Video Editing", "Motion Graphics", "Corporate", "Multi-Platform"],
      challenges: [
        "Multiple platform optimization",
        "Brand consistency across formats",
        "Tight production timeline",
        "Audio quality enhancement"
      ],
      solutions: [
        "Custom templates for consistent branding",
        "Automated workflow for multi-format output",
        "Parallel production processes",
        "Professional audio mastering"
      ],
      technologies: ["Adobe After Effects", "Premiere Pro", "DaVinci Resolve", "Audacity", "Figma"]
    }
  ];

  const project = portfolioProjects.find(p => p.id === parseInt(projectId || "0")) || portfolioProjects[0];

  const getCategoryIcon = (category: string) => {
    if (category.includes("E-Commerce")) return <ShoppingCart className="w-8 h-8 text-white" />;
    if (category.includes("Video")) return <Video className="w-8 h-8 text-white" />;
    if (category.includes("Research")) return <FileText className="w-8 h-8 text-white" />;
    if (category.includes("Design")) return <Palette className="w-8 h-8 text-white" />;
    if (category.includes("Data")) return <Database className="w-8 h-8 text-white" />;
    if (category.includes("AI")) return <Search className="w-8 h-8 text-white" />;
    return <FileText className="w-8 h-8 text-white" />;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-hero py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
            <Badge variant="secondary" className="text-sm">
              {project.category}
            </Badge>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Project Image */}
              <Card className="p-8 shadow-card border-0">
                <div className="h-96 bg-gradient-hero rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center text-white">
                      <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        {getCategoryIcon(project.category)}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{project.category}</h3>
                      <p className="text-lg opacity-90">Professional Project</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Project Overview */}
              <Card className="p-8 shadow-card border-0">
                <h2 className="text-2xl font-bold text-foreground mb-4">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.longDescription}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Services Provided</h3>
                    <div className="space-y-2">
                      {project.services.map((service, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Challenges & Solutions */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-8 shadow-card border-0">
                  <h3 className="text-xl font-bold text-foreground mb-4">Challenges</h3>
                  <div className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground text-sm">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-8 shadow-card border-0">
                  <h3 className="text-xl font-bold text-foreground mb-4">Solutions</h3>
                  <div className="space-y-3">
                    {project.solutions.map((solution, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground text-sm">{solution}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Testimonial */}
              <Card className="p-8 shadow-card border-0 bg-gradient-hero">
                <h3 className="text-xl font-bold text-foreground mb-4">Client Testimonial</h3>
                <blockquote className="text-muted-foreground italic text-lg leading-relaxed mb-4">
                  "{project.testimonial}"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {project.client.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{project.client}</p>
                    <p className="text-sm text-muted-foreground">Client</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card className="p-6 shadow-card border-0">
                <h3 className="text-xl font-bold text-foreground mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold text-foreground">{project.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Year</p>
                      <p className="font-semibold text-foreground">{project.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Client</p>
                      <p className="font-semibold text-foreground">{project.client}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Results */}
              <Card className="p-6 shadow-card border-0">
                <h3 className="text-xl font-bold text-foreground mb-4">Key Results</h3>
                <div className="space-y-4">
                  {Object.entries(project.results).map(([key, result]) => (
                    <div key={key} className="text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <result.icon className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-2xl font-bold text-foreground">{result.value}</p>
                      <p className="text-sm text-muted-foreground">{result.label}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Tags */}
              <Card className="p-6 shadow-card border-0">
                <h3 className="text-xl font-bold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* CTA */}
              <Card className="p-6 shadow-card border-0 bg-gradient-hero">
                <h3 className="text-xl font-bold text-foreground mb-4">Interested in Similar Work?</h3>
                <p className="text-muted-foreground mb-4">
                  Let's discuss how we can help you achieve similar results for your project.
                </p>
                <div>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                    View Portfolio
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioDetail;
