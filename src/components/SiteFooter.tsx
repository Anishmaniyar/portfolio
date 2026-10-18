import LocalTime from "./LocalTime";
import VisitorCount from "./VisitorCount";

/*
 * Quiet page footer: place and local time on the left, visitor count and
 * copyright on the right. Server Component (only the clock and counter
 * need the client).
 */

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-col">
        <span className="site-footer-place">Pune, India</span>
        <span className="site-footer-time">
          <LocalTime /> IST
        </span>
      </div>
      <div className="site-footer-col site-footer-right">
        <VisitorCount />
      </div>
    </footer>
  );
}
