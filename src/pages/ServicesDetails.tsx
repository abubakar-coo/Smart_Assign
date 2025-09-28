import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Video, Database, PenTool, Palette, 
  CheckCircle, Clock, Users, Star, ArrowRight,
  FileText, Headphones, Brain, Search, 
  ShoppingCart, MousePointer
} from "lucide-react";

const ServicesDetails = () => {
  const allServices = [
    // Left Side Services
    {
      icon: Users,
      title: "UGC Ad Campaigns",
      category: "Marketing & Content",
      description: "Authentic user-generated content campaigns designed to engage your target audience and drive meaningful conversions through real customer testimonials and experiences.",
      features: ["Content Strategy", "Campaign Management", "Audience Targeting", "Performance Analytics", "Creative Development", "A/B Testing"],
      deliverables: ["Campaign Strategy Document", "Content Calendar", "Creative Assets", "Performance Reports"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Database,
      title: "Data Entry & Cleanup",
      category: "Data Management",
      description: "Professional data entry and cleansing services ensuring accurate formatting, validation, and organization of your business-critical information with 99.9% accuracy guarantee.",
      features: ["Data Validation", "Format Standardization", "Duplicate Removal", "Quality Assurance", "Database Migration", "Real-time Processing"],
      deliverables: ["Cleaned Database", "Data Quality Report", "Processing Documentation", "Backup Files"],
      color: "text-secondary",
      gradient: "from-secondary to-secondary-glow",
    },
    {
      icon: Brain,
      title: "Prompt Engineering",
      category: "AI Solutions",
      description: "Advanced AI prompt crafting for optimal results across different AI platforms. Maximize your AI tool efficiency with expertly designed prompts for various use cases.",
      features: ["Custom Prompt Development", "Multi-platform Optimization", "Performance Testing", "Documentation", "Training Materials", "Ongoing Support"],
      deliverables: ["Prompt Library", "Usage Guidelines", "Performance Metrics", "Training Session"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: FileText,
      title: "Presentation Design",
      category: "Design & Visual",
      description: "Sleek, impactful presentation designs that captivate your audience. Professional slide decks for business meetings, pitches, and corporate communications.",
      features: ["Custom Templates", "Visual Storytelling", "Brand Integration", "Animation Effects", "Interactive Elements", "Multiple Formats"],
      deliverables: ["Master Presentation", "Template Files", "Brand Guidelines", "Training Materials"],
      color: "text-secondary",
      gradient: "from-secondary to-secondary-glow",
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce Solutions",
      category: "Digital Commerce",
      description: "Complete e-commerce store setup and optimization services. From platform selection to conversion optimization, we help you build a profitable online presence.",
      features: ["Platform Setup", "Payment Integration", "SEO Optimization", "Mobile Responsive", "Analytics Setup", "Conversion Optimization"],
      deliverables: ["Complete Store Setup", "Admin Training", "SEO Report", "Analytics Dashboard"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Palette,
      title: "Canva Designing",
      category: "Graphic Design",
      description: "Professional Canva-based designs for social media posts, flyers, and marketing visuals. Brand-consistent designs that drive engagement and conversions.",
      features: ["Social Media Templates", "Marketing Materials", "Brand Kit Setup", "Custom Graphics", "Animation Effects", "Print-ready Designs"],
      deliverables: ["Design Templates", "Brand Assets", "Usage Guidelines", "Source Files"],
      color: "text-secondary",
      gradient: "from-secondary to-secondary-glow",
    },

    // Right Side Services
    {
      icon: FileText,
      title: "Typing & Formatting",
      category: "Document Services",
      description: "Professional document typing and formatting services for business reports, academic papers, and corporate documentation with precise attention to detail.",
      features: ["Professional Formatting", "Multiple File Formats", "Fast Turnaround", "Quality Assurance", "Revision Support", "Confidentiality Guaranteed"],
      deliverables: ["Formatted Documents", "Source Files", "Style Guide", "Quality Report"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Headphones,
      title: "Transcription Services",
      category: "Content Conversion",
      description: "Accurate audio and video to text transcription with 98%+ accuracy. Professional transcription for meetings, interviews, podcasts, and multimedia content.",
      features: ["High Accuracy Rate", "Multiple Audio Formats", "Time Stamping", "Speaker Identification", "Fast Delivery", "Confidential Processing"],
      deliverables: ["Transcribed Text", "Time-stamped Version", "Summary Document", "Audio Markers"],
      color: "text-secondary",
      gradient: "from-secondary to-secondary-glow",
    },
    {
      icon: Brain,
      title: "AI Content Creation",
      category: "Content Strategy",
      description: "Smart content ideas and AI-powered writing for blogs, social media, and marketing materials. Leverage cutting-edge AI for consistent, engaging content.",
      features: ["Content Strategy", "AI-Powered Writing", "SEO Optimization", "Multi-platform Content", "Brand Voice Training", "Content Calendar"],
      deliverables: ["Content Library", "Publishing Schedule", "Brand Guidelines", "Performance Metrics"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Search,
      title: "SEO Content Writing",
      category: "Digital Marketing",
      description: "SEO-optimized blogs and articles designed to improve search rankings and drive organic traffic. Expert content that balances readability with search optimization.",
      features: ["Keyword Research", "SEO Optimization", "Engaging Writing", "Meta Descriptions", "Internal Linking", "Performance Tracking"],
      deliverables: ["SEO Articles", "Keyword Report", "Meta Data", "Performance Analytics"],
      color: "text-secondary",
      gradient: "from-secondary to-secondary-glow",
    },
    {
      icon: BookOpen,
      title: "Research Assistance",
      category: "Academic & Business",
      description: "Comprehensive academic and business research services with thorough analysis, credible sources, and detailed documentation for informed decision-making.",
      features: ["Primary Research", "Secondary Analysis", "Source Verification", "Data Analysis", "Report Writing", "Citation Management"],
      deliverables: ["Research Report", "Source Bibliography", "Data Analysis", "Executive Summary"],
      color: "text-primary",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: CheckCircle,
      title: "Proofreading & Editing",
      category: "Quality Assurance",
      description: "Professional proofreading and editing services ensuring polished, error-free content that maintains your professional reputation and clarity of message.",
      features: ["Grammar & Spelling", "Style Consistency", "Clarity Enhancement", "Fact Checking", "Formatting Review", "Multiple Revisions"],
      deliverables: ["Edited Document", "Track Changes File", "Style Report", "Quality Checklist"],
      color: "text-secondary",
      gradient: "from-secondary to-secondary-glow",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Header */}
      <section className="bg-gradient-hero py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-foreground mb-6">
            Our Comprehensive Services
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Discover our full range of professional micro-services designed to 
            streamline your business operations and drive growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Service
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select from our comprehensive range of professional services tailored to meet your business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allServices.map((service, index) => (
              <Card key={index} className="p-8 shadow-card hover:shadow-hover transition-all duration-300 border-0">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {service.category}
                        </Badge>
                        <h3 className="text-2xl font-bold text-foreground">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">What You Get:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((deliverable, deliverableIndex) => (
                        <Badge key={deliverableIndex} variant="outline">
                          {deliverable}
                        </Badge>
                      ))}
                    </div>
                  </div>

                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesDetails;