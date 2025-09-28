import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Mail, Phone, MapPin, Linkedin, Facebook, MessageSquare, Instagram, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { saveEmailSubscription } from "../api/emailSubscription";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const quickLinks = [
    { name: "About Us", href: "/#team" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "UGC Ad Campaigns", href: "/services" },
    { name: "Data Entry & Cleanup", href: "/services" },
    { name: "Prompt Engineering", href: "/services" },
    { name: "E-Commerce Solutions", href: "/services" },
    { name: "AI Content Creation", href: "/services" },
  ];

  const contactInfo = [
    { icon: Mail, text: "admin@smartassign.info", href: "mailto:admin@smartassign.info" },
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

    setIsLoading(true);
    setMessage(null);

    try {
      const result = await saveEmailSubscription(email);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setEmail(''); // Clear the input
      } else {
        setMessage({ type: 'error', text: result.message });
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
            <div className="flex items-center">
              <div className="h-10 flex items-center justify-center relative">
                <img 
                  src="/images/smart-assign-main-name.png" 
                  alt="Smart Assign" 
                  className="h-full w-auto object-contain logo-hd"
                  onError={(e) => {
                    // Fallback to gradient icon if logo not found
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) nextElement.style.display = 'flex';
                  }}
                />
                <div className="h-10 w-28 bg-gradient-primary rounded-lg hidden items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
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
            <h3 className="text-lg font-semibold">Our Services</h3>
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
              © {currentYear} Smart Assign. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
  };
  
export default Footer;