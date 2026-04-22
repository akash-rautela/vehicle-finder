import { Car } from "lucide-react";

const Footer = () => (
  <footer className="mt-auto border-t border-white/5 bg-card/20 backdrop-blur-3xl">
    <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-black text-foreground tracking-tight">
              Moto<span className="text-primary">Match</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground/60 leading-relaxed font-medium uppercase tracking-widest">
            THE NEXT GENERATION OF VEHICLE SEARCH & DISCOVERY.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Navigation</h4>
          <ul className="space-y-3 text-xs font-bold text-muted-foreground">
            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="/browse" className="hover:text-primary transition-colors">Browse Catalog</a></li>
            <li><a href="/compare" className="hover:text-primary transition-colors">Comparison Tool</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Collections</h4>
          <ul className="space-y-3 text-xs font-bold text-muted-foreground">
            <li><a href="/browse" className="hover:text-primary transition-colors">Performance 2W</a></li>
            <li><a href="/browse" className="hover:text-primary transition-colors">Luxury 4W</a></li>
            <li><a href="/browse" className="hover:text-primary transition-colors">Electric Future</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Inquiries</h4>
          <ul className="space-y-3 text-xs font-bold text-muted-foreground">
            <li><a href="mailto:akashrautelacms@gmail.com" className="hover:text-primary transition-colors">akashrautelacms@gmail.com</a></li>
            <li className="opacity-60">+91 86047 35639</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest">
          © {new Date().getFullYear()} MotoMatch. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest hover:text-primary transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
