import ContactSection from "../../components/home/ContactSection";
import FooterSection from "../../components/home/FooterSection";
import HeroSection from "../../components/home/HeroSection";
import PantoPageShell from "../../components/home/PantoPageShell";

export const metadata = {
  title: "Contact Panto | We’re Here to Help",
  description:
    "Get in touch with Panto about furniture, materials, and making your space feel like home.",
};

export default function ContactPage() {
  return (
    <PantoPageShell>
      <HeroSection
        compact
        showHotspots={false}
        showSearch={false}
        titleLines={["Let’s make room for", "better living"]}
        description="Questions, ideas, or just looking for inspiration? We’d love to hear from you."
      />
      <ContactSection />
      <FooterSection />
    </PantoPageShell>
  );
}
