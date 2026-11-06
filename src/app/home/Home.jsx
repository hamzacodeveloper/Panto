import ExperienceSection from "../../components/home/ExperienceSection";
import FeaturesSection from "../../components/home/FeaturesSection";
import FooterSection from "../../components/home/FooterSection";
import HeroSection from "../../components/home/HeroSection";
import MaterialsSection from "../../components/home/MaterialsSection";
import PantoPageShell from "../../components/home/PantoPageShell";
import ProductsSection from "../../components/home/ProductsSection";
import TestimonialsSection from "../../components/home/TestimonialsSection";

export default function Home({ shopDetails, shopDetailsError }) {
  return (
    <PantoPageShell>
      <HeroSection />
      <FeaturesSection />
      <ProductsSection
        categories={shopDetails?.categories ?? []}
        products={shopDetails?.products ?? []}
        shopDetailsError={shopDetailsError}
      />
      <ExperienceSection />
      <MaterialsSection />
      <TestimonialsSection />
      <FooterSection />
    </PantoPageShell>
  );
}
