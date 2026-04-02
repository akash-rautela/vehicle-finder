import { Car, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

interface NavItemProps {
  href: string;
  label: string;
  onClick?: () => void;
}

const NavItem = ({ href, label, onClick }: NavItemProps) => (
  <a
    href={href}
    onClick={onClick}
    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
  >
    {label}
  </a>
);


const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <Car className="h-7 w-7 text-primary" />
          <span className="text-xl font-extrabold tracking-tight text-foreground">
            Vehicle<span className="text-primary">Finder</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <NavItem href="/" label="Home" />
          <NavItem href="/browse" label="Browse" />
          <NavItem href="/compare" label="Compare" />
          <NavItem href="/about" label="About" />
          <NavItem href="/contact" label="Contact" />
          <ThemeToggle />
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/40 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              <NavItem href="/" label="Home" onClick={() => setMobileOpen(false)} />
              <NavItem href="/browse" label="Browse" onClick={() => setMobileOpen(false)} />
              <NavItem href="/compare" label="Compare" onClick={() => setMobileOpen(false)} />
              <NavItem href="/about" label="About" onClick={() => setMobileOpen(false)} />
              <NavItem href="/contact" label="Contact" onClick={() => setMobileOpen(false)} />
              <div className="pt-2"><ThemeToggle /></div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;