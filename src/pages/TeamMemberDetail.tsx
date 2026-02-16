import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Award, Briefcase, Target, 
  Users, TrendingUp, Mail, Linkedin, 
  Calendar, MapPin, Star, CheckCircle
} from "lucide-react";

// Helper function to create URL-friendly slug from name
const nameToSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/ü/g, 'u') // Replace ü with u
    .replace(/ö/g, 'o') // Replace ö with o
    .replace(/ä/g, 'a') // Replace ä with a
    .replace(/\s+/g, '-');
};

// Helper function to get image path from name
const getImagePath = (name: string): string => {
  // Try to match exact file names in team folder
  const nameMap: { [key: string]: string } = {
    "Abubakar Arif": "abubakar-arif",
    "Shifa Seher": "Shifa-Seher",
    "Faizan Waqas": "Faizan-Waqas",
    "Emma Collins": "Emma-Collins",
    "Charlotte Müller": "Charlotte-Müller",
    "Ethan Johnson": "Ethan-Johnson",
    "Isabella Rossi": "Isabella-Rossi",
    "Olivia Smith": "Olivia-Smith",
    "Sophia Martinez": "Sophia-Martinez",
    "Lucas Anderson": "Lucas-Anderson",
  };
  
  const fileName = nameMap[name] || nameToSlug(name);
  return `/images/team/${fileName}.png`;
};

