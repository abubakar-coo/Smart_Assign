import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Linkedin, Facebook, MessageSquare, Instagram, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { trackSubscribeClick } from "@/lib/analytics";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const quickLinks = [
    { name: "About Us", href: "/#team" },
    { name: "Main Services", href: "/main-services" },
    { name: "Micro Services", href: "/micro-services" },
    { name: "Road Map", href: "/roadmap" },
    { name: "Contact", href: "/contact" },
  ];

  // Helper function to convert service title to URL slug
  const titleToSlug = (title: string): string => {
    const serviceSlugMap: Record<string, string> = {
      "Presentation (PPT) Design": "presentation-ppt-design",
      "Academic Formatting (APA / MLA / Harvard)": "academic-formatting",
      "Virtual Assistance (Small Tasks)": "virtual-assistance",
    };
    
    if (serviceSlugMap[title]) {
      return serviceSlugMap[title];
    }
    
    return title
      .replace(/\([^)]*\)/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');
  };

  const services = [
    { name: "SEO Content Writing", href: `/services/${titleToSlug("SEO Content Writing")}` },
    { name: "Research Assistance", href: `/services/${titleToSlug("Research Assistance")}` },
    { name: "Typing & Formatting", href: `/services/${titleToSlug("Typing & Formatting")}` },
    { name: "Canva Designing", href: `/services/${titleToSlug("Canva Designing")}` },
    { name: "Literature Review", href: `/services/${titleToSlug("Literature Review")}` },
  ];

  const contactInfo = [
    { icon: Mail, text: "smartassignmentofficial@gmail.com", href: "mailto:smartassignmentofficial@gmail.com" },
    { icon: Phone, text: "+92 3098091819", href: "tel:+923098091819" },
    { icon: MapPin, text: "Remote", href: "#" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/company/smartassign/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/assignsmart?igsh=MTgyNmpvb3gwdzJjcw==", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/share/16zKaZ9JuK/", label: "Facebook" },
    { icon: MessageSquare, href: "https://www.threads.com/@assignsmart", label: "Threads" },
  ];

  // Handle email subscription
  const handleEmailSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    trackSubscribeClick('footer');
    setIsLoading(true);
    setMessage(null);

    try {
      const submitData = new FormData();
      submitData.append("Email", email);
      submitData.append("Subscribed At", new Date().toLocaleString());
      submitData.append("Source", "Newsletter Subscription");
      submitData.append("_subject", "New Newsletter Subscription");
      submitData.append("_template", "table");

      const response = await fetch("https://formsubmit.co/ajax/abubakararif159@gmail.com", {
        method: "POST",
        body: submitData
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Successfully subscribed! Thank you.' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: 'Subscription failed. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Smart Assign</h3>
            <p className="text-white/80 leading-relaxed">
              Professional micro-services that help businesses grow. 
              Quality, reliability, and excellence in every project.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-white/80 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Main Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.href}
                    className="text-white/80 hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Get In Touch</h3>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-white/80 hover:text-primary transition-colors"
                >
                  <contact.icon className="w-5 h-5" />
                  <span>{contact.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Stay Updated</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest updates on services, 
              industry insights, and special offers.
            </p>
            
            <form onSubmit={handleEmailSubscription} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                className="bg-gradient-primary hover:shadow-hover"
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>

            {/* Success/Error Message */}
            {message && (
              <div className={`flex items-center justify-center space-x-2 p-3 rounded-lg max-w-md mx-auto ${
                message.type === 'success' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span className="text-sm">{message.text}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © {currentYear} <Link to="/" className="hover:text-primary transition-colors"><strong>Smart Assign</strong></Link>. All Rights Reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-white/60 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-white/60 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-white/60 hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
  };
  
export default Footer;