"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const fieldClass = "h-10 w-full rounded-md border border-[#e7e1db] bg-white px-3 text-[11px] font-normal text-[#292522] outline-none transition focus:border-[#e51e2a] focus:ring-2 focus:ring-red-100 placeholder:text-[#aaa39d]";
const labelClass = "flex min-w-0 flex-col gap-2 text-[10px] font-bold text-[#302c29]";

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
    <main className="min-h-screen bg-white font-sans text-[#211f1f]">
      <div className="flex h-12 items-center border-b border-[#eee9e4] px-5 sm:px-8 lg:px-[max(28px,calc((100%-1240px)/2))]">
        <Link href="/" className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#252222]">
          <span className="grid h-6 w-6 place-items-center rounded-full border border-[#e9e3dc] text-base">←</span>
          Back to Home
        </Link>
      </div>

      <section className="bg-gradient-to-r from-white via-[#fbf8f3] to-[#f8edcf] py-8 sm:py-10">
        <div className="mx-auto grid w-[calc(100%-36px)] max-w-[1240px] items-center gap-7 sm:w-[calc(100%-64px)] md:grid-cols-2 md:gap-12">
          <div>
            <p className="mb-2.5 text-[9px] font-extrabold tracking-[1.3px] text-[#e51e2a]">CONTACT OUR TEAM</p>
            <h1 className="text-[38px] font-extrabold leading-[1.08] tracking-[-1.5px] sm:text-5xl">Let&apos;s start a<br /><span className="text-[#e51e2a]">conversation.</span></h1>
            <p className="mt-4 max-w-[480px] text-[11px] leading-6 text-[#77716d] sm:text-xs">
              Have a question about our paper products, notebook manufacturing or a business enquiry? Get in touch with Dwarkadhish Paper Products. Our team welcomes your enquiry.
            </p>
          </div>
          <div aria-label="Logo placeholder" className="grid h-[150px] place-items-center rounded-xl bg-[#211f1f] sm:h-[205px]">
            <div className="h-[90px] w-3/4 rounded-2xl border border-[#e9e3dc] bg-white sm:h-28 sm:w-[245px]" />
          </div>
        </div>
      </section>

      <section className="bg-white px-0 py-8 sm:py-11">
        <div className="mb-6 px-4 text-center sm:mb-7">
          <p className="mb-2 text-[9px] font-extrabold tracking-[1.3px] text-[#e51e2a]">GET IN TOUCH</p>
          <h2 className="text-[22px] font-bold tracking-tight sm:text-[27px]">We&apos;d love to hear from you.</h2>
          <p className="mt-2 text-[10px] text-[#8b8580] sm:text-[11px]">Send us your details and enquiry using the form below.</p>
        </div>

        <div className="mx-auto grid w-[calc(100%-36px)] max-w-[1240px] gap-4 sm:w-[calc(100%-64px)] md:grid-cols-[.78fr_1.22fr] md:gap-[22px]">
          <aside className="rounded-[10px] bg-[#211f1f] p-5 text-white sm:p-[25px_26px]">
            <h3 className="text-[17px] font-bold">Contact Information</h3>
            <p className="mb-4 mt-2.5 text-[10px] leading-relaxed text-[#c9c4c0]">Connect with us for product details, stationery enquiries and business opportunities.</p>
            {[
              ["⌖", "Our Location", "Jamnagar, Gujarat, India"],
              ["☎", "Phone", "Add your business phone number"],
              ["✉", "Email", "info@dwarkadhishpaper.in"],
              ["▣", "Business Enquiries", "Stationery, notebooks and paper products"],
            ].map(([icon, title, detail]) => (
              <div key={title} className="flex items-center gap-3 border-t border-white/10 py-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#3b3426] text-base text-[#e5bd61]">{icon}</span>
                <div className="flex min-w-0 flex-col gap-1">
                  <b className="text-[10px]">{title}</b>
                  <small className="text-[9px] text-[#c9c4c0]">{detail}</small>
                </div>
              </div>
            ))}
            <p className="mt-3 rounded-md bg-white/[.06] p-3 text-[9px] leading-relaxed text-[#d0cbc7]">For bulk orders and business enquiries, please include your requirements in the message.</p>
          </aside>

          <section className="rounded-[10px] border border-[#e9e3dc] p-5 shadow-[0_8px_24px_rgba(33,31,31,.03)] sm:p-6">
            <h3 className="text-[17px] font-bold">Send Us a Message</h3>
            <p className="mb-4 mt-2 text-[10px] text-[#88817b]">Fields marked with * are required.</p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <label className={labelClass}>Full Name *<input className={fieldClass} name="fullName" placeholder="Your full name" required /></label>
                <label className={labelClass}>Company / Business<input className={fieldClass} name="company" placeholder="Company name (optional)" /></label>
                <label className={labelClass}>Email Address *<input className={fieldClass} name="email" type="email" placeholder="you@example.com" required /></label>
                <label className={labelClass}>Phone Number *<input className={fieldClass} name="phone" type="tel" placeholder="Your contact number" required /></label>
                <label className={`${labelClass} sm:col-span-2`}>Enquiry Type *
                  <select className={fieldClass} name="enquiryType" defaultValue="" required>
                    <option value="" disabled>Select your enquiry</option>
                    <option>Product Information</option><option>Custom Notebook</option><option>Bulk / Wholesale Order</option><option>Business Partnership</option><option>Other</option>
                  </select>
                </label>
                <label className={`${labelClass} sm:col-span-2`}>Your Message *
                  <textarea className="min-h-[100px] w-full resize-y rounded-md border border-[#e7e1db] bg-white px-3 py-2.5 text-[11px] font-normal text-[#292522] outline-none transition focus:border-[#e51e2a] focus:ring-2 focus:ring-red-100 placeholder:text-[#aaa39d]" name="message" placeholder="Tell us about the products or services you need..." required rows={4} />
                </label>
              </div>
              <button className="mt-4 h-[42px] w-full rounded-md bg-[#e51e2a] text-[11px] font-bold text-white transition hover:bg-[#c91b25]" type="submit">Send Enquiry <span className="ml-1">→</span></button>
              {sent && <p className="mt-2.5 text-[10px] text-green-700" role="status">Your email app should open with the enquiry details ready to send.</p>}
            </form>
          </section>
        </div>
      </section>

      <section className="mx-auto mb-7 flex w-[calc(100%-36px)] max-w-[1240px] flex-col items-start justify-between gap-4 rounded-lg border border-[#eee8e1] bg-[#fbf8f3] p-5 sm:mb-9 sm:w-[calc(100%-64px)] sm:p-6 md:flex-row md:items-center">
        <div>
          <p className="mb-1.5 text-[9px] font-extrabold tracking-wider text-[#e51e2a]">FOR BUSINESSES</p>
          <h3 className="text-base font-bold sm:text-[17px]">Looking for a paper products partner?</h3>
          <p className="mt-1.5 text-[10px] text-[#827b75]">Share your requirements for bulk orders, stationery or customised notebooks.</p>
        </div>
        <a href="mailto:info@dwarkadhishpaper.in?subject=Business%20Enquiry" className="shrink-0 rounded-md bg-[#211f1f] px-4 py-3 text-[10px] font-bold text-white">Make an Enquiry <span className="ml-1">→</span></a>
      </section>

      <footer className="flex min-h-[82px] flex-col items-start justify-between gap-3 border-t border-[#eee9e3] px-[18px] py-4 sm:flex-row sm:items-center sm:px-8 lg:px-[max(32px,calc((100%-1240px)/2))]">
        <div className="flex flex-col gap-1.5"><b className="text-[9px]">DWARKADHISH PAPER PRODUCTS</b><span className="text-[9px] text-[#77716d]">Jamnagar, Gujarat, India</span></div>
        <strong className="text-[9px] text-[#e51e2a]">Give more than expected.</strong>
      </footer>
    </main>
  );
}
