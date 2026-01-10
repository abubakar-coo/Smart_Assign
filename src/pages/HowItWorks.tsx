import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Phone, 
  Briefcase, 
  Upload, 
  Wallet, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  UserCheck,
  CreditCard,
  RefreshCw,
  Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  // Total sections: 5 steps + 3 policies + 5 timeline items = 13
  const sectionRefs = useRef<(HTMLDivElement | null)[]>(new Array(13).fill(null));

  useEffect(() => {
    const observers: (IntersectionObserver | null)[] = [];
    
    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(index));
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const steps = [
    {
      number: 1,
      title: "Fill Application Form",
      description: "Complete the 3-step application form with your personal and professional details",
      icon: FileText,
      details: [
        "Step 1: Enter your personal information (Name, Email, Phone, Country)",
        "Step 2: Select your work category and package",
        "Step 3: Upload CV, Portfolio, and Payment Screenshot",
        "Submit the form and receive your unique registration code"
      ]
    },
    {
      number: 2,
      title: "24 Hours Contact",
      description: "We'll contact you within 24 hours on your provided phone number",
      icon: Phone,
      details: [
        "Our team will call you on the phone number you provided",
        "We'll verify your details and discuss your application",
        "Be ready to answer questions about your skills and experience"
      ]
    },
    {
      number: 3,
      title: "Receive Work Details",
      description: "Work assignment details will be sent to your provided phone number",
      icon: Briefcase,
      details: [
        "You'll receive complete work details via WhatsApp/SMS",
        "Details include: What work to do, Where to submit, Deadlines",
        "Make sure to save your unique registration code - it's mandatory!"
      ]
    },
    {
      number: 4,
      title: "Submit Your Work",
      description: "Complete and submit your assigned work as per instructions",
      icon: Upload,
      details: [
        "Follow the instructions provided in your work details",
        "Submit your completed work at the specified location",
        "Ensure quality and meet all requirements"
      ]
    },
    {
      number: 5,
      title: "Get Payment (12 Hours)",
      description: "Receive your payment within 12 hours of work submission",
      icon: Wallet,
      details: [
        "Payment will be sent to your provided phone number",
        "Withdrawal processed within 12 hours after work submission",
        "Payment method: Same as your registration (JazzCash/Easypaisa/Bank/Crypto)"
      ]
    }
  ];

  const policies = [
    {
      title: "Starting Test Failure",
      description: "If you fail the starting test",
      refund: "20% of fee will be returned",
      icon: XCircle,
      color: "text-red-600"
    },
    {
      title: "Voluntary Exit",
      description: "If you submit fee and want to leave",
      refund: "20% of fee will be returned",
      icon: RefreshCw,
      color: "text-orange-600"
    },
    {
      title: "Registration Cancellation",
      description: "If registration is cancelled, you need to register again",
      refund: "Special number provided for 20% discount on re-registration",
      icon: AlertCircle,
      color: "text-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>How It Works - Complete Process Guide | Smart Assign</title>
        <meta name="description" content="Learn how to apply, get work, submit assignments, and receive payments at Smart Assign. Complete step-by-step guide with fee return policies." />
        <meta name="keywords" content="Smart Assign process, how to apply, work submission, payment process, registration guide" />
      </Helmet>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-hero pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete guide to joining Smart Assign, getting work, and receiving payments
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Process Flow
            </h2>
            <p className="text-lg text-muted-foreground">
              Follow these steps from registration to payment
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => {
              const isVisible = visibleSections.has(index);
              return (
                <div
                  key={step.number}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className={`transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card className="p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-primary/10">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Step Number */}
                      <div className="flex-shrink-0">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-lg transition-transform duration-300 hover:scale-110">
                            {step.number}
                          </div>
                          {index < steps.length - 1 && (
                            <div className="hidden md:block animate-pulse">
                              <ArrowRight className="w-8 h-8 text-primary/50" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-2 transition-colors duration-300 hover:text-primary">
                          {step.title}
                        </h3>
                        <p className="text-lg text-muted-foreground mb-4">
                          {step.description}
                        </p>
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li 
                              key={idx} 
                              className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2"
                            >
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fee Return Policy */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Fee Return Policy
            </h2>
            <p className="text-lg text-muted-foreground">
              Understanding our refund and cancellation policies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {policies.map((policy, index) => {
              const Icon = policy.icon;
              const policyIndex = steps.length + index;
              const isVisible = visibleSections.has(policyIndex);
              return (
                <div
                  key={index}
                  ref={(el) => (sectionRefs.current[policyIndex] = el)}
                  className={`transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(steps.length + index) * 100}ms` }}
                >
                  <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] border-primary/10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-lg bg-muted ${policy.color} transition-transform duration-300 hover:scale-110`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2 transition-colors duration-300 hover:text-primary">
                          {policy.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {policy.description}
                        </p>
                      </div>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg transition-all duration-300 hover:bg-primary/20">
                      <p className="font-semibold text-foreground">
                        {policy.refund}
                      </p>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Important Notes */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Important Notes
                </h3>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>If registration is cancelled, you must register again with a special number to get 20% discount</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Each user receives a unique registration code that must be shared via WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Without the registration code, work will not be assigned to you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>All communications and payments happen on your provided phone number</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Timeline Summary */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Quick Timeline
            </h2>
            <div className="space-y-4">
              {[
                { icon: Clock, title: "Form Submission", desc: "Submit your application form", badge: "Immediate", color: "" },
                { icon: Phone, title: "Contact & Verification", desc: "We'll contact you for verification", badge: "Within 24 Hours", color: "bg-green-100" },
                { icon: Briefcase, title: "Work Assignment", desc: "Receive work details on your phone", badge: "After Contact", color: "bg-blue-100" },
                { icon: Upload, title: "Work Submission", desc: "Submit your completed work", badge: "As Per Deadline", color: "" },
                { icon: Wallet, title: "Payment Received", desc: "Payment sent to your phone number", badge: "Within 12 Hours", color: "bg-green-100" }
              ].map((item, idx) => {
                const Icon = item.icon;
                const timelineIndex = steps.length + policies.length + idx;
                const isVisible = visibleSections.has(timelineIndex);
                return (
                  <div
                    key={idx}
                    ref={(el) => (sectionRefs.current[timelineIndex] = el)}
                    className={`transition-all duration-700 ease-out ${
                      isVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: `${timelineIndex * 100}ms` }}
                  >
                    <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-all duration-300 hover:scale-[1.02] cursor-default">
                      <Icon className="w-6 h-6 text-primary transition-transform duration-300" />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Badge variant="outline" className={item.color}>{item.badge}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join Smart Assign today and start your journey to financial freedom
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/careers")}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform group"
          >
            Apply Now
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;

