import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Database, BookOpen, CheckCircle, Palette,
  FileText, GraduationCap, FileCheck, Presentation,
  Briefcase, ScrollText, Users, ArrowRight, DollarSign
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

const ServicesDetails = () => {
  const allServices = [
    {
      icon: Search,
      title: "SEO Content Writing",
      category: "Content & Marketing",
      description: "We provide high-quality, SEO-optimized content that helps websites rank better on search engines. Our content is well-researched, plagiarism-free, and tailored to your target audience.",
      idealFor: ["Students", "Bloggers", "Small businesses", "Agencies"],
      servicesInclude: [
        "Blog posts",
        "Website content",
        "Articles",
        "Keyword optimization"
      ],
      pricing: [
        "$10 – $20 per 500 words",
        "$30 – $60 per 1,000 words"
      ],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Database,
      title: "Data Entry",
      category: "Data Management",
      description: "Accurate and fast data entry services for businesses and individuals. We ensure confidentiality, precision, and timely delivery.",
      idealFor: ["Small agencies", "Professionals", "E-commerce sellers"],
      servicesInclude: [
        "Excel / Google Sheets",
        "CRM data entry",
        "Copy-paste tasks",
        "PDF to Excel/Word"
      ],
      pricing: [
        "$5 – $10 per hour",
        "$15 – $30 per project (basic)"
      ],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: BookOpen,
      title: "Research Assistance",
      category: "Research & Analysis",
      description: "We provide reliable research support with authentic sources, helping clients save time and make informed decisions.",
      idealFor: ["Students", "Researchers", "Content creators"],
      servicesInclude: [
        "Academic research",
        "Market research",
        "Online research",
        "Data collection"
      ],
      pricing: [
        "$10 – $20 per task",
        "$5 – $8 per hour"
      ],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: CheckCircle,
      title: "Proofreading & Editing",
      category: "Quality Assurance",
      description: "We improve clarity, grammar, and structure while maintaining your original tone and meaning.",
      idealFor: ["Students", "Professionals", "Authors"],
      servicesInclude: [
        "Grammar correction",
        "Sentence improvement",
        "Academic & business editing"
      ],
      pricing: [
        "$5 – $10 per 1,000 words",
        "$15 – $25 for detailed editing"
      ],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Palette,
      title: "Canva Designing",
      category: "Graphic Design",
      description: "Eye-catching and professional designs created using Canva for digital and print use.",
      idealFor: ["Students", "Startups", "Social media managers"],
      servicesInclude: [
        "Social media posts",
        "Presentations",
        "Flyers & posters",
        "CVs & resumes"
      ],
      pricing: [
        "$5 – $10 per design",
        "$25 – $50 for bulk designs"
      ],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: FileText,
      title: "Typing & Formatting",
      category: "Document Services",
      description: "Clean, professional typing and formatting according to academic or business standards.",
      idealFor: ["Students", "Offices", "Professionals"],
      servicesInclude: [
        "PDF to Word",
        "Formatting documents",
        "Reports & assignments"
      ],
      pricing: [
        "$5 – $8 per document",
        "$10 – $20 for complex formatting"
      ],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: GraduationCap,
      title: "Assignment Writing",
      category: "Academic Services",
      description: "Custom-written assignments with proper structure, references, and plagiarism-free content.",
      idealFor: ["College & university students"],
      servicesInclude: [
        "Essays",
        "Case studies",
        "Reports",
        "Coursework"
      ],
      pricing: [
        "$10 – $20 per 500 words",
        "$40 – $80 for full assignments"
      ],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: FileCheck,
      title: "Literature Review",
      category: "Academic Research",
      description: "In-depth literature reviews using credible academic sources, written in a clear and structured manner.",
      idealFor: ["Final-year students", "Researchers", "PhD candidates"],
      servicesInclude: [
        "Systematic reviews",
        "Thematic reviews",
        "APA / Harvard referencing"
      ],
      pricing: [
        "$30 – $60 (1,500–2,000 words)",
        "$80 – $150 for advanced research"
      ],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Presentation,
      title: "Presentation (PPT) Design",
      category: "Design & Visual",
      description: "Professionally designed PowerPoint or Google Slides presentations that are visually appealing and easy to understand.",
      idealFor: ["Students", "Teachers", "Business professionals"],
      servicesInclude: [
        "Academic presentations",
        "Business & pitch decks",
        "Charts, icons & visuals",
        "Clean layouts"
      ],
      pricing: [
        "$5 – $10 per design",
        "$25 – $50 for bulk designs"
      ],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Briefcase,
      title: "Resume & Cover Letter Writing",
      category: "Career Services",
      description: "ATS-friendly resumes and persuasive cover letters that help clients stand out in job applications.",
      idealFor: ["Students", "Fresh graduates", "Professionals"],
      servicesInclude: [
        "Modern CV design",
        "Keyword optimization",
        "Job-specific cover letters"
      ],
      pricing: [
        "$15 – $30 per resume",
        "$10 – $20 per cover letter"
      ],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: ScrollText,
      title: "Academic Formatting (APA / MLA / Harvard)",
      category: "Academic Services",
      description: "We format documents according to international academic standards with proper citations and references.",
      idealFor: ["University students & researchers"],
      servicesInclude: [
        "In-text citations",
        "Reference lists",
        "Proper margins & headings"
      ],
      pricing: [
        "$5 – $10 per document",
        "$15 – $25 for complex formatting"
      ],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Users,
      title: "Virtual Assistance (Small Tasks)",
      category: "Business Support",
      description: "Reliable virtual assistance for small business and professional daily tasks.",
      idealFor: ["Small agencies", "Freelancers", "Entrepreneurs"],
      servicesInclude: [
        "Email handling",
        "Data management",
        "Online research",
        "Admin support"
      ],
      pricing: [
        "$5 – $10 per hour",
        "$15 – $30 per project"
      ],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Header */}
      <section className="bg-gradient-hero py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-foreground mb-6">
            Our Professional Services
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive range of services designed to help you succeed. 
            From content creation to virtual assistance, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allServices.map((service, index) => (
              <Card key={index} className="p-8 shadow-card hover:shadow-hover transition-all duration-300 border-0 flex flex-col h-full">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2">
                        {service.category}
                      </Badge>
                      <h3 className="text-2xl font-bold text-foreground">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section - Grows to fill space */}
                  <div className="flex flex-col flex-1">
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Ideal For */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Ideal for:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.idealFor.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Services Include */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Services Include:
                      </h4>
                      <ul className="space-y-2">
                        {service.servicesInclude.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing - Always at bottom */}
                  <div className="mt-auto pt-6 border-t border-muted/20">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        Starting Price:
                      </h4>
                      <ul className="space-y-1">
                        {service.pricing.map((price, idx) => (
                          <li key={idx} className="text-sm text-green-700 font-medium">
                            {price}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      onClick={() => navigate(`/services/${titleToSlug(service.title)}`)}
                      className="w-full bg-gradient-primary hover:shadow-hover"
                    >
                      Request This Service <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary-glow/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project requirements and get a customized quote.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-hover"
            onClick={() => window.location.href = '/contact'}
          >
            Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesDetails;
