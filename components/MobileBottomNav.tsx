export default function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Quick navigation">
      <a className="active" href="#home">
        <span>⌂</span>
        <small>Home</small>
      </a>
      <a href="#products">
        <span>▤</span>
        <small>Products</small>
      </a>
      <a href="#customize">
        <span>✎</span>
        <small>Customize</small>
      </a>
      <a href="#products">
        <span>▧</span>
        <small>Templates</small>
      </a>
      <a href="#contact">
        <span>✉</span>
        <small>Contact</small>
      </a>
    </nav>
  );
}
