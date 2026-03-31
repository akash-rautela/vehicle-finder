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
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      {/* Hero */}
      <motion.div
        className="mb-16 text-center"
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Car className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          About <span className="text-primary">VehicleFinder</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          We help you discover the ideal two-wheeler by matching your budget, riding style, and preferences — all in a few clicks.
        </p>
      </motion.div>

      {/* Mission */}
      <motion.section
        className="mb-16"
        variants={fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-card border-border/40">
          <CardContent className="p-8 text-center md:p-12">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
              Buying a vehicle shouldn't be overwhelming. VehicleFinder was born from the frustration of comparing dozens of specs across multiple websites. We built a streamlined tool that asks the right questions and delivers tailored results — so you spend less time searching and more time riding.
            </p>
          </CardContent>
        </Card>
      </motion.section>

      {/* Values */}
      <motion.section
        className="mb-16"
        variants={fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">What We Stand For</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <Card className="glass-card h-full border-border/40 transition-shadow hover:shadow-lg">
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <v.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team */}
      <motion.section
        variants={fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Meet the Team</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <Card className="glass-card border-border/40 text-center transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <span className="mb-3 block text-4xl">{t.emoji}</span>
                  <h3 className="font-semibold text-foreground">{t.name}</h3>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default About;