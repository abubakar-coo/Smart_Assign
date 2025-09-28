import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, Users, Star, ArrowRight } from "lucide-react";

const ServiceDetail = () => {
  const { serviceName } = useParams();
  
  // Service details based on service name
  const getServiceDetails = (name: string) => {
    const services = {
      "ugc-ad-campaigns": {
        title: "UGC Ad Campaigns",
        category: "Marketing & Content",
        description: "Authentic user-generated content campaigns designed to engage your target audience and drive meaningful conversions through real customer testimonials and experiences.",
        longDescription: "Our UGC Ad Campaigns service transforms your customers into your biggest advocates. We create authentic, engaging content that showcases real experiences with your products or services. This approach builds trust, increases engagement, and drives higher conversion rates compared to traditional advertising.",
        features: [
          "Content Strategy Development",
          "Campaign Management",
          "Audience Targeting & Segmentation",
          "Performance Analytics & Reporting",
          "Creative Development",
          "A/B Testing & Optimization",
          "Influencer Collaboration",
          "Social Media Integration"
        ],
        deliverables: [
          "Comprehensive Campaign Strategy",
          "Content Calendar & Timeline",
          "Creative Assets & Templates",
          "Performance Reports",
          "ROI Analysis",
          "Brand Guidelines"
        ],
        timeline: "2-4 weeks",
        process: [
          "Initial consultation and strategy development",
          "Content creation and campaign setup",
          "Launch and monitoring phase",
          "Analysis and optimization"
        ],
        benefits: [
          "Increased brand authenticity",
          "Higher engagement rates",
          "Better conversion rates",
          "Cost-effective marketing",
          "Long-term customer relationships"
        ]
      },
      "data-entry-cleanup": {
        title: "Data Entry & Cleanup",
        category: "Data Management",
        description: "Professional data entry and cleansing services ensuring accurate formatting, validation, and organization of your business-critical information with 99.9% accuracy guarantee.",
        longDescription: "Our Data Entry & Cleanup service is designed to transform your raw, messy data into clean, organized, and actionable information. We specialize in handling large volumes of data with precision and accuracy, ensuring your business can make informed decisions based on reliable information. Our team uses advanced tools and techniques to identify and correct errors, remove duplicates, standardize formats, and ensure data integrity throughout the entire process. Whether you need basic data entry, complex database migrations, or comprehensive data cleanup, we deliver results that exceed expectations.",
        features: [
          "Advanced Data Validation & Verification",
          "Intelligent Format Standardization",
          "AI-Powered Duplicate Detection & Removal",
          "Multi-Level Quality Assurance Checks",
          "Seamless Database Migration",
          "Real-time Processing & Updates",
          "Automated Error Correction",
          "Comprehensive Data Backup & Security",
          "Custom Data Mapping & Transformation",
          "Data Quality Scoring & Analytics",
          "Cross-Platform Data Integration",
          "24/7 Data Monitoring & Maintenance"
        ],
        deliverables: [
          "Fully Cleaned & Validated Database",
          "Comprehensive Data Quality Report",
          "Detailed Processing Documentation",
          "Complete Backup Files & Recovery Plan",
          "Error Logs & Correction History",
          "Custom Data Dictionary & Schema",
          "Data Migration Report",
          "Quality Assurance Certificates",
          "Training Materials & Guidelines",
          "Ongoing Support Documentation"
        ],
        timeline: "1-2 weeks",
        process: [
          "Initial data assessment and requirements analysis",
          "Data mapping and transformation planning",
          "Automated cleaning and validation process",
          "Manual review and quality assurance testing",
          "Final validation and error correction",
          "Documentation and delivery preparation"
        ],
        benefits: [
          "99.9% Data Accuracy Guarantee",
          "Improved Business Decision Making",
          "Significant Cost & Time Savings",
          "Enhanced Data Security & Compliance",
          "Streamlined Business Operations",
          "Better Customer Data Management",
          "Reduced Manual Errors",
          "Improved Data Analytics Capabilities",
          "Faster Data Processing",
          "Professional Data Standards"
        ]
      },
      "prompt-engineering": {
        title: "Prompt Engineering",
        category: "AI Solutions",
        description: "Advanced AI prompt crafting for optimal results across different AI platforms. Maximize your AI tool efficiency with expertly designed prompts for various use cases.",
        longDescription: "Our prompt engineering service helps you get the most out of AI tools by creating optimized prompts that deliver consistent, high-quality results. We work with various AI platforms to ensure your prompts are tailored to your specific needs and use cases.",
        features: [
          "Custom Prompt Development",
          "Multi-platform Optimization",
          "Performance Testing",
          "Documentation & Guidelines",
          "Training Materials",
          "Ongoing Support",
          "A/B Testing",
          "Best Practices Implementation"
        ],
        deliverables: [
          "Optimized Prompt Library",
          "Usage Guidelines",
          "Performance Metrics",
          "Training Session",
          "Documentation",
          "Support Resources"
        ],
        timeline: "1-2 weeks",
        process: [
          "Requirements analysis",
          "Prompt development and testing",
          "Optimization and refinement",
          "Training and documentation"
        ],
        benefits: [
          "Improved AI output quality",
          "Consistent results",
          "Time and cost savings",
          "Better AI utilization",
          "Competitive advantage"
        ]
      },
      "presentation-design": {
        title: "Presentation Design",
        category: "Design & Visual",
        description: "Sleek, impactful presentation designs that captivate your audience and convey your message effectively.",
        longDescription: "Our presentation design service creates professional, engaging presentations that help you communicate your ideas effectively. We design custom templates, create compelling visuals, and ensure your presentations are both informative and visually appealing.",
        features: [
          "Custom Template Design",
          "Visual Storytelling",
          "Brand Integration",
          "Animation Effects",
          "Interactive Elements",
          "Multiple Format Support"
        ],
        deliverables: [
          "Master Presentation File",
          "Template Files",
          "Brand Guidelines",
          "Training Materials",
          "Source Files",
          "Usage Instructions"
        ],
        timeline: "1-2 weeks",
        process: [
          "Content analysis and planning",
          "Design concept development",
          "Template creation and refinement",
          "Final delivery and training"
        ],
        benefits: [
          "Professional appearance",
          "Better audience engagement",
          "Consistent branding",
          "Time savings",
          "Competitive advantage"
        ]
      },
      "e-commerce-solutions": {
        title: "E-Commerce Solutions",
        category: "Digital Commerce",
        description: "Complete e-commerce store setup and optimization services. From platform selection to conversion optimization, we help you build a profitable online presence.",
        longDescription: "Our e-commerce solutions service helps you build and optimize your online store for maximum sales and customer satisfaction. We handle everything from platform setup to payment integration, ensuring your store is ready to convert visitors into customers.",
        features: [
          "Platform Setup & Configuration",
          "Payment Gateway Integration",
          "SEO Optimization",
          "Mobile Responsive Design",
          "Analytics Setup",
          "Conversion Optimization"
        ],
        deliverables: [
          "Complete Store Setup",
          "Admin Training",
          "SEO Report",
          "Analytics Dashboard",
          "Documentation",
          "Ongoing Support"
        ],
        timeline: "3-5 weeks",
        process: [
          "Requirements analysis and platform selection",
          "Store setup and configuration",
          "Design and customization",
          "Testing and optimization"
        ],
        benefits: [
          "Increased online sales",
          "Better user experience",
          "Improved search rankings",
          "Mobile optimization",
          "Professional appearance"
        ]
      },
      "canva-designing": {
        title: "Canva Designing",
        category: "Graphic Design",
        description: "Professional Canva-based designs for social media posts, flyers, and marketing visuals. Brand-consistent designs that drive engagement and conversions.",
        longDescription: "Our Canva designing service creates professional, brand-consistent designs for all your marketing needs. We specialize in social media graphics, marketing materials, and visual content that helps your brand stand out and engage your audience.",
        features: [
          "Social Media Templates",
          "Marketing Materials",
          "Brand Kit Setup",
          "Custom Graphics",
          "Animation Effects",
          "Print-ready Designs"
        ],
        deliverables: [
          "Design Templates",
          "Brand Assets",
          "Usage Guidelines",
          "Source Files",
          "Style Guide",
          "Training Materials"
        ],
        timeline: "3-7 days",
        process: [
          "Brand analysis and requirements",
          "Template creation and design",
          "Review and refinement",
          "Final delivery and training"
        ],
        benefits: [
          "Professional designs",
          "Brand consistency",
          "Time savings",
          "Cost-effective solution",
          "Easy to use templates"
        ]
      },
      "typing-formatting": {
        title: "Typing & Formatting",
        category: "Document Services",
        description: "Professional document typing and formatting services for business reports, academic papers, and corporate documentation with precise attention to detail.",
        longDescription: "Our typing and formatting service ensures your documents are professionally formatted and error-free. We handle everything from basic typing to complex document formatting, ensuring your documents meet professional standards.",
        features: [
          "Professional Formatting",
          "Multiple File Formats",
          "Fast Turnaround",
          "Quality Assurance",
          "Revision Support",
          "Confidentiality Guaranteed"
        ],
        deliverables: [
          "Formatted Documents",
          "Source Files",
          "Style Guide",
          "Quality Report",
          "Revision History",
          "Documentation"
        ],
        timeline: "1-3 days",
        process: [
          "Document analysis and planning",
          "Typing and formatting process",
          "Quality review and editing",
          "Final delivery and documentation"
        ],
        benefits: [
          "Professional appearance",
          "Error-free documents",
          "Time savings",
          "Consistent formatting",
          "High quality output"
        ]
      },
      "transcription-services": {
        title: "Transcription Services",
        category: "Content Conversion",
        description: "Accurate audio and video to text transcription with 98%+ accuracy. Professional transcription for meetings, interviews, podcasts, and multimedia content.",
        longDescription: "Our transcription service converts your audio and video content into accurate, well-formatted text. We handle various audio formats and provide high-quality transcriptions for meetings, interviews, podcasts, and other multimedia content.",
        features: [
          "High Accuracy Rate (98%+)",
          "Multiple Audio Formats",
          "Time Stamping",
          "Speaker Identification",
          "Fast Delivery",
          "Confidential Processing"
        ],
        deliverables: [
          "Transcribed Text",
          "Time-stamped Version",
          "Summary Document",
          "Audio Markers",
          "Speaker Notes",
          "Quality Report"
        ],
        timeline: "1-2 days",
        process: [
          "Audio analysis and preparation",
          "Transcription process",
          "Quality review and editing",
          "Final delivery and formatting"
        ],
        benefits: [
          "High accuracy",
          "Fast turnaround",
          "Professional formatting",
          "Easy to read",
          "Searchable content"
        ]
      },
      "ai-content-creation": {
        title: "AI Content Creation",
        category: "Content Strategy",
        description: "Smart content ideas and AI-powered writing for blogs, social media, and marketing materials. Leverage cutting-edge AI for consistent, engaging content.",
        longDescription: "Our AI content creation service uses advanced AI tools to generate high-quality, engaging content for your business. We create content strategies, develop AI prompts, and produce consistent content that resonates with your audience.",
        features: [
          "Content Strategy Development",
          "AI-Powered Writing",
          "SEO Optimization",
          "Multi-platform Content",
          "Brand Voice Training",
          "Content Calendar"
        ],
        deliverables: [
          "Content Library",
          "Publishing Schedule",
          "Brand Guidelines",
          "Performance Metrics",
          "AI Prompts",
          "Training Materials"
        ],
        timeline: "1-2 weeks",
        process: [
          "Content strategy development",
          "AI prompt creation and testing",
          "Content generation and editing",
          "Review and optimization"
        ],
        benefits: [
          "Consistent content quality",
          "Time and cost savings",
          "SEO optimization",
          "Brand consistency",
          "Scalable content production"
        ]
      },
      "seo-content-writing": {
        title: "SEO Content Writing",
        category: "Digital Marketing",
        description: "SEO-optimized blogs and articles designed to improve search rankings and drive organic traffic. Expert content that balances readability with search optimization.",
        longDescription: "Our SEO content writing service creates high-quality, search-optimized content that helps your website rank higher in search results. We combine expert writing with proven SEO techniques to drive organic traffic and engagement.",
        features: [
          "Keyword Research",
          "SEO Optimization",
          "Engaging Writing",
          "Meta Descriptions",
          "Internal Linking",
          "Performance Tracking"
        ],
        deliverables: [
          "SEO Articles",
          "Keyword Report",
          "Meta Data",
          "Performance Analytics",
          "Content Strategy",
          "Optimization Recommendations"
        ],
        timeline: "1-2 weeks",
        process: [
          "Keyword research and analysis",
          "Content planning and outline",
          "Writing and optimization",
          "Review and finalization"
        ],
        benefits: [
          "Improved search rankings",
          "Increased organic traffic",
          "Better user engagement",
          "Professional content",
          "Long-term SEO benefits"
        ]
      },
      "research-assistance": {
        title: "Research Assistance",
        category: "Academic & Business",
        description: "Comprehensive academic and business research services with thorough analysis, credible sources, and detailed documentation for informed decision-making.",
        longDescription: "Our research assistance service provides comprehensive research support for academic and business projects. We conduct thorough research, analyze data, and provide detailed reports with credible sources and actionable insights.",
        features: [
          "Primary Research",
          "Secondary Analysis",
          "Source Verification",
          "Data Analysis",
          "Report Writing",
          "Citation Management"
        ],
        deliverables: [
          "Research Report",
          "Source Bibliography",
          "Data Analysis",
          "Executive Summary",
          "Recommendations",
          "Supporting Materials"
        ],
        timeline: "1-3 weeks",
        process: [
          "Research planning and scope definition",
          "Data collection and analysis",
          "Report writing and documentation",
          "Review and finalization"
        ],
        benefits: [
          "Thorough research",
          "Credible sources",
          "Professional reports",
          "Time savings",
          "Informed decision making"
        ]
      },
      "proofreading-editing": {
        title: "Proofreading & Editing",
        category: "Quality Assurance",
        description: "Professional proofreading and editing services ensuring polished, error-free content that maintains your professional reputation and clarity of message.",
        longDescription: "Our proofreading and editing service ensures your content is polished, error-free, and professionally written. We check for grammar, spelling, style, and clarity to maintain your professional reputation and ensure clear communication.",
        features: [
          "Grammar & Spelling Check",
          "Style Consistency",
          "Clarity Enhancement",
          "Fact Checking",
          "Formatting Review",
          "Multiple Revisions"
        ],
        deliverables: [
          "Edited Document",
          "Track Changes File",
          "Style Report",
          "Quality Checklist",
          "Revision History",
          "Recommendations"
        ],
        timeline: "1-3 days",
        process: [
          "Document analysis and review",
          "Editing and proofreading",
          "Quality check and verification",
          "Final delivery and documentation"
        ],
        benefits: [
          "Error-free content",
          "Professional quality",
          "Improved clarity",
          "Consistent style",
          "Enhanced credibility"
        ]
      }
    };
    
    return services[name as keyof typeof services] || services["ugc-ad-campaigns"];
  };

  const service = getServiceDetails(serviceName || "");

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
              Back
            </Button>
            <Badge variant="secondary" className="text-sm">
              {service.category}
            </Badge>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <Card className="p-8 shadow-card border-0">
                <h2 className="text-2xl font-bold text-foreground mb-4">Service Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {service.longDescription}
                </p>
              </Card>

              {/* Features */}
              <Card className="p-8 shadow-card border-0">
                <h2 className="text-2xl font-bold text-foreground mb-6">What's Included</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Process */}
              <Card className="p-8 shadow-card border-0">
                <h2 className="text-2xl font-bold text-foreground mb-6">Our Process</h2>
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-foreground font-medium">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Benefits */}
              <Card className="p-8 shadow-card border-0">
                <h2 className="text-2xl font-bold text-foreground mb-6">Key Benefits</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Timeline */}
              <Card className="p-6 shadow-card border-0">
                <h3 className="text-xl font-bold text-foreground mb-4">Timeline</h3>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{service.timeline}</span>
                </div>
              </Card>

              {/* Deliverables */}
              <Card className="p-6 shadow-card border-0">
                <h3 className="text-xl font-bold text-foreground mb-4">Deliverables</h3>
                <div className="space-y-2">
                  {service.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* CTA */}
              <Card className="p-6 shadow-card border-0 bg-gradient-hero">
                <h3 className="text-xl font-bold text-foreground mb-4">Ready to Get Started?</h3>
                <p className="text-muted-foreground mb-4">
                  Let's discuss your project requirements and create a custom solution for you.
                </p>
                <div>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                    Schedule Consultation
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

export default ServiceDetail;
