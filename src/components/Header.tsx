import { Car, Menu, X, User as UserIcon, LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

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
  const { user, logout } = useAuth();

  return (
    <header className="nav-glass">
      
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        
        {/* LOGO */}
        <a href="/" className="flex items-center gap-2.5 group">
          <Car className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-6" />
          <span className="text-xl font-extrabold tracking-tight text-foreground">
            Moto<span className="text-primary">Match</span>
          </span>
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavItem href="/" label="Home" />
          <NavItem href="/browse" label="Browse" />
          <NavItem href="/compare" label="Compare" />
          <NavItem href="/about" label="About" />
          <NavItem href="/contact" label="Contact" />

          <div className="flex items-center gap-4 pl-4 border-l border-border/50">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center gap-3">
                <a href="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </a>
                <button onClick={logout} className="text-sm font-medium text-destructive hover:text-destructive/80 flex items-center gap-1.5 transition-colors">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <a href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors">
                <UserIcon className="h-4 w-4" />
                Login
              </a>
            )}
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/10 md:hidden bg-background/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col items-end gap-6 px-8 py-12 text-right">

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

              <div className="pt-6 mt-4 border-t border-border/10 flex flex-col items-end gap-6 w-full">
                <ThemeToggle />
                
                {user ? (
                  <div className="flex items-center gap-4">
                    <a 
                      href="/admin" 
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1.5"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </a>
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="text-destructive">
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <a 
                    href="/login" 
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1.5"
                  >
                    <UserIcon className="h-4 w-4" />
                    Login
                  </a>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;