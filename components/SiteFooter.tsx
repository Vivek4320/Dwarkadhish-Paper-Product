export default function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand" id="about">
          <div className="footer-brand-row">
            <img
              src="/Main-Logo.png"
              alt="Dwarkadhish Paper Products"
              className="footer-mark-placeholder object-contain"
            />
            <div>
              <h2>DWARKADHISH PAPER PRODUCTS</h2>
              <span>Give more than expected.</span>
            </div>
          </div>
          <p>
            Thoughtfully made paper products for schools, offices, businesses
            and everyday ideas. Quality, trust and dependable service in every
            order.
          </p>
        </div>
        <div className="footer-column">
          <h3>EXPLORE</h3>
          <a href="#home">Home</a>
          <a href="#products">Our Products</a>
          <a href="#customize">Customize Book</a>
          <a href="#about">About Us</a>
        </div>
        <div className="footer-column">
          <h3>HELP & SUPPORT</h3>
          <a href="#contact">Contact Us</a>
          <a href="#contact">Bulk Enquiries</a>
          <a href="#contact">Custom Orders</a>
          <a href="#contact">Frequently Asked Questions</a>
        </div>
        <div className="footer-column footer-contact">
          <h3>GET IN TOUCH</h3>
          <span>Jamnagar, Gujarat, India</span>
          <span>Product and business enquiries</span>
          <a href="mailto:info@dwarkadhishpaper.in">info@dwarkadhishpaper.in</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Dwarkadhish Paper Products. All rights reserved.</span>
        <strong>
          QUALITY&nbsp; · &nbsp;TRUST&nbsp; · &nbsp;MADE WITH CARE
        </strong>
      </div>
    </footer>
  );
}
