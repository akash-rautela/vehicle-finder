import { Car, Menu, X, User as UserIcon, LayoutDashboard, LogOut, Home, Grid, GitCompare, Info, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

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
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
  </a>
);

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/browse", label: "Browse", icon: Grid },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header className="nav-glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">

          {/* LOGO */}
          <a href="/" className="flex items-center gap-2.5 group z-50 relative">
            <Car className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-6" />
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              Moto<span className="text-primary">Match</span>
            </span>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ href, label }) => (
              <NavItem key={href} href={href} label={label} />
            ))}

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

          {/* MOBILE: Right side controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            {/* Hamburger Button */}
            <motion.button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50 flex items-center justify-center w-10 h-10 rounded-xl text-foreground transition-colors hover:bg-secondary"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-xl md:hidden"
              onClick={closeMenu}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-[80vw] max-w-sm md:hidden flex flex-col"
              style={{
                background: "hsl(var(--background))",
                borderLeft: "1px solid hsl(var(--border) / 0.3)",
                boxShadow: "-20px 0 60px rgba(0,0,0,0.3)"
              }}
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border/20">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                  Navigation
                </span>
                {user && (
                  <span className="text-xs font-bold text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
                    {user.name || "Admin"}
                  </span>
                )}
              </div>

              {/* Nav Links */}
              <nav className="flex-1 flex flex-col justify-center px-6 gap-1">
                {navLinks.map(({ href, label, icon: Icon }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.06, type: "spring", damping: 20 }}
                    className="flex items-center gap-4 px-4 py-4 rounded-2xl text-foreground/80 hover:text-primary hover:bg-primary/8 active:bg-primary/15 transition-all duration-200 group"
                  >
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary group-hover:bg-primary/15 transition-colors">
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </span>
                    <span className="text-lg font-bold tracking-tight">{label}</span>
                  </motion.a>
                ))}
              </nav>

              {/* Bottom User Actions */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="px-6 pb-8 pt-4 border-t border-border/20 flex flex-col gap-3"
              >
                {user ? (
                  <>
                    <a
                      href="/admin"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-secondary hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span className="text-sm font-bold">Admin Dashboard</span>
                    </a>
                    <button
                      onClick={() => { logout(); closeMenu(); }}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-destructive bg-destructive/10 hover:bg-destructive/20 transition-all duration-200 w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm font-bold">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <a
                    href="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 active:opacity-80 transition-all duration-200 font-bold shadow-lg shadow-primary/20"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span className="text-sm font-bold">Login</span>
                  </a>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;