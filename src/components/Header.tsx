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
    className="relative text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-primary group"
  >
    {label}

    {/* underline animation */}
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
  </a>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60">
      
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        
        {/* LOGO */}
        <a href="/" className="flex items-center gap-2.5 group">
          <Car className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-6" />
          <span className="text-xl font-extrabold tracking-tight text-foreground">
            Vehicle<span className="text-primary">Finder</span>
          </span>
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavItem href="/" label="Home" />
          <NavItem href="/browse" label="Browse" />
          <NavItem href="/compare" label="Compare" />
          <NavItem href="/about" label="About" />
          <NavItem href="/contact" label="Contact" />

          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* MOBILE BTN */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border/40 md:hidden backdrop-blur-xl bg-background/80"
          >
            <div className="flex flex-col gap-2 px-4 py-4">

              {["Home", "Browse", "Compare", "About", "Contact"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavItem
                    href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                    label={item}
                    onClick={() => setMobileOpen(false)}
                  />
                </motion.div>
              ))}

              <div className="pt-3 border-t border-border/30">
                <ThemeToggle />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;