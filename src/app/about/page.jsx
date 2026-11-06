import ExperienceSection from "../../components/home/ExperienceSection";
import FeaturesSection from "../../components/home/FeaturesSection";
import FooterSection from "../../components/home/FooterSection";
import HeroSection from "../../components/home/HeroSection";
import MaterialsSection from "../../components/home/MaterialsSection";
import PantoPageShell from "../../components/home/PantoPageShell";
import TestimonialsSection from "../../components/home/TestimonialsSection";

export const metadata = {
  title: "About Panto | Thoughtful Modern Furniture",
  description:
    "Discover Panto’s approach to thoughtful design, lasting materials, and comfortable modern living.",
};

export default function AboutPage() {
  return (
    <PantoPageShell>
      <HeroSection
        compact
        showHotspots={false}
        showSearch={false}
        titleLines={["Furniture for living well"]}
        description="Thoughtful design, lasting materials, and comfortable spaces made for everyday life."
      />
      <FeaturesSection />
      <ExperienceSection />
      <MaterialsSection />
      <TestimonialsSection />
      <FooterSection />
    </PantoPageShell>
  );
}
