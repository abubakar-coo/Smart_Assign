import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trackLearnMoreClick, trackViewAllServicesClick } from "@/lib/analytics";

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
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleCards((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px" }
    );

    cardRefs.current.forEach((card) => {
      if (card) cardObserver.observe(card);
    });

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      cardRefs.current.forEach((card) => {
        if (card) cardObserver.unobserve(card);
      });
  };
  }, []);

  const allServices = [
    {
      title: "SEO Content Writing",
      description: "High-quality, SEO-optimized content that helps websites rank better on search engines. Well-researched, plagiarism-free, and tailored to your target audience.",
      features: ["Blog posts", "Website content", "Articles", "Keyword optimization"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Data Entry",
      description: "Accurate and fast data entry services for businesses and individuals. We ensure confidentiality, precision, and timely delivery.",
      features: ["Excel / Google Sheets", "CRM data entry", "Copy-paste tasks", "PDF to Excel/Word"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Research Assistance",
      description: "Reliable research support with authentic sources, helping clients save time and make informed decisions.",
      features: ["Academic research", "Market research", "Online research", "Data collection"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Proofreading & Editing",
      description: "We improve clarity, grammar, and structure while maintaining your original tone and meaning.",
      features: ["Grammar correction", "Sentence improvement", "Academic & business editing"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Canva Designing",
      description: "Eye-catching and professional designs created using Canva for digital and print use.",
      features: ["Social media posts", "Presentations", "Flyers & posters", "CVs & resumes"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Typing & Formatting",
      description: "Clean, professional typing and formatting according to academic or business standards.",
      features: ["PDF to Word", "Formatting documents", "Reports & assignments"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Assignment Writing",
      description: "Custom-written assignments with proper structure, references, and plagiarism-free content.",
      features: ["Essays", "Case studies", "Reports", "Coursework"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Literature Review",
      description: "In-depth literature reviews using credible academic sources, written in a clear and structured manner.",
      features: ["Systematic reviews", "Thematic reviews", "APA / Harvard referencing"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Presentation (PPT) Design",
      description: "Professionally designed PowerPoint or Google Slides presentations that are visually appealing and easy to understand.",
      features: ["Academic presentations", "Business & pitch decks", "Charts, icons & visuals", "Clean layouts"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Resume & Cover Letter Writing",
      description: "ATS-friendly resumes and persuasive cover letters that help clients stand out in job applications.",
      features: ["Modern CV design", "Keyword optimization", "Job-specific cover letters"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Academic Formatting",
      description: "We format documents according to international academic standards with proper citations and references.",
      features: ["In-text citations", "Reference lists", "Proper margins & headings"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Virtual Assistance",
      description: "Reliable virtual assistance for small business and professional daily tasks.",
      features: ["Email handling", "Data management", "Online research", "Admin support"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
  ];

  return (
    <section ref={sectionRef} id="micro-services" className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      {/* Background Image - Hidden on Mobile with Scroll Animation */}
      <div 
        className={`absolute inset-0 z-0 bg-no-repeat bg-center hidden md:block transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          backgroundImage: 'url(/images/hero/services-background.png)',
          backgroundSize: 'cover',
          imageRendering: 'auto' as const,
        } as React.CSSProperties}
      />
      
      {/* Content */}
      <div className={`relative z-10 transition-opacity duration-300 delay-100
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Top Center */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Micro Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive range of micro services designed to help you succeed. 
            From content creation to virtual assistance, we've got you covered.
          </p>
        </div>

        {/* Services Grid - Right Side 2x2 Layout */}
        <div className="flex justify-end">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full md:w-1/2">
            {allServices.slice(0, 4).map((service, index) => {
              const cardVisible = visibleCards.has(index);
              const animationDelay = index * 100;
              
              return (
                <Card 
                  key={index} 
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`p-6 lg:p-8 shadow-sm border border-gray-100 flex flex-col rounded-xl group cursor-pointer
                  transition-opacity duration-300 hover:shadow-lg
                  ${cardVisible ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                  backgroundColor: '#eaf1f1',
                  transitionDelay: `${Math.min(animationDelay, 150)}ms`,
                }}
              >
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
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transform transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    trackLearnMoreClick('services_section', service.title);
                    navigate(`/services/${titleToSlug(service.title)}`);
                  }}
                      >
                        Learn More
                      </Button>
                  </div>
                </Card>
            );
            })}
            </div>
          </div>

        {/* View All Services CTA */}
        <div className="text-center mt-16 md:mt-20">
                  <Button 
            size="lg"
            className="bg-gradient-primary hover:shadow-lg text-base font-semibold px-8 py-6 rounded-lg transition-all duration-200 hover:scale-[1.02]"
            onClick={() => {
              trackViewAllServicesClick('services_section');
              window.location.href = '/services';
            }}
                  >
            View All Services
                  </Button>
                </div>
              </div>
      </div>
    </section>
  );
};

export default Services;
