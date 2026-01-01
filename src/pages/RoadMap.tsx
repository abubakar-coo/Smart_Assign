import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, CheckCircle2, Clock, ArrowRight, 
  Rocket, Target, Sparkles, Zap, TrendingUp, 
  Users, Globe, Award, Lightbulb
} from "lucide-react";

const RoadMap = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Foundation & Expansion",
      status: "in-progress",
      timeline: "Q1 2026 (January - March)",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
      items: [
        {
          title: "Fixed Job Contracts",
          description: "Launching a dedicated portal for long-term contracts where professionals can secure steady monthly income rather than one-off projects.",
          status: "planned"
        },
        {
          title: "Client Vetting",
          description: "Implementing a rigorous verification process for employers to ensure they offer guaranteed work volumes.",
          status: "in-progress"
        },
        {
          title: "Talent Security",
          description: "Bridging the gap between freelancing freedom and corporate job security.",
          status: "planned"
        }
      ]
    },
    {
      phase: "Phase 2",
      title: "Innovation & Growth",
      status: "planned",
      timeline: "Q2 2026 (April - June)",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      items: [
        {
          title: "0% Commission Model",
          description: "Eliminating service fees for freelancers and agencies. You keep 100% of what you earn.",
          status: "planned"
        },
        {
          title: "Direct Transactions",
          description: "Enabling a transparent payment structure where no hidden cuts are taken from project budgets.",
          status: "planned"
        },
        {
          title: "Barrier-Free Entry",
          description: "Encouraging high-quality talent and businesses to join the ecosystem without the worry of platform taxes.",
          status: "planned"
        }
      ]
    },
    {
      phase: "Phase 3",
      title: "Technology & Scale",
      status: "planned",
      timeline: "Q3 2026 (July - September)",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      items: [
        {
          title: "Native iOS & Android Apps",
          description: "Launching a high-performance mobile application for on-the-go project management.",
          status: "planned"
        },
        {
          title: "Real-Time Connectivity",
          description: "Instant push notifications for job updates, messages, and order status changes.",
          status: "planned"
        },
        {
          title: "Mobile Workspace",
          description: "A complete suite of tools allowing you to hire, work, and track progress directly from your pocket.",
          status: "planned"
        }
      ]
    },
    {
      phase: "Phase 4",
      title: "Global Leadership",
      status: "planned",
      timeline: "Q4 2026 (October - December)",
      icon: Globe,
      color: "from-green-500 to-emerald-500",
      items: [
        {
          title: "Smart Automation Bots",
          description: "AI Agents that can handle repetitive tasks, schedule meetings, and organize files automatically.",
          status: "planned"
        },
        {
          title: "Intelligent Matching",
          description: "An advanced AI algorithm that instantly pairs the perfect talent with the right job based on skills and history.",
          status: "planned"
        },
        {
          title: "24/7 Virtual Support",
          description: "AI-driven support that resolves queries and manages workflows around the clock, ensuring zero downtime.",
          status: "planned"
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 text-white">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500 text-white">In Progress</Badge>;
      default:
        return <Badge variant="outline">Planned</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-hero py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-foreground mb-6">
            Our Road Map
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our strategic vision and upcoming innovations. We're committed to continuous 
            improvement and delivering exceptional value to our clients.
          </p>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Roadmap Items */}
            <div className="space-y-16">
              {roadmapItems.map((phase, phaseIndex) => {
                const PhaseIcon = phase.icon;
                const isPhase1 = phaseIndex === 0; // Phase 1 (index 0)
                const isPhase2 = phaseIndex === 1; // Phase 2 (index 1)
                const isPhase4 = phaseIndex === 3; // Phase 4 (index 3)
                const isRightAligned = isPhase2 || isPhase4; // Phase 2 and Phase 4
                const isLeftAligned = isPhase1; // Phase 1
                const backgroundImage = `/images/roadmap/phase-${phaseIndex + 1}-background.png`;

                return (
                  <div
                    key={phaseIndex}
                    className="relative"
                  >
                    {/* Content Card */}
                    <div className="w-full">
                      <div className="w-full">
                        <Card className="p-8 shadow-card hover:shadow-hover transition-all duration-300 border-0 h-full relative overflow-hidden">
                          {/* Background Image - Hidden on Mobile */}
                          <div
                            className="absolute inset-0 z-0 bg-no-repeat bg-center hidden md:block"
                            style={{
                              backgroundImage: `url(${backgroundImage})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              imageRendering: 'auto' as const,
                              willChange: 'transform',
                            } as React.CSSProperties}
                          />

                          {/* Content */}
                          <div className={`relative z-10 ${isRightAligned ? 'md:ml-auto md:w-1/2' : ''} ${isLeftAligned ? 'md:w-1/2' : ''}`}>
                        {/* Phase Header */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="secondary" className="text-sm">
                              {phase.phase}
                            </Badge>
                            {getStatusBadge(phase.status)}
                          </div>
                          <h2 className="text-2xl font-bold text-foreground mb-2">
                            {phase.title}
                          </h2>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{phase.timeline}</span>
                          </div>
                        </div>

                        {/* Phase Items */}
                        <div className="space-y-4">
                          {phase.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex gap-4 p-4 rounded-lg bg-gradient-hero/30 hover:bg-gradient-hero/50 transition-colors"
                            >
                              <div className="flex-shrink-0 mt-1">
                                {getStatusIcon(item.status)}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground mb-1">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      </Card>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-12 shadow-2xl border-0 bg-white/95">
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Our Vision for the Future
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We envision a future where businesses of all sizes have access to world-class 
                professional services at their fingertips. Our roadmap reflects our commitment 
                to innovation, quality, and client success. Every feature, every improvement, 
                and every expansion is designed with our clients' needs at the center.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 rounded-xl bg-gradient-hero/30">
                  <TrendingUp className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Continuous Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Expanding our services and reaching new markets
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl bg-gradient-hero/30">
                  <Award className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Excellence First</h3>
                  <p className="text-sm text-muted-foreground">
                    Maintaining the highest standards in everything we do
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl bg-gradient-hero/30">
                  <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Client-Centric</h3>
                  <p className="text-sm text-muted-foreground">
                    Putting our clients' success at the heart of our strategy
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Be Part of Our Journey
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join us as we build the future of professional micro-services. 
            Your feedback shapes our roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-hover"
              onClick={() => window.location.href = "/contact"}
            >
              Share Your Ideas
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = "/services"}
            >
              Explore Our Services
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RoadMap;

