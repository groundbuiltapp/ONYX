import Brand from './Brand.jsx';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <Brand />
          <p className="footer-tagline">For the figuring-it-out stage.</p>
        </div>
        <div className="footer-links">
          <a href="/#why">Why we made this</a>
          <a href="/#path">The quick version</a>
          <a href="/intern.html">Try a prompt</a>
        </div>
        <span className="footer-copy">© 2026 Riseup.AI</span>
      </div>
    </footer>
  );
}
