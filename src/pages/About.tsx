import { motion } from "framer-motion";
import { Car, Target, Users, Zap, Shield, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const values = [
  { icon: Target, title: "Precision Matching", desc: "Our smart questionnaire narrows down the perfect vehicle based on your unique needs." },
  { icon: Zap, title: "Fast & Simple", desc: "No endless scrolling — get curated results in under a minute." },
  { icon: Shield, title: "Trusted Data", desc: "Accurate specs sourced from manufacturers so you can compare with confidence." },
  { icon: Heart, title: "Built for You", desc: "Whether you're a daily commuter or a weekend adventurer, we've got you covered." },
];

const team = [
  { name: "Akash Singh Rautela", role: "Founder & Developer", emoji: "👨‍💻" },
  { name: "Atul S. Rathore", role: "UI/UX Designer", emoji: "🎨" },
  { name: "Sahaj Kumar", role: "Data Analyst", emoji: "📊" },
];

const About = () => {
  return (
    <div className="bg-mesh min-h-screen pt-20">
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-8">
        {/* Hero */}
        <motion.div
          className="mb-24 text-center"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8 }}
        >
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/10 shadow-2xl shadow-primary/10 border border-primary/20">
            <Car className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-6 text-5xl md:text-7xl font-black tracking-tight text-foreground">
            About <span className="text-primary italic">MotoMatch</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground font-medium opacity-70">
            Defining the future of vehicle discovery through intelligence, simplicity, and premium design.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.section
          className="mb-24"
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6 text-center">THE MISSION</h2>
            <h3 className="mb-8 text-3xl md:text-4xl font-black text-foreground text-center leading-tight">Eliminating the complexity of vehicle search.</h3>
            <p className="mx-auto max-w-3xl text-muted-foreground leading-relaxed font-medium text-center text-lg opacity-80">
              Purchasing a vehicle should be an exhilarating journey, not a data-mining operation. MotoMatch was engineered to solve the paralysis caused by specification overload. We've simplified the process into a conversation — delivering personalized matches that truly align with your lifestyle.
            </p>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section className="mb-24">
          <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-12 text-center">CORE PRINCIPLES</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="glass-card p-8 group"
              >
                <div className="flex gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary/30 border border-border/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
                    <v.icon className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-black text-foreground group-hover:text-primary transition-colors">{v.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed opacity-70">{v.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section className="pb-24">
          <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-12 text-center">THE ARCHITECTS</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="glass-card p-10 text-center group"
              >
                <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 scale-110">{t.emoji}</div>
                <h3 className="text-lg font-black text-foreground mb-1 group-hover:text-primary transition-colors">{t.name}</h3>
                <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;