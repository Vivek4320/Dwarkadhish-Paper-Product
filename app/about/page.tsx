import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Dwarkadhish Paper Products",
  description:
    "Learn about Dwarkadhish Paper Products, a Jamnagar-based paper products manufacturing and customized printing business.",
};

const values = [
  {
    icon: "✦",
    title: "Quality Focus",
    description:
      "We emphasize product quality and consistency throughout our production process.",
  },
  {
    icon: "◎",
    title: "Customer First",
    description:
      "We understand individual requirements and work to deliver suitable solutions for every customer.",
  },
  {
    icon: "↗",
    title: "Continuous Improvement",
    description:
      "We work to improve manufacturing practices, product quality, and operational efficiency.",
  },
];

const products = [
  ["▤", "Notebooks & Exercise Books", "Quality notebooks for schools, students, and everyday use."],
  ["▧", "School Diaries", "Customized diaries designed for educational institutions."],
  ["▤", "Examination Answer Books", "Answer books and examination stationery for schools, colleges, and institutions."],
  ["▥", "Registers & Record Books", "Practical registers for offices, organizations, and government departments."],
  ["✎", "Drawing Books & Writing Pads", "Paper products for educational, professional, and everyday applications."],
  ["▣", "Bill Books & Business Stationery", "Customized bill books, letterheads, and essential business stationery."],
  ["♧", "Paper Bags", "Paper-based packaging solutions for different business requirements."],
  ["✳", "Customized Printing Solutions", "Printing tailored to customer specifications, including sizes, page counts, layouts, and designs."],
];

const reasons = [
  ["01", "Quality-Focused Approach", "We emphasize product quality and consistency at every stage."],
  ["02", "Customized Solutions", "We work to meet customer requirements for sizes, specifications, designs, and quantities."],
  ["03", "Wide Product Range", "From notebooks and examination answer books to office stationery and customized printing."],
  ["04", "Customer-Centric Service", "We value customer requirements and aim to provide responsive, dependable service."],
  ["05", "Commitment to Excellence", 'Our principle, "Give More Than Expected," reflects our dedication to customer satisfaction.'],
];

