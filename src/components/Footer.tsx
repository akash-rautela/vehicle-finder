import { Car } from "lucide-react";

const Footer = () => (
  <footer className="mt-auto border-t border-border/60 bg-background/60 backdrop-blur-md">
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">
              Vehicle<span className="text-primary">Finder</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Find your perfect ride with our smart recommendation engine. Two-wheelers & four-wheelers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="/browse" className="hover:text-primary transition-colors">Browse Vehicles</a></li>
            {/* <li><a href="#" className="hover:text-primary transition-colors">Compare</a></li> */}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Categories</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/browse" className="hover:text-primary transition-colors">Two Wheelers</a></li>
            <li><a href="/browse" className="hover:text-primary transition-colors">Four Wheelers</a></li>
            {/* <li><a href="#" className="hover:text-primary transition-colors">Electric Vehicles</a></li> */}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="mailto:akashrautelacms@gmail.com">akashrautelacms@gmail.com</a></li>
            <li>+91 86047 35639</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} VehicleFinder. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
