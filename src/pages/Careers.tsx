import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase, STORAGE_CONFIG } from "@/lib/supabase";
import { 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Upload,
  CheckCircle,
  Star,
  Users,
  Award,
  Clock,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  CreditCard,
  Building2,
  FileUp,
  X,
  Copy,
  ImageIcon,
  AlertCircle,
  FolderOpen
} from "lucide-react";

const Careers = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);
  const paymentScreenshotRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    skills: "",
    aboutYou: "",
    jobCategory: "",
    salaryPackage: "",
    transactionId: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Job Categories with detailed descriptions
  const jobCategories = [
    { 
      id: 1, 
      name: "SEO Content Writing", 
      icon: "✍️", 
      shortDesc: "Writing blogs, articles, and website content.",
      fullDescription: "Create high-quality, SEO-optimized content for websites, blogs, and online platforms. You'll write engaging articles that rank well on search engines while providing value to readers.",
      requirements: ["Good English writing skills", "Basic SEO knowledge", "Research abilities"],
      tasks: ["Write blog posts", "Create website content", "Optimize for keywords"]
    },
    { 
      id: 2, 
      name: "Data Entry", 
      icon: "📊", 
      shortDesc: "Entering data in Excel, Sheets, or systems.",
      fullDescription: "Accurately input and manage data in spreadsheets, databases, and various online systems. Attention to detail is key for this role.",
      requirements: ["Fast typing speed", "Attention to detail", "Excel/Sheets knowledge"],
      tasks: ["Enter data accurately", "Maintain spreadsheets", "Update databases"]
    },
    { 
      id: 3, 
      name: "Research Assistance", 
      icon: "🔍", 
      shortDesc: "Finding information and authentic sources online.",
      fullDescription: "Conduct thorough online research to find accurate information, statistics, and credible sources for various projects and topics.",
      requirements: ["Strong research skills", "Critical thinking", "Source verification ability"],
      tasks: ["Find reliable sources", "Compile research data", "Verify information accuracy"]
    },
    { 
      id: 4, 
      name: "Proofreading", 
      icon: "✅", 
      shortDesc: "Checking grammar, spelling, and sentence clarity.",
      fullDescription: "Review and correct written content for grammar, spelling, punctuation, and overall clarity. Ensure documents are error-free and professionally polished.",
      requirements: ["Excellent grammar knowledge", "Attention to detail", "Strong language skills"],
      tasks: ["Check spelling errors", "Fix grammar mistakes", "Improve sentence clarity"]
    },
    { 
      id: 5, 
      name: "Canva Designing", 
      icon: "🎨", 
      shortDesc: "Creating posts, flyers, CVs, and presentations.",
      fullDescription: "Design visually appealing graphics using Canva for social media posts, marketing flyers, professional CVs, and presentation slides.",
      requirements: ["Canva proficiency", "Creative eye", "Basic design principles"],
      tasks: ["Create social media posts", "Design flyers & banners", "Make professional CVs"]
    },
    { 
      id: 6, 
      name: "Typing & Formatting", 
      icon: "⌨️", 
      shortDesc: "Typing documents and formatting professionally.",
      fullDescription: "Type handwritten or audio content into digital documents and format them professionally according to specified standards and requirements.",
      requirements: ["Fast & accurate typing", "MS Word proficiency", "Formatting skills"],
      tasks: ["Type documents accurately", "Format professionally", "Convert handwritten text"]
    },
    { 
      id: 7, 
      name: "Assignment Writing", 
      icon: "📚", 
      shortDesc: "Writing essays, reports, and coursework.",
      fullDescription: "Write academic assignments including essays, reports, case studies, and coursework following proper academic standards and guidelines.",
      requirements: ["Academic writing skills", "Research abilities", "Citation knowledge"],
      tasks: ["Write essays & reports", "Follow guidelines", "Meet deadlines"]
    },
    { 
      id: 8, 
      name: "Literature Review", 
      icon: "📖", 
      shortDesc: "Summarizing and analyzing research papers.",
      fullDescription: "Read, analyze, and summarize academic research papers and scholarly articles. Create comprehensive literature reviews for academic projects.",
      requirements: ["Academic reading skills", "Analytical thinking", "Summary writing"],
      tasks: ["Analyze research papers", "Write summaries", "Identify key findings"]
    },
    { 
      id: 9, 
      name: "Presentation Design", 
      icon: "📽️", 
      shortDesc: "Making PowerPoint or Google Slides.",
      fullDescription: "Create professional and visually engaging presentations using PowerPoint or Google Slides for business, academic, or personal use.",
      requirements: ["PowerPoint/Slides skills", "Visual design sense", "Content organization"],
      tasks: ["Design slide layouts", "Add visuals & graphics", "Organize content flow"]
    },
    { 
      id: 10, 
      name: "Resume & Cover Letter", 
      icon: "🧾", 
      shortDesc: "Creating job-ready CVs and cover letters.",
      fullDescription: "Craft professional resumes and compelling cover letters that help job seekers stand out and land interviews.",
      requirements: ["Resume writing expertise", "Industry knowledge", "Professional formatting"],
      tasks: ["Write tailored CVs", "Create cover letters", "Optimize for ATS"]
    },
    { 
      id: 11, 
      name: "Academic Formatting", 
      icon: "📐", 
      shortDesc: "Formatting work in APA, MLA, or Harvard style.",
      fullDescription: "Format academic documents according to specific citation styles like APA, MLA, Harvard, or Chicago. Ensure proper referencing and document structure.",
      requirements: ["Citation style knowledge", "Attention to detail", "Academic standards"],
      tasks: ["Apply formatting styles", "Create citations", "Structure documents properly"]
    },
    { 
      id: 12, 
      name: "Virtual Assistance", 
      icon: "🧑‍💻", 
      shortDesc: "Helping businesses with small online tasks.",
      fullDescription: "Provide remote administrative support to businesses including email management, scheduling, data organization, and various online tasks.",
      requirements: ["Organizational skills", "Communication abilities", "Tech-savvy"],
      tasks: ["Manage emails", "Schedule tasks", "Handle admin work"]
    }
  ];

  // Salary Packages - All with website's main green color
  const salaryPackages = [
    {
      id: 1,
      name: "Starter",
      fee: { pkr: 1500, usd: 5 },
      earnings: { 
        pkr: { daily: 500, weekly: 3500, monthly: 12000 },
        usd: { daily: 2, weekly: 14, monthly: 60 }
      }
    },
    {
      id: 2,
      name: "Basic",
      fee: { pkr: 2500, usd: 10 },
      earnings: { 
        pkr: { daily: 800, weekly: 5600, monthly: 20000 },
        usd: { daily: 4, weekly: 28, monthly: 120 }
      }
    },
    {
      id: 3,
      name: "Standard",
      fee: { pkr: 3500, usd: 15 },
      earnings: { 
        pkr: { daily: 1200, weekly: 8400, monthly: 30000 },
        usd: { daily: 6, weekly: 42, monthly: 180 }
      }
    },
    {
      id: 4,
      name: "Professional",
      fee: { pkr: 4000, usd: 22 },
      earnings: { 
        pkr: { daily: 1400, weekly: 9800, monthly: 35000 },
        usd: { daily: 8, weekly: 56, monthly: 240 }
      }
    },
    {
      id: 5,
      name: "Premium",
      fee: { pkr: 5000, usd: 30 },
      earnings: { 
        pkr: { daily: 1700, weekly: 11900, monthly: 42000 },
        usd: { daily: 10, weekly: 70, monthly: 300 }
      }
    }
  ];

  // Company Payment Details
  const companyBankAccounts = [
    { bankName: "JazzCash", accountTitle: "Sheikh Muhammad Abubakar", accountNumber: "03098091819" },
    { bankName: "Easypaisa", accountTitle: "Sheikh Muhammad Abubakar", accountNumber: "03098091819" },
    { bankName: "Meezan Bank", accountTitle: "Sheikh Muhammad Abubakar", accountNumber: "04370110432421" }
  ];

  const companyCryptoWallets = [
    { network: "TRC20", coin: "USDT", address: "TUPF6NxuG7NrpixvA7YBexj33u8Y9XYwjp" }
  ];

  const isPakistan = formData.country === "Pakistan";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setFormData(prev => ({ ...prev, country }));
  };

  const handleJobSelection = (jobId: number) => {
    const job = jobCategories.find(j => j.id === jobId);
    setSelectedJob(job?.name || "");
    setFormData(prev => ({ ...prev, jobCategory: job?.name || "" }));
  };

  const handlePackageSelection = (packageId: number) => {
    const pkg = salaryPackages.find(p => p.id === packageId);
    setSelectedPackage(pkg?.name || "");
    setFormData(prev => ({ ...prev, salaryPackage: pkg?.name || "" }));
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>, 
    setFile: (file: File | null) => void,
    allowedTypes: string[],
    maxSize: number = 5
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        toast({ title: "File Too Large", description: `Max ${maxSize}MB allowed`, variant: "destructive" });
        return;
      }
      if (!allowedTypes.some(type => file.type.includes(type))) {
        toast({ title: "Invalid File Type", variant: "destructive" });
        return;
      }
      setFile(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Copied to clipboard" });
  };

  // Upload file to Supabase Storage
  const uploadFileToStorage = async (file: File, folder: string): Promise<string | null> => {
    try {
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${STORAGE_CONFIG.folder}/${folder}/${timestamp}_${sanitizedName}`;
      
      const { error } = await supabase.storage
        .from(STORAGE_CONFIG.bucket)
        .upload(filePath, file, { upsert: true });
      
      if (error) {
        console.error('Upload error:', error);
        return null;
      }
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from(STORAGE_CONFIG.bucket)
        .getPublicUrl(filePath);
      
      return urlData.publicUrl;
    } catch (err) {
      console.error('Upload failed:', err);
      return null;
    }
  };

  const getSelectedPackage = () => salaryPackages.find(p => p.name === selectedPackage);
  const getSelectedJob = () => jobCategories.find(j => j.name === selectedJob);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    scrollToTop();
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.country || !formData.skills || !formData.aboutYou || !cvFile) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!selectedJob || !selectedPackage) {
      toast({ title: "Please select work category and package", variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!paymentScreenshot) {
      toast({ title: "Please upload payment screenshot", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    
    setIsSubmitting(true);
    
    try {
      const pkg = getSelectedPackage();
      const selectedCurrency = isPakistan ? "PKR" : "USD";
      const joiningFee = isPakistan ? pkg?.fee.pkr : pkg?.fee.usd;
      
      // Upload files to Supabase Storage
      toast({ title: "Uploading files...", description: "Please wait" });
      
      let cvUrl = "Not uploaded";
      let portfolioUrl = "Not uploaded";
      let screenshotUrl = "Not uploaded";
      
      if (cvFile) {
        const url = await uploadFileToStorage(cvFile, "cv");
        cvUrl = url || "Upload failed";
      }
      
      if (portfolioFile) {
        const url = await uploadFileToStorage(portfolioFile, "portfolio");
        portfolioUrl = url || "Upload failed";
      }
      
      if (paymentScreenshot) {
        const url = await uploadFileToStorage(paymentScreenshot, "screenshots");
        screenshotUrl = url || "Upload failed";
      }
      
      // Create FormData for FormSubmit.co
      const submitData = new FormData();
      submitData.append("Full Name", formData.fullName);
      submitData.append("Email", formData.email);
      submitData.append("Phone", formData.phone);
      submitData.append("Country", formData.country);
      submitData.append("Skills", formData.skills);
      submitData.append("About", formData.aboutYou);
      submitData.append("Work Category", selectedJob);
      submitData.append("Package", `${selectedPackage} (${selectedCurrency} ${joiningFee})`);
      submitData.append("Transaction ID", formData.transactionId || "Not provided");
      submitData.append("CV File Link", cvUrl);
      submitData.append("Portfolio Link", portfolioUrl);
      submitData.append("Payment Screenshot Link", screenshotUrl);
      submitData.append("Applied At", new Date().toLocaleString());
      submitData.append("_subject", `New Application: ${formData.fullName} - ${selectedPackage}`);
      submitData.append("_template", "table");
      
      // Send to FormSubmit.co
      const response = await fetch("https://formsubmit.co/ajax/abubakararif164@gmail.com", {
        method: "POST",
        body: submitData
      });
      
      if (response.ok) {
        toast({ title: "🎉 Application Submitted!", description: "We'll contact you within 24 hours." });
        // Reset
        setFormData({ fullName: "", email: "", phone: "", country: "", skills: "", aboutYou: "", jobCategory: "", salaryPackage: "", transactionId: "" });
        goToStep(1);
        setSelectedJob("");
        setSelectedPackage("");
        setSelectedCountry("");
        setCvFile(null);
        setPortfolioFile(null);
        setPaymentScreenshot(null);
      } else {
        toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Header */}
      <section className="bg-gradient-hero pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary">Now Accepting Applications</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Start Your <span className="text-primary">Freelancing Journey</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Work from home, earn daily, and build your career with Smart Assign. 
            Join thousands of successful freelancers today!
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-muted-foreground">No Experience Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-muted-foreground">Daily Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-muted-foreground">Work From Anywhere</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 -mt-4">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  currentStep >= step ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 3 && <div className={`w-16 h-1 mx-2 ${currentStep > step ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          <Card className="p-6 md:p-8 shadow-lg">
            <form onSubmit={handleSubmit}>
              
              {/* STEP 1 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-foreground">Your Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label>Full Name *</Label>
                      <Input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Your full name" className="mt-1" />
                    </div>
                    <div>
                      <Label>Email *</Label>
                      <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" className="mt-1" />
                    </div>
                    <div>
                      <Label>Phone *</Label>
                      <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+92 300 1234567" className="mt-1" />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <Label className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Country *</Label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full mt-1 p-3 border rounded-lg bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    >
                      <option value="">Select your country</option>
                      {countries.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.flag} {c.name} {c.name === "Pakistan" ? "(PKR)" : "(USD)"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Skills */}
                  <div>
                    <Label className="flex items-center gap-2"><Star className="w-4 h-4" /> Skills *</Label>
                    <Textarea name="skills" value={formData.skills} onChange={handleInputChange} placeholder="Your skills (e.g., WordPress, Python, Design...)" className="mt-1" rows={2} />
                  </div>

                  {/* CV Upload */}
                  <div>
                    <Label className="flex items-center gap-2"><FileUp className="w-4 h-4" /> Upload CV *</Label>
                    <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, setCvFile, ['pdf', 'doc', 'word'])} className="hidden" id="cv" />
                    {!cvFile ? (
                      <label htmlFor="cv" className="mt-1 flex items-center justify-center h-20 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50">
                        <span className="text-muted-foreground text-sm">Click to upload (PDF, DOC)</span>
                      </label>
                    ) : (
                      <div className="mt-1 flex items-center justify-between p-3 border rounded-lg bg-primary/5">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          <span className="text-sm">{cvFile.name}</span>
                        </div>
                        <button type="button" onClick={() => setCvFile(null)}><X className="w-4 h-4 text-red-500" /></button>
                      </div>
                    )}
                  </div>

                  {/* About */}
                  <div>
                    <Label className="flex items-center gap-2"><GraduationCap className="w-4 h-4" /> About You *</Label>
                    <Textarea name="aboutYou" value={formData.aboutYou} onChange={handleInputChange} placeholder="Brief introduction about yourself..." className="mt-1" rows={3} />
                  </div>

                  <Button type="button" onClick={() => validateStep1() && goToStep(2)} className="w-full bg-primary">
                    Continue <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-foreground">Select Work & Package</h2>
                  
                  {/* Categories */}
                  <div>
                    <Label className="flex items-center gap-2 mb-3"><Briefcase className="w-4 h-4" /> Work Category *</Label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {jobCategories.map((job) => (
                        <button
                          key={job.id}
                          type="button"
                          onClick={() => handleJobSelection(job.id)}
                          className={`p-3 border rounded-lg text-center transition-all ${
                            selectedJob === job.name ? "border-primary bg-primary/10 shadow" : "border-muted hover:border-primary/50"
                          }`}
                        >
                          <span className="text-2xl">{job.icon}</span>
                          <p className="text-xs mt-1 font-medium">{job.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Category Details */}
                  {selectedJob && getSelectedJob() && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getSelectedJob()?.icon}</span>
                        <h3 className="font-bold text-foreground">{getSelectedJob()?.name}</h3>
                        <Badge variant="outline" className="ml-auto">Selected</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{getSelectedJob()?.fullDescription}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-foreground mb-1">Requirements:</p>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            {getSelectedJob()?.requirements.map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Daily Tasks:</p>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            {getSelectedJob()?.tasks.map((task, i) => (
                              <li key={i}>{task}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Portfolio Upload */}
                      <div className="pt-3 border-t border-blue-200">
                        <Label className="flex items-center gap-2 text-sm"><FolderOpen className="w-4 h-4" /> Upload Portfolio/Proof (Optional)</Label>
                        <p className="text-xs text-muted-foreground mb-2">If you have previous work samples, upload them here</p>
                        <input ref={portfolioInputRef} type="file" accept="image/*,.pdf" onChange={(e) => handleFileUpload(e, setPortfolioFile, ['image', 'pdf'])} className="hidden" id="portfolio" />
                        {!portfolioFile ? (
                          <label htmlFor="portfolio" className="flex items-center justify-center h-16 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-400 bg-white">
                            <span className="text-muted-foreground text-sm">Click to upload samples</span>
                          </label>
                        ) : (
                          <div className="flex items-center justify-between p-2 border rounded-lg bg-white">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{portfolioFile.name}</span>
                            </div>
                            <button type="button" onClick={() => setPortfolioFile(null)}><X className="w-4 h-4 text-red-500" /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Packages */}
                  <div>
                    <Label className="flex items-center gap-2 mb-3"><DollarSign className="w-4 h-4" /> Select Package *</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {salaryPackages.map((pkg) => {
                        const fee = isPakistan ? pkg.fee.pkr : pkg.fee.usd;
                        const earnings = isPakistan ? pkg.earnings.pkr : pkg.earnings.usd;
                        const symbol = isPakistan ? "Rs" : "$";
                        
                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => handlePackageSelection(pkg.id)}
                            className={`p-3 border rounded-lg text-center transition-all ${
                              selectedPackage === pkg.name ? "border-primary shadow-lg ring-2 ring-primary/20" : "border-muted hover:border-primary/50"
                            }`}
                          >
                            <Badge className="bg-primary text-white text-xs">{pkg.name}</Badge>
                            <p className="text-lg font-bold text-red-600 mt-2">{symbol}{fee}</p>
                            <p className="text-xs text-muted-foreground">Joining Fee</p>
                            <div className="mt-2 pt-2 border-t text-xs">
                              <p className="text-green-600 font-medium">{symbol}{earnings.daily}/day</p>
                              <p className="text-green-600 font-medium">{symbol}{earnings.monthly}/mo</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Package Summary */}
                  {selectedPackage && getSelectedPackage() && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-center text-green-700">
                        <strong>{getSelectedPackage()?.name}</strong> Package: Pay <strong className="text-red-600">{isPakistan ? "Rs" : "$"}{isPakistan ? getSelectedPackage()?.fee.pkr : getSelectedPackage()?.fee.usd}</strong> once, 
                        earn up to <strong className="text-green-700">{isPakistan ? "Rs" : "$"}{isPakistan ? getSelectedPackage()?.earnings.pkr.monthly.toLocaleString() : getSelectedPackage()?.earnings.usd.monthly}/month</strong>
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => goToStep(1)} className="flex-1">
                      <ArrowLeft className="mr-2 w-4 h-4" /> Back
                    </Button>
                    <Button type="button" onClick={() => validateStep2() && goToStep(3)} className="flex-1 bg-primary">
                      Continue <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-foreground">Complete Payment</h2>
                  
                  {/* Amount */}
                  {getSelectedPackage() && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                      <p className="text-sm text-red-600 mb-1">Amount to Pay</p>
                      <p className="text-3xl font-bold text-red-600">
                        {isPakistan ? "Rs " : "$"}{isPakistan ? getSelectedPackage()?.fee.pkr.toLocaleString() : getSelectedPackage()?.fee.usd}
                      </p>
                    </div>
                  )}

                  {/* Payment Accounts */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      {isPakistan ? <Building2 className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                      <Label>{isPakistan ? "Send to Bank Account" : "Send to Crypto Wallet"}</Label>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-yellow-700">Send exact amount to any account below, then upload screenshot</p>
                    </div>

                    <div className="space-y-2">
                      {isPakistan ? (
                        companyBankAccounts.map((acc, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">{acc.bankName}</p>
                              <p className="text-xs text-muted-foreground">{acc.accountTitle}</p>
                              <p className="font-mono text-sm">{acc.accountNumber}</p>
                            </div>
                            <button type="button" onClick={() => copyToClipboard(acc.accountNumber)} className="p-2 hover:bg-primary/10 rounded">
                              <Copy className="w-4 h-4 text-primary" />
                            </button>
                          </div>
                        ))
                      ) : (
                        companyCryptoWallets.map((wallet, i) => (
                          <div key={i} className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-sm">{wallet.coin} ({wallet.network})</p>
                              <button type="button" onClick={() => copyToClipboard(wallet.address)} className="p-1 hover:bg-primary/10 rounded">
                                <Copy className="w-4 h-4 text-primary" />
                              </button>
                            </div>
                            <p className="font-mono text-xs break-all text-muted-foreground">{wallet.address}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Screenshot Upload */}
                  <div>
                    <Label className="flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Payment Screenshot *</Label>
                    <input ref={paymentScreenshotRef} type="file" accept="image/*" onChange={(e) => handleFileUpload(e, setPaymentScreenshot, ['image'])} className="hidden" id="screenshot" />
                    {!paymentScreenshot ? (
                      <label htmlFor="screenshot" className="mt-1 flex flex-col items-center justify-center h-28 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary bg-primary/5">
                        <Upload className="w-6 h-6 text-primary mb-1" />
                        <span className="text-sm text-primary">Upload payment proof</span>
                      </label>
                    ) : (
                      <div className="mt-1 flex items-center justify-between p-3 border-2 border-green-300 rounded-lg bg-green-50">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-green-700">{paymentScreenshot.name}</span>
                        </div>
                        <button type="button" onClick={() => setPaymentScreenshot(null)}><X className="w-4 h-4 text-red-500" /></button>
                      </div>
                    )}
                  </div>

                  {/* Transaction ID */}
                  <div>
                    <Label>Transaction ID (Optional)</Label>
                    <Input name="transactionId" value={formData.transactionId} onChange={handleInputChange} placeholder="Enter if available" className="mt-1" />
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => goToStep(2)} className="flex-1">
                      <ArrowLeft className="mr-2 w-4 h-4" /> Back
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="flex-1 bg-primary">
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, title: "Flexible", desc: "Work from anywhere" },
              { icon: Award, title: "5 Packages", desc: "Choose your level" },
              { icon: DollarSign, title: "Daily Pay", desc: "Earn every day" },
              { icon: Clock, title: "Quick Start", desc: "Start in 24 hours" }
            ].map((item, i) => (
              <Card key={i} className="p-4 text-center">
                <item.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="font-bold text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
