import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  ArrowLeft, CheckCircle, DollarSign, MapPin, 
  User, Mail, Phone, FileText, Upload, CreditCard,
  ArrowRight, Package, FileCheck, Star, AlertCircle
} from "lucide-react";
import { trackRequestServiceClick } from "@/lib/analytics";

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // All services with detailed information (Fiverr-style)
  const allServices = [
    {
      slug: "seo-content-writing",
      title: "SEO Content Writing",
      category: "Content & Marketing",
      description: "We provide high-quality, SEO-optimized content that helps websites rank better on search engines. Our content is well-researched, plagiarism-free, and tailored to your target audience.",
      whatYoullGet: [
        "Well-researched SEO-optimized content",
        "Keyword-optimized articles/blogs",
        "Meta descriptions and titles",
        "Plagiarism-free guarantee",
        "Unlimited revisions (within scope)",
        "Fast delivery"
      ],
      workScope: [
        "Blog posts (500-2000+ words)",
        "Website page content",
        "Article writing",
        "Keyword research included",
        "SEO optimization",
        "Content formatting"
        ],
        deliverables: [
        "Completed content in Word/Google Docs",
        "Keyword research report",
        "SEO meta tags",
        "Content outline/structure",
        "Revision support"
      ],
      pricingRange: { min: 10, max: 60 },
      pricingDetails: "$10 – $20 per 500 words | $30 – $60 per 1,000 words",
      requirements: "Topic, target keywords (optional), word count, tone of voice, any specific requirements"
    },
    {
      slug: "data-entry",
      title: "Data Entry",
        category: "Data Management",
      description: "Accurate and fast data entry services for businesses and individuals. We ensure confidentiality, precision, and timely delivery.",
      whatYoullGet: [
        "Accurate data entry (99.9% accuracy)",
        "Formatted spreadsheets/databases",
        "Data validation and cleanup",
        "Confidential handling",
        "Multiple format support",
        "Error-free delivery",
        "Quality assurance check",
        "Organized data structure"
      ],
      workScope: [
        "Excel/Google Sheets data entry",
        "CRM data entry",
        "Copy-paste tasks",
        "PDF to Excel/Word conversion",
        "Database management",
        "Bulk data processing",
        "Data verification",
        "Format standardization"
        ],
        deliverables: [
        "Formatted Excel/CSV files",
        "Organized database",
        "Data validation report",
        "Original file backup",
        "Revision support",
        "Data accuracy report"
      ],
      pricingRange: { min: 30, max: 100 },
      pricingDetails: "$30+ per hour | $15 – $30 per project (basic) - Hourly rate includes: data entry, formatting, validation, and quality check. For bulk projects, pricing is project-based.",
      requirements: "Source files/documents, target format, data structure requirements, deadline, expected volume"
    },
    {
      slug: "research-assistance",
      title: "Research Assistance",
      category: "Research & Analysis",
      description: "We provide reliable research support with authentic sources, helping clients save time and make informed decisions.",
      whatYoullGet: [
        "Comprehensive research report",
        "Credible source citations",
        "Data analysis and summary",
        "Research findings presentation",
        "Source verification",
        "Formatted bibliography",
        "In-depth analysis",
        "Verified information"
      ],
      workScope: [
        "Academic research",
        "Market research",
        "Online research",
        "Data collection",
        "Information gathering",
        "Source compilation",
        "Data analysis",
        "Report writing"
        ],
        deliverables: [
        "Research report/document",
        "Source list with links",
        "Data summary/analysis",
        "Findings presentation",
        "Bibliography/references",
        "Research methodology",
        "Key insights summary"
      ],
      pricingRange: { min: 30, max: 150 },
      pricingDetails: "$30+ per hour | $10 – $20 per task - Hourly rate includes: comprehensive research, source verification, data analysis, and formatted report. For specific tasks, pricing is task-based.",
      requirements: "Research topic, scope, preferred sources, report format, deadline, research depth required"
    },
    {
      slug: "proofreading-editing",
      title: "Proofreading & Editing",
      category: "Quality Assurance",
      description: "We improve clarity, grammar, and structure while maintaining your original tone and meaning.",
      whatYoullGet: [
        "Grammar and spelling correction",
        "Sentence structure improvement",
        "Style consistency",
        "Clarity enhancement",
        "Error-free document",
        "Track changes file",
        "Comprehensive editing",
        "Professional polish"
      ],
      workScope: [
        "Grammar correction",
        "Spelling check",
        "Sentence improvement",
        "Academic & business editing",
        "Style guide adherence",
        "Formatting review",
        "Punctuation fixes",
        "Word choice optimization"
        ],
        deliverables: [
        "Edited document",
        "Track changes version",
        "Style/error report",
        "Original file backup",
        "Revision support",
        "Editing summary",
        "Before/after comparison"
      ],
      pricingRange: { min: 20, max: 100 },
      pricingDetails: "$20+ per 1,000 words | $15 – $25 for detailed editing - Price includes: grammar check, spelling correction, sentence improvement, style consistency, and track changes. Detailed editing includes structural improvements.",
      requirements: "Document to edit, word count, style preference (APA/MLA/etc.), deadline, editing depth required"
    },
    {
      slug: "canva-designing",
        title: "Canva Designing",
        category: "Graphic Design",
      description: "Eye-catching and professional designs created using Canva for digital and print use.",
      whatYoullGet: [
        "Professional Canva designs",
        "High-resolution files",
        "Multiple format delivery",
        "Brand-consistent designs",
        "Unlimited revisions (within scope)",
        "Source file included",
        "Custom graphics",
        "Professional layouts"
      ],
      workScope: [
        "Social media posts",
        "Presentations slides",
        "Flyers & posters",
        "CVs & resumes",
        "Marketing materials",
        "Logo designs",
        "Banner designs",
        "Infographics"
        ],
        deliverables: [
        "Design files (PNG/JPG/PDF)",
        "Canva source file",
        "Multiple sizes/formats",
        "Brand guidelines (if needed)",
        "Revision support",
        "Design variations",
        "Print-ready files"
      ],
      pricingRange: { min: 15, max: 100 },
      pricingDetails: "$15+ per design | $25 – $50 for bulk designs - Price includes: professional design, high-resolution files, source file, unlimited revisions (within scope), and multiple format delivery. Bulk orders get discounted rates.",
      requirements: "Design type, content/text, images/brand assets, color preferences, dimensions, deadline, number of designs needed"
    },
    {
      slug: "typing-formatting",
        title: "Typing & Formatting",
        category: "Document Services",
      description: "Clean, professional typing and formatting according to academic or business standards.",
      whatYoullGet: [
        "Accurately typed documents",
        "Professional formatting",
        "Multiple format options",
        "Error-free output",
        "Format consistency",
        "Quick turnaround",
        "Proper structure",
        "Clean layout"
      ],
      workScope: [
        "PDF to Word conversion",
        "Handwritten to digital",
        "Document formatting",
        "Reports & assignments",
        "Template creation",
        "Format standardization",
        "Page layout",
        "Typography adjustment"
        ],
        deliverables: [
        "Formatted Word/DOCX file",
        "Original file backup",
        "Format style guide",
        "Revision support",
        "Formatted PDF version",
        "Formatting checklist"
      ],
      pricingRange: { min: 20, max: 100 },
      pricingDetails: "$20+ per document (up to 12 pages) | $10 – $20 for complex formatting - Price includes: accurate typing, professional formatting, proper structure, error-free output, and format consistency. For documents over 12 pages, additional charges apply.",
      requirements: "Source document, target format, formatting style, page count, deadline, specific formatting requirements"
    },
    {
      slug: "assignment-writing",
      title: "Assignment Writing",
      category: "Academic Services",
      description: "Custom-written assignments with proper structure, references, and plagiarism-free content.",
      whatYoullGet: [
        "Plagiarism-free assignment",
        "Proper academic structure",
        "Research-backed content",
        "Citations and references",
        "Format adherence",
        "Quality assurance"
      ],
      workScope: [
        "Essays (500-5000+ words)",
        "Case studies",
        "Reports",
        "Coursework",
        "Research papers",
        "Academic papers"
        ],
        deliverables: [
        "Completed assignment",
        "Reference list/bibliography",
        "Outline/structure",
        "Citation format (APA/MLA/Harvard)",
        "Revision support"
      ],
      pricingRange: { min: 10, max: 80 },
      pricingDetails: "$10 – $20 per 500 words | $40 – $80 for full assignments",
      requirements: "Assignment topic, word count, academic level, citation style, deadline, instructions"
    },
    {
      slug: "literature-review",
      title: "Literature Review",
      category: "Academic Research",
      description: "In-depth literature reviews using credible academic sources, written in a clear and structured manner.",
      whatYoullGet: [
        "Comprehensive literature review",
        "Academic source citations",
        "Critical analysis",
        "Proper referencing",
        "Structured format",
        "Research quality"
      ],
      workScope: [
        "Systematic reviews (1500-5000+ words)",
        "Thematic reviews",
        "APA / Harvard referencing",
        "Source synthesis",
        "Critical evaluation",
        "Research compilation"
        ],
        deliverables: [
        "Literature review document",
        "Source bibliography",
        "Citation list",
        "Research summary",
        "Revision support"
      ],
      pricingRange: { min: 30, max: 150 },
      pricingDetails: "$30 – $60 (1,500–2,000 words) | $80 – $150 for advanced research",
      requirements: "Research topic, word count, citation style, scope, sources preference, deadline"
    },
    {
      slug: "presentation-ppt-design",
      title: "Presentation (PPT) Design",
      category: "Design & Visual",
      description: "Professionally designed PowerPoint or Google Slides presentations that are visually appealing and easy to understand.",
      whatYoullGet: [
        "Professional slide design",
        "Clean and engaging layouts",
        "Visual elements (charts, icons, graphics)",
        "Brand consistency",
        "Multiple format delivery",
        "Source file included",
        "Custom graphics",
        "Professional animations"
      ],
      workScope: [
        "Academic presentations (10-50+ slides)",
        "Business & pitch decks",
        "Charts, icons & visuals",
        "Clean layouts",
        "Animation (if needed)",
        "Template creation",
        "Slide transitions",
        "Data visualization"
        ],
        deliverables: [
        "PowerPoint/Google Slides file",
        "PDF version",
        "Source file with editable elements",
        "Design template",
        "Revision support",
        "Multiple format options",
        "Design guide"
      ],
      pricingRange: { min: 20, max: 200 },
      pricingDetails: "$20+ per presentation | $25 – $50 for bulk designs - Price includes: professional slide design, custom graphics, clean layouts, visual elements, source file, and unlimited revisions (within scope). Price varies based on number of slides.",
      requirements: "Number of slides, content/text, design style, brand colors, charts/data, deadline, animation requirements"
    },
    {
      slug: "resume-cover-letter-writing",
      title: "Resume & Cover Letter Writing",
      category: "Career Services",
      description: "ATS-friendly resumes and persuasive cover letters that help clients stand out in job applications.",
      whatYoullGet: [
        "ATS-optimized resume",
        "Professional formatting",
        "Keyword optimization",
        "Job-specific customization",
        "Multiple format options",
        "Cover letter included"
      ],
      workScope: [
        "Modern CV design (1-3 pages)",
        "Cover letter writing",
        "Keyword optimization",
        "Job-specific tailoring",
        "LinkedIn profile optimization (optional)",
        "Format customization"
        ],
        deliverables: [
        "Resume (Word/PDF)",
        "Cover letter",
        "ATS-friendly version",
        "Design template",
        "Revision support"
      ],
      pricingRange: { min: 15, max: 30 },
      pricingDetails: "$15 – $30 per resume | $10 – $20 per cover letter",
      requirements: "Job description, work experience, skills, education, target industry, deadline"
    },
    {
      slug: "academic-formatting",
      title: "Academic Formatting (APA / MLA / Harvard)",
      category: "Academic Services",
      description: "We format documents according to international academic standards with proper citations and references.",
      whatYoullGet: [
        "Proper citation formatting",
        "Reference list formatting",
        "Document structure",
        "Style guide adherence",
        "Margins and headings",
        "Format consistency"
      ],
      workScope: [
        "APA/MLA/Harvard formatting",
        "In-text citations",
        "Reference lists",
        "Proper margins & headings",
        "Table of contents",
        "Page numbering"
        ],
        deliverables: [
        "Formatted document",
        "Citation guide",
        "Reference list",
        "Original file backup",
        "Revision support"
        ],
      pricingRange: { min: 5, max: 25 },
      pricingDetails: "$5 – $10 per document | $15 – $25 for complex formatting",
      requirements: "Document to format, citation style (APA/MLA/Harvard), page count, deadline"
    },
    {
      slug: "virtual-assistance",
      title: "Virtual Assistance (Small Tasks)",
      category: "Business Support",
      description: "Reliable virtual assistance for small business and professional daily tasks.",
      whatYoullGet: [
        "Task completion",
        "Professional service",
        "Timely delivery",
        "Regular updates",
        "Confidential handling",
        "Quality work",
        "Efficient support",
        "Organized results"
      ],
      workScope: [
        "Email handling",
        "Data management",
        "Online research",
        "Admin support",
        "Document organization",
        "Small business tasks",
        "Schedule management",
        "Customer service support"
      ],
      deliverables: [
        "Completed tasks",
        "Work report",
        "Organized files/data",
        "Summary of work done",
        "Task documentation",
        "Follow-up support"
      ],
      pricingRange: { min: 10, max: 50 },
      pricingDetails: "$10+ per hour | $15 – $30 per project - Hourly rate includes: task completion, regular updates, professional service, and organized deliverables. For specific projects, pricing is project-based.",
      requirements: "Task description, scope, deadline, access/permissions needed, expected hours, priority level"
    }
  ];

  // Find current service
  const currentService = allServices.find(s => s.slug === serviceName) || allServices[0];


  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requirements: "",
    deadline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission
    trackRequestServiceClick('service_detail_form_submit', currentService.title);

    setIsSubmitting(true);

    try {
      // Prepare form data for FormSubmit.co
      const submitData = new FormData();
      submitData.append("Service Name", currentService.title);
      submitData.append("Category", currentService.category);
      submitData.append("Client Name", formData.name);
      submitData.append("Email", formData.email);
      submitData.append("Phone", formData.phone);
      submitData.append("Requirements", formData.requirements);
      submitData.append("Deadline", formData.deadline || "Not specified");
      submitData.append("Submitted At", new Date().toLocaleString());
      submitData.append("_subject", `Service Request: ${currentService.title} - ${formData.name}`);
      submitData.append("_template", "table");

      const response = await fetch("https://formsubmit.co/ajax/abubakararif159@gmail.com", {
        method: "POST",
        body: submitData
      });

      if (response.ok) {
        toast({
          title: "Request Submitted Successfully!",
          description: "We've received your request! Our team will contact you soon to discuss your project details and pricing.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          requirements: "",
          deadline: ""
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-hero py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/services')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Badge variant="secondary" className="text-sm">
              {currentService.category}
            </Badge>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            {currentService.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {currentService.description}
          </p>
        </div>
      </section>

      {/* Service Details Section (Fiverr-style) */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Get */}
              <Card className="p-8 shadow-card border-0">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Package className="w-6 h-6 text-primary" />
                  What You'll Get
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentService.whatYoullGet.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Work Scope */}
              <Card className="p-8 shadow-card border-0">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  Work Scope
                </h2>
                <p className="text-muted-foreground mb-4">
                  Here's what we'll work on for your project:
                </p>
                <ul className="space-y-3">
                  {currentService.workScope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Deliverables */}
              <Card className="p-8 shadow-card border-0">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <FileCheck className="w-6 h-6 text-primary" />
                  Deliverables
                </h2>
                <p className="text-muted-foreground mb-4">
                  You'll receive the following when the work is complete:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {currentService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Requirements */}
              <Card className="p-8 shadow-card border-0 bg-blue-50 border-blue-200">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  What I Need From You
                </h2>
                <p className="text-muted-foreground">
                  {currentService.requirements}
                </p>
              </Card>
                      </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <Card className="p-6 shadow-card border-0 sticky top-24">
                <div className="space-y-6">
                      <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Pricing</h3>
                    <p className="text-base text-muted-foreground mt-2 italic">
                      We'll discuss pricing after understanding your specific requirements and project scope. Contact us to get a customized quote.
                    </p>
                      </div>


                  <Button
                    onClick={() => {
                      trackRequestServiceClick('service_detail_sidebar', currentService.title);
                      const formSection = document.getElementById('request-form');
                      formSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-gradient-primary hover:shadow-hover"
                    size="lg"
                  >
                    Request This Service
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Request Form */}
      <section id="request-form" className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="p-8 shadow-card border-0">
            <h2 className="text-3xl font-bold text-foreground mb-6">Request This Service</h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form below with your requirements and deadline. Our team will review your request and contact you soon to discuss pricing and project details.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Your Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+92 300 1234567"
                    />
                  </div>
                </div>
              </div>

              {/* Project Requirements */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Project Requirements
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="requirements">Requirements & Details *</Label>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      required
                      placeholder="Please describe your project requirements, what you need, and any specific details (e.g., word count, pages, format, style, etc.)..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deadline">Your Deadline (Optional)</Label>
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      When do you need this completed? We'll work with you to meet your deadline.
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Message */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> After submitting your request, our team will contact you within 24 hours to discuss pricing and finalize the project details.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-primary hover:shadow-hover"
                size="lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
