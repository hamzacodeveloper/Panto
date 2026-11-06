import Image from "next/image";
import Link from "next/link";
import WishlistNavigationLink from "./WishlistNavigationLink";

const navigation = [
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const defaultTitleLines = [
  "Make your interior more",
  "minimalistic & modern",
];

export default function HeroSection({
  titleLines = defaultTitleLines,
  description = "Turn your room with panto into a lot more minimalist and modern with ease and speed",
  compact = false,
  showSearch = true,
  showHotspots = true,
}) {
  return (
    <section
      className={`panto-hero${compact ? " panto-hero-compact" : ""}`}
      id="top"
      aria-labelledby="hero-title"
    >
      <Image
        className={"panto-hero-image"}
        src="/images/home/imgRectangle1441-high-res.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className={"panto-hero-shade"} aria-hidden="true" />

      <header className={"panto-header"}>
        <Link className={"panto-brand"} href="/home" aria-label="Panto home">
          Panto
        </Link>
        <nav className={"panto-navigation"} aria-label="Main navigation">
          <Link className={"panto-nav-furniture"} href="/shop">
            Furniture
            <Image
              src="/images/home/imgEvaArrowIosBackOutline.svg"
              width={18}
              height={18}
              alt=""
              aria-hidden="true"
            />
          </Link>
          {navigation.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
          <WishlistNavigationLink />
        </nav>
        <Link className={"panto-cart-link"} href="/shop" aria-label="Shopping bag">
          <Image
            src="/images/home/imgBag.svg"
            width={34}
            height={34}
            alt=""
            aria-hidden="true"
          />
          <Image
            className="panto-cart-count"
            src="/images/home/imgGroup48095384.svg"
            width={20}
            height={25}
            alt=""
            aria-hidden="true"
          />
        </Link>
        <details className={"panto-mobile-navigation"}>
          <summary aria-label="Open navigation menu">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            <Link href="/shop">Furniture</Link>
            {navigation.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
            <WishlistNavigationLink />
          </nav>
        </details>
      </header>

      <h1 className={"panto-hero-title"} id="hero-title">
        {titleLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h1>
      <p className={"panto-hero-copy"}>{description}</p>
      {showSearch && (
        <form className={"panto-search-form"} action="#products">
          <label className={"panto-visually-hidden"} htmlFor="furniture-search">
            Search furniture
          </label>
          <input
            id="furniture-search"
            name="q"
            type="search"
            placeholder="Search furniture"
          />
          <button type="submit" aria-label="Search furniture">
            <Image
              src="/images/home/imgGroup.svg"
              width={18}
              height={18}
              alt=""
              aria-hidden="true"
            />
          </button>
        </form>
      )}

      {showHotspots && (
        <div className={"panto-hero-hotspots"} aria-hidden="true">
          <Image
            src="/images/home/imgGroup48095388.svg"
            width={32}
            height={32}
            alt=""
          />
          <Image
            src="/images/home/imgGroup48095393.svg"
            width={32}
            height={32}
            alt=""
          />
          <Image
            src="/images/home/imgGroup48095394.svg"
            width={37}
            height={37}
            alt=""
          />
          <div className="panto-hero-controls">
            <Image
              className="panto-hero-controls-bubble"
              src="/images/home/imgUnion.svg"
              width={112}
              height={56}
              alt=""
            />
            <div className="panto-hero-controls-options">
              <span>
                <Image
                  src="/images/home/imgEllipse211.svg"
                  width={36}
                  height={36}
                  alt=""
                />
              </span>
              <span>
                <Image
                  src="/images/home/imgEllipse212.svg"
                  width={36}
                  height={36}
                  alt=""
                />
              </span>
              <span>
                <Image
                  src="/images/home/imgEllipse213.svg"
                  width={36}
                  height={36}
                  alt=""
                />
              </span>
            </div>
            <Image
              className="panto-hero-controls-check"
              src="/images/home/imgGroup1.svg"
              width={18}
              height={18}
              alt=""
            />
            <Image
              className="panto-hero-controls-orb"
              src="/images/home/imgGroup48095386.svg"
              width={56}
              height={56}
              alt=""
            />
          </div>
        </div>
      )}
    </section>
  );
}
