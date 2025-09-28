import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Jennifer Adams",
      company: "TechStart Inc.",
      role: "Marketing Director",
      rating: 5,
      text: "Smart Assign transformed our content strategy completely. Their video editing and social media content creation helped us increase engagement by 300%. The team is professional and always delivers on time.",
      service: "Video Editing & Content Creation",
      avatar: "JA"
    },
    {
      name: "Robert Chen",
      company: "Global Consulting",
      role: "Operations Manager", 
      rating: 5,
      text: "We needed to migrate 15,000 customer records and reorganize our entire database. Smart Assign completed the project flawlessly with zero data loss. Their attention to detail is remarkable.",
      service: "Data Entry & Management",
      avatar: "RC"
    },
    {
      name: "Maria Gonzalez",
      company: "Creative Agency Plus",
      role: "CEO",
      rating: 5,
      text: "The assignment work and research projects delivered by Smart Assign exceeded our expectations. They helped us secure three major clients with their comprehensive market analysis reports.",
      service: "Assignment Work & Research",
      avatar: "MG"
    },
    {
      name: "David Thompson",
      company: "E-commerce Solutions",
      role: "Digital Marketing Head",
      rating: 5,
      text: "Their AI prompt writing service revolutionized our content automation. We now generate high-quality marketing copy 5x faster. The ROI has been incredible.",
      service: "Prompt Writing & AI Content",
      avatar: "DT"
    },
    {
      name: "Lisa Parker",
      company: "Boutique Law Firm",
      role: "Managing Partner",
      rating: 5,
      text: "From legal document formatting to social media graphics, Smart Assign handled our complete brand refresh. Professional, reliable, and extremely talented team.",
      service: "Mixed Services Package",
      avatar: "LP"
    },
    {
      name: "Alex Rodriguez",
      company: "StartupHub",
      role: "Founder",
      rating: 5,
      text: "As a startup, we needed quality services without breaking the bank. Smart Assign delivered exceptional work across multiple areas and helped us establish a strong market presence.",
      service: "Complete Service Package",
      avatar: "AR"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const stats = [
    { label: "Client Satisfaction", value: "98%" },
    { label: "Projects Completed", value: "1,200+" },
    { label: "Repeat Clients", value: "85%" },
    { label: "Average Rating", value: "4.9/5" },
  ];

  return (
    <section id="testimonials" className="py-8 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what business leaders and 
            entrepreneurs have to say about working with Smart Assign.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center shadow-card bg-white/80 backdrop-blur-sm border-0">
              <div className="text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-base text-muted-foreground">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Featured Testimonial */}
        <div className="mb-6">
          <Card className="p-8 md:p-12 shadow-hover bg-white/90 backdrop-blur-sm border-0 relative overflow-hidden">
            <div className="absolute top-6 left-6 text-primary/20">
              <Quote className="w-16 h-16" />
            </div>
            
            <div className="relative z-10">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl text-foreground leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  
                  <div className="bg-muted px-4 py-2 rounded-full inline-block">
                    <span className="text-base font-medium text-muted-foreground">
                      Service: {testimonials[currentTestimonial].service}
                    </span>
                  </div>
                </div>

                <div className="text-center lg:text-right space-y-4">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto lg:ml-auto">
                    <span className="text-3xl font-bold text-white">
                      {testimonials[currentTestimonial].avatar}
                    </span>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-foreground text-xl">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-primary font-medium">
                      {testimonials[currentTestimonial].role}
                    </div>
                    <div className="text-muted-foreground text-base">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial 
                          ? 'bg-primary' 
                          : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <Card 
              key={index} 
              className={`p-6 shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer border-0 ${
                index === currentTestimonial 
                  ? 'bg-white ring-2 ring-primary' 
                  : 'bg-white/80 backdrop-blur-sm'
              }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {testimonial.avatar}
                    </span>
                  </div>
                </div>
                
                <p className="text-base text-muted-foreground leading-relaxed">
                  {testimonial.text.substring(0, 120)}...
                </p>
                
                <div>
                  <div className="font-medium text-foreground text-base">
                    {testimonial.name}
                  </div>
                  <div className="text-base text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;