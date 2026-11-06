import Image from "next/image";
import MoreInfoLink from "./MoreInfoLink";

export default function ExperienceSection() {
  return (
    <section
      className={"panto-experience-section"}
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className={"panto-experience-layout"}>
        <div className={"panto-experience-photo"}>
          <Image
            src="/images/home/imgRectangle1446.jpg"
            alt="Comfortable modern living room furnished with Panto furniture"
            fill
            sizes="(max-width: 900px) 100vw, 629px"
          />
        </div>
        <div className={"panto-experience-copy"}>
          <p className={"panto-section-eyebrow"}>Experiences</p>
          <h2 id="experience-title">We provide you the best experience</h2>
          <p className={"panto-body-copy"}>
            You don’t have to worry about the result because all of these
            interiors are made by people who are professionals in their fields
            with an elegant and lucurious style and with premium quality
            materials
          </p>
          <MoreInfoLink href="#materials" />
        </div>
      </div>
    </section>
  );
}
