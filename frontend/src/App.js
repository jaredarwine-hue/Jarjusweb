import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useLenis } from "@/hooks/useLenis";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Manifesto } from "@/components/site/Manifesto";
import { Services } from "@/components/site/Services";
import { Seasonal } from "@/components/site/Seasonal";
import { Gallery } from "@/components/site/Gallery";
import { ServiceArea } from "@/components/site/ServiceArea";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import Inbox from "@/pages/Inbox";

function Home() {
  useLenis();
  return (
    <div className="App grain bg-base">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Seasonal />
        <Gallery />
        <ServiceArea />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
