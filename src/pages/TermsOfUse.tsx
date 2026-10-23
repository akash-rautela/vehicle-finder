import { motion } from "framer-motion";
import { FileText, CheckCircle, AlertTriangle, Ban, Scale, MessageSquare, RefreshCw, Globe } from "lucide-react";

const LAST_UPDATED = "23 October 2026";
const CONTACT_EMAIL = "akashrautelacms@gmail.com";
const SITE_NAME = "MotoMatch";
const SITE_URL = "motomatch.vercel.app";

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

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
            <FileText className="w-3.5 h-3.5" />
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Terms of Use
          </h1>
          <p className="text-muted-foreground text-base font-medium">
            Last updated: <span className="text-foreground font-semibold">{LAST_UPDATED}</span>
          </p>

          {/* Friendly note */}
          <div className="mt-8 p-5 rounded-2xl bg-primary/5 border border-primary/15">
            <p className="text-sm font-medium text-foreground/80 leading-relaxed">
              <strong className="text-primary">Plain-English summary:</strong>{" "}
              {SITE_NAME} is a free personal project — use it, enjoy it, but
              please don't misuse it. Vehicle data is for reference only;
              always verify specs and prices with the official manufacturer or
              dealer before making a purchase decision.
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-border/50 mb-12" />

        {/* Sections */}
        <div className="space-y-12">

          <Section icon={Globe} title="1. About This Site" index={0}>
            <p>
              {SITE_NAME} (<em>{SITE_URL}</em>) is a personal, non-commercial
              web application built and maintained by{" "}
              <strong className="text-foreground">Akash Rautela</strong> as a
              portfolio project. It provides a vehicle recommendation wizard
              and catalog browser to help users discover cars and motorcycles
              available in India.
            </p>
            <p>
              By accessing or using {SITE_NAME}, you agree to these Terms of Use.
              If you do not agree, please stop using the site.
            </p>
          </Section>

          <Section icon={CheckCircle} title="2. Acceptable Use" index={1}>
            <p>You are welcome to:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Browse the vehicle catalog and use the recommendation wizard</li>
              <li>Compare vehicles and explore specs</li>
              <li>Share links to pages on this site</li>
              <li>Use the site for personal, non-commercial research</li>
            </ul>
          </Section>

          <Section icon={Ban} title="3. Prohibited Use" index={2}>
            <p>You must not:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                Attempt to gain unauthorized access to the admin dashboard,
                API, or database
              </li>
              <li>
                Scrape, mirror, or redistribute the vehicle catalog data for
                commercial purposes without permission
              </li>
              <li>
                Submit false information through the contact form or any other
                input
              </li>
              <li>
                Perform automated requests (bots, crawlers) at a rate that
                degrades performance for other users — rate limiting is enforced
                at the API level
              </li>
              <li>
                Reverse-engineer, decompile, or attempt to extract credentials
                from the site
              </li>
            </ul>
          </Section>

          <Section icon={AlertTriangle} title="4. Accuracy of Information" index={3}>
            <p>
              Vehicle specifications, prices, and images displayed on {SITE_NAME}{" "}
              are maintained manually by the project author based on publicly
              available information. They may be:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Out of date due to manufacturer updates</li>
              <li>Approximate rather than exact (e.g. mileage figures)</li>
              <li>Region-specific (data is focused on the Indian market)</li>
            </ul>
            <p>
              <strong className="text-foreground">
                Always verify specifications and pricing directly with the
                official manufacturer website or an authorized dealer before
                making a purchase decision.
              </strong>{" "}
              {SITE_NAME} is a discovery and comparison tool, not a purchasing
              platform.
            </p>
          </Section>

          <Section icon={Scale} title="5. Disclaimer of Warranties" index={4}>
            <p>
              {SITE_NAME} is provided <em>"as is"</em> and <em>"as available"</em>,
              without warranties of any kind — express or implied. The author
              makes no guarantee that:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>The site will be available at all times or free of errors</li>
              <li>Vehicle data is complete, accurate, or current</li>
              <li>The recommendation algorithm will produce perfect results for your needs</li>
            </ul>
            <p>
              Use the site at your own discretion. Any purchase decisions are
              entirely your own responsibility.
            </p>
          </Section>

          <Section icon={Scale} title="6. Limitation of Liability" index={5}>
            <p>
              To the fullest extent permitted by applicable law, Akash Rautela
              shall not be liable for any indirect, incidental, or consequential
              damages arising from your use of {SITE_NAME}, including but not
              limited to reliance on inaccurate vehicle data.
            </p>
            <p>
              Since this is a free personal project with no commercial
              relationship, the total liability in any circumstance is limited
              to zero rupees (₹0).
            </p>
          </Section>

          <Section icon={Globe} title="7. External Links" index={6}>
            <p>
              {SITE_NAME} links to external manufacturer and dealer websites.
              These links are provided for convenience. We do not control those
              sites and are not responsible for their content, privacy practices,
              or accuracy.
            </p>
          </Section>

          <Section icon={RefreshCw} title="8. Changes to These Terms" index={7}>
            <p>
              These terms may be updated from time to time. The "Last updated"
              date at the top will always reflect the current version. Continued
              use of {SITE_NAME} after a change constitutes acceptance of the
              updated terms.
            </p>
          </Section>

          <Section icon={MessageSquare} title="9. Contact" index={8}>
            <p>
              Questions, feedback, or concerns? Email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary underline underline-offset-2 hover:opacity-80 font-semibold"
              >
                {CONTACT_EMAIL}
              </a>
              . This is a one-person project, so please be patient with responses.
            </p>
          </Section>

        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground/60 font-medium">
            © {new Date().getFullYear()} {SITE_NAME} · Personal project by Akash Rautela
          </p>
          <div className="flex gap-4 text-xs font-medium">
            <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-primary hover:opacity-80 transition-opacity">
              Terms of Use
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default TermsOfUse;
