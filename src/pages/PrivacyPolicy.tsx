import { motion } from "framer-motion";
import { Shield, Eye, Database, Lock, Mail, RefreshCw, Globe, UserCheck } from "lucide-react";

const LAST_UPDATED = "23 October 2026";
const CONTACT_EMAIL = "akashrautelacms@gmail.com";
const SITE_NAME = "MotoMatch";

const Section = ({
  icon: Icon,
  title,
  children,
  index,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  index: number;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 + index * 0.06, duration: 0.5 }}
    className="group"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="pl-12 text-[15px] leading-relaxed text-muted-foreground space-y-3">
      {children}
    </div>
  </motion.section>
);

const PrivacyPolicy = () => {
  return (
    <div className="page-car-bg min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
            <Shield className="w-3.5 h-3.5" />
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-base font-medium">
            Last updated: <span className="text-foreground font-semibold">{LAST_UPDATED}</span>
          </p>

          {/* Friendly note */}
          <div className="mt-8 p-5 rounded-2xl bg-primary/5 border border-primary/15">
            <p className="text-sm font-medium text-foreground/80 leading-relaxed">
              <strong className="text-primary">Plain-English summary:</strong>{" "}
              {SITE_NAME} is a free, personal student project. We don't sell
              your data, we don't run ads, and we barely collect anything. This
              page just explains what little we do store and why.
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-border/50 mb-12" />

        {/* Sections */}
        <div className="space-y-12">

          <Section icon={Globe} title="1. Who We Are" index={0}>
            <p>
              {SITE_NAME} is a personal, non-commercial project built and maintained
              by <strong className="text-foreground">Akash Rautela</strong> as a
              portfolio and learning exercise. It is not affiliated with any
              automobile manufacturer, dealership, or commercial entity.
            </p>
            <p>
              The site is hosted on Vercel and the API runs on a personal server.
              There is no business registration, no revenue model, and no
              third-party advertisers.
            </p>
          </Section>

          <Section icon={Eye} title="2. Information We Collect" index={1}>
            <p>
              <strong className="text-foreground">From visitors (you):</strong>{" "}
              We collect <em>nothing</em>. MotoMatch does not use cookies, does not
              require sign-up, and does not track you across sessions.
            </p>
            <p>
              The vehicle recommendation wizard runs entirely in your browser. Your
              selections (vehicle type, budget, usage) are never sent to our server
              — they are used only to filter results on your device and are
              discarded when you close the tab.
            </p>
            <p>
              <strong className="text-foreground">From admin users:</strong>{" "}
              If you log in to the admin dashboard (invite-only), we store your{" "}
              <strong className="text-foreground">name, email address</strong>, and a{" "}
              <strong className="text-foreground">bcrypt-hashed password</strong> in
              a MongoDB database. Plaintext passwords are never stored.
            </p>
          </Section>

          <Section icon={Database} title="3. How We Use Your Information" index={2}>
            <p>Admin account data is used <em>only</em> to:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Authenticate you into the admin dashboard</li>
              <li>Display your name inside the dashboard</li>
            </ul>
            <p>
              We do not use your data for marketing, analytics, profiling, or
              any other purpose. We do not share it with third parties.
            </p>
          </Section>

          <Section icon={Lock} title="4. Data Storage & Security" index={3}>
            <p>
              Vehicle and user data is stored in a MongoDB Atlas database protected
              by authentication credentials. API endpoints that write or modify data
              require a valid JWT token. All passwords are hashed with bcrypt
              (10 salt rounds) before storage.
            </p>
            <p>
              Images are stored on <strong className="text-foreground">Cloudinary</strong>,
              a third-party image CDN. Cloudinary may log access requests (IP address,
              timestamp) per their own{" "}
              <a
                href="https://cloudinary.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                privacy policy
              </a>
              .
            </p>
            <p>
              While we take reasonable precautions, no internet transmission is
              100% secure. This is a personal project — please don't store sensitive
              information in your account name or email.
            </p>
          </Section>

          <Section icon={UserCheck} title="5. Third-Party Services" index={4}>
            <p>We use the following third-party services:</p>
            <div className="space-y-3 ml-2">
              {[
                {
                  name: "Vercel",
                  purpose: "Frontend hosting",
                  policy: "https://vercel.com/legal/privacy-policy",
                },
                {
                  name: "MongoDB Atlas",
                  purpose: "Database hosting",
                  policy: "https://www.mongodb.com/legal/privacy-policy",
                },
                {
                  name: "Cloudinary",
                  purpose: "Image storage & delivery",
                  policy: "https://cloudinary.com/privacy",
                },
              ].map((s) => (
                <div key={s.name} className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>
                    <strong className="text-foreground">{s.name}</strong> —{" "}
                    {s.purpose}.{" "}
                    <a
                      href={s.policy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:opacity-80"
                    >
                      Privacy policy ↗
                    </a>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2">
              Each of these services may collect server logs (IP address, browser
              type, request timestamps) as part of normal operations. We do not
              control or have access to those logs.
            </p>
          </Section>

          <Section icon={RefreshCw} title="6. Changes to This Policy" index={5}>
            <p>
              If this policy changes materially, the "Last updated" date at the top
              will reflect the revision. Since there is no user account system for
              visitors, we cannot notify you directly — please check back if you are
              concerned.
            </p>
          </Section>

          <Section icon={Mail} title="7. Contact" index={6}>
            <p>
              Questions about this policy? Reach out at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary underline underline-offset-2 hover:opacity-80 font-semibold"
              >
                {CONTACT_EMAIL}
              </a>
              . Responses may take a few days — this is a one-person project.
            </p>
          </Section>

        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground/60 font-medium">
            © {new Date().getFullYear()} {SITE_NAME} · Personal project by Akash Rautela
          </p>
          <div className="flex gap-4 text-xs font-medium">
            <a href="/privacy" className="text-primary hover:opacity-80 transition-opacity">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Use
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
