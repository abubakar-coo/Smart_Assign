import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Mail, Award, Users, Target } from "lucide-react";

const Team = () => {
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
    <section id="team" className="py-8 bg-white">
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

        {/* CEO Section */}
        <div className="mb-8">
          <Card className="p-8 shadow-hover bg-gradient-hero border-0 group">
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
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  {/* CEO 3D Avatar Container with enhanced depth */}
                  <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-primary via-primary/80 to-secondary p-3 shadow-2xl group-hover:rotate-6 transition-all duration-500 group-hover:shadow-3d group-hover:scale-105 avatar-3d-enhanced avatar-depth" 
                       style={{
                         background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 50%, hsl(var(--secondary)) 100%)',
                         boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                         transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)'
                       }}>
                    <div className="w-full h-full rounded-3xl overflow-hidden bg-white relative avatar-inner" 
                         style={{
                           boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                           background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                         }}>
                      {/* CEO 3D Avatar using DiceBear API */}
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ceo.name}&backgroundColor=ffd5dc,b6e3f4,c0aede,d1d4f9,ffdfbf&mood=happy&clothing=shirt&clothingColor=262e33,65c9ff,ff6b6b,4ecdc4,45b7d1&accessoriesProbability=50&facialHairProbability=30&glassesProbability=30&hairColor=0e0e0e,2c1b18,724133,afafaf,ecdcbf,6a4c35,8b4513,a55728,ca8c04,ffdbac,ffd5dc,ecdcbf&skinColor=edb98a,fd9841,fdbcb4,fd9841`}
                        alt={ceo.name}
                        className="w-full h-full object-contain scale-110 group-hover:scale-125 transition-all duration-500 avatar-glow"
                        loading="lazy"
                        style={{
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                          transform: 'translateZ(10px)'
                        }}
                        onError={(e) => {
                          // Fallback to initials if avatar fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                <div class="text-center text-slate-600">
                                  <div class="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg class="w-10 h-10 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                  </div>
                                  <h4 class="text-2xl font-bold">${ceo.name}</h4>
                                  <p class="text-lg opacity-90">${ceo.role}</p>
                                </div>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Enhanced 3D decorative elements for CEO */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg group-hover:animate-bounce group-hover:scale-110 transition-all duration-300"
                       style={{
                         boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                         background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                       }}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full shadow-lg group-hover:animate-pulse group-hover:scale-110 transition-all duration-300"
                       style={{
                         boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                         background: 'linear-gradient(135deg, #475569 0%, #334155 100%)'
                       }}>
                    <span className="text-xs text-white">👑</span>
                  </div>
                  
                  {/* Additional 3D glow effect for CEO */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Team Members */}
        <div className="mb-6">
          <h3 className="text-3xl font-semibold text-foreground text-center mb-12">
            Our Expert Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="p-6 shadow-card hover:shadow-hover transition-all duration-300 group cursor-pointer border-0 hover:scale-105 hover:-translate-y-2"
              >
                <div className="text-center space-y-4">
                  <div className="relative mx-auto w-32 h-32">
                    {/* 3D Avatar Container with enhanced depth */}
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-primary/80 to-secondary p-2 shadow-2xl group-hover:rotate-6 transition-all duration-500 group-hover:shadow-3d group-hover:scale-105 avatar-3d-enhanced avatar-depth" 
                         style={{
                           background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 50%, hsl(var(--secondary)) 100%)',
                           boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                           transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)'
                         }}>
                      <div className="w-full h-full rounded-full overflow-hidden bg-white relative avatar-inner" 
                           style={{
                             boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                             background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                           }}>
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}&backgroundColor=ffd5dc,b6e3f4,c0aede,d1d4f9,ffdfbf&mood=happy&clothing=shirt&clothingColor=262e33,65c9ff,ff6b6b,4ecdc4,45b7d1&accessoriesProbability=40&facialHairProbability=25&glassesProbability=25&hairColor=0e0e0e,2c1b18,724133,afafaf,ecdcbf,6a4c35,8b4513,a55728,ca8c04,ffdbac,ffd5dc,ecdcbf&skinColor=edb98a,fd9841,fdbcb4,fd9841`}
                          alt={member.name}
                          className="w-full h-full object-contain scale-110 group-hover:scale-125 transition-all duration-500 avatar-glow"
                          loading="lazy"
                          style={{
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                            transform: 'translateZ(10px)'
                          }}
                          onError={(e) => {
                            // Fallback to initials if avatar fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                  <span class="text-3xl font-bold text-slate-600">
                                    ${member.name.split(" ").map((n) => n[0]).join("")}
                                  </span>
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Enhanced 3D decorative elements */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg group-hover:animate-bounce group-hover:scale-110 transition-all duration-300"
                         style={{
                           boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                           background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                         }}>
                      <span className="text-sm text-white">💼</span>
                    </div>
                    
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full shadow-lg group-hover:animate-pulse group-hover:scale-110 transition-all duration-300"
                         style={{
                           boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                           background: 'linear-gradient(135deg, #475569 0%, #334155 100%)'
                         }}></div>
                    
                    {/* Additional 3D glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
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

                  <div className="bg-muted px-3 py-1 rounded-full inline-block">
                    <span className="text-sm font-medium text-muted-foreground">
                      {member.experience}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Values */}
        <div className="bg-gradient-hero p-8 rounded-3xl">
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
    </section>
  );
};

export default Team;