const missions = [
  "Provide reliable and quality paper products at competitive prices.",
  "Understand and fulfil the specific requirements of every customer.",
  "Support schools, educational institutions, businesses, and government organizations.",
  "Improve manufacturing efficiency through better processes and technology.",
  "Build lasting relationships through transparency, integrity, and professional service.",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#202020]">
      <div className="border-b border-[#f0f0f0]">
        <div className="mx-auto flex w-full max-w-7xl items-center px-5 py-4 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="text-xs font-medium text-[#555] transition hover:text-[#ED1C2E]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <section className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_85%_35%,rgba(255,240,210,0.8),transparent_42%),linear-gradient(94deg,#fff5f5,#faf7f1)]">
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#ED1C2E]/[0.03] sm:right-10 sm:top-16" />
        <div className="relative mx-auto grid min-h-[440px] w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.19em] text-[#ED1C2E]">
              ABOUT OUR COMPANY
            </p>
            <h1 className="mt-4 text-5xl font-extrabold tracking-[-0.045em] text-[#ED1C2E] sm:text-6xl">
              About Us.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#666] sm:text-base">
              Quality Paper Products for Schools, Offices &amp; Businesses.
              Reliable paper manufacturing and customized printing solutions
              built around your needs.
            </p>
            <p className="mt-5 text-[10px] font-extrabold tracking-[0.15em] text-[#ED1C2E]">
              GIVE MORE THAN EXPECTED.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#who-we-are"
                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[#ED1C2E] bg-[#ED1C2E] px-5 text-xs font-semibold text-white transition hover:bg-[#c91829]"
              >
                Discover Our Story →
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[#dedede] bg-white px-5 text-xs font-semibold text-[#202020] transition hover:border-[#ED1C2E] hover:text-[#ED1C2E]"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative mx-auto flex min-h-64 w-full max-w-md items-center justify-center">
            <div className="absolute right-4 top-4 h-56 w-56 rounded-full bg-[#ED1C2E]/[0.04] sm:right-12" />
            <div className="relative flex h-56 w-full max-w-[320px] items-center justify-center rounded-md border border-[#eee5df] bg-white/90 p-8 shadow-[0_15px_45px_rgba(0,0,0,0.07)]">
              <div className="flex h-full w-full items-center justify-center border border-dashed border-[#ded7d0] text-center text-[10px] font-semibold tracking-[0.16em] text-[#aaa]">
                LOGO SPACE
              </div>
            </div>
            <div className="absolute -bottom-2 right-0 flex items-center gap-2 border border-[#eee] bg-white px-4 py-3 text-[10px] font-semibold shadow-[0_5px_18px_rgba(0,0,0,0.04)] sm:right-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ED1C2E]" />
              Give More Than Expected
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#eee] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#eee] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
          {[
            ["Quality", "Our everyday priority"],
            ["India", "Jamnagar, Gujarat"],
            ["Paper", "Products & Printing"],
          ].map(([title, description]) => (
            <div key={title} className="py-7 text-center">
              <p className="text-xl font-extrabold text-[#ED1C2E]">{title}</p>
              <p className="mt-1 text-xs text-[#666]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="who-we-are" className="scroll-mt-8 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-md bg-[#202020] p-8 text-center">
            <div className="flex h-44 w-48 items-center justify-center rounded-lg bg-white p-5">
              <div className="flex h-full w-full items-center justify-center border border-dashed border-[#ddd] text-[10px] font-semibold tracking-[0.14em] text-[#aaa]">
                LOGO SPACE
              </div>
            </div>
            <p className="mt-5 text-[9px] font-medium tracking-[0.19em] text-[#ddd]">
              PAPER PRODUCTS &amp; PRINTING SOLUTIONS
            </p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.19em] text-[#ED1C2E]">
              WHO WE ARE
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[#202020] sm:text-4xl">
              Creating Paper Products for Everyday Possibilities.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#666]">
              Dwarkadhish Paper Products is a paper products manufacturing and
              printing business based in Jamnagar, Gujarat, India. We are
              committed to delivering quality paper products and reliable
              printing solutions that meet the diverse requirements of
              educational institutions, government departments, corporate
              offices, businesses, and individual customers.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#666]">
              With a strong focus on quality, customer satisfaction, and
              continuous improvement, we strive to build long-term relationships
              with our customers by providing dependable products, professional
              service, and value for money.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#666]">
              Our philosophy is simple: understand our customers&apos; needs,
              maintain quality standards, and deliver more than expected.
            </p>
            <p className="mt-6 text-[10px] font-bold tracking-[0.14em] text-[#ED1C2E]">
              GIVE MORE THAN EXPECTED.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F5] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-extrabold tracking-[0.19em] text-[#ED1C2E]">
              WHAT WE STAND FOR
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[#202020] sm:text-4xl">
              Our Values Guide Our Work.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#666]">
              We focus on quality, dependable service, and continuous
              improvement in everything we do.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="border border-[#eee] bg-white p-7 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#fff0ef] text-xl text-[#ED1C2E]">
                  {value.icon}
                </span>
                <h3 className="mt-6 text-base font-extrabold">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#666]">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-extrabold tracking-[0.19em] text-[#ED1C2E]">
              OUR PRODUCT RANGE
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              Paper Products for Every Need.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#666]">
              Discover our range of paper products and customized printing
              solutions for education, business, and everyday use.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {products.map(([icon, title, description]) => (
              <article
                key={title}
                className="min-h-44 border border-[#eee] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#f2b8bd] hover:shadow-md"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#fff0ef] text-lg text-[#ED1C2E]">
                  {icon}
                </span>
                <h3 className="mt-5 text-sm font-extrabold leading-6">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#666]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F5] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.35fr_0.65fr] lg:px-10">
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.19em] text-[#ED1C2E]">
              OUR COMMITMENT TO QUALITY
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              Quality in Every Step We Take.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#666]">
              At Dwarkadhish Paper Products, quality is at the heart of
              everything we do. From selecting suitable paper and raw materials
              to printing, binding, finishing, and final inspection, we aim to
              maintain consistency and reliability throughout our production
              process.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#666]">
              We continuously work to improve our manufacturing practices,
              product quality, and operational efficiency to meet customer
              expectations.
            </p>
            <div className="mt-7 grid gap-3 text-xs text-[#444] sm:grid-cols-2">
              {[
                "✓ Suitable paper and raw materials",
                "✓ Consistent production and finishing",
                "✓ Reliable printing solutions",
                "✓ Continuous quality improvement",
              ].map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
          <div className="mx-auto w-full max-w-xs">
            <div className="translate-x-4 translate-y-4 border border-[#e8e2dc] bg-[#e9e5df] p-4 shadow-xl">
              <div className="flex min-h-64 flex-col justify-between border border-[#eee] bg-white p-6 shadow-md">
                <p className="text-3xl font-extrabold tracking-[-0.1em] text-[#ED1C2E]">
                  DP
                </p>
                <div>
                  <p className="text-2xl font-bold tracking-wider">QUALITY</p>
                  <p className="mt-2 text-[9px] tracking-[0.19em]">
                    IN EVERY SHEET.
                  </p>
                  <div className="mt-5 h-1 w-10 bg-[#ED1C2E]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-extrabold tracking-[0.19em] text-[#ED1C2E]">
              OUR FUTURE
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              Our Vision &amp; Mission.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <article className="relative overflow-hidden border border-[#eee] p-8 sm:p-10">
              <span className="absolute right-6 top-0 text-7xl font-extrabold text-[#f3f0ed]">
                01
              </span>
              <p className="text-[10px] font-extrabold tracking-[0.19em] text-[#ED1C2E]">
                OUR VISION
              </p>
              <h3 className="relative mt-5 text-xl font-bold">
                To Become a Trusted Name.
              </h3>
              <p className="relative mt-5 text-sm leading-7 text-[#666]">
                To become a trusted and preferred name in the paper products
                and printing industry by delivering quality products, embracing
                innovation, and building lasting customer relationships across
                India.
              </p>
            </article>
            <article className="relative overflow-hidden border border-[#eee] p-8 sm:p-10">
              <span className="absolute right-6 top-0 text-7xl font-extrabold text-[#f3f0ed]">
                02
              </span>
              <p className="text-[10px] font-extrabold tracking-[0.19em] text-[#ED1C2E]">
                OUR MISSION
              </p>
              <h3 className="relative mt-5 text-xl font-bold">
                Delivering Quality and Value.
              </h3>
              <ul className="relative mt-5 space-y-3 text-sm leading-6 text-[#666]">
                {missions.map((mission) => (
                  <li key={mission} className="flex gap-3">
                    <span className="mt-0.5 text-[#ED1C2E]">✓</span>
                    <span>{mission}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F5] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-extrabold tracking-[0.19em] text-[#ED1C2E]">
              WHY CHOOSE US
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              More Than Products. More Than Expected.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#666]">
              We combine quality-focused production with customized solutions
              and customer-oriented service.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reasons.map(([number, title, description]) => (
              <article key={number} className="border border-[#eee] bg-white p-6">
                <p className="text-xs font-extrabold text-[#ED1C2E]">{number}</p>
                <h3 className="mt-4 text-sm font-extrabold">{title}</h3>
                <p className="mt-3 text-xs leading-5 text-[#666]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#eee] bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.19em] text-[#ED1C2E]">
              WHO WE SERVE
            </p>
            <h2 className="mt-3 max-w-lg text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl">
              Supporting Education, Business &amp; Government.
            </h2>
          </div>
          <div>
            <p className="text-sm leading-7 text-[#666]">
              We understand the importance of quality stationery and printed
              materials in education, administration, and business operations.
              Our goal is to support these sectors with dependable paper
              products that meet their functional requirements and
              specifications.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#666]">
              We are committed to expanding our capabilities, strengthening our
              production processes, and serving customers with professionalism
              and responsibility.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Educational Institutions",
                "Government Departments",
                "Corporate Offices",
                "Businesses",
              ].map((sector) => (
                <span
                  key={sector}
                  className="border border-[#eee] bg-[#FAF8F5] px-3 py-2 text-[10px] font-medium text-[#444]"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#f0ece6] bg-[#FAF8F5] px-5 py-20 text-center sm:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="text-[10px] font-extrabold tracking-[0.19em] text-[#ED1C2E]">
            OUR PROMISE
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl">
            Every Product. Every Order. Every Promise.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#666]">
            At Dwarkadhish Paper Products, we believe that every product
            represents our commitment to quality and trust. We aim to deliver
            products that meet expectations, service that builds confidence,
            and value that encourages long-term partnerships.
          </p>
          <p className="mt-6 text-[10px] font-bold tracking-[0.15em] text-[#ED1C2E]">
            GIVE MORE THAN EXPECTED.
          </p>
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <div>
            <p className="text-xs font-extrabold tracking-[0.06em]">
              DWARKADHISH PAPER PRODUCTS
            </p>
            <p className="mt-2 max-w-sm text-xs leading-5 text-[#666]">
              Quality Paper Products for Schools, Offices &amp; Businesses.
              Jamnagar, Gujarat, India.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold text-[#ED1C2E] transition hover:text-[#b81726]"
          >
            Back to Home ↑
          </Link>
        </div>
      </footer>
    </main>
  );
}
