import { Button } from "@/components/ui/button";
import { UserPlus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { trackStartEarningTodayClick, trackExploreServicesClick, trackViewRoadMapClick } from "@/lib/analytics";

const Hero = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
    },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="pt-24 pb-8 min-h-screen relative overflow-hidden">
      {/* Background Image - Hidden on Mobile with Scroll Animation */}
      <div 
        className={`absolute inset-0 z-0 bg-no-repeat hidden md:block transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          backgroundImage: 'url(/images/hero/hero-background.png)',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          imageRendering: 'auto' as const,
        } as React.CSSProperties}
      />
      {/* Light overlay for better text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-hero/60" />
      
      {/* Content */}
      <div className={`relative z-10 transition-opacity duration-300 delay-100
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[70vh] py-12 flex items-center">
            {/* Content */}
            <div className="space-y-8 max-w-3xl">
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
                onClick={() => {
                  trackExploreServicesClick('hero');
                  window.location.href = "/services";
                }}
              >
                Explore Services
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground text-base font-semibold px-8 py-6 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:border-primary"
                onClick={() => {
                  trackViewRoadMapClick('hero');
                  window.location.href = "/roadmap";
                }}
              >
                       View Road Map
              </Button>
            </div>

            {/* Mobile Join Our Team Button - Visible only on mobile */}
            <div className="md:hidden mt-6">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold py-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                onClick={() => {
                  trackStartEarningTodayClick('hero_mobile');
                  navigate("/careers");
                }}
              >
                    <div className="flex items-center justify-center space-x-2 relative z-10">
                      <UserPlus className="w-5 h-5 animate-pulse" />
                      <span className="text-lg">Start Registration</span>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;