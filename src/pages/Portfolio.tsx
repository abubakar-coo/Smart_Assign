import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, Calendar, Users, TrendingUp, 
  Award, CheckCircle, Video, FileText, 
  Palette, Database, Search, ShoppingCart
} from "lucide-react";

const Portfolio = () => {
  const portfolioProjects = [
    {
      id: 1,
      title: "E-Commerce Store Transformation",
      client: "TechGadgets Plus",
      category: "E-Commerce Development",
      description: "Complete overhaul of an electronics e-commerce platform, implementing modern design principles and advanced functionality for improved user experience and conversion rates.",
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
      tags: ["E-Commerce", "Shopify", "SEO", "Mobile-First"]
    },
    {
      id: 2,
      title: "Corporate Video Campaign",
      client: "InnovateNow Corp",
      category: "Video Production",
      description: "Professional video editing and motion graphics for a comprehensive corporate marketing campaign spanning multiple platforms and target audiences.",
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
      tags: ["Video Editing", "Motion Graphics", "Corporate", "Multi-Platform"]
    },
    {
      id: 3,
      title: "Academic Research Project",
      client: "University Research Department",
      category: "Research & Writing",
      description: "Comprehensive research assistance and academic writing for a multi-year environmental study, including data analysis and report compilation.",
      image: "/api/placeholder/600/400",
      services: ["Research Assistance", "Data Analysis", "Academic Writing", "Citation Management"],
      results: {
        metric1: { label: "Research Papers", value: "25+", icon: FileText },
        metric2: { label: "Citations Managed", value: "500+", icon: Search },
        metric3: { label: "Accuracy Rate", value: "99.8%", icon: CheckCircle }
      },
      duration: "12 weeks",
      year: "2024",
      testimonial: "Their attention to detail and research methodology significantly enhanced our study's credibility.",
      tags: ["Academic Writing", "Research", "Data Analysis", "Citations"]
    },
    {
      id: 4,
      title: "Social Media Brand Overhaul",
      client: "FreshStart Fitness",
      category: "Design & Content",
      description: "Complete social media brand transformation with custom Canva designs, content strategy, and engagement optimization across all major platforms.",
      image: "/api/placeholder/600/400",
      services: ["Canva Design", "Content Strategy", "Brand Development", "Social Media Management"],
      results: {
        metric1: { label: "Follower Growth", value: "+400%", icon: Users },
        metric2: { label: "Engagement Rate", value: "+250%", icon: TrendingUp },
        metric3: { label: "Brand Recognition", value: "+300%", icon: Award }
      },
      duration: "8 weeks",
      year: "2024",
      testimonial: "Our social media presence is now professional and engaging. Client inquiries have increased dramatically.",
      tags: ["Social Media", "Canva Design", "Brand Strategy", "Content Creation"]
    },
    {
      id: 5,
      title: "Data Migration & Cleanup",
      client: "DataCorp Solutions",
      category: "Data Management",
      description: "Large-scale data migration and cleanup project involving legacy system integration and database optimization for improved performance.",
      image: "/api/placeholder/600/400",
      services: ["Data Entry", "Database Cleanup", "Migration Services", "Quality Assurance"],
      results: {
        metric1: { label: "Records Processed", value: "1M+", icon: Database },
        metric2: { label: "Error Reduction", value: "99.9%", icon: CheckCircle },
        metric3: { label: "Processing Speed", value: "+500%", icon: TrendingUp }
      },
      duration: "10 weeks",
      year: "2023",
      testimonial: "The data quality improvement has revolutionized our operations. Everything runs smoother now.",
      tags: ["Data Migration", "Database Cleanup", "Quality Assurance", "Process Optimization"]
    },
    {
      id: 6,
      title: "AI Content Strategy Implementation",
      client: "ContentMasters Agency",
      category: "AI & Content",
      description: "Implementation of AI-powered content creation workflow with custom prompt engineering for consistent, high-quality content production.",
      image: "/api/placeholder/600/400",
      services: ["Prompt Engineering", "AI Content Creation", "Workflow Optimization", "Team Training"],
      results: {
        metric1: { label: "Content Output", value: "+600%", icon: FileText },
        metric2: { label: "Time Savings", value: "75%", icon: Award },
        metric3: { label: "Quality Score", value: "9.2/10", icon: CheckCircle }
      },
      duration: "3 weeks",
      year: "2024",
      testimonial: "The AI integration has transformed our content production. We're now able to serve 3x more clients.",
      tags: ["AI Integration", "Prompt Engineering", "Content Strategy", "Workflow Automation"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Header */}
      <section className="bg-gradient-hero py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Our Work Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our successful projects and see how we've helped businesses 
            achieve their goals through our comprehensive micro-services.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {portfolioProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 border-0 h-full flex flex-col">
                {/* Project Image */}
                <div className="h-64 bg-gradient-hero flex items-center justify-center relative overflow-hidden">
                  {project.category.includes("E-Commerce") ? (
                    <div className="w-full h-full relative overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format"
                        alt="E-Commerce Store Development"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <ShoppingCart className="w-8 h-8 mb-2" />
                        <h3 className="text-lg font-bold">E-Commerce Store</h3>
                      </div>
                    </div>
                  ) : project.category.includes("Video") ? (
                    <div className="w-full h-full relative overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop&auto=format"
                        alt="Video Production Campaign"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <Video className="w-8 h-8 mb-2" />
                        <h3 className="text-lg font-bold">Video Campaign</h3>
                      </div>
                    </div>
                  ) : project.category.includes("Research") ? (
                    <div className="w-full h-full relative overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop&auto=format"
                        alt="Research Project Documentation"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <FileText className="w-8 h-8 mb-2" />
                        <h3 className="text-lg font-bold">Research Project</h3>
                      </div>
                    </div>
                  ) : project.category.includes("Design") ? (
                    <div className="w-full h-full relative overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&h=400&fit=crop&auto=format"
                        alt="Creative Design Project"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <Palette className="w-8 h-8 mb-2" />
                        <h3 className="text-lg font-bold">Design Project</h3>
                      </div>
                    </div>
                  ) : project.category.includes("Data") ? (
                    <div className="w-full h-full relative overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format"
                        alt="Data Management Project"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <Database className="w-8 h-8 mb-2" />
                        <h3 className="text-lg font-bold">Data Project</h3>
                      </div>
                    </div>
                  ) : project.category.includes("AI") ? (
                    <div className="w-full h-full relative overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format"
                        alt="AI Technology Project"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <Search className="w-8 h-8 mb-2" />
                        <h3 className="text-lg font-bold">AI Project</h3>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full relative overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&auto=format"
                        alt="Professional Service Project"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <FileText className="w-8 h-8 mb-2" />
                        <h3 className="text-lg font-bold">{project.category}</h3>
                      </div>
                  </div>
                  )}
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {project.category}
                      </Badge>
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {project.title}
                      </h3>
                      <p className="text-primary font-semibold">
                        {project.client}
                      </p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Content */}
                  <div>
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Services */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Services Provided:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service, index) => (
                        <Badge key={index} variant="outline">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-4">Key Results:</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(project.results).map(([key, result]) => (
                        <div key={key} className="text-center">
                          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-2">
                            <result.icon className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-lg font-bold text-foreground">{result.value}</p>
                          <p className="text-xs text-muted-foreground">{result.label}</p>
                        </div>
                      ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="mt-auto">
                  {/* Testimonial */}
                  <div className="bg-gradient-hero p-4 rounded-2xl mb-6">
                    <p className="text-muted-foreground italic text-sm leading-relaxed">
                      "{project.testimonial}"
                    </p>
                  </div>

                  {/* Tags */}
                    <div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  </div>

                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Our Track Record
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">500+</p>
              <p className="text-muted-foreground">Completed Projects</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">200+</p>
              <p className="text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">99.8%</p>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">150%</p>
              <p className="text-muted-foreground">Avg. ROI Increase</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;