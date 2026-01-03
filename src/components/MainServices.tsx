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

interface MainServicesProps {
  showAll?: boolean;
}

const MainServices = ({ showAll = false }: MainServicesProps) => {
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

  // Main Services
  const mainServices: Array<{
    title: string;
    description: string;
    features: string[];
    color: string;
    gradient: string;
  }> = [
    {
      title: "Strategy & Planning",
      description: "Comprehensive digital marketing strategy and planning to help your business achieve its goals. We analyze your market, competitors, and create a roadmap for success.",
      features: ["Market analysis", "Competitor research", "Marketing roadmap", "Goal setting"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Search Engine Optimization (SEO)",
      description: "Boost your website's visibility on search engines with our comprehensive SEO services. Improve rankings, drive organic traffic, and increase conversions.",
      features: ["Keyword research", "On-page SEO", "Technical SEO", "Link building"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Paid Advertising (PPC)",
      description: "Maximize your ROI with strategic paid advertising campaigns. We manage Google Ads, Facebook Ads, and other platforms to drive qualified leads.",
      features: ["Google Ads", "Facebook Ads", "Campaign optimization", "ROI tracking"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Social Media Marketing (SMM)",
      description: "Build your brand presence and engage with your audience across all major social media platforms. Consistent, engaging content that drives results.",
      features: ["Content creation", "Community management", "Social ads", "Analytics"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Content Marketing",
      description: "Create valuable, engaging content that attracts and converts your target audience. From blog posts to video content, we tell your brand's story.",
      features: ["Blog writing", "Content strategy", "Video content", "Content distribution"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Email Marketing",
      description: "Nurture leads and retain customers with personalized email campaigns. Automated workflows, segmentation, and performance tracking.",
      features: ["Email campaigns", "Automation", "Segmentation", "A/B testing"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Conversion Rate Optimization (CRO)",
      description: "Optimize your website and campaigns to convert more visitors into customers. Data-driven testing and improvements for maximum conversions.",
      features: ["A/B testing", "Landing page optimization", "User experience", "Analytics"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Analytics & Tracking",
      description: "Make data-driven decisions with comprehensive analytics and tracking. Understand your audience, measure performance, and optimize strategies.",
      features: ["Google Analytics", "Conversion tracking", "Reporting", "Data insights"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Video Marketing",
      description: "Engage your audience with professional video content. From promotional videos to tutorials, we create compelling visual stories for your brand.",
      features: ["Video production", "Video editing", "YouTube optimization", "Video ads"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "E-Commerce Marketing",
      description: "Drive sales and grow your online store with specialized e-commerce marketing strategies. Product optimization, shopping ads, and more.",
      features: ["Product optimization", "Shopping ads", "Retargeting", "Sales funnel"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Web Development",
      description: "Build fast, responsive, and SEO-friendly websites that convert. From landing pages to full e-commerce platforms, we create digital experiences.",
      features: ["Website design", "Responsive development", "SEO-friendly", "Performance optimization"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Growth Marketing",
      description: "Scale your business with data-driven growth strategies. We combine multiple marketing channels to accelerate your growth and maximize results.",
      features: ["Growth strategy", "Multi-channel campaigns", "Experimentation", "Scalable systems"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
  ];

  return (
    <section ref={sectionRef} id="main-services" className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      {/* Background Image - Only show on home page (when showAll is false) */}
      {!showAll && (
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
      )}
      
      {/* Content */}
      <div className={`relative z-10 transition-opacity duration-300 delay-100
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header - Top Center */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Our Main Services
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our core services designed to drive your business forward. 
              Premium quality with dedicated support.
            </p>
          </div>

          {/* Services Grid - Right Side 2x2 Layout for home page, Full grid for services page */}
          {showAll ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {mainServices.map((service, index) => {
                const cardVisible = visibleCards.has(index);
                const animationDelay = index * 100;
                
                return (
                  <Card 
                    key={index}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={`p-6 lg:p-8 shadow-lg border border-gray-200 flex flex-col rounded-xl group cursor-pointer
                      transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
                      ${cardVisible ? 'opacity-100' : 'opacity-0'}
                    `}
                    style={{
                      backgroundColor: '#eaf4f3',
                      transitionDelay: `${Math.min(animationDelay, 200)}ms`,
                    }}
                  >
                    {/* Content Section */}
                    <div className="flex flex-col flex-1">
                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {service.description}
                      </p>
                      
                      {/* Features */}
                      <div className="space-y-2 mb-4">
                        {service.features.slice(0, 4).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`}></div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                        {service.features.length > 4 && (
                          <div className="text-sm text-primary font-medium">
                            +{service.features.length - 4} more
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto pt-4 border-t border-muted/20">
                      <Button 
                        variant="default" 
                        size="lg"
                        className="w-full bg-gradient-primary hover:shadow-lg text-white font-semibold transform transition-all duration-300 hover:scale-105"
                        onClick={() => {
                          trackLearnMoreClick('main_services_section', service.title);
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
          ) : (
            <div className="flex justify-end">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full md:w-1/2">
                {mainServices.slice(0, 4).map((service, index) => {
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
                    backgroundColor: '#eaf4f3',
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
                        trackLearnMoreClick('main_services_section', service.title);
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
          )}

          {/* View All Services CTA - Only show on home page when showing 4 services */}
          {!showAll && (
            <div className="text-center mt-16 md:mt-20">
              <Button 
                size="lg"
                className="bg-gradient-primary hover:shadow-lg text-base font-semibold px-8 py-6 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                onClick={() => {
                  trackViewAllServicesClick('main_services_section');
                  window.location.href = '/services';
                }}
              >
                View All Services
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainServices;

