import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Features from "@/components/Features";
import Projects from "@/components/Projects";
import OrganizationWorks from "@/components/OrganizationWorks";
import SkillSet from "@/components/SkillSet";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AdaptivePointer from "@/components/AdaptivePointer";

const Index = () => {
  return (
    <>
      <Navbar />
      {/* Sections alternate between the page background and the surface band */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Features />
        <Projects />
        <OrganizationWorks />
        <SkillSet />
        <Contact />
      </main>
      <Footer />
      <AdaptivePointer />
    </>
  );
};

export default Index;
