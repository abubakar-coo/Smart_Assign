import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play, FileText, BarChart } from "lucide-react";

const Portfolio = () => {
  const portfolioItems = [
    {
      category: "Video Editing",
      title: "Brand Launch Campaign",
      description: "Complete video editing suite for a tech startup's product launch, including promotional videos and social media content.",
      image: "/api/placeholder/400/300",
      icon: Play,
      gradient: "from-secondary to-secondary-glow",
      tags: ["Motion Graphics", "Color Grading", "Audio Mix"],
    },
    {
      category: "Content Design",
      title: "Social Media Package",
      description: "30-day social media content package with custom Canva designs for a growing e-commerce brand.",
      image: "/api/placeholder/400/300", 
      icon: FileText,
      gradient: "from-primary to-primary-glow",
      tags: ["Canva Design", "Brand Guidelines", "Social Media"],
    },
    {
      category: "Data Entry",
      title: "Customer Database Migration",
      description: "Complete customer database restructuring and migration for a mid-size retail company with 10,000+ records.",
      image: "/api/placeholder/400/300",
      icon: BarChart,
      gradient: "from-secondary to-secondary-glow", 
      tags: ["Data Processing", "Quality Control", "Database Design"],
    },
    {
      category: "Assignment Work",
      title: "Market Research Project",
      description: "Comprehensive market analysis and business plan development for a consulting firm's client proposal.",
      image: "/api/placeholder/400/300",
      icon: FileText,
      gradient: "from-primary to-primary-glow",
      tags: ["Research", "Analysis", "Business Writing"],
    },
    {
      category: "Prompt Writing",
      title: "AI Content Strategy",
      description: "Custom AI prompt library development for a digital marketing agency's content automation workflow.",
      image: "/api/placeholder/400/300",
      icon: Play,
      gradient: "from-secondary to-secondary-glow",
      tags: ["AI Prompts", "Content Strategy", "Automation"],
    },
    {
      category: "Mixed Services",
      title: "Complete Brand Overhaul",
      description: "End-to-end brand refresh including video content, data organization, and content creation for a law firm.",
      image: "/api/placeholder/400/300",
      icon: BarChart,
      gradient: "from-primary to-primary-glow",
      tags: ["Brand Design", "Video", "Data Management"],
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Work Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our diverse range of successful projects and see how we've 
            helped businesses achieve their goals through quality micro-services.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {portfolioItems.map((item, index) => (
            <Card 
              key={index} 
              className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 group cursor-pointer bg-white border-0"
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-muted to-accent overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <item.icon className="w-16 h-16 text-white/80" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground">
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 text-foreground" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full text-primary hover:bg-primary hover:text-primary-foreground mt-4"
                >
                  View Details
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-card">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Want to See More?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              This is just a glimpse of our work. We have hundreds of successful 
              projects across all our service categories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-hover"
              >
                View Full Portfolio
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;