// All team members with detailed information
const allTeamMembers = {
  "abubakar-arif": {
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
    experience: "10+ years",
    location: "Remote",
    email: "smartassign01@gmail.com",
    linkedin: "#",
    specialties: [
      "Digital Transformation",
      "Business Automation",
      "AI-Driven Solutions",
      "Strategic Planning",
      "International Business Development"
    ],
    education: "Advanced Project Management Certification",
    keyProjects: [
      "Led transformation of 100+ businesses",
      "Developed AI-powered service platforms",
      "Established international partnerships"
    ]
  },
  "shifa-seher": {
    name: "Shifa Seher",
    role: "COO - Chief Operating Officer",
    bio: "Strategic operations leader with 8+ years of experience in optimizing business processes and driving operational excellence. Shifa ensures seamless service delivery and maintains the highest standards of quality across all operations.",
    achievements: [
      "Optimized operations for 500+ projects",
      "Reduced operational costs by 30%",
      "Implemented quality assurance frameworks",
      "Led cross-functional teams of 50+ members",
      "Streamlined service delivery processes"
    ],
    experience: "8+ years",
    location: "Remote",
    email: "smartassign01@gmail.com",
    linkedin: "#",
    specialties: [
      "Operations Management",
      "Strategic Planning",
      "Process Optimization",
      "Quality Assurance",
      "Team Leadership"
    ],
    education: "Business Administration & Operations Management",
    keyProjects: [
      "Designed operational workflows for all services",
      "Implemented quality control systems",
      "Led process improvement initiatives"
    ]
  },
  "faizan-waqas": {
    name: "Faizan Waqas",
    role: "General Manager",
    bio: "Dedicated project management professional with 2+ years of experience in coordinating complex projects and ensuring timely delivery. Faizan manages day-to-day operations and client relationships with precision and care.",
    achievements: [
      "Managed 200+ successful projects",
      "Maintained 99% client satisfaction rate",
      "Improved project delivery time by 25%",
      "Coordinated multi-service projects",
      "Established efficient communication channels"
    ],
    experience: "2+ years",
    location: "Remote",
    email: "smartassign01@gmail.com",
    linkedin: "#",
    specialties: [
      "Project Management",
      "Operations Coordination",
      "Client Relations",
      "Team Coordination",
      "Process Management"
    ],
    education: "Project Management & Business Administration",
    keyProjects: [
      "Coordinated large-scale service deliveries",
      "Managed client onboarding processes",
      "Optimized project workflows"
    ]
  },
  "emma-collins": {
    name: "Emma Collins",
    role: "Senior Designer",
    bio: "Creative design professional with 6+ years of experience in UI/UX design and brand identity development. Emma creates visually stunning designs that enhance user experience and strengthen brand presence.",
    achievements: [
      "Designed 300+ successful brand identities",
      "Created award-winning UI/UX interfaces",
      "Led design teams for major projects",
      "Specialized in Canva and Adobe Creative Suite",
      "Improved user engagement through design"
    ],
    experience: "6+ years",
    location: "Remote",
    email: "smartassign01@gmail.com",
    linkedin: "#",
    specialties: [
      "UI/UX Design",
      "Brand Identity",
      "Canva Design",
      "Graphic Design",
      "Visual Communication"
    ],
    education: "Graphic Design & Visual Arts",
    keyProjects: [
      "Developed brand identities for 100+ clients",
      "Created user-friendly interface designs",
      "Designed marketing materials and presentations"
    ]
  },
  "sophia-martinez": {
    name: "Sophia Martinez",
    role: "Project Manager",
    bio: "Experienced project management professional with 9+ years of expertise in operations and client delivery. Sophia ensures projects are completed on time, within budget, and exceed client expectations.",
    achievements: [
      "Delivered 500+ successful projects",
      "Maintained 98% on-time delivery rate",
      "Managed projects worth $2M+",
      "Led international project teams",
      "Implemented agile project methodologies"
    ],
    experience: "9+ years",
    location: "Remote",
    email: "smartassign01@gmail.com",
    linkedin: "#",
    specialties: [
      "Project Management",
      "Operations Management",
      "Client Delivery",
      "Agile Methodologies",
      "Team Leadership"
    ],
    education: "Project Management Professional (PMP) Certified",
    keyProjects: [
      "Managed complex multi-service projects",
      "Coordinated international client deliveries",
      "Implemented project tracking systems"
    ]
  },
  "isabella-rossi": {
    name: "Isabella Rossi",
    role: "Content Strategist",
    bio: "Creative content professional with 5+ years of experience in copywriting and digital campaign development. Isabella crafts compelling content that engages audiences and drives business results.",
    achievements: [
      "Created 1000+ pieces of content",
      "Increased engagement rates by 200%",
      "Developed content strategies for 50+ brands",
      "Specialized in SEO content writing",
      "Led content marketing campaigns"
    ],
    experience: "5+ years",
    location: "Remote",
    email: "smartassign01@gmail.com",
    linkedin: "#",
    specialties: [
      "Content Strategy",
      "Copywriting",
      "SEO Content Writing",
      "Digital Campaigns",
      "Content Marketing"
    ],
    education: "Marketing & Communications",
    keyProjects: [
      "Developed content strategies for major brands",
      "Created SEO-optimized blog content",
      "Managed social media content campaigns"
    ]
  },
  "charlotte-muller": {
    name: "Charlotte Müller",
    role: "Business Analyst",
    bio: "Analytical professional with 8+ years of experience in market research and process optimization. Charlotte provides data-driven insights that help businesses make informed decisions and improve performance.",
    achievements: [
      "Conducted 200+ market research studies",
      "Optimized processes for 100+ businesses",
      "Identified cost-saving opportunities worth $500K+",
      "Developed analytical frameworks",
      "Provided strategic business insights"
    ],
    experience: "8+ years",
    location: "Remote",
    email: "smartassign01@gmail.com",
    linkedin: "#",
    specialties: [
      "Market Research",
      "Process Optimization",
      "Data Analysis",
      "Business Intelligence",
      "Strategic Analysis"
    ],
    education: "Business Analytics & Data Science",
    keyProjects: [
      "Conducted comprehensive market research",
      "Optimized business processes",
      "Developed analytical dashboards"
    ]
  },
  "olivia-smith": {
    name: "Olivia Smith",
    role: "HR & Recruitment Lead",
    bio: "Human resources expert with 10+ years of experience in talent acquisition and culture development. Olivia builds high-performing teams and fosters a positive work environment that drives success.",
    achievements: [
      "Recruited 200+ talented professionals",
      "Reduced employee turnover by 40%",
      "Developed comprehensive HR policies",
      "Built diverse and inclusive teams",
      "Implemented employee development programs"
    ],
    experience: "10+ years",
    location: "Remote",
    email: "smartassign01@gmail.com",
    linkedin: "#",
    specialties: [
      "Talent Acquisition",
      "Culture Development",
      "Employee Relations",
      "HR Strategy",
      "Team Building"
    ],
    education: "Human Resources Management",
    keyProjects: [
      "Developed recruitment strategies",
      "Created employee engagement programs",
      "Built comprehensive HR frameworks"
    ]
  },
  "ethan-johnson": {
    name: "Ethan Johnson",
    role: "Full Stack Developer",
    bio: "Technical expert with 7+ years of experience in web application and API development. Ethan builds robust, scalable solutions that power our digital infrastructure and enhance user experience.",
    achievements: [
      "Developed 50+ web applications",
      "Built scalable API architectures",
      "Improved system performance by 300%",
      "Led technical development teams",
      "Implemented best coding practices"
    ],
    experience: "7+ years",
    location: "Remote",
    email: "smartassign01@gmail.com",
    linkedin: "#",
    specialties: [
      "Web Development",
      "API Development",
      "Full Stack Development",
      "System Architecture",
      "Technical Leadership"
    ],
    education: "Computer Science & Software Engineering",
    keyProjects: [
      "Developed company website and platforms",
      "Built API systems for service delivery",
      "Created internal management tools"
    ]
  },
  "lucas-anderson": {
    name: "Lucas Anderson",
    role: "Data Scientist",
    bio: "Data science professional with 4+ years of experience in AI and predictive analytics. Lucas leverages advanced analytics to drive data-driven decisions and create intelligent solutions.",
    achievements: [
      "Developed 30+ AI models",
      "Improved prediction accuracy by 85%",
      "Analyzed datasets with millions of records",
      "Created automated analytics systems",
      "Published research in data science"
    ],
    experience: "4+ years",
    location: "Remote",
    email: "smartassign01@gmail.com",
    linkedin: "#",
    specialties: [
      "AI & Machine Learning",
      "Predictive Analytics",
      "Data Analysis",
      "Statistical Modeling",
      "Data Visualization"
    ],
    education: "Data Science & Artificial Intelligence",
    keyProjects: [
      "Developed AI-powered analytics tools",
      "Created predictive models for business insights",
      "Built data visualization dashboards"
    ]
  }
};

