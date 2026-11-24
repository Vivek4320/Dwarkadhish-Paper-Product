import Link from "next/link";

const policies = {
  "privacy-policy": {
    title: "Privacy Policy",
    intro: "This policy explains how Dwarkadhish Paper Products handles information when you browse our website, create an account, customise a notebook, contact us or place an order.",
    sections: [
      ["Information we collect", "Depending on how you use the website, information may include your name, email address, phone number, delivery address, account identifier, order details, payment references, notebook customisation details and images you choose to upload for a design. Please do not upload information you do not have permission to share."],
      ["How we use information", "We use information to provide account access, save cart and notebook designs, process and verify orders, arrange fulfilment, respond to enquiries, provide customer support, and maintain website security."],
      ["Service providers", "The website uses Clerk for account and sign-in services, Razorpay for payment processing, and Neon/PostgreSQL for application data storage. These providers process information as needed to provide their services and under their own terms and privacy notices. We do not receive or store your full card or banking credentials through this website."],
      ["Uploaded images and designs", "Images you upload for notebook customisation and related design information may be stored to support your saved design and order. Only upload images you own or are authorised to use. Contact us if you need help with a particular stored design."],
      ["Payments", "Payments are handled by Razorpay. Payment status and transaction references are used to verify and record an order. Payment processing is also subject to Razorpay's privacy policy and terms."],
      ["Cookies and browser storage", "The website and its sign-in provider may use essential cookies or browser storage for authentication, security and site functionality. Optional analytics or preference technologies should only be enabled where applicable and according to your saved choice. See the Cookie Policy."],
      ["Sharing and retention", "We share information with service providers when needed to operate the website, process payments and fulfil requests, or when disclosure is required by law. Information is retained for as long as reasonably needed for these purposes, legal obligations, dispute resolution and record keeping."],
      ["Your choices and requests", "You may contact us to request access, correction or deletion of personal information, subject to applicable law and legitimate order, accounting, security or legal record requirements. We may need to verify your identity before acting."],
      ["Children", "This website is intended for general customers and is not designed to knowingly collect personal information from children without appropriate authorisation."],
      ["Changes and contact", "We may update this policy when our practices or legal requirements change. For privacy questions or requests, contact info@dwarkadhishpaper.in."],
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    intro: "This policy describes cookies and similar browser technologies used to make the Dwarkadhish Paper Products website work.",
    sections: [
      ["Essential technologies", "Essential cookies or browser storage may be used by the website and Clerk sign-in services for authentication, security, session continuity and core functionality such as account access and cart workflows. These are not used as advertising trackers."],
      ["Optional categories", "Analytics technologies can measure how visitors use a website. Preference technologies can remember optional choices. The consent panel lets you record your choices for these categories. This website's consent component does not itself load an analytics or advertising provider."],
      ["Manage your choices", "Use Accept All, Reject Optional or Customize in the cookie panel. You can also clear site data or block cookies in your browser settings; doing so may affect sign-in, cart or other website features."],
      ["Third-party services", "Clerk and Razorpay may use their own technologies when their services are used. Their use is governed by their own notices and controls."],
      ["Updates and contact", "We may update this policy as website technologies change. Questions can be sent to info@dwarkadhishpaper.in."],
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    intro: "These terms apply to your use of the Dwarkadhish Paper Products website. By using the website, you agree to use it lawfully and provide accurate information when making an enquiry or order.",
    sections: [
      ["Website use", "Do not misuse the website, attempt unauthorised access, interfere with its operation, submit malicious content or use another person's account without permission."],
      ["Product information", "Product images and descriptions are provided to help explain our products. Colours, print results, materials and appearance may vary between screens and physical production. Please confirm important specifications with us before placing a custom or bulk order."],
      ["Custom designs and uploaded content", "You are responsible for ensuring that text, photographs, logos and other materials you submit are accurate and that you have the rights and permissions needed for us to use them to prepare your requested product. We may decline content that is unlawful or infringes another person's rights."],
      ["Orders and payment", "An order is subject to successful payment verification and our confirmation. Prices, availability, specifications, delivery charges and any applicable taxes should be confirmed at checkout or with our team before purchase. Payments are processed by Razorpay."],
      ["Delivery, cancellation and returns", "Delivery estimates and applicable shipping charges will be communicated during the order process or by our team. Custom-made products may require special handling. Please review our Shipping Policy and Return & Refund Policy and contact us before confirming an order if you have questions."],
      ["Intellectual property", "Website text, graphics, branding and other materials belong to Dwarkadhish Paper Products or their respective rights holders. You may not reproduce or commercially use them without permission."],
      ["Third-party services", "The website may rely on third-party services such as Clerk and Razorpay. Their services are subject to their own terms and policies."],
      ["Changes and contact", "We may update these terms from time to time. Continued use after an update means the revised terms apply to future use. Contact info@dwarkadhishpaper.in for questions."],
    ],
  },
  "return-refund-policy": {
    title: "Return & Refund Policy",
    intro: "We want customers to be clear about the process before ordering. Please read the points below and contact our team if anything is unclear before placing a custom or bulk order.",
    sections: [
      ["Before placing an order", "Please carefully review the product type, quantity, page count, custom text, uploaded artwork, spelling, delivery details and order summary before completing payment. Contact us to confirm specifications that are important to you."],
      ["Damaged, defective or incorrect items", "If an item arrives damaged, defective or different from the confirmed order, contact us at info@dwarkadhishpaper.in with your order reference, a description of the issue and clear supporting photographs as soon as reasonably possible."],
      ["Customised products", "Products made to a customer's submitted design or specifications may not be suitable for resale. Any return, replacement or refund request for a customised item will be reviewed based on the issue, the confirmed order details and applicable law."],
      ["Cancellation requests", "Contact us as soon as possible if you need to request cancellation. Whether an order can be cancelled may depend on whether production or dispatch has started. We will confirm the available options."],
      ["Refund processing", "Where a refund is approved, the method and expected processing time will be communicated to the customer. Payment-provider or bank processing times may also apply."],
      ["Contact", "For return, replacement, cancellation or refund requests, email info@dwarkadhishpaper.in and include your order reference and contact details."],
    ],
  },
  "shipping-policy": {
    title: "Shipping Policy",
    intro: "This policy explains how delivery information is handled for orders placed with Dwarkadhish Paper Products.",
    sections: [
      ["Delivery address", "Please provide a complete and accurate recipient name, phone number, street address, city, state, PIN code and country at checkout. Incorrect or incomplete details may delay delivery."],
      ["Processing and dispatch", "Processing time can vary depending on product availability, customisation requirements, order quantity and production workload. Our team will communicate the applicable dispatch estimate for your order."],
      ["Shipping charges and delivery estimates", "Applicable shipping charges and estimated delivery timelines should be shown or confirmed during the order process. If they are not clear, contact us before payment."],
      ["Delays", "Delivery may be affected by courier operations, weather, public holidays, remote delivery locations or other circumstances outside our reasonable control. We will share available updates where possible."],
      ["Checking your delivery", "Please check the package and products when received. If the package or product appears damaged or incorrect, contact us promptly with your order reference and photographs."],
      ["Contact", "For shipping questions or delivery updates, email info@dwarkadhishpaper.in with your order reference."],
    ],
  },
} as const;

type PolicySlug = keyof typeof policies;

export default function PolicyPage({ slug }: { slug: PolicySlug }) {
  const policy = policies[slug];
  return (
    <main className="min-h-screen bg-[#f7f8fa] px-5 py-10 text-[#211f1e] sm:px-8 sm:py-14">
      <article className="mx-auto max-w-4xl rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm sm:p-10">
        <Link href="/" className="text-sm font-semibold text-[#07558d] hover:underline">← Back to Home</Link>
        <p className="mt-8 text-xs font-bold tracking-[.18em] text-[#d71920]">DWARKADHISH PAPER PRODUCTS</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{policy.title}</h1>
        <p className="mt-4 text-sm leading-7 text-[#625d58]">{policy.intro}</p>
        <p className="mt-3 text-xs text-[#888]">Last updated: 24 November 2026</p>
        <div className="mt-8 space-y-7">
          {policy.sections.map(([heading, body]) => (
            <section key={heading}>
              <h2 className="text-lg font-bold">{heading}</h2>
              <p className="mt-2 text-sm leading-7 text-[#625d58]">{body}</p>
            </section>
          ))}
        </div>
        <div className="mt-10 border-t border-[#eee] pt-5 text-sm text-[#625d58]">
          Questions? <a className="font-semibold text-[#07558d] underline" href="mailto:info@dwarkadhishpaper.in">info@dwarkadhishpaper.in</a>
        </div>
      </article>
    </main>
  );
}
