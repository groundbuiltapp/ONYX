import Brand from './Brand.jsx';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <Brand />
          <p className="footer-tagline">Rise from here.</p>
        </div>
        <div className="footer-links">
          <a href="/#why">Why Onyx</a>
          <a href="/#path">How it works</a>
          <a href="/intern.html">Get started</a>
        </div>
        <span className="footer-copy">© 2026 Onyx. Built for what’s next.</span>
      </div>
    </footer>
  );
}
