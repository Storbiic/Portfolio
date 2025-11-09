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
          <CursorFollower />
          <Navbar />
          <main className="relative">
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
