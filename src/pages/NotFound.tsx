import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CaretRight } from "@phosphor-icons/react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-headline">This page can't be found.</h1>
        <p className="mt-4 text-lede text-muted-foreground">The link may be broken, or the page may have moved.</p>
        <a href="/" className="chevron-link mt-8 text-[17px]">
          Go to the home page
          <CaretRight weight="bold" className="h-3.5 w-3.5" />
        </a>
      </div>
    </main>
  );
};

export default NotFound;
