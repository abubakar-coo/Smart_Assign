import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, UserPlus, Sparkles } from "lucide-react";
import { saveJobApplication } from "../api/jobApplication";
import { trackStartEarningTodayClick } from "@/lib/analytics";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to contact page with smooth transition
    navigate("/contact");
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
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
                alt="Smart Assign"
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
                  <Link to="/careers" className="relative" onClick={() => trackStartEarningTodayClick('navigation_desktop')}>
                    {/* Hiring Badge */}
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse z-20">
                      HIRING!
                    </div>
                    <Button
                      className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group attractive-button bounce-in"
                    >
                      <div className="flex items-center space-x-2 relative z-10">
                        <UserPlus className="w-5 h-5 animate-pulse" />
                        <span className="text-lg">Start Earning Today!</span>
                        <Sparkles className="w-4 h-4 sparkle-icon" />
                      </div>
                      {/* Animated background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </Button>
                  </Link>
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
                <Link to="/careers" className="relative" onClick={() => trackStartEarningTodayClick('navigation_mobile')}>
                  {/* Hiring Badge */}
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse z-20">
                    HIRING!
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group attractive-button bounce-in">
                    <div className="flex items-center justify-center space-x-2 relative z-10">
                      <UserPlus className="w-5 h-5 animate-pulse" />
                      <span className="text-lg">Join Our Team!</span>
                      <Sparkles className="w-4 h-4 sparkle-icon" />
                    </div>
                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </Button>
                </Link>
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