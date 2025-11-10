import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import CursorFollower from "@/components/CursorFollower";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Features from "@/components/Features";
import Projects from "@/components/Projects";
import OrganizationWorks from "@/components/OrganizationWorks";
import SkillSet from "@/components/SkillSet";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      {!loading && (
        <>
          {/* Fixed Spline 3D Background */}
          <div className="fixed inset-0 z-0">
            <iframe
              src="https://my.spline.design/liquidglass-rM3o93P8ISaWcg143hDOgO2T-RtD/"
              className="h-full w-full"
              title="Liquid Glass 3D Background"
              style={{ border: 0 }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60 pointer-events-none" />
          </div>
          
          <CursorFollower />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <About />
            <Experience />
            <Features />
            <Projects />
            <OrganizationWorks />
            <SkillSet />
            <Contact />
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
