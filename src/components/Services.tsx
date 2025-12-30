import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, Database, BookOpen, CheckCircle, Palette,
  FileText, GraduationCap, FileCheck, Presentation,
  Briefcase, FileEdit, Users
} from "lucide-react";

// Helper function to convert service title to URL slug
const titleToSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/\([^)]*\)/g, '') // Remove parentheses content
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const Services = () => {
  const navigate = useNavigate();
  
  // Service image with green gradient (website's main color)
  const ServiceImage = ({ service }: { service: any }) => {
    // Special handling for SEO Content Writing with custom 3D image
    const isSEOService = service.title === "SEO Content Writing";
    
    return (
      <div className="w-full h-32 rounded-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500 bg-gradient-to-br from-primary to-primary-glow shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          {isSEOService ? (
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl ring-4 ring-white/30 p-2">
              <img
                src="/images/services/seo-content-writing-icon.png"
                alt="SEO Content Writing"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl ring-4 ring-white/30">
              <service.icon className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
          )}
        </div>
        <div className="absolute top-2 right-2 w-6 h-6 bg-white/30 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-3">
          <div className="text-white font-bold text-sm drop-shadow-lg">
            {service.title.split(' ')[0]}
          </div>
        </div>
      </div>
    );
  };

  const allServices = [
    {
      icon: Search,
      title: "SEO Content Writing",
      description: "High-quality, SEO-optimized content that helps websites rank better on search engines. Well-researched, plagiarism-free, and tailored to your target audience.",
      features: ["Blog posts", "Website content", "Articles", "Keyword optimization"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Database,
      title: "Data Entry",
      description: "Accurate and fast data entry services for businesses and individuals. We ensure confidentiality, precision, and timely delivery.",
      features: ["Excel / Google Sheets", "CRM data entry", "Copy-paste tasks", "PDF to Excel/Word"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: BookOpen,
      title: "Research Assistance",
      description: "Reliable research support with authentic sources, helping clients save time and make informed decisions.",
      features: ["Academic research", "Market research", "Online research", "Data collection"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: CheckCircle,
      title: "Proofreading & Editing",
      description: "We improve clarity, grammar, and structure while maintaining your original tone and meaning.",
      features: ["Grammar correction", "Sentence improvement", "Academic & business editing"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Palette,
      title: "Canva Designing",
      description: "Eye-catching and professional designs created using Canva for digital and print use.",
      features: ["Social media posts", "Presentations", "Flyers & posters", "CVs & resumes"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: FileText,
      title: "Typing & Formatting",
      description: "Clean, professional typing and formatting according to academic or business standards.",
      features: ["PDF to Word", "Formatting documents", "Reports & assignments"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: GraduationCap,
      title: "Assignment Writing",
      description: "Custom-written assignments with proper structure, references, and plagiarism-free content.",
      features: ["Essays", "Case studies", "Reports", "Coursework"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: FileCheck,
      title: "Literature Review",
      description: "In-depth literature reviews using credible academic sources, written in a clear and structured manner.",
      features: ["Systematic reviews", "Thematic reviews", "APA / Harvard referencing"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Presentation,
      title: "Presentation (PPT) Design",
      description: "Professionally designed PowerPoint or Google Slides presentations that are visually appealing and easy to understand.",
      features: ["Academic presentations", "Business & pitch decks", "Charts, icons & visuals", "Clean layouts"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Briefcase,
      title: "Resume & Cover Letter Writing",
      description: "ATS-friendly resumes and persuasive cover letters that help clients stand out in job applications.",
      features: ["Modern CV design", "Keyword optimization", "Job-specific cover letters"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: FileEdit,
      title: "Academic Formatting",
      description: "We format documents according to international academic standards with proper citations and references.",
      features: ["In-text citations", "Reference lists", "Proper margins & headings"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Users,
      title: "Virtual Assistance",
      description: "Reliable virtual assistance for small business and professional daily tasks.",
      features: ["Email handling", "Data management", "Online research", "Admin support"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Our Professional Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive range of services designed to help you succeed. 
            From content creation to virtual assistance, we've got you covered.
          </p>
        </div>

        {/* Services Grid - Equal height cards with bottom alignment - Only 4 Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {allServices.slice(0, 4).map((service, index) => (
            <Card 
              key={index} 
              className="p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100 bg-white flex flex-col rounded-xl hover:-translate-y-1"
            >
              {/* Service Image */}
              <div className="mb-4">
                <ServiceImage service={service} />
              </div>

              {/* Content Section - Grows to fill space */}
              <div className="flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="space-y-1.5 mb-4">
                  {service.features.slice(0, 3).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`}></div>
                      <span className="text-xs text-muted-foreground line-clamp-1">{feature}</span>
                    </div>
                  ))}
                  {service.features.length > 3 && (
                    <div className="text-xs text-primary font-medium">
                      +{service.features.length - 3} more
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Button - Pushed to bottom with mt-auto */}
              <div className="mt-auto pt-4 border-t border-muted/20">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => navigate(`/services/${titleToSlug(service.title)}`)}
                >
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Services CTA */}
        <div className="text-center mt-16 md:mt-20">
          <Button 
            size="lg"
            className="bg-gradient-primary hover:shadow-lg text-base font-semibold px-8 py-6 rounded-lg transition-all duration-200 hover:scale-[1.02]"
            onClick={() => window.location.href = '/services'}
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
