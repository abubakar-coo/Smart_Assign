import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Award, Building, Globe, UserPlus, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Animated counter component
const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  prefix = "", 
  suffix = "" 
}: { 
  end: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const Hero = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      label: "Happy Clients",
      value: 1500,
      displayValue: <AnimatedCounter end={1500} suffix="+" />,
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      label: "Revenue Generated",
      value: 1,
      displayValue: <AnimatedCounter end={1} prefix="$" suffix="M+" />,
      color: "text-secondary",
    },
    {
      icon: Award,
      label: "Projects Completed",
      value: 5000,
      displayValue: <AnimatedCounter end={5000} suffix="+" />,
      color: "text-primary",
    },
    {
      icon: Building,
      label: "Years in Business",
      value: 5,
      displayValue: <AnimatedCounter end={5} suffix="+" />,
      color: "text-secondary",
    },
  ];

  return (
    <section id="home" className="pt-24 pb-8 min-h-screen bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh] py-12">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                  Professional{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Micro-Services
                  </span>{" "}
                  for Growing Businesses
                </h1>
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed max-w-2xl">
                  We provide specialized, high-quality services that help businesses 
                  streamline operations and accelerate growth. From content creation 
                  to data management, we've got you covered.
                </p>
              </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-lg text-base font-semibold px-8 py-6 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                onClick={() => window.location.href = "/services"}
              >
                Explore Services
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground text-base font-semibold px-8 py-6 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:border-primary"
                onClick={() => window.location.href = "/portfolio"}
              >
                View Portfolio
              </Button>
            </div>

            {/* Mobile Join Our Team Button - Visible only on mobile */}
            <div className="md:hidden mt-6">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold py-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                onClick={() => navigate("/careers")}
              >
                <div className="flex items-center justify-center space-x-2 relative z-10">
                  <UserPlus className="w-5 h-5 animate-pulse" />
                  <span className="text-lg">Join Our Team!</span>
                  <Sparkles className="w-4 h-4 sparkle-icon" />
                </div>
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Button>
            </div>

            <div className="pt-8">
              <p className="text-base text-muted-foreground mb-4">Trusted by industry leaders</p>
              <div className="flex items-center space-x-6 opacity-60">
                <div className="w-20 h-8 bg-muted rounded flex items-center justify-center hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-semibold">CLIENT</span>
                </div>
                <div className="w-20 h-8 bg-muted rounded flex items-center justify-center hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-semibold">BRAND</span>
                </div>
                <div className="w-20 h-8 bg-muted rounded flex items-center justify-center hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-semibold">CORP</span>
                </div>
              </div>
            </div>
            </div>

            {/* Right Dashboard */}
            <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Company Dashboard
              </h2>
              <p className="text-base text-muted-foreground">
                Real-time metrics and achievements
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <Card 
                  key={index} 
                  className="p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300 bg-white border border-gray-100 rounded-xl transform hover:scale-[1.02] cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {stat.displayValue}
                    </p>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {stat.label}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 lg:p-8 shadow-sm bg-white border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Market Presence
                </h3>
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">America</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-primary h-2 rounded-full w-[45%] transition-all duration-1000 ease-out"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">UK</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-secondary h-2 rounded-full w-[35%] transition-all duration-1000 ease-out"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Canada</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[20%] transition-all duration-1000 ease-out"></div>
                </div>
              </div>
            </Card>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Hero;