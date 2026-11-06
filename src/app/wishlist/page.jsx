import FooterSection from "../../components/home/FooterSection";
import HeroSection from "../../components/home/HeroSection";
import PantoPageShell from "../../components/home/PantoPageShell";
import WishlistContent from "../../components/home/WishlistContent";

export const metadata = {
  title: "Wishlist | Panto",
  description: "View the furniture you have saved to your Panto wishlist.",
};

export default function WishlistPage() {
  return (
    <PantoPageShell>
      <HeroSection
        compact
        showHotspots={false}
        showSearch={false}
        titleLines={["Your Wishlist"]}
        description="Keep the pieces you love close at hand."
      />
      <WishlistContent />
      <FooterSection />
    </PantoPageShell>
  );
}
