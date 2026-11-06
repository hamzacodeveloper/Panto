import Image from "next/image";

export default function MoreInfoLink({ href }) {
  return (
    <a className={"panto-more-info"} href={href}>
      More Info
      <Image
        src="/images/home/imgGrommetIconsFormNextLink.svg"
        width={48}
        height={24}
        alt=""
        aria-hidden="true"
      />
    </a>
  );
}
