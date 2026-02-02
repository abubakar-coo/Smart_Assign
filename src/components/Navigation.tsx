import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { trackGetStartedClick } from "@/lib/analytics";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    trackGetStartedClick('navigation');
    // Navigate to contact page with smooth transition
    navigate("/contact");
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Main Services", href: "/main-services" },
    { name: "Micro Services", href: "/micro-services" },
    { name: "Road Map", href: "/roadmap" },
    { name: "Team", href: "/team" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200/50 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-300 group opacity-100 hover:opacity-100">
            <div className="h-[76px] sm:h-[84px] md:h-[92px] lg:h-[104px]">
              <img 
                src="/images/smart-assign-main-name.png" 
                alt="Smart Assign - Digital Agency for SEO Content Writing, Virtual Assistant Services and Data Entry"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-all duration-300 transform hover:scale-105"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-all duration-300 transform hover:scale-105 ${
                    location.pathname === item.href 
                      ? "text-primary font-semibold border-b-2 border-primary" 
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={handleGetStarted}
                    variant="default"
                    className="bg-gradient-primary hover:shadow-hover transform hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                  </Button>
                </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="transform transition-transform duration-300 hover:scale-110"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slideDown">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:text-primary transition-all duration-300 px-4 py-2 transform hover:translate-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`transition-all duration-300 px-4 py-2 transform hover:translate-x-2 ${
                      location.pathname === item.href 
                        ? "text-primary font-semibold bg-primary/10 rounded-lg" 
                        : "text-foreground hover:text-primary"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="px-4 space-y-3">
                <Button 
                  onClick={handleGetStarted}
                  className="w-full bg-gradient-primary transform hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;