"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Website enquiry: ${data.get("enquiryType")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("fullName")}\nCompany: ${data.get("company") || "Not provided"}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nEnquiry: ${data.get("enquiryType")}\n\nMessage:\n${data.get("message")}`
    );
    window.location.href = `mailto:info@dwarkadhishpaper.in?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <main className="contact-page">
      <div className="contact-topbar">
        <Link href="/" className="contact-back"><span>←</span> Back to Home</Link>
      </div>

      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div className="contact-hero-copy">
            <p className="contact-eyebrow">CONTACT OUR TEAM</p>
            <h1>Let&apos;s start a<br /><span>conversation.</span></h1>
            <p className="contact-hero-description">
              Have a question about our paper products, notebook manufacturing or a business enquiry?
              Get in touch with Dwarkadhish Paper Products. Our team welcomes your enquiry.
            </p>
          </div>
          <div className="contact-logo-panel" aria-label="Logo placeholder">
            <div className="contact-logo-placeholder" />
          </div>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="contact-section-heading">
          <p className="contact-eyebrow">GET IN TOUCH</p>
          <h2>We&apos;d love to hear from you.</h2>
          <p>Send us your details and enquiry using the form below.</p>
        </div>

        <div className="contact-columns">
          <aside className="contact-info-card">
            <h3>Contact Information</h3>
            <p className="contact-info-intro">Connect with us for product details, stationery enquiries and business opportunities.</p>
            <div className="contact-info-item">
              <span className="contact-info-icon">⌖</span>
              <div><b>Our Location</b><small>Jamnagar, Gujarat, India</small></div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon">☎</span>
              <div><b>Phone</b><small>Add your business phone number</small></div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon">✉</span>
              <div><b>Email</b><small>info@dwarkadhishpaper.in</small></div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon">▣</span>
              <div><b>Business Enquiries</b><small>Stationery, notebooks and paper products</small></div>
            </div>
            <div className="contact-info-note">For bulk orders and business enquiries, please include your requirements in the message.</div>
          </aside>

          <section className="contact-form-card">
            <h3>Send Us a Message</h3>
            <p className="contact-form-hint">Fields marked with * are required.</p>
            <form onSubmit={handleSubmit}>
              <div className="contact-form-grid">
                <label>Full Name *<input name="fullName" placeholder="Your full name" required /></label>
                <label>Company / Business<input name="company" placeholder="Company name (optional)" /></label>
                <label>Email Address *<input name="email" type="email" placeholder="you@example.com" required /></label>
                <label>Phone Number *<input name="phone" type="tel" placeholder="Your contact number" required /></label>
                <label className="contact-full-field">Enquiry Type *
                  <select name="enquiryType" defaultValue="" required>
                    <option value="" disabled>Select your enquiry</option>
                    <option>Product Information</option>
                    <option>Custom Notebook</option>
                    <option>Bulk / Wholesale Order</option>
                    <option>Business Partnership</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="contact-full-field">Your Message *
                  <textarea name="message" placeholder="Tell us about the products or services you need..." required rows={4} />
                </label>
              </div>
              <button className="contact-submit" type="submit">Send Enquiry <span>→</span></button>
              {sent && <p className="contact-sent-note" role="status">Your email app should open with the enquiry details ready to send.</p>}
            </form>
          </section>
        </div>
      </section>

      <section className="contact-business-cta">
        <div>
          <p className="contact-eyebrow">FOR BUSINESSES</p>
          <h3>Looking for a paper products partner?</h3>
          <p>Share your requirements for bulk orders, stationery or customised notebooks.</p>
        </div>
        <a href="mailto:info@dwarkadhishpaper.in?subject=Business%20Enquiry">Make an Enquiry <span>→</span></a>
      </section>

      <footer className="contact-footer">
        <div><b>DWARKADHISH PAPER PRODUCTS</b><span>Jamnagar, Gujarat, India</span></div>
        <strong>Give more than expected.</strong>
      </footer>
    </main>
  );
}
