import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Mail, Award, Users, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// Helper function to create URL-friendly slug from name
const nameToSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

const Team = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleMembers, setVisibleMembers] = useState<Set<number>>(new Set());

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
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
      sectionObserver.observe(sectionRef.current);
    }

    const memberObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = memberRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleMembers((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px" }
    );

    memberRefs.current.forEach((member) => {
      if (member) memberObserver.observe(member);
    });

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      memberRefs.current.forEach((member) => {
        if (member) memberObserver.unobserve(member);
      });
    };
  }, []);

  // Helper function to get image path from name
  const getImagePath = (name: string): string => {
    // Try to match exact file names in team folder
    const nameMap: { [key: string]: string } = {
      "Abubakar Arif": "abubakar-arif",
      "Shifa Seher": "Shifa-Seher",
      "Faizan Waqas": "Faizan-Waqas",
      "Emma Collins": "Emma-Collins",
    };
    
    const fileName = nameMap[name] || nameToSlug(name);
    return `/images/team/${fileName}.png`;
  };

  const ceo = {
    name: "Abubakar Arif",
    role: "CEO & Founder",
  };

  const teamMembers = [
    {
      name: "Shifa Seher",
      role: "COO - Chief Operating Officer",
      specialty: "Operations & Strategic Planning",
      experience: "8+ years",
      avatarStyle: "serious-executive"
    },
    {
      name: "Faizan Waqas",
      role: "General Manager",
      specialty: "Project Management & Operations",
      experience: "2+ years",
      avatarStyle: "serious-manager"
    },
    // Women Team Members
    {
      name: "Emma Collins",
      role: "Senior Designer",
      specialty: "UI/UX & Brand Identity",
      experience: "6+ years",
      avatarStyle: "serious-creative"
    },
    {
      name: "Sophia Martinez",
      role: "Project Manager",
      specialty: "Operations & Client Delivery",
      experience: "9+ years",
      avatarStyle: "serious-manager"
    },
    {
      name: "Isabella Rossi",
      role: "Content Strategist",
      specialty: "Copywriting & Digital Campaigns",
      experience: "5+ years",
      avatarStyle: "serious-writer"
    },
    {
      name: "Charlotte Müller",
      role: "Business Analyst",
      specialty: "Market Research & Process Optimization",
      experience: "8+ years",
      avatarStyle: "serious-analyst"
    },
    {
      name: "Olivia Smith",
      role: "HR & Recruitment Lead",
      specialty: "Talent Acquisition & Culture Development",
      experience: "10+ years",
      avatarStyle: "serious-hr"
    },
    // Men Team Members
    {
      name: "Ethan Johnson",
      role: "Full Stack Developer",
      specialty: "Web Applications & API Development",
      experience: "7+ years",
      avatarStyle: "serious-developer"
    },
    {
      name: "Lucas Anderson",
      role: "Data Scientist",
      specialty: "AI & Predictive Analytics",
      experience: "4+ years",
      avatarStyle: "serious-scientist"
    },
  ];

  const companyValues = [
    {
      icon: Award,
      title: "Excellence First",
      description:
        "We never compromise on quality and always deliver beyond expectations.",
    },
    {
      icon: Users,
      title: "Client-Centric",
      description:
        "Every decision we make is guided by our clients' success and satisfaction.",
    },
    {
      icon: Target,
      title: "Results Driven",
      description:
        "We focus on measurable outcomes that drive real business growth.",
    },
  ];

  return (
    <section ref={sectionRef} id="team" className="py-8 bg-white relative overflow-hidden">
      {/* Background Image - Hidden on Mobile with Scroll Animation */}
      <div 
        className={`absolute inset-0 z-0 bg-no-repeat bg-center hidden md:block transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          backgroundImage: 'url(/images/team/team-background.png)',
          backgroundSize: 'cover',
          imageRendering: 'auto' as const,
        } as React.CSSProperties}
      />
      
      {/* Content */}
      <div className={`relative z-10 transition-opacity duration-300 delay-100
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            A passionate group of professionals dedicated to delivering
            exceptional micro-services that drive your business forward.
          </p>
        </div>

        {/* Team Members - CEO + 3 Members - Vertical Layout on Left */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Vertical Team List */}
          <div className="space-y-6">
            {/* CEO */}
            <div
              ref={(el) => {
                memberRefs.current[0] = el;
              }}
              className={`flex items-center space-x-6 group cursor-pointer transition-opacity duration-300
                ${visibleMembers.has(0) ? 'opacity-100' : 'opacity-0'}
              `}
              onClick={() => navigate(`/team/${nameToSlug(ceo.name)}`)}
            >
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-lg">
                  <img
                    src={getImagePath(ceo.name)}
                    alt={ceo.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Fallback to DiceBear if local image not found
                      const target = e.target as HTMLImageElement;
                      target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${ceo.name}&backgroundColor=ffd5dc,b6e3f4,c0aede,d1d4f9,ffdfbf&mood=happy&clothing=shirt&clothingColor=262e33,65c9ff,ff6b6b,4ecdc4,45b7d1&accessoriesProbability=50&facialHairProbability=30&glassesProbability=30&hairColor=0e0e0e,2c1b18,724133,afafaf,ecdcbf,6a4c35,8b4513,a55728,ca8c04,ffdbac,ffd5dc,ecdcbf&skinColor=edb98a,fd9841,fdbcb4,fd9841`;
                    }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {ceo.name}
                </h3>
                <p className="text-lg text-primary font-medium">
                  {ceo.role}
                </p>
              </div>
            </div>

            {/* 3 Team Members */}
            {teamMembers.slice(0, 3).map((member, index) => {
              const memberIndex = index + 1; // CEO is 0, so start from 1
              const memberVisible = visibleMembers.has(memberIndex);
              const animationDelay = (index + 1) * 100;
              
              return (
              <div
                key={index}
                ref={(el) => {
                  memberRefs.current[memberIndex] = el;
                }}
                className={`flex items-center space-x-6 group cursor-pointer transition-opacity duration-300
                  ${memberVisible ? 'opacity-100' : 'opacity-0'}
                `}
                style={{ transitionDelay: `${Math.min(animationDelay, 150)}ms` }}
                onClick={() => navigate(`/team/${nameToSlug(member.name)}`)}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-lg">
                    <img
                      src={getImagePath(member.name)}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        // Fallback to DiceBear if local image not found
                        const target = e.target as HTMLImageElement;
                        target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}&backgroundColor=ffd5dc,b6e3f4,c0aede,d1d4f9,ffdfbf&mood=happy&clothing=shirt&clothingColor=262e33,65c9ff,ff6b6b,4ecdc4,45b7d1&accessoriesProbability=40&facialHairProbability=25&glassesProbability=25&hairColor=0e0e0e,2c1b18,724133,afafaf,ecdcbf,6a4c35,8b4513,a55728,ca8c04,ffdbac,ffd5dc,ecdcbf&skinColor=edb98a,fd9841,fdbcb4,fd9841`;
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-lg text-primary font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
              );
            })}
          </div>

          {/* Right Side - Empty for now or can add content later */}
          <div className="hidden lg:block">
            {/* Right side content can be added here if needed */}
          </div>
        </div>

        {/* View All Team Button */}
        <div className="text-center mt-16 md:mt-20 mb-16">
          <Button 
            size="lg"
            className="bg-gradient-primary hover:shadow-lg text-base font-semibold px-8 py-6 rounded-lg transition-all duration-200 hover:scale-[1.02]"
            onClick={() => window.location.href = '/team'}
          >
            View All Team Members
          </Button>
        </div>

        {/* Company Values */}
        <div className="bg-gradient-hero p-8 rounded-3xl mt-16 md:mt-20">
          <h3 className="text-3xl font-semibold text-foreground text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Team;
