import { useState, useMemo, useRef } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import QuestionnaireStep from "@/components/QuestionnaireStep";
import ProgressBar from "@/components/ProgressBar";
import VehicleCard from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RotateCcw, ChevronRight, Check, Zap } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

/* ---------------- TYPES ---------------- */
type Answers = {
  type?: "2W" | "4W";
  budget?: string;
  engine?: string;
};

/* ---------------- OPTIONS ---------------- */
const budgetOptions2W = [
  { value: "0-100000", label: "Under ₹1 Lakh", icon: "💰" },
  { value: "100000-300000", label: "₹1L – ₹3L", icon: "💵" },
  { value: "300000-1000000", label: "₹3L – ₹10L", icon: "💎" },
  { value: "1000000-50000000", label: "₹10L+", icon: "👑" },
  { value: "custom", label: "Custom Budget", icon: "✏️" },
];
const budgetOptions4W = [
  { value: "300000-1000000", label: "₹3L – ₹10L", icon: "💎" },
  { value: "1000000-50000000", label: "₹10L+", icon: "👑" },
  { value: "custom", label: "Custom Budget", icon: "✏️" },
];
const engineOptions2W = [
  { value: "Petrol", label: "Petrol", icon: "⛽" },
  { value: "Electric", label: "Electric", icon: "⚡" },
  { value: "CNG", label: "CNG / Hybrid", icon: "🌿" },
];
const engineOptions4W = [
  { value: "Petrol", label: "Petrol", icon: "⛽" },
  { value: "Electric", label: "Electric", icon: "⚡" },
  { value: "Diesel", label: "Diesel", icon: "🛢️" },
  { value: "CNG", label: "CNG / Hybrid", icon: "🌿" },
];

/* ---------------- STEPS ---------------- */
const getSteps = (vehicleType: string) => [
  {
    question: "What type of vehicle are you looking for?",
    subtitle: "Choose between two-wheelers and four-wheelers",
    key: "type" as keyof Answers,
    options: [
      { value: "2W", label: "Two Wheeler", icon: "🏍️" },
      { value: "4W", label: "Four Wheeler", icon: "🚗" },
    ],
  },
  {
    question: "What's your budget?",
    subtitle: "Select a price range that works for you",
    key: "budget" as keyof Answers,
    options: vehicleType === "4W" ? budgetOptions4W : budgetOptions2W,
  },
  {
    question: "What will you use it for?",
    subtitle: "Select all that apply",
    key: "usage",
    multi: true,
    options: [
      { value: "daily", label: "Daily Commute", icon: "🏙️" },
      { value: "sports", label: "Sports / Racing", icon: "🏁" },
      { value: "cruiser", label: "Cruising / Touring", icon: "🛣️" },
      { value: "adventure", label: "Adventure / Off-Road", icon: "⛰️" },
    ],
  },
  {
    question: "Preferred engine / fuel type?",
    subtitle: "Pick the powertrain that suits your needs",
    key: "engine" as keyof Answers,
    options: vehicleType === "2W" ? engineOptions2W : engineOptions4W,
  },
];

/* ---------------- HELPERS ---------------- */
const parseBudget = (b: string): [number, number] => {
  const [min, max] = b.split("-").map(Number);
  return [min, max];
};

/* ============================================================
   PARALLAX HERO
   - heroRef tracks the section height for scroll progress
   - bgY  → background image moves FASTER (deeper layer)
   - textY → text moves SLOWER (closer layer)
   ============================================================ */
