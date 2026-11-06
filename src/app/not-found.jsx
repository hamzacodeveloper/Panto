import Image from "next/image";
import Link from "next/link";
import FooterSection from "../components/home/FooterSection";
import PantoPageShell from "../components/home/PantoPageShell";

export default function NotFound() {
  return (
    <PantoPageShell>
      <div className="panto-not-found-page">
        <header className="panto-not-found-header">
          <Link className="panto-not-found-logo" href="/home" aria-label="Panto home">
            Panto
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/shop">Shop</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        <div className="panto-not-found-main">
          <section className="panto-not-found-copy" aria-labelledby="not-found-title">
            <p className="panto-not-found-eyebrow">
              <span aria-hidden="true" />
              Looks like you took a wrong turn
            </p>
            <p className="panto-not-found-code" aria-hidden="true">
              404
            </p>
            <h1 id="not-found-title">This page is missing.</h1>
            <p className="panto-not-found-description">
              We can’t find the page you’re looking for. Let’s get you back to a
              more comfortable place.
            </p>
            <div className="panto-not-found-actions">
              <Link className="panto-not-found-home-link" href="/home">
                Back to home <span aria-hidden="true">→</span>
              </Link>
              <Link className="panto-not-found-shop-link" href="/shop">
                Browse furniture
              </Link>
            </div>
          </section>

          <div className="panto-not-found-art" aria-hidden="true">
            <div className="panto-not-found-orbit" />
            <Image
              className="panto-not-found-chair"
              src="/images/home/imgSakariasArmchairBlackSpordaDarkGray0729767Pe737131S5Adobespark.png"
              alt=""
              width={560}
              height={560}
              priority
            />
            <div className="panto-not-found-note">
              <span className="panto-not-found-note-dot" />
              <span>Find your way back to comfort</span>
            </div>
          </div>
        </div>

        <FooterSection />
      </div>
    </PantoPageShell>
  );
}
