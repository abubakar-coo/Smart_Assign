import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, Database, PenTool, Palette, Users, ShoppingCart, FileText, Headphones, Search, CheckCircle } from "lucide-react";

const Services = () => {
  // Colorful icon-based service images
  const ServiceImage = ({ service, index }: { service: any, index: number }) => {
    const getColorScheme = (index: number) => {
      const schemes = [
        { bg: 'from-pink-400 via-red-500 to-yellow-500', icon: 'from-pink-600 to-red-600', accent: 'bg-pink-400' },
        { bg: 'from-blue-400 via-purple-500 to-pink-500', icon: 'from-blue-600 to-purple-600', accent: 'bg-blue-400' },
        { bg: 'from-green-400 via-teal-500 to-blue-500', icon: 'from-green-600 to-teal-600', accent: 'bg-green-400' },
        { bg: 'from-yellow-400 via-orange-500 to-red-500', icon: 'from-yellow-600 to-orange-600', accent: 'bg-yellow-400' },
        { bg: 'from-purple-400 via-pink-500 to-red-500', icon: 'from-purple-600 to-pink-600', accent: 'bg-purple-400' },
        { bg: 'from-indigo-400 via-purple-500 to-pink-500', icon: 'from-indigo-600 to-purple-600', accent: 'bg-indigo-400' },
        { bg: 'from-cyan-400 via-blue-500 to-purple-500', icon: 'from-cyan-600 to-blue-600', accent: 'bg-cyan-400' },
        { bg: 'from-emerald-400 via-teal-500 to-cyan-500', icon: 'from-emerald-600 to-teal-600', accent: 'bg-emerald-400' },
        { bg: 'from-rose-400 via-pink-500 to-purple-500', icon: 'from-rose-600 to-pink-600', accent: 'bg-rose-400' },
        { bg: 'from-violet-400 via-purple-500 to-indigo-500', icon: 'from-violet-600 to-purple-600', accent: 'bg-violet-400' },
        { bg: 'from-orange-400 via-red-500 to-pink-500', icon: 'from-orange-600 to-red-600', accent: 'bg-orange-400' },
        { bg: 'from-teal-400 via-cyan-500 to-blue-500', icon: 'from-teal-600 to-cyan-600', accent: 'bg-teal-400' }
      ];
      return schemes[index % schemes.length];
    };

    const colors = getColorScheme(index);

    return (
      <div className={`w-full h-32 rounded-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500 bg-gradient-to-br ${colors.bg} shadow-lg`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${colors.icon} flex items-center justify-center shadow-2xl ring-4 ring-white/30`}>
            <service.icon className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
        </div>
        <div className={`absolute top-2 right-2 w-6 h-6 ${colors.accent} rounded-full animate-pulse shadow-lg`}></div>
        <div className="absolute bottom-2 left-2 text-white font-bold text-sm drop-shadow-lg bg-black/20 px-2 py-1 rounded-full">
          {service.title.split(' ')[0]}
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mb-8"></div>
      </div>
    );
  };

  const leftSideServices = [
    {
      icon: Users,
      title: "UGC Ad Campaigns",
      description: "Authentic campaigns to engage audiences with user-generated content that drives real conversions.",
      features: ["Authentic Campaigns", "Audience Engagement", "Content Strategy", "Performance Analytics"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Database,
      title: "Data Entry & Cleanup",
      description: "Professional data entry and cleansing services ensuring accurate formatting, validation, and organization of your business-critical information with 99.9% accuracy guarantee.",
      features: ["Advanced Data Validation", "Intelligent Format Standardization", "AI-Powered Duplicate Detection", "Multi-Level Quality Assurance", "Seamless Database Migration", "Real-time Processing"],
      color: "text-secondary",
      gradient: "from-secondary to-secondary-glow",
    },
    {
      icon: PenTool,
      title: "Prompt Engineering",
      description: "AI prompt crafting to maximize the effectiveness of your AI tools and workflows.",
      features: ["AI Optimization", "Custom Prompts", "Tool Integration", "Performance Tuning"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: FileText,
      title: "Presentation Design",
      description: "Sleek, impactful presentations that captivate your audience and convey your message.",
      features: ["Professional Design", "Visual Impact", "Brand Consistency", "Engaging Content"],
      color: "text-secondary",
      gradient: "from-secondary to-secondary-glow",
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce Solutions",
      description: "Store setup and optimization to maximize your online sales and customer experience.",
      features: ["Store Setup", "Payment Integration", "SEO Optimization", "Conversion Focus"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Palette,
      title: "Canva Designing",
      description: "Social media posts, flyers, and visuals that make your brand stand out.",
      features: ["Social Media Posts", "Marketing Materials", "Brand Graphics", "Visual Content"],
      color: "text-secondary",
      gradient: "from-secondary to-secondary-glow",
    },
  ];

  const rightSideServices = [
    {
      icon: FileText,
      title: "Typing & Formatting",
      description: "Professional documents with precise formatting and attention to detail.",
      features: ["Document Creation", "Professional Formatting", "Multiple Formats", "Quick Turnaround"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Headphones,
      title: "Transcription Services",
      description: "Audio/video to text conversion with high accuracy and fast delivery.",
      features: ["Audio Processing", "Video Transcription", "High Accuracy", "Fast Delivery"],
      color: "text-secondary",
      gradient: "from-secondary to-secondary-glow",
    },
    {
      icon: PenTool,
      title: "AI Content Creation",
      description: "Smart content ideas and writing powered by cutting-edge AI technology.",
      features: ["Content Strategy", "AI-Powered Writing", "Creative Ideas", "Brand Voice"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Search,
      title: "SEO Content Writing",
      description: "Optimized blogs and articles that rank well and drive organic traffic.",
      features: ["SEO Optimization", "Keyword Research", "Engaging Writing", "Traffic Growth"],
      color: "text-secondary",
      gradient: "from-secondary to-secondary-glow",
    },
    {
      icon: BookOpen,
      title: "Research Assistance",
      description: "Academic/business research with thorough analysis and credible sources.",
      features: ["Academic Research", "Business Analysis", "Source Verification", "Detailed Reports"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: CheckCircle,
      title: "Proofreading & Editing",
      description: "Polished, error-free content that maintains professionalism and clarity.",
      features: ["Grammar & Style", "Error Correction", "Content Polish", "Quality Assurance"],
      color: "text-secondary",
      gradient: "from-secondary to-secondary-glow",
    },
  ];

  return (
    <section id="services" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Our Micro-Services
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Specialized services designed to help your business thrive. 
            Each service is crafted with precision and delivered with excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-6">
          {/* Left Side Services */}
          <div className="mb-6">
            <h3 className="text-3xl font-semibold text-foreground text-center mb-6">
              Our Core Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leftSideServices.map((service, index) => (
                <Card 
                  key={index} 
                  className="p-8 shadow-card hover:shadow-hover transition-all duration-300 group cursor-pointer border-0 bg-white h-full flex flex-col"
                >
                  <div className="space-y-6 flex-1 flex flex-col">
                    {/* Animated AI-Generated Style Image */}
                    <div className="mb-6">
                      <ServiceImage service={service} index={index} />
                    </div>

                    {/* Content */}
                    <div className="space-y-4 flex-1">
                      <h3 className="text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* Features */}
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`}></div>
                            <span className="text-base text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-6">
                      <Button 
                        variant="outline" 
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => window.location.href = `/services/${service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').replace(/--/g, '-')}`}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Side Services */}
          <div>
            <h3 className="text-3xl font-semibold text-foreground text-center mb-6">
              Additional Specialized Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rightSideServices.map((service, index) => (
            <Card 
              key={index} 
              className="p-8 shadow-card hover:shadow-hover transition-all duration-300 group cursor-pointer border-0 bg-white h-full flex flex-col"
            >
              <div className="space-y-6 flex-1 flex flex-col">
                {/* Animated AI-Generated Style Image */}
                <div className="mb-6">
                  <ServiceImage service={service} index={index} />
                </div>

                {/* Content */}
                <div className="space-y-4 flex-1">
                  <h3 className="text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`}></div>
                        <span className="text-base text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => window.location.href = `/services/${service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').replace(/--/g, '-')}`}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;