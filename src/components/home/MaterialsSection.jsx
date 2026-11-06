import Image from "next/image";
import MoreInfoLink from "./MoreInfoLink";

export default function MaterialsSection() {
  return (
    <section
      className={"panto-materials-section"}
      id="materials"
      aria-labelledby="materials-title"
    >
      <div className={"panto-materials-layout"}>
        <div className={"panto-materials-copy"}>
          <p className={"panto-section-eyebrow"}>Materials</p>
          <h2 id="materials-title">
            Very serious materials for making furniture
          </h2>
          <p className={"panto-body-copy"}>
            Because panto was very serious about designing furniture for our
            environment, using a very expensive and famous capital but at a
            relatively low price
          </p>
          <MoreInfoLink href="#testimonials" />
        </div>
        <div className={"panto-materials-gallery"}>
          <div className={"panto-materials-main-image"}>
            <Image
              src="/images/home/imgRectangle1448.jpg"
              alt="A carefully styled Panto dining room"
              fill
              sizes="(max-width: 900px) 100vw, 629px"
            />
          </div>
          <div className={"panto-materials-top-image"}>
            <Image
              src="/images/home/imgRectangle1449.jpg"
              alt="Close-up of a warm, modern interior"
              fill
              sizes="223px"
            />
          </div>
          <div className={"panto-materials-bottom-image"}>
            <Image
              src="/images/home/imgRectangle1450.jpg"
              alt="Modern dining chairs and furniture details"
              fill
              sizes="223px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
