import { featureItems } from "../../data/homeData";
import MoreInfoLink from "./MoreInfoLink";

export default function FeaturesSection() {
  return (
    <section className={"panto-features-section"} aria-labelledby="features-title">
      <div className={"panto-features-layout"}>
        <h2 className={"panto-features-title"} id="features-title">
          Why
          <br />
          Choosing Us
        </h2>
        <div className={"panto-feature-list"}>
          {featureItems.map((feature) => (
            <article className={"panto-feature-item"} key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <MoreInfoLink href="#experience" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
