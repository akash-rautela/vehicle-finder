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
  <section className="bg-mesh min-h-screen flex items-center justify-center px-6 py-20">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-xl glass-card p-12 md:p-16 relative overflow-hidden"
    >
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
      
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black tracking-widest uppercase mb-6">
          GET IN TOUCH
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">Connect with <span className="text-primary italic">Us</span></h1>
        <p className="text-muted-foreground font-medium opacity-60">Have a query or feedback? Our team is here to assist you.</p>
      </div>

      <div className="space-y-6">
        {/* Email */}
        <a
          href="mailto:akashrautelacms@gmail.com"
          className="flex items-center gap-6 p-6 rounded-[1.5rem] bg-secondary/20 border border-border/10 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 group"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card border border-border/10 group-hover:bg-primary/10 transition-colors">
            <Mail className="h-6 w-6 text-foreground group-hover:text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-1">Official Inquiry</p>
            <p className="text-sm font-bold text-foreground">akashrautelacms@gmail.com</p>
          </div>
        </a>

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socials.map(({ icon: Icon, label, href, handle }) => (
            <a
              key={handle}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/20 border border-border/10 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border/10 group-hover:bg-primary/10 transition-colors">
                <Icon className="h-4 w-4 text-foreground group-hover:text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/50">{label}</p>
                <p className="truncate text-xs font-bold text-foreground">{handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

export default Contact;