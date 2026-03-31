import { Mail, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/vehiclefinder", handle: "@vehiclefinder" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/akash-singh-rautela", handle: "Akash S. Rautela" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/vehiclefinder", handle: "@vehiclefinder" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/akash-singh-rautela", handle: "Atul S. Rathore" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/sxhaj_", handle: "@vehiclefinder" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sahaj-kumar-797024311/", handle: "Sahaj Kumar" },
];

const Contact = () => (
  <section className="flex flex-1 items-center justify-center px-4 py-20">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md space-y-8 rounded-2xl border border-border/60 bg-card/80 p-8 backdrop-blur-lg"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
        <p className="text-sm text-muted-foreground">We'd love to hear from you!</p>
      </div>

      {/* Email */}
      <a
        href="mailto:akashrautelacms@gmail.com"
        className="flex items-center gap-4 rounded-xl border border-border/40 bg-background/60 px-5 py-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
      >
        <Mail className="h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</p>
          <p className="text-sm font-semibold text-foreground">akashrautelacms@gmail.com</p>
        </div>
      </a>

      {/* Social Links */}
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Follow Us</p>
        <div className="grid grid-cols-2 gap-3">
          {socials.map(({ icon: Icon, label, href, handle }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/60 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <Icon className="h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="truncate text-sm font-medium text-foreground">{handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

export default Contact;