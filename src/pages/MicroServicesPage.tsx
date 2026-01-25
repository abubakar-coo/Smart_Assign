import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Database,
  BookOpen,
  CheckCircle,
  Palette,
  FileText,
  GraduationCap,
  FileCheck,
  Presentation,
  Briefcase,
  ScrollText,
  Users,
  ArrowRight,
} from "lucide-react";

// Mapping of service titles to their exact slugs (matching ServiceDetail.tsx)
const serviceSlugMap: Record<string, string> = {
  "Presentation (PPT) Design": "presentation-ppt-design",
  "Academic Formatting (APA / MLA / Harvard)": "academic-formatting",
  "Virtual Assistance (Small Tasks)": "virtual-assistance",
};

// Helper function to convert service title to URL slug
const titleToSlug = (title: string): string => {
  if (serviceSlugMap[title]) return serviceSlugMap[title];

  return title
    .replace(/\([^)]*\)/g, "") // Remove parentheses content FIRST
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace all non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};

const MicroServicesPage = () => {
  const navigate = useNavigate();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  const allServices = [
    {
      icon: Search,
      title: "SEO Content Writing",
      category: "Content & Marketing",
      description:
        "We provide high-quality, SEO-optimized content that helps websites rank better on search engines. Our content is well-researched, plagiarism-free, and tailored to your target audience.",
      idealFor: ["Students", "Bloggers", "Small businesses", "Agencies"],
      servicesInclude: ["Blog posts", "Website content", "Articles", "Keyword optimization"],
      pricing: ["$10 – $20 per 500 words", "$30 – $60 per 1,000 words"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Database,
      title: "Data Entry",
      category: "Data Management",
      description:
        "Accurate and fast data entry services for businesses and individuals. We ensure confidentiality, precision, and timely delivery.",
      idealFor: ["Small agencies", "Professionals", "E-commerce sellers"],
      servicesInclude: ["Excel / Google Sheets", "CRM data entry", "Copy-paste tasks", "PDF to Excel/Word"],
      pricing: ["$30+ per hour", "$15 – $30 per project (basic)"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: BookOpen,
      title: "Research Assistance",
      category: "Research & Analysis",
      description:
        "We provide reliable research support with authentic sources, helping clients save time and make informed decisions.",
      idealFor: ["Students", "Researchers", "Content creators"],
      servicesInclude: ["Academic research", "Market research", "Online research", "Data collection"],
      pricing: ["$30+ per hour", "$10 – $20 per task"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: CheckCircle,
      title: "Proofreading & Editing",
      category: "Quality Assurance",
      description: "We improve clarity, grammar, and structure while maintaining your original tone and meaning.",
      idealFor: ["Students", "Professionals", "Authors"],
      servicesInclude: ["Grammar correction", "Sentence improvement", "Academic & business editing"],
      pricing: ["$20+ per 1,000 words", "$15 – $25 for detailed editing"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Palette,
      title: "Canva Designing",
      category: "Design & Creative",
      description: "Creative and visually appealing designs for social media, presentations, flyers, and more.",
      idealFor: ["Brands", "Students", "Businesses"],
      servicesInclude: ["Social media posts", "Presentations", "Flyers & posters", "CVs & resumes"],
      pricing: ["$5 – $10 per design", "$30+ per package"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: FileText,
      title: "Typing & Formatting",
      category: "Document Services",
      description: "Professional typing and formatting services for academic and business documents.",
      idealFor: ["Students", "Professionals", "Researchers"],
      servicesInclude: ["PDF to Word", "Formatting documents", "Reports & assignments"],
      pricing: ["$5 – $10 per document", "$20+ per project"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: GraduationCap,
      title: "Assignment Writing",
      category: "Academic Support",
      description:
        "Custom assignment writing services with proper research, structure, and plagiarism-free content.",
      idealFor: ["Students", "Researchers"],
      servicesInclude: ["Essays", "Case studies", "Reports", "Coursework"],
      pricing: ["$15 – $30 per assignment", "$50+ for complex projects"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: FileCheck,
      title: "Literature Review",
      category: "Academic Research",
      description:
        "Comprehensive literature reviews with in-depth analysis and proper citations for academic projects.",
      idealFor: ["Students", "Researchers", "PhD candidates"],
      servicesInclude: ["Systematic reviews", "Thematic reviews", "APA / Harvard referencing"],
      pricing: ["$30+ per hour", "$50 – $100 per review"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Presentation,
      title: "Presentation (PPT) Design",
      category: "Design & Creative",
      description:
        "Professional and engaging presentations with modern design, icons, and visuals for any purpose.",
      idealFor: ["Students", "Businesses", "Speakers"],
      servicesInclude: ["Academic presentations", "Business pitch decks", "Charts, icons & visuals", "Clean layouts"],
      pricing: ["$10 – $20 per presentation", "$5 per slide (basic)"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Briefcase,
      title: "Resume & Cover Letter Writing",
      category: "Career Support",
      description:
        "ATS-friendly resumes and compelling cover letters tailored to your role and industry.",
      idealFor: ["Job seekers", "Professionals", "Graduates"],
      servicesInclude: ["Modern CV design", "Keyword optimization", "Job-specific cover letters"],
      pricing: ["$10 – $20 per resume", "$5 – $10 per cover letter"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: ScrollText,
      title: "Academic Formatting (APA / MLA / Harvard)",
      category: "Academic Support",
      description:
        "Accurate formatting and referencing as per required citation styles with proper structure and layout.",
      idealFor: ["Students", "Researchers"],
      servicesInclude: ["In-text citations", "Reference lists", "Proper margins & headings"],
      pricing: ["$10 – $20 per document", "$25+ for thesis formatting"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Users,
      title: "Virtual Assistance (Small Tasks)",
      category: "Business Support",
      description: "Reliable virtual assistance for small business and professional daily tasks.",
      idealFor: ["Small agencies", "Freelancers", "Entrepreneurs"],
      servicesInclude: ["Email handling", "Data management", "Online research", "Admin support"],
      pricing: ["$10+ per hour", "$15 – $30 per project"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px" }
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Micro Services | Smart Assign</title>
        <meta
          name="description"
          content="Explore Smart Assign micro services including SEO content writing, data entry, research, designing, formatting, and virtual assistance."
        />
        <meta property="og:title" content="Micro Services | Smart Assign" />
      </Helmet>

      <Navigation />

      <section className="bg-gradient-hero py-20 mt-16 relative overflow-hidden">
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Micro Services
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Specialized services to support your day-to-day work needs with speed and quality.
            </p>
          </div>
        </div>
      </section>

      {/* Micro Services Section (same layout as old Services page) */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Micro Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Additional specialized services to support your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allServices.map((service, index) => {
              const getServiceImagePath = (title: string): string => {
                const imageMap: { [key: string]: string } = {
                  "SEO Content Writing": "seo-content-writing",
                  "Data Entry": "data-entry",
                  "Research Assistance": "research-assistance",
                  "Proofreading & Editing": "proofreading-editing",
                  "Canva Designing": "canva-designing",
                  "Typing & Formatting": "typing-formatting",
                  "Assignment Writing": "assignment-writing",
                  "Literature Review": "literature-review",
                  "Presentation (PPT) Design": "presentation-ppt-design",
                  "Resume & Cover Letter Writing": "resume-cover-letter",
                  "Academic Formatting (APA / MLA / Harvard)": "academic-formatting",
                  "Virtual Assistance (Small Tasks)": "virtual-assistance",
                };
                const fileName = imageMap[title] || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return `/images/services/${fileName}-bg.png`;
              };

              const isVisible = visibleCards.has(index);
              const animationDelay = index * 100;

              return (
                <Card
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`p-8 shadow-card border-0 flex flex-col h-full relative overflow-hidden group cursor-pointer
                    transition-opacity duration-300 ease-out
                    ${isVisible ? "opacity-100" : "opacity-0"}
                    hover:shadow-xl
                  `}
                  style={{
                    transitionDelay: `${Math.min(animationDelay, 200)}ms`,
                    backgroundColor: "#eaf2f2",
                  }}
                  onClick={() => navigate(`/services/${titleToSlug(service.title)}`)}
                >
                  {/* Background Image - Full Quality - Hidden on Mobile */}
                  <div 
                    className="absolute inset-0 z-0 bg-no-repeat bg-center hidden md:block"
                    style={{
                      backgroundImage: `url(${getServiceImagePath(service.title)})`,
                      backgroundSize: 'cover',
                      imageRendering: 'auto' as const,
                    } as React.CSSProperties}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <service.icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">
                            {service.category}
                          </Badge>
                          <h3 className="text-2xl font-bold text-foreground mb-2">{service.title}</h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" /> Services Include
                      </h4>
                      <ul className="space-y-2">
                        {service.servicesInclude.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-6 border-t border-muted/20">
                      <Button
                        className="w-full bg-gradient-primary hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/services/${titleToSlug(service.title)}`);
                        }}
                      >
                        Explore Service <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MicroServicesPage;