const ParallaxHero = ({
  catalogCount,
  onFindClick,
}: {
  catalogCount: number;
  onFindClick: () => void;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* Background travels 35% of its own height downward as you scroll */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  /* Text travels only 15% — appears to "float" above the car */
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  /* Gentle fade out as user scrolls */
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "92vh" }}
    >
      {/* ── LAYER 1: BACKGROUND IMAGE (parallax — moves fastest) ── */}
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[115%] -top-[8%]"
      >
        {/* Dark image */}
        <img
          src="/images/hero_dark.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Light image */}
        <img
          src="/images/hero_light.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Gradient overlays — adapt per theme */}
        {isDark ? (
          <>
            {/* Dark mode: deep vignette on left so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          </>
        ) : (
          <>
            {/* Light mode: soft white wash on left */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
          </>
        )}

        {/* Purple glow accent — only in dark mode */}
        {isDark && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 55% at 65% 55%, hsl(263 70% 50% / 0.22) 0%, transparent 70%)",
            }}
          />
        )}
      </motion.div>

      {/* ── LAYER 2: TEXT CONTENT (parallax — moves slower) ── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex flex-col justify-center min-h-[92vh] px-8 md:px-16 lg:px-24 max-w-7xl mx-auto"
      >
        <div className="max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase mb-8 ${
              isDark
                ? "bg-white/5 border-primary/30 text-primary backdrop-blur-sm"
                : "bg-primary/10 border-primary/25 text-primary"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Next-gen vehicle search
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className={`text-[clamp(3rem,6.5vw,5rem)] font-extrabold tracking-tight leading-[1.05] mb-6 ${
              isDark ? "text-white" : "text-foreground"
            }`}
          >
            Find your{" "}
            <span
              className="italic font-bold"
              style={{ color: "hsl(var(--primary))" }}
            >
              perfect
            </span>
            <br />
            match.
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.6 }}
            className={`text-lg font-medium max-w-md leading-relaxed mb-10 ${
              isDark ? "text-white/65" : "text-muted-foreground"
            }`}
          >
            Our intelligent algorithm scans{" "}
            <a
              href="/browse"
              className={`font-semibold underline underline-offset-2 transition-colors ${
                isDark
                  ? "text-white/90 decoration-primary/50 hover:decoration-primary"
                  : "text-foreground decoration-primary/40 hover:decoration-primary"
              }`}
            >
              {catalogCount}+ vehicles
            </a>{" "}
            to surface the one that fits your budget, lifestyle and needs.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.55 }}
            className="flex flex-wrap gap-4"
          >
            <button
              id="hero-cta-find"
              onClick={onFindClick}
              className="btn-primary"
            >
              Find my vehicle
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/browse"
              id="hero-cta-browse"
              className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm border transition-all duration-200 active:scale-95 ${
                isDark
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/18 backdrop-blur-sm"
                  : "bg-transparent border-border/60 text-foreground hover:border-primary/40 hover:bg-primary/5"
              }`}
            >
              Explore catalog
              <ChevronRight className="w-4 h-4 opacity-60" />
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 flex items-center gap-2"
          >
            <div
              className={`w-px h-10 rounded-full ${
                isDark ? "bg-white/20" : "bg-foreground/15"
              }`}
            />
            <span
              className={`text-xs font-semibold tracking-widest uppercase ${
                isDark ? "text-white/30" : "text-foreground/30"
              }`}
            >
              scroll to find yours
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade into page background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, transparent, hsl(var(--background)))"
            : "linear-gradient(to bottom, transparent, hsl(var(--background)))",
        }}
      />
    </section>
  );
};

/* ---------------- VEHICLE TYPE CARD ---------------- */
const VehicleTypeCard = ({
  type,
  selected,
  onSelect,
}: {
  type: "2W" | "4W";
  selected: boolean;
  onSelect: () => void;
}) => {
  const is2W = type === "2W";
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: is2W ? 0 : 0.07, type: "spring", damping: 22 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
        selected
          ? "border-primary/60 bg-primary/5"
          : "border-border/40 bg-card/40 backdrop-blur-xl hover:border-primary/30 hover:bg-card/60"
      }`}
      style={
        selected
          ? {
              boxShadow:
                "0 0 0 1px hsl(var(--primary) / 0.45), 0 20px 40px -10px hsl(var(--primary) / 0.18)",
            }
          : {}
      }
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={is2W ? "/images/category_bike.png" : "/images/category_car.png"}
          alt={is2W ? "Two Wheeler" : "Four Wheeler"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg"
            >
              <Check className="w-4 h-4 text-primary-foreground stroke-[3px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              className={`text-xl font-bold tracking-tight transition-colors duration-200 ${
                selected ? "text-primary" : "text-foreground"
              }`}
            >
              {is2W ? "Two Wheeler" : "Four Wheeler"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              {is2W ? "Bikes, scooters & EVs" : "Hatchbacks, SUVs & sedans"}
            </p>
          </div>
          <div
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
              selected
                ? "border-primary bg-primary"
                : "border-muted-foreground/30 group-hover:border-primary/50"
            }`}
          >
            {selected && (
              <Check className="w-3 h-3 text-primary-foreground stroke-[3.5px]" />
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
};

/* ============================================================
   MAIN PAGE
   ============================================================ */
const Index = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [usageAnswers, setUsageAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [customBudget, setCustomBudget] = useState("");

  const finderRef = useRef<HTMLDivElement>(null);

  const steps = useMemo(() => getSteps(answers.type || "2W"), [answers.type]);

  const handleSelect = (key: keyof Answers, value: string) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const handleUsageToggle = (value: string) =>
    setUsageAnswers((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  const canProceed = useMemo(() => {
    if (step >= steps.length) return false;
    const currentStep = steps[step];
    if (currentStep.multi) return usageAnswers.length > 0;
    if (currentStep.key === "budget" && answers.budget === "custom")
      return customBudget.trim() !== "" && Number(customBudget) > 0;
    return answers[currentStep.key as keyof Answers] !== undefined;
  }, [step, steps, answers, usageAnswers, customBudget]);

  const next = () => {
    if (step < steps.length - 1) setStep((s) => s + 1);
    else setShowResults(true);
  };

  const prev = () => {
    if (showResults) setShowResults(false);
    else if (step > 0) setStep((s) => s - 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setUsageAnswers([]);
    setCustomBudget("");
    setShowResults(false);
  };

  const scrollToFinder = () => {
    finderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { data: vehicles = [] } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data } = await api.get("/vehicles");
      return data.map((v: any) => ({ ...v, model: v.vehicleModel, id: v._id }));
    },
  });

  const results = useMemo(() => {
    if (!showResults || !answers.type || !answers.engine) return [];
    let minB = 0,
      maxB = 50000000;
    if (answers.budget === "custom" && customBudget) {
      const val = Number(customBudget) * 100000;
      minB = val * 0.8;
      maxB = val * 1.2;
    } else if (answers.budget) {
      [minB, maxB] = parseBudget(answers.budget);
    }
    return vehicles
      .filter((v) => {
        if (v.vehicleType !== answers.type) return false;
        if (v.price < minB || v.price > maxB) return false;
        if (v.energyType.toLowerCase() !== answers.engine!.toLowerCase()) return false;
        if (usageAnswers.length > 0 && !usageAnswers.includes(v.usageType)) return false;
        return true;
      })
      .sort((a, b) => a.price - b.price);
  }, [showResults, answers, usageAnswers, customBudget]);

  const catalogCount = vehicles.length || 270;

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">

      {/* ============ PARALLAX HERO (only on step 0, before results) ============ */}
      {!showResults && step === 0 && (
        <ParallaxHero catalogCount={catalogCount} onFindClick={scrollToFinder} />
      )}

      {/* ============ WIZARD / RESULTS SECTION ============ */}
      <section
        ref={finderRef}
        id="finder"
        className={`flex-1 flex flex-col items-center px-4 ${
          !showResults && step === 0 ? "pt-8 pb-24" : "py-20"
        }`}
      >
        {!showResults ? (
          <div className="w-full max-w-4xl">
            {/* Progress Bar */}
            <div className="mb-10">
              <ProgressBar current={step + 1} total={steps.length} />
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div
                  key="type-step"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-[2.6rem] font-bold mb-3 text-foreground tracking-tight">
                      What are you looking for?
                    </h2>
                    <p className="text-muted-foreground font-medium text-base opacity-70">
                      Choose between two-wheelers and four-wheelers
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <VehicleTypeCard
                      type="2W"
                      selected={answers.type === "2W"}
                      onSelect={() => handleSelect("type", "2W")}
                    />
                    <VehicleTypeCard
                      type="4W"
                      selected={answers.type === "4W"}
                      onSelect={() => handleSelect("type", "4W")}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35 }}
                >
                  <QuestionnaireStep
                    question={steps[step].question}
                    subtitle={steps[step].subtitle}
                    options={steps[step].options}
                    selected={answers[steps[step].key as keyof Answers] || null}
                    onSelect={(v) =>
                      handleSelect(steps[step].key as keyof Answers, v)
                    }
                    multiSelect={steps[step].multi}
                    selectedMulti={usageAnswers}
                    onSelectMulti={handleUsageToggle}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Budget */}
            {steps[step].key === "budget" && answers.budget === "custom" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex flex-col items-center"
              >
                <div className="relative w-full max-w-xs">
                  <input
                    type="number"
                    placeholder="Enter Budget (in Lakhs)"
                    value={customBudget}
                    onChange={(e) => setCustomBudget(e.target.value)}
                    className="w-full bg-card/40 backdrop-blur-xl border border-glass-border/50 p-5 rounded-3xl text-xl font-bold text-center placeholder:text-muted-foreground/30 focus:border-primary/50 transition-all outline-none"
                  />
                  <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                    <span className="text-muted-foreground/50 font-bold">L</span>
                  </div>
                </div>
                <p className="mt-3 text-[11px] uppercase tracking-widest font-semibold text-muted-foreground/40">
                  Enter amount like 10 for ₹10 Lakhs
                </p>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14">
              {step > 0 && (
                <button
                  onClick={prev}
                  className="order-2 sm:order-1 flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border border-border/60 bg-transparent text-foreground font-semibold text-sm hover:bg-muted/50 hover:border-primary/30 transition-all w-full sm:w-auto"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button
                onClick={next}
                disabled={!canProceed}
                title={!canProceed ? "Please select an option to continue" : undefined}
                className={`order-1 sm:order-2 flex items-center justify-center gap-2 px-10 py-3.5 rounded-2xl font-semibold text-sm transition-all w-full sm:w-auto active:scale-95 ${
                  canProceed
                    ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg"
                    : "bg-primary/30 text-primary-foreground/50 cursor-not-allowed"
                }`}
                style={
                  canProceed
                    ? { boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)" }
                    : {}
                }
              >
                {step === steps.length - 1 ? "Discover Results" : "Next Step"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {!canProceed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-xs text-muted-foreground/50 mt-4 font-medium"
              >
                Select an option above to continue
              </motion.p>
            )}
          </div>
        ) : (
          /* ============ RESULTS ============ */
          <div className="w-full max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl md:text-5xl font-bold mb-3 tracking-tight"
                >
                  {results.length > 0
                    ? `Your Top ${results.length} Matches`
                    : "No exact matches"}
                </motion.h2>
                <p className="text-muted-foreground font-medium">
                  Based on your unique preferences and budget.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary/50 text-foreground font-semibold text-sm hover:bg-secondary transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Adjust
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 font-semibold text-sm hover:bg-primary/20 transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
              </div>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((v, i) => (
                  <VehicleCard key={v.id} vehicle={v} index={i} />
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center max-w-lg mx-auto">
                <RotateCcw className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No vehicles found</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  We couldn't find an exact match. Try adjusting your budget or
                  usage preferences.
                </p>
                <Button onClick={reset} className="rounded-2xl">
                  Start Over
                </Button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;