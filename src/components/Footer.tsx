import { Car } from "lucide-react";

const Footer = () => (
  <footer className="mt-auto border-t border-border/30 bg-card/10 bg-blend-overlay backdrop-blur-md">
    <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">

      {/* 4-column grid on desktop, stacked on mobile */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div className="space-y-3">
          <a href="/" className="inline-flex items-center gap-2.5 group">
            <Car className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-6" />
            <span className="text-xl font-bold text-foreground tracking-tight">
              Moto<span className="text-primary">Match</span>
            </span>
          </a>
          <p className="text-sm leading-relaxed font-medium" style={{ color: "#A1A1AA" }}>
            Discover your perfect match.
          </p>
        </div>

        {/* Navigation */}
        {/* <div>
          <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
            Navigation
          </h4>
          <ul className="space-y-2">
            {[
              { href: "/", label: "Home" },
              { href: "/browse", label: "Browse Catalog" },
              { href: "/compare", label: "Comparison Tool" },
              { href: "/about", label: "About" },
            ].map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="footer-link"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Collections */}
        {/* <div>
          <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
            Collections
          </h4>
          <ul className="space-y-2">
            {[
              { href: "/browse", label: "Performance 2W" },
              { href: "/browse", label: "Luxury 4W" },
              { href: "/browse", label: "Electric Future" },
              { href: "/browse", label: "Budget Picks" },
            ].map(({ href, label }) => (
              <li key={label}>
                <a href={href} className="footer-link">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Contact */}
        {/* <div>
          <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
            Get in Touch
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:akashrautelacms@gmail.com"
                className="footer-link break-all"
              >
                akashrautelacms@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+918604735639" className="footer-link">
                +91 86047 35639
              </a>
            </li>
            <li>
              <a href="/contact" className="footer-link">
                Contact form →
              </a>
            </li>
          </ul>
        </div> */}
      </div>

      {/* Bottom bar */}
      <div className="mt-2 pt-2 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs font-medium" style={{ color: "#71717A" }}>
          © {new Date().getFullYear()} MotoMatch. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="/privacy"
            className="text-xs font-medium transition-colors duration-200 hover:text-primary focus-visible:text-primary focus-visible:outline-none"
            style={{ color: "#71717A" }}
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-xs font-medium transition-colors duration-200 hover:text-primary focus-visible:text-primary focus-visible:outline-none"
            style={{ color: "#71717A" }}
          >
            Terms of Use
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
