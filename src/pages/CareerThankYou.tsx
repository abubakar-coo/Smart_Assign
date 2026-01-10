import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  DollarSign,
  FileText,
  ArrowLeft,
  Home,
  Clock,
  Copy,
  MessageCircle,
  AlertCircle,
  Key
} from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  skills: string;
  aboutYou: string;
  jobCategory: string;
  salaryPackage: string;
  transactionId?: string;
  registrationCode?: string;
}

const CareerThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get form data from location state
  const formData = location.state as FormData | null;
  
  // Get registration code from state or generate new one
  const [registrationCode] = useState<string>(() => {
    if (formData?.registrationCode) {
      return formData.registrationCode;
    }
    // Fallback: generate new code if not provided
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `SA-${timestamp}-${random}`;
  });

  useEffect(() => {
    // If no form data, redirect to careers page
    if (!formData) {
      navigate("/careers");
    }
  }, [formData, navigate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(registrationCode);
    toast({
      title: "Code Copied!",
      description: "Registration code copied to clipboard",
    });
  };

  if (!formData) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Thank You - Application Submitted | Smart Assign</title>
        <meta name="description" content="Your application has been successfully submitted. We'll contact you within 24 hours." />
      </Helmet>
      <Navigation />
      
      {/* Success Section */}
      <section className="bg-gradient-hero pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Your application has been successfully submitted
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5" />
              <span>We'll contact you within 24 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Code Section */}
      <section className="py-8 -mt-4">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-6 md:p-8 shadow-lg border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <Key className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Your Unique Registration Code
              </h2>
              <p className="text-muted-foreground">
                This code is mandatory and will be required for all communications
              </p>
            </div>

            {/* Code Display */}
            <div className="bg-white rounded-lg p-6 mb-6 border-2 border-primary/30">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm text-muted-foreground mb-2">Registration Code</p>
                  <p className="text-3xl font-bold text-primary font-mono tracking-wider">
                    {registrationCode}
                  </p>
                </div>
                <Button
                  onClick={copyToClipboard}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Copy className="mr-2 w-4 h-4" />
                  Copy Code
                </Button>
              </div>
            </div>

            {/* Important Warning */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 mb-2">⚠️ Important: This Code is Mandatory</h3>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>You <strong>must</strong> share this code with us via WhatsApp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Without this code, work will <strong>NOT</strong> be assigned to you</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Save this code safely - you'll need it throughout the process</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* WhatsApp Instructions */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-green-900 mb-2">📱 How to Share Your Code</h3>
                  <p className="text-sm text-green-800 mb-2">
                    Send this code to us via WhatsApp when we contact you. You can also save it now and share it later.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2 border-green-300 text-green-700 hover:bg-green-100"
                    onClick={() => {
                      const message = `Hello! My Registration Code is: ${registrationCode}`;
                      window.open(`https://wa.me/923098091819?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    <MessageCircle className="mr-2 w-4 h-4" />
                    Share via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Application Details */}
      <section className="py-12 -mt-4">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Your Application Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Personal Information
                </h3>
                
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium text-foreground">{formData.fullName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium text-foreground">{formData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium text-foreground">{formData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="font-medium text-foreground">{formData.country}</p>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Professional Information
                </h3>
                
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Work Category</p>
                    <p className="font-medium text-foreground">{formData.jobCategory}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Selected Package</p>
                    <p className="font-medium text-foreground">{formData.salaryPackage}</p>
                  </div>
                </div>

                {formData.transactionId && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Transaction ID</p>
                      <p className="font-medium text-foreground">{formData.transactionId}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Skills & About */}
            <div className="mt-6 pt-6 border-t space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Skills</p>
                <p className="text-foreground">{formData.skills}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">About You</p>
                <p className="text-foreground">{formData.aboutYou}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/careers")}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Apply Again
              </Button>
              <Button 
                onClick={() => navigate("/")}
                className="flex-1 bg-primary"
              >
                <Home className="mr-2 w-4 h-4" />
                Go to Home
              </Button>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="mt-6 p-6 bg-primary/5 border-primary/20">
            <h3 className="text-xl font-bold text-foreground mb-4">What's Next?</h3>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>We'll review your application and contact you within 24 hours on your provided phone number</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Share your registration code with us via WhatsApp when we contact you</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Work details will be sent to your provided phone number after verification</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Payment will be sent to your provided phone number within 12 hours after work submission</span>
              </li>
            </ul>
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => navigate("/how-it-works")}
                className="w-full"
              >
                Learn More About the Complete Process
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerThankYou;

