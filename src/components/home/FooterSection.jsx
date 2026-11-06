import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "../../data/homeData";

export default function FooterSection() {
  return (
    <footer className={"panto-footer"} id="footer">
      <div className={"panto-footer-main"}>
        <div className={"panto-footer-brand"}>
          <Link className={"panto-footer-logo"} href="/home">
            Panto
          </Link>
          <p>
            The advantage of hiring a workspace with us is that givees you
            comfortable service and all-around facilities.
          </p>
        </div>
        {footerLinks.map((group) => (
          <div className={"panto-footer-column"} key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map((link) => (
              <Link key={link} href="/shop">
                {link}
              </Link>
            ))}
          </div>
        ))}
        <div className={"panto-footer-column"}>
          <h2>Follow Us</h2>
          <a href="https://www.facebook.com/">
            <Image
              src="/images/home/img001Facebook.svg"
              width={10}
              height={20}
              alt=""
              aria-hidden="true"
            />
            Facebook
          </a>
          <a href="https://www.twitter.com/">
            <Image
              src="/images/home/img003Twitter.svg"
              width={20}
              height={16}
              alt=""
              aria-hidden="true"
            />
            Twitter
          </a>
          <a href="https://www.instagram.com/">
            <Image
              src="/images/home/img004Instagram.svg"
              width={20}
              height={20}
              alt=""
              aria-hidden="true"
            />
            Instagram
          </a>
        </div>
      </div>
      <div className={"panto-footer-bottom"}>
        <p>Copyright © 2021</p>
        <div>
          <a href="#footer">Terms &amp; Conditions</a>
          <a href="#footer">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
