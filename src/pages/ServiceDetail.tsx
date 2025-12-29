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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  ArrowLeft, CheckCircle, DollarSign, MapPin, 
  User, Mail, Phone, FileText, Upload, CreditCard,
  ArrowRight, Clock, Package, FileCheck, Star
} from "lucide-react";
import { supabase, STORAGE_CONFIG } from "@/lib/supabase";

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
      timeline: "2-7 days",
      maxDeliveryTime: "7 days",
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
        "Error-free delivery"
      ],
      workScope: [
        "Excel/Google Sheets data entry",
        "CRM data entry",
        "Copy-paste tasks",
        "PDF to Excel/Word conversion",
        "Database management",
        "Bulk data processing"
      ],
      deliverables: [
        "Formatted Excel/CSV files",
        "Organized database",
        "Data validation report",
        "Original file backup",
        "Revision support"
      ],
      timeline: "1-3 days",
      maxDeliveryTime: "3 days",
      pricingRange: { min: 5, max: 30 },
      pricingDetails: "$5 – $10 per hour | $15 – $30 per project (basic)",
      requirements: "Source files/documents, target format, data structure requirements, deadline"
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
        "Formatted bibliography"
      ],
      workScope: [
        "Academic research",
        "Market research",
        "Online research",
        "Data collection",
        "Information gathering",
        "Source compilation"
      ],
      deliverables: [
        "Research report/document",
        "Source list with links",
        "Data summary/analysis",
        "Findings presentation",
        "Bibliography/references"
      ],
      timeline: "2-5 days",
      maxDeliveryTime: "5 days",
      pricingRange: { min: 5, max: 20 },
      pricingDetails: "$10 – $20 per task | $5 – $8 per hour",
      requirements: "Research topic, scope, preferred sources, report format, deadline"
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
        "Track changes file"
      ],
      workScope: [
        "Grammar correction",
        "Spelling check",
        "Sentence improvement",
        "Academic & business editing",
        "Style guide adherence",
        "Formatting review"
      ],
      deliverables: [
        "Edited document",
        "Track changes version",
        "Style/error report",
        "Original file backup",
        "Revision support"
      ],
      timeline: "1-3 days",
      maxDeliveryTime: "3 days",
      pricingRange: { min: 5, max: 25 },
      pricingDetails: "$5 – $10 per 1,000 words | $15 – $25 for detailed editing",
      requirements: "Document to edit, word count, style preference (APA/MLA/etc.), deadline"
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
        "Source file included"
      ],
      workScope: [
        "Social media posts",
        "Presentations slides",
        "Flyers & posters",
        "CVs & resumes",
        "Marketing materials",
        "Logo designs"
      ],
      deliverables: [
        "Design files (PNG/JPG/PDF)",
        "Canva source file",
        "Multiple sizes/formats",
        "Brand guidelines (if needed)",
        "Revision support"
      ],
      timeline: "1-3 days",
      maxDeliveryTime: "3 days",
      pricingRange: { min: 5, max: 50 },
      pricingDetails: "$5 – $10 per design | $25 – $50 for bulk designs",
      requirements: "Design type, content/text, images/brand assets, color preferences, dimensions, deadline"
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
        "Quick turnaround"
      ],
      workScope: [
        "PDF to Word conversion",
        "Handwritten to digital",
        "Document formatting",
        "Reports & assignments",
        "Template creation",
        "Format standardization"
      ],
      deliverables: [
        "Formatted Word/DOCX file",
        "Original file backup",
        "Format style guide",
        "Revision support"
      ],
      timeline: "1-2 days",
      maxDeliveryTime: "2 days",
      pricingRange: { min: 5, max: 20 },
      pricingDetails: "$5 – $8 per document | $10 – $20 for complex formatting",
      requirements: "Source document, target format, formatting style, page count, deadline"
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
      timeline: "3-7 days",
      maxDeliveryTime: "7 days",
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
      timeline: "5-10 days",
      maxDeliveryTime: "10 days",
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
        "Visual elements (charts/icons)",
        "Brand consistency",
        "Multiple format delivery",
        "Source file included"
      ],
      workScope: [
        "Academic presentations (10-50+ slides)",
        "Business & pitch decks",
        "Charts, icons & visuals",
        "Clean layouts",
        "Animation (if needed)",
        "Template creation"
      ],
      deliverables: [
        "PowerPoint/Google Slides file",
        "PDF version",
        "Source file with editable elements",
        "Design template",
        "Revision support"
      ],
      timeline: "2-5 days",
      maxDeliveryTime: "5 days",
      pricingRange: { min: 5, max: 50 },
      pricingDetails: "$5 – $10 per design | $25 – $50 for bulk designs",
      requirements: "Number of slides, content/text, design style, brand colors, charts/data, deadline"
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
      timeline: "2-4 days",
      maxDeliveryTime: "4 days",
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
      timeline: "1-3 days",
      maxDeliveryTime: "3 days",
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
        "Quality work"
      ],
      workScope: [
        "Email handling",
        "Data management",
        "Online research",
        "Admin support",
        "Document organization",
        "Small business tasks"
      ],
      deliverables: [
        "Completed tasks",
        "Work report",
        "Organized files/data",
        "Summary of work done"
      ],
      timeline: "1-3 days",
      maxDeliveryTime: "3 days",
      pricingRange: { min: 5, max: 30 },
      pricingDetails: "$5 – $10 per hour | $15 – $30 per project",
      requirements: "Task description, scope, deadline, access/permissions needed"
    }
  ];

  // Find current service
  const currentService = allServices.find(s => s.slug === serviceName) || allServices[0];

  // Countries
  const countries = [
    { name: "Pakistan", currency: "PKR", flag: "🇵🇰" },
    { name: "United States", currency: "USD", flag: "🇺🇸" },
    { name: "United Kingdom", currency: "USD", flag: "🇬🇧" },
    { name: "Canada", currency: "USD", flag: "🇨🇦" },
    { name: "Australia", currency: "USD", flag: "🇦🇺" },
    { name: "Germany", currency: "USD", flag: "🇩🇪" },
    { name: "UAE", currency: "USD", flag: "🇦🇪" },
    { name: "Saudi Arabia", currency: "USD", flag: "🇸🇦" },
    { name: "India", currency: "USD", flag: "🇮🇳" },
    { name: "Other", currency: "USD", flag: "🌍" }
  ];

  // Payment accounts
  const companyBankAccounts = [
    { bankName: "JazzCash", accountTitle: "Sheikh Muhammad Abubakar", accountNumber: "03278528854" },
    { bankName: "Easypaisa", accountTitle: "Sheikh Muhammad Abubakar", accountNumber: "03278528854" },
    { bankName: "Meezan Bank", accountTitle: "Sheikh Muhammad Abubakar", accountNumber: "04370110432421" }
  ];

  const companyCryptoWallets = [
    { network: "TRC20", coin: "USDT", address: "TUPF6NxuG7NrpixvA7YBexj33u8Y9XYwjp" }
  ];

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    projectDetails: "",
    requirements: "",
    budget: "",
    deadline: ""
  });
  const [selectedCountry, setSelectedCountry] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [projectFiles, setProjectFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPakistan = formData.country === "Pakistan";

  // Calculate 30% payment
  const calculatePayment = () => {
    if (!formData.budget) return 0;
    const budget = parseFloat(formData.budget);
    if (isNaN(budget)) return 0;
    return budget * 0.3;
  };

  const paymentAmount = calculatePayment();

  // File upload helper
  const uploadFileToStorage = async (file: File, folder: string) => {
    const filePath = `${STORAGE_CONFIG.folder}/${folder}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from(STORAGE_CONFIG.bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error(`Error uploading ${folder} file:`, error);
      return null;
    }
    
    const { data: publicUrlData } = supabase.storage
      .from(STORAGE_CONFIG.bucket)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setFormData(prev => ({ ...prev, country }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentScreenshot(e.target.files[0]);
    }
  };

  const handleProjectFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setProjectFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeProjectFile = (index: number) => {
    setProjectFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload payment screenshot
      let screenshotUrl = "Not uploaded";
      if (paymentScreenshot) {
        const url = await uploadFileToStorage(paymentScreenshot, "service-payments");
        screenshotUrl = url || "Upload failed";
      }

      // Upload project files
      let projectFileUrls: string[] = [];
      if (projectFiles.length > 0) {
        const uploadPromises = projectFiles.map(file => 
          uploadFileToStorage(file, "project-files")
        );
        const urls = await Promise.all(uploadPromises);
        projectFileUrls = urls.filter((url): url is string => url !== null);
      }

      // Prepare form data for FormSubmit.co
      const submitData = new FormData();
      submitData.append("Service Name", currentService.title);
      submitData.append("Category", currentService.category);
      submitData.append("Client Name", formData.name);
      submitData.append("Email", formData.email);
      submitData.append("Phone", formData.phone);
      submitData.append("Country", formData.country);
      submitData.append("Project Details", formData.projectDetails);
      submitData.append("Requirements", formData.requirements);
      submitData.append("Budget", `${isPakistan ? 'Rs' : '$'}${formData.budget}`);
      submitData.append("30% Advance Payment", `${isPakistan ? 'Rs' : '$'}${paymentAmount.toFixed(2)}`);
      submitData.append("Deadline", formData.deadline);
      
      // Project files
      if (projectFileUrls.length > 0) {
        submitData.append("Project Files", projectFileUrls.join("\n"));
        submitData.append("Number of Files", projectFileUrls.length.toString());
      } else {
        submitData.append("Project Files", "No files uploaded");
      }
      
      submitData.append("Payment Screenshot Link", screenshotUrl);
      submitData.append("Submitted At", new Date().toLocaleString());
      submitData.append("_subject", `Service Request: ${currentService.title} - ${formData.name}`);
      submitData.append("_template", "table");

      const response = await fetch("https://formsubmit.co/ajax/abubakararif164@gmail.com", {
        method: "POST",
        body: submitData
      });

      if (response.ok) {
        toast({
          title: "Request Submitted Successfully!",
          description: "We'll review your requirements and contact you soon.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          country: "",
          projectDetails: "",
          requirements: "",
          budget: "",
          deadline: ""
        });
        setSelectedCountry("");
        setPaymentScreenshot(null);
        setProjectFiles([]);
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
                    <p className="text-2xl font-bold text-primary">
                      {isPakistan ? 'Rs' : '$'}{currentService.pricingRange.min} - {isPakistan ? 'Rs' : '$'}{currentService.pricingRange.max}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {currentService.pricingDetails}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-semibold text-foreground">Delivery Time</div>
                        <div className="text-sm text-muted-foreground">{currentService.timeline}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-3 mb-4">
                      <FileCheck className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-semibold text-foreground">Max Delivery</div>
                        <div className="text-sm text-muted-foreground">{currentService.maxDeliveryTime}</div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
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
              Fill out the form below with your project requirements. We'll review and get back to you within 24 hours.
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
                  <div>
                    <Label className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Country *</Label>
                    <Select onValueChange={handleCountryChange} value={formData.country}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((c) => (
                          <SelectItem key={c.name} value={c.name}>
                            <span className="text-lg mr-2">{c.flag}</span> {c.name} ({c.currency})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="projectDetails">Project Description *</Label>
                    <Textarea
                      id="projectDetails"
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us about your project..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="requirements">Specific Requirements *</Label>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      required
                      placeholder="What specific requirements do you have? (e.g., word count, pages, format, style)..."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  {/* Project Files Upload */}
                  <div>
                    <Label htmlFor="projectFiles">
                      <Upload className="w-4 h-4 inline mr-2" />
                      Upload Project Files (Optional)
                    </Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Upload any documents, images, or reference files related to your project
                    </p>
                    <Input
                      id="projectFiles"
                      type="file"
                      multiple
                      onChange={handleProjectFilesChange}
                      className="cursor-pointer"
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar"
                    />
                    {projectFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium text-foreground">Selected Files:</p>
                        {projectFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="text-sm text-muted-foreground truncate" title={file.name}>
                                {file.name}
                              </span>
                              <span className="text-xs text-muted-foreground flex-shrink-0">
                                ({(file.size / 1024).toFixed(2)} KB)
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProjectFile(index)}
                              className="ml-2 h-8 w-8 p-0"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">
                        Estimated Budget ({isPakistan ? 'PKR' : 'USD'}) *
                      </Label>
                      <Input
                        id="budget"
                        name="budget"
                        type="number"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter amount"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              {formData.budget && (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment (30% Advance)
                  </h3>
                  <Card className="p-6 bg-green-50 border-green-200">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Budget:</span>
                        <span className="font-bold text-foreground">
                          {isPakistan ? 'Rs' : '$'}{parseFloat(formData.budget || '0').toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-4">
                        <span className="text-lg font-semibold text-foreground">30% Advance Payment:</span>
                        <span className="text-2xl font-bold text-green-600">
                          {isPakistan ? 'Rs' : '$'}{paymentAmount.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Please send the advance payment and upload the screenshot below.
                      </p>
                    </div>
                  </Card>

                  {/* Payment Methods */}
                  <div className="mt-6 space-y-4">
                    {isPakistan ? (
                      <div>
                        <Label className="mb-3 block">Payment Methods (Pakistan):</Label>
                        <div className="space-y-3">
                          {companyBankAccounts.map((account, idx) => (
                            <Card key={idx} className="p-4">
                              <div className="font-semibold">{account.bankName}</div>
                              <div className="text-sm text-muted-foreground">Account: {account.accountNumber}</div>
                              <div className="text-sm text-muted-foreground">Name: {account.accountTitle}</div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Label className="mb-3 block">Payment Methods (International - Crypto):</Label>
                        <div className="space-y-3">
                          {companyCryptoWallets.map((wallet, idx) => (
                            <Card key={idx} className="p-4">
                              <div className="font-semibold">{wallet.network} {wallet.coin}</div>
                              <div className="text-sm text-muted-foreground break-all">{wallet.address}</div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Screenshot Upload */}
                  <div className="mt-6">
                    <Label htmlFor="paymentScreenshot">Payment Screenshot *</Label>
                    <div className="mt-2">
                      <Input
                        id="paymentScreenshot"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="cursor-pointer"
                      />
                      {paymentScreenshot && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Selected: {paymentScreenshot.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

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
