import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
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
        <main className="relative">
          <Hero />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
};

export default Index;
