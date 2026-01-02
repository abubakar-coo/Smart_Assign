import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Smart Assign - Official Digital Agency & SEO Writing Services</title>
        <meta property="og:site_name" content="Smart Assign" />
      </Helmet>
      <Navigation />
      <Hero />
      <Services />
      <Team />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
