import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Mail, Award, Users, Target, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Helper function to create URL-friendly slug from name
const nameToSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

const TeamPage = () => {
  const navigate = useNavigate();
  
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
    bio: "Visionary entrepreneur with over 10 years of experience in digital transformation and business automation. Abubakar founded Smart Assign to revolutionize how businesses access high-quality professional services through innovative micro-service solutions.",
    achievements: [
      "Led 1000+ successful digital projects",
      "Expert in Business Process Automation",
      "Specialized in AI-Driven Solutions",
      "International Business Development",
      "Featured Technology Leader",
      "Certified in Advanced Project Management",
    ],
    image: getImagePath("Abubakar Arif"),
  };

  const teamMembers = [
    {
      name: "Shifa Seher",
      role: "COO - Chief Operating Officer",
      specialty: "Operations & Strategic Planning",
      experience: "8+ years",
      image: getImagePath("Shifa Seher"),
    },
    {
      name: "Faizan Waqas",
      role: "General Manager",
      specialty: "Project Management & Operations",
      experience: "2+ years",
      image: getImagePath("Faizan Waqas"),
    },
    // Women Team Members
    {
      name: "Emma Collins",
      role: "Senior Designer",
      specialty: "UI/UX & Brand Identity",
      experience: "6+ years",
      image: getImagePath("Emma Collins"),
    },
    {
      name: "Sophia Martinez",
      role: "Project Manager",
      specialty: "Operations & Client Delivery",
      experience: "9+ years",
      image: "/api/placeholder/200/200",
    },
    {
      name: "Isabella Rossi",
      role: "Content Strategist",
      specialty: "Copywriting & Digital Campaigns",
      experience: "5+ years",
      image: "/api/placeholder/200/200",
    },
    {
      name: "Charlotte Müller",
      role: "Business Analyst",
      specialty: "Market Research & Process Optimization",
      experience: "8+ years",
      image: "/api/placeholder/200/200",
    },
    {
      name: "Olivia Smith",
      role: "HR & Recruitment Lead",
      specialty: "Talent Acquisition & Culture Development",
      experience: "10+ years",
      image: "/api/placeholder/200/200",
    },
    // Men Team Members
    {
      name: "Ethan Johnson",
      role: "Full Stack Developer",
      specialty: "Web Applications & API Development",
      experience: "7+ years",
      image: "/api/placeholder/200/200",
    },
    {
      name: "Lucas Anderson",
      role: "Data Scientist",
      specialty: "AI & Predictive Analytics",
      experience: "4+ years",
      image: "/api/placeholder/200/200",
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
    <div className="min-h-screen">
      <Navigation />
      {/* Header */}
      <section className="bg-gradient-hero py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-foreground mb-6">
            Meet Our Team
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            A passionate group of professionals dedicated to delivering
            exceptional micro-services that drive your business forward.
          </p>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 shadow-hover bg-gradient-hero border-0 cursor-pointer hover:shadow-2xl transition-all duration-300" onClick={() => navigate(`/team/${nameToSlug(ceo.name)}`)}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold text-foreground mb-2">
                    {ceo.name}
                  </h3>
                  <p className="text-2xl text-primary font-semibold mb-4">
                    {ceo.role}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {ceo.bio}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">
                    Key Achievements:
                  </h4>
                  {ceo.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
                      <span className="text-base text-muted-foreground">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/team/${nameToSlug(ceo.name)}`);
                  }}
                >
                  View Full Profile <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-3xl overflow-hidden bg-white shadow-lg">
                    <img
                      src={ceo.image}
                      alt={ceo.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        // Fallback to initials if image not found
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full rounded-3xl bg-gradient-primary flex items-center justify-center"><span class="text-7xl font-bold text-white">AA</span></div>`;
                        }
                      }}
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Expert Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the talented professionals who make our success possible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="p-6 shadow-card hover:shadow-hover transition-all duration-300 group cursor-pointer border-0 hover:scale-105"
                onClick={() => navigate(`/team/${nameToSlug(member.name)}`)}
              >
                <div className="text-center space-y-4">
                  <div className="relative mx-auto w-24 h-24">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          // Fallback to initials if image not found
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const initials = member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("");
                            parent.innerHTML = `<div class="w-full h-full rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center"><span class="text-2xl font-bold text-white">${initials}</span></div>`;
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-primary font-medium text-base mb-1">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-base">
                      {member.specialty}
                    </p>
                  </div>

                  <div className="bg-muted px-3 py-1 rounded-full inline-block mb-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      {member.experience}
                    </span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/team/${nameToSlug(member.name)}`);
                    }}
                  >
                    View Profile <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
            <h2 className="text-4xl font-bold text-foreground text-center mb-12">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {companyValues.map((value, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-2">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Work With Our Team?
          </h2>
          <p className="text-2xl text-muted-foreground mb-8">
            Let's discuss how our expert team can help you achieve your business goals.
          </p>
          <div className="flex justify-center">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transform hover:scale-105 transition-all duration-300">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamPage;