const TeamMemberDetail = () => {
  const { memberName } = useParams();
  const navigate = useNavigate();

  // Find team member by slug
  const member = memberName ? allTeamMembers[memberName as keyof typeof allTeamMembers] : null;

  if (!member) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Team Member Not Found</h1>
          <p className="text-muted-foreground mb-8">The team member you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/team")}>Back to Team</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-hero py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/team")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Team
          </Button>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={getImagePath(member.name)}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Fallback to DiceBear if local image not found
                      const target = e.target as HTMLImageElement;
                      target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}&backgroundColor=ffd5dc,b6e3f4,c0aede,d1d4f9,ffdfbf&mood=happy&clothing=shirt&clothingColor=262e33,65c9ff,ff6b6b,4ecdc4,45b7d1&accessoriesProbability=50&facialHairProbability=30&glassesProbability=30&hairColor=0e0e0e,2c1b18,724133,afafaf,ecdcbf,6a4c35,8b4513,a55728,ca8c04,ffdbac,ffd5dc,ecdcbf&skinColor=edb98a,fd9841,fdbcb4,fd9841`;
                      target.className = "w-full h-full object-contain scale-110";
                    }}
                  />
                </div>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-bold text-foreground mb-3">
                  {member.name}
                </h1>
                <p className="text-3xl text-primary font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">{member.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{member.location}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-primary hover:underline">
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </a>
                {member.linkedin !== "#" && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Achievements */}
              <Card className="p-8 shadow-card">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  Key Achievements
                </h2>
                <div className="space-y-4">
                  {member.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Key Projects */}
              <Card className="p-8 shadow-card">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  Key Projects
                </h2>
                <div className="space-y-4">
                  {member.keyProjects.map((project, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-primary mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground leading-relaxed">{project}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Specialties */}
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Education */}
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Education
                </h3>
                <p className="text-muted-foreground">{member.education}</p>
              </Card>

              {/* Contact */}
              <Card className="p-6 shadow-card bg-gradient-hero">
                <h3 className="text-xl font-bold text-foreground mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-primary hover:underline">
                    <Mail className="w-5 h-5" />
                    <span>{member.email}</span>
                  </a>
                  {member.linkedin !== "#" && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamMemberDetail;

