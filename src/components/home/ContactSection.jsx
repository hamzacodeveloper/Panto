"use client";

import { useState } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      className="panto-contact-section"
      id="contact-form"
      aria-labelledby="contact-title"
    >
      <div className="panto-contact-layout">
        <div className="panto-contact-copy">
          <p className="panto-section-eyebrow">Get in touch</p>
          <h2 id="contact-title">Let’s talk about your space</h2>
          <p className="panto-body-copy">
            Have a question about our furniture or need a little inspiration?
            Send us a note and tell us what you’re looking for.
          </p>
        </div>
        <form className="panto-contact-form" onSubmit={handleSubmit}>
          <div className="panto-contact-fields">
            <label>
              Your name
              <input autoComplete="name" name="name" required />
            </label>
            <label>
              Email address
              <input
                autoComplete="email"
                name="email"
                required
                type="email"
              />
            </label>
            <label className="panto-contact-message-field">
              How can we help?
              <textarea name="message" required rows={5} />
            </label>
          </div>
          <button className="panto-contact-submit" type="submit">
            Send message
          </button>
          {submitted && (
            <p className="panto-contact-status" role="status">
              This contact form is a preview and isn’t connected to a messaging
              service, so your message hasn’t been sent.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
