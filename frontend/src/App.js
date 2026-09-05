import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import { useLenis } from "@/hooks/useLenis";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Manifesto } from "@/components/site/Manifesto";
import { Services } from "@/components/site/Services";
import { ServiceArea } from "@/components/site/ServiceArea";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

function App() {
  useLenis();
  return (
    <div className="App grain bg-base">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <ServiceArea />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
