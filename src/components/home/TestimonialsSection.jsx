"use client";

import Image from "next/image";
import { useRef } from "react";
import { testimonials } from "../../data/homeData";

export default function TestimonialsSection() {
  const reviewList = useRef(null);

  function scrollReviews(direction) {
    if (!reviewList.current) {
      return;
    }

    reviewList.current.scrollBy({
      left: direction * (reviewList.current.clientWidth / 2),
      behavior: "smooth",
    });
  }

  return (
    <section
      className={"panto-testimonials-section"}
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className={"panto-testimonials-heading"}>
        <p className={"panto-section-eyebrow"}>Testimonials</p>
        <h2 id="testimonials-title">Our Client Reviews</h2>
      </div>
      <div className={"panto-testimonials-content"}>
        <button
          className={`${"panto-review-arrow"} ${"panto-review-previous"}`}
          type="button"
          aria-label="Previous reviews"
          onClick={() => scrollReviews(-1)}
        >
          <Image
            src="/images/home/imgGrommetIconsFormNextLink1.svg"
            width={26}
            height={26}
            alt=""
            aria-hidden="true"
          />
        </button>
        <div className={"panto-review-list"} ref={reviewList}>
          {testimonials.map((testimonial) => (
            <article className={"panto-review-card"} key={testimonial.name}>
              <div className={"panto-review-photo-frame"}>
                <Image
                  className={"panto-review-photo"}
                  src={testimonial.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) calc(100vw - 72px), 370px"
                />
              </div>
              <div className={"panto-review-details"}>
                <Image
                  className={"panto-review-shape"}
                  src="/images/home/imgUnion1.svg"
                  width={334}
                  height={239}
                  alt=""
                  aria-hidden="true"
                />
                <Image
                  className={"panto-review-avatar"}
                  src={testimonial.avatar}
                  width={50}
                  height={50}
                  alt=""
                />
                <h3>{testimonial.name}</h3>
                <p className={"panto-review-role"}>{testimonial.role}</p>
                <p className={"panto-review-quote"}>{testimonial.quote}</p>
                <div
                  className={"panto-review-rating"}
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <Image
                      key={index}
                      src="/images/home/imgStar5.svg"
                      width={14}
                      height={14}
                      alt=""
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <button
          className={`${"panto-review-arrow"} ${"panto-review-next"}`}
          type="button"
          aria-label="Next reviews"
          onClick={() => scrollReviews(1)}
        >
          <Image
            src="/images/home/imgGrommetIconsFormNextLink1.svg"
            width={26}
            height={26}
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
}
