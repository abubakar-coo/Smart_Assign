import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MainServices from "@/components/MainServices";

const MainServicesPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Main Services | Smart Assign</title>
        <meta
          name="description"
          content="Explore Smart Assign main services including social media marketing, SEO, content marketing, paid advertising, and more."
        />
        <meta property="og:title" content="Main Services | Smart Assign" />
      </Helmet>

      <Navigation />

      <section className="bg-gradient-hero py-20 mt-16 relative overflow-hidden">
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Main Services
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Our core services designed to grow your business with modern digital strategies.
            </p>
          </div>
        </div>
      </section>

      <MainServices showAll={true} />

      <Footer />
    </div>
  );
};

export default MainServicesPage;


