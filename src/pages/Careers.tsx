import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import { registerNewUser } from "@/lib/batchTracking";
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
  const navigate = useNavigate();
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

  // Job Categories with detailed descriptions and allowed packages
  const jobCategories = [
    { 
      id: 1, 
      name: "SEO Content Writing", 
      icon: "✍️", 
      shortDesc: "Writing blogs, articles, and website content.",
      fullDescription: "Create high-quality, SEO-optimized content for websites, blogs, and online platforms. You'll write engaging articles that rank well on search engines while providing value to readers.",
      requirements: ["Good English writing skills", "Basic SEO knowledge", "Research abilities"],
      tasks: ["Write blog posts", "Create website content", "Optimize for keywords"],
      allowedPackages: [3, 4, 5] // Standard, Professional, Premium
    },
    { 
      id: 2, 
      name: "Data Entry", 
      icon: "📊", 
      shortDesc: "Entering data in Excel, Sheets, or systems.",
      fullDescription: "Accurately input and manage data in spreadsheets, databases, and various online systems. Attention to detail is key for this role.",
      requirements: ["Fast typing speed", "Attention to detail", "Excel/Sheets knowledge"],
      tasks: ["Enter data accurately", "Maintain spreadsheets", "Update databases"],
      allowedPackages: [1, 2, 3, 4, 5] // All packages
    },
    { 
      id: 3, 
      name: "Research Assistance", 
      icon: "🔍", 
      shortDesc: "Finding information and authentic sources online.",
      fullDescription: "Conduct thorough online research to find accurate information, statistics, and credible sources for various projects and topics.",
      requirements: ["Strong research skills", "Critical thinking", "Source verification ability"],
      tasks: ["Find reliable sources", "Compile research data", "Verify information accuracy"],
      allowedPackages: [3, 4, 5] // Standard, Professional, Premium
    },
    { 
      id: 4, 
      name: "Proofreading", 
      icon: "✅", 
      shortDesc: "Checking grammar, spelling, and sentence clarity.",
      fullDescription: "Review and correct written content for grammar, spelling, punctuation, and overall clarity. Ensure documents are error-free and professionally polished.",
      requirements: ["Excellent grammar knowledge", "Attention to detail", "Strong language skills"],
      tasks: ["Check spelling errors", "Fix grammar mistakes", "Improve sentence clarity"],
      allowedPackages: [2, 3, 4, 5] // Basic to Premium
    },
    { 
      id: 5, 
      name: "Canva Designing", 
      icon: "🎨", 
      shortDesc: "Creating posts, flyers, CVs, and presentations.",
      fullDescription: "Design visually appealing graphics using Canva for social media posts, marketing flyers, professional CVs, and presentation slides.",
      requirements: ["Canva proficiency", "Creative eye", "Basic design principles"],
      tasks: ["Create social media posts", "Design flyers & banners", "Make professional CVs"],
      allowedPackages: [3, 4, 5] // Standard, Professional, Premium
    },
    { 
      id: 6, 
      name: "Typing & Formatting", 
      icon: "⌨️", 
      shortDesc: "Typing documents and formatting professionally.",
      fullDescription: "Type handwritten or audio content into digital documents and format them professionally according to specified standards and requirements.",
      requirements: ["Fast & accurate typing", "MS Word proficiency", "Formatting skills"],
      tasks: ["Type documents accurately", "Format professionally", "Convert handwritten text"],
      allowedPackages: [1, 2, 3, 4, 5] // All packages
    },
    { 
      id: 7, 
      name: "Assignment Writing", 
      icon: "📚", 
      shortDesc: "Writing essays, reports, and coursework.",
      fullDescription: "Write academic assignments including essays, reports, case studies, and coursework following proper academic standards and guidelines.",
      requirements: ["Academic writing skills", "Research abilities", "Citation knowledge"],
      tasks: ["Write essays & reports", "Follow guidelines", "Meet deadlines"],
      allowedPackages: [1, 2, 3, 4, 5] // All packages
    },
    { 
      id: 8, 
      name: "Literature Review", 
      icon: "📖", 
      shortDesc: "Summarizing and analyzing research papers.",
      fullDescription: "Read, analyze, and summarize academic research papers and scholarly articles. Create comprehensive literature reviews for academic projects.",
      requirements: ["Academic reading skills", "Analytical thinking", "Summary writing"],
      tasks: ["Analyze research papers", "Write summaries", "Identify key findings"],
      allowedPackages: [3, 4, 5] // Standard, Professional, Premium
    },
    { 
      id: 9, 
      name: "Presentation Design", 
      icon: "📽️", 
      shortDesc: "Making PowerPoint or Google Slides.",
      fullDescription: "Create professional and visually engaging presentations using PowerPoint or Google Slides for business, academic, or personal use.",
      requirements: ["PowerPoint/Slides skills", "Visual design sense", "Content organization"],
      tasks: ["Design slide layouts", "Add visuals & graphics", "Organize content flow"],
      allowedPackages: [3, 4, 5] // Standard, Professional, Premium
    },
    { 
      id: 10, 
      name: "Resume & Cover Letter", 
      icon: "🧾", 
      shortDesc: "Creating job-ready CVs and cover letters.",
      fullDescription: "Craft professional resumes and compelling cover letters that help job seekers stand out and land interviews.",
      requirements: ["Resume writing expertise", "Industry knowledge", "Professional formatting"],
      tasks: ["Write tailored CVs", "Create cover letters", "Optimize for ATS"],
      allowedPackages: [3, 4, 5] // Standard, Professional, Premium
    },
    { 
      id: 11, 
      name: "Academic Formatting", 
      icon: "📐", 
      shortDesc: "Formatting work in APA, MLA, or Harvard style.",
      fullDescription: "Format academic documents according to specific citation styles like APA, MLA, Harvard, or Chicago. Ensure proper referencing and document structure.",
      requirements: ["Citation style knowledge", "Attention to detail", "Academic standards"],
      tasks: ["Apply formatting styles", "Create citations", "Structure documents properly"],
      allowedPackages: [3, 4, 5] // Standard, Professional, Premium
    },
    { 
      id: 12, 
      name: "Virtual Assistance", 
      icon: "🧑‍💻", 
      shortDesc: "Helping businesses with small online tasks.",
      fullDescription: "Provide remote administrative support to businesses including email management, scheduling, data organization, and various online tasks.",
      requirements: ["Organizational skills", "Communication abilities", "Tech-savvy"],
      tasks: ["Manage emails", "Schedule tasks", "Handle admin work"],
      allowedPackages: [3, 4, 5] // Standard, Professional, Premium
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
    { bankName: "JazzCash", accountTitle: "Sheikh Muhammad Abubakar", accountNumber: "03278528854" },
    { bankName: "Easypaisa", accountTitle: "Sheikh Muhammad Abubakar", accountNumber: "03278528854" },
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
  
  // Get allowed packages based on selected job category
  const getAllowedPackages = () => {
    const job = getSelectedJob();
    if (!job) return salaryPackages;
    return salaryPackages.filter(pkg => job.allowedPackages.includes(pkg.id));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    scrollToTop();
  };


  const validateStep1 = () => {
    // Email validation
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return false;
    }
    // Phone validation (minimum 7 digits)
    if (!formData.phone || formData.phone.replace(/\D/g, '').length < 7) {
      toast({ title: "Please enter a valid phone number (minimum 7 digits)", variant: "destructive" });
      return false;
    }
    if (!formData.fullName || !formData.country || !formData.skills || !formData.aboutYou) {
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

  // Send email for Step 1 completion
  const sendStep1Email = async () => {
    try {
      const submitData = new FormData();
      submitData.append("Full Name", formData.fullName);
      submitData.append("Email", formData.email);
      submitData.append("Phone", formData.phone);
      submitData.append("Country", formData.country);
      submitData.append("Skills", formData.skills);
      submitData.append("About", formData.aboutYou);
      submitData.append("CV Uploaded", cvFile ? "Yes" : "No");
      submitData.append("Step Completed", "Step 1");
      submitData.append("Completed At", new Date().toLocaleString());
      submitData.append("_subject", `Step 1 Completed: ${formData.fullName}`);
      submitData.append("_template", "table");

      await fetch("https://formsubmit.co/ajax/abubakararif164@gmail.com", {
        method: "POST",
        body: submitData
      });
    } catch (error) {
      console.error("Error sending Step 1 email:", error);
    }
  };

  // Send email for Step 2 completion (includes Step 1 data)
  const sendStep2Email = async () => {
    try {
      const pkg = getSelectedPackage();
      const selectedCurrency = isPakistan ? "PKR" : "USD";
      const joiningFee = isPakistan ? pkg?.fee.pkr : pkg?.fee.usd;

      const submitData = new FormData();
      // Step 1 Data
      submitData.append("=== STEP 1 DATA ===", "");
      submitData.append("Full Name", formData.fullName);
      submitData.append("Email", formData.email);
      submitData.append("Phone", formData.phone);
      submitData.append("Country", formData.country);
      submitData.append("Skills", formData.skills);
      submitData.append("About", formData.aboutYou);
      submitData.append("CV Uploaded", cvFile ? "Yes" : "No");
      
      // Step 2 Data
      submitData.append("=== STEP 2 DATA ===", "");
      submitData.append("Work Category", selectedJob);
      submitData.append("Package", `${selectedPackage} (${selectedCurrency} ${joiningFee})`);
      submitData.append("Portfolio Uploaded", portfolioFile ? "Yes" : "No");
      submitData.append("Step Completed", "Step 2");
      submitData.append("Completed At", new Date().toLocaleString());
      submitData.append("_subject", `Step 2 Completed: ${formData.fullName} - ${selectedPackage}`);
      submitData.append("_template", "table");

      await fetch("https://formsubmit.co/ajax/abubakararif164@gmail.com", {
        method: "POST",
        body: submitData
      });
    } catch (error) {
      console.error("Error sending Step 2 email:", error);
    }
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
        // Generate registration code
        const generateRegistrationCode = (): string => {
          const timestamp = Date.now().toString(36).toUpperCase();
          const random = Math.random().toString(36).substring(2, 8).toUpperCase();
          return `SA-${timestamp}-${random}`;
        };
        
        const registrationCode = generateRegistrationCode();
        
        // Register user and get batch number and position
        const batchData = registerNewUser();
        
        // Navigate to thank you page with form data, registration code, and batch info
        navigate("/careers/thank-you", {
          state: {
            ...formData,
            jobCategory: selectedJob,
            salaryPackage: selectedPackage,
            registrationCode: registrationCode,
            batchNumber: batchData.currentBatch,
            position: batchData.currentPosition
          }
        });
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
          <div className="mb-6">
            <Button
              onClick={() => navigate("/how-it-works")}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
            >
              <FileText className="mr-2 w-4 h-4" />
              How It Works
            </Button>
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
                    <Textarea name="skills" value={formData.skills} onChange={handleInputChange} placeholder="Your skills (e.g., SEO Content Writing, Data Entry, Canva Designing, Proofreading, Research Assistance...)" className="mt-1" rows={2} />
                  </div>

                  {/* CV Upload */}
                  <div>
                    <Label className="flex items-center gap-2"><FileUp className="w-4 h-4" /> Upload CV (Optional)</Label>
                    <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, setCvFile, ['pdf', 'doc', 'word'])} className="hidden" id="cv" />
                    {!cvFile ? (
                      <label htmlFor="cv" className="mt-1 flex items-center justify-center h-20 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50">
                        <span className="text-muted-foreground text-sm">Click to upload (PDF, DOC) - Optional</span>
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

                  <Button
                    type="button"
                    onClick={async () => {
                      if (validateStep1()) {
                        await sendStep1Email();
                        goToStep(2);
                      }
                    }} 
                    className="w-full bg-primary"
                  >
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

                  {/* Selected Category Details - Enhanced */}
                  {selectedJob && getSelectedJob() && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 space-y-4 shadow-lg">
                      <div className="flex items-center gap-3 pb-3 border-b border-blue-200">
                        <span className="text-3xl">{getSelectedJob()?.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground">{getSelectedJob()?.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{getSelectedJob()?.shortDesc}</p>
                        </div>
                        <Badge className="bg-primary text-white px-3 py-1">Selected</Badge>
                      </div>
                      
                      <div className="bg-white/70 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-primary" />
                          About This Service
                        </h4>
                        <p className="text-sm text-foreground leading-relaxed">{getSelectedJob()?.fullDescription}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/70 rounded-lg p-4 border border-blue-200">
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Requirements:
                          </h4>
                          <ul className="space-y-2 text-sm">
                            {getSelectedJob()?.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span className="text-foreground">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white/70 rounded-lg p-4 border border-blue-200">
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            Daily Tasks:
                          </h4>
                          <ul className="space-y-2 text-sm">
                            {getSelectedJob()?.tasks.map((task, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-foreground">{task}</span>
                              </li>
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

                  {/* Packages - Filtered based on selected category */}
                  <div>
                    <Label className="flex items-center gap-2 mb-2"><DollarSign className="w-4 h-4" /> Select Package *</Label>
                    <p className="text-xs text-muted-foreground mb-3">
                      📌 Available packages for <strong>{selectedJob}</strong> - Select one package to continue
                    </p>
                    <div className={`grid gap-3 ${getAllowedPackages().length <= 3 ? 'grid-cols-3' : getAllowedPackages().length === 4 ? 'grid-cols-4' : 'grid-cols-5'}`}>
                      {getAllowedPackages().map((pkg) => {
                        const fee = isPakistan ? pkg.fee.pkr : pkg.fee.usd;
                        const earnings = isPakistan ? pkg.earnings.pkr : pkg.earnings.usd;
                        const symbol = isPakistan ? "Rs" : "$";
                        
                        return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => handlePackageSelection(pkg.id)}
                            className={`p-4 border-2 rounded-xl text-center transition-all ${
                            selectedPackage === pkg.name
                                ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/30" 
                                : "border-muted hover:border-primary/50 hover:bg-muted/50"
                            }`}
                          >
                            <Badge className="bg-primary text-white text-xs mb-2">{pkg.name}</Badge>
                            
                            {/* Joining Fee */}
                            <div className="bg-red-50 rounded-lg p-2 mb-3">
                              <p className="text-xl font-bold text-red-600">{symbol}{fee.toLocaleString()}</p>
                              <p className="text-xs text-red-500 font-medium">One-time Joining Fee</p>
                            </div>
                            
                            {/* Earnings Breakdown */}
                            <div className="bg-green-50 rounded-lg p-2 space-y-1">
                              <p className="text-xs font-semibold text-green-700 mb-1">💰 Your Earnings:</p>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Daily:</span>
                                <span className="text-green-600 font-bold">{symbol}{earnings.daily.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Weekly:</span>
                                <span className="text-green-600 font-bold">{symbol}{earnings.weekly.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-xs border-t border-green-200 pt-1 mt-1">
                                <span className="text-muted-foreground">Monthly:</span>
                                <span className="text-green-700 font-bold">{symbol}{earnings.monthly.toLocaleString()}</span>
                              </div>
                            </div>
                        </button>
                        );
                      })}
                    </div>
                    </div>

                  {/* Package Summary - Detailed */}
                  {selectedPackage && getSelectedPackage() && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-5">
                      <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                        ✅ {getSelectedPackage()?.name} Package Selected
                        </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-white rounded-lg p-3 border border-red-200">
                          <p className="text-muted-foreground text-xs">You Pay (Once)</p>
                          <p className="text-xl font-bold text-red-600">
                            {isPakistan ? "Rs" : "$"}{isPakistan ? getSelectedPackage()?.fee.pkr.toLocaleString() : getSelectedPackage()?.fee.usd}
                          </p>
                          <p className="text-xs text-muted-foreground">One-time joining fee only</p>
                          </div>
                        <div className="bg-white rounded-lg p-3 border border-green-200">
                          <p className="text-muted-foreground text-xs">You Earn (Monthly)</p>
                          <p className="text-xl font-bold text-green-600">
                            {isPakistan ? "Rs" : "$"}{isPakistan ? getSelectedPackage()?.earnings.pkr.monthly.toLocaleString() : getSelectedPackage()?.earnings.usd.monthly}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ({isPakistan ? "Rs" : "$"}{isPakistan ? getSelectedPackage()?.earnings.pkr.weekly.toLocaleString() : getSelectedPackage()?.earnings.usd.weekly}/week)
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => goToStep(1)} className="flex-1">
                      <ArrowLeft className="mr-2 w-4 h-4" /> Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={async () => {
                        if (validateStep2()) {
                          await sendStep2Email();
                          goToStep(3);
                        }
                      }} 
                      className="flex-1 bg-primary"
                    >
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
