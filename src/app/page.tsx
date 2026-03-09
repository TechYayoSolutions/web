import Hero from "@/components/sections/Hero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import AIFeatures from "@/components/sections/AIFeatures";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <AIFeatures />
      <ContactCTA />
    </>
  );
}
