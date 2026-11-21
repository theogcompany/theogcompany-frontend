import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Shift } from "@/components/sections/Shift";
import { OriginStory } from "@/components/sections/OriginStory";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Tracking } from "@/components/sections/Tracking";
import { WhyUs } from "@/components/sections/WhyUs";
import { WhoFor } from "@/components/sections/WhoFor";
import { OurPromise } from "@/components/sections/Promise";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { MobileStickyCTA } from "@/components/sections/MobileStickyCTA";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Shift />
        <OriginStory />
        <Services />
        <HowItWorks />
        <Tracking />
        <WhyUs />
        <WhoFor />
        <OurPromise />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
