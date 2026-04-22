import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import QuestionnaireStep from "@/components/QuestionnaireStep";
import ProgressBar from "@/components/ProgressBar";
import VehicleCard from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RotateCcw, Car } from "lucide-react";

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

/* ---------------- MAIN ---------------- */
const Index = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [usageAnswers, setUsageAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [customBudget, setCustomBudget] = useState("");

  const steps = useMemo(() => getSteps(answers.type || "2W"), [answers.type]);

  const handleSelect = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleUsageToggle = (value: string) => {
    setUsageAnswers((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const canProceed = useMemo(() => {
    if (step >= steps.length) return false;

    const currentStep = steps[step];

    if (currentStep.multi) return usageAnswers.length > 0;

    if (currentStep.key === "budget" && answers.budget === "custom") {
      return customBudget.trim() !== "" && Number(customBudget) > 0;
    }

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

  const { data: vehicles = [] } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data } = await api.get('/vehicles');
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
        if (v.energyType.toLowerCase() !== answers.engine!.toLowerCase())
          return false;

        if (usageAnswers.length > 0) {
          if (!usageAnswers.includes(v.usageType)) return false;
        }

        return true;
      })
      .sort((a, b) => a.price - b.price);
  }, [showResults, answers, usageAnswers, customBudget]);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 bg-mesh selection:bg-primary/20">
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* HERO SECTION */}
      {!showResults && step === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mt-12 mb-16 max-w-3xl"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-xl shadow-primary/5"
          >
            <Car className="w-3.5 h-3.5" />
            THE NEXT GENERATION OF VEHICLE SEARCH
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-6 leading-[1.1]">
            Find your <span className="text-primary italic">perfect</span> match.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed opacity-80">
            Our intelligent matching algorithm analyzes 270+ vehicles to find the one that fits your lifestyle perfectly.
          </p>
        </motion.div>
      )}

      {/* SPACER FOR MOBILE */}
      <div className={!showResults && step === 0 ? "h-0" : "h-12"} />

      {!showResults ? (
        <div className="w-full max-w-4xl relative">
          <ProgressBar current={step + 1} total={steps.length} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mt-8"
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
          </AnimatePresence>

          {/* CUSTOM BUDGET */}
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
                  className="w-full bg-card/40 backdrop-blur-xl border border-glass-border/50 p-6 rounded-3xl text-xl font-bold text-center placeholder:text-muted-foreground/30 focus:border-primary/50 transition-all outline-none"
                />
                <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                  <span className="text-muted-foreground/50 font-black">L</span>
                </div>
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-widest font-black text-muted-foreground/40">Enter amount like 10 for 10 Lakhs</p>
            </motion.div>
          )}

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 w-full">
            {step > 0 && (
              <button 
                onClick={prev}
                className="order-2 sm:order-1 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-border bg-transparent text-foreground font-black text-xs tracking-widest uppercase hover:bg-muted/50 transition-all w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
            <button 
              onClick={next} 
              disabled={!canProceed}
              className="order-1 sm:order-2 flex items-center justify-center gap-2 px-12 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-xs tracking-widest uppercase hover:opacity-90 disabled:opacity-30 transition-all shadow-2xl shadow-primary/20 w-full sm:w-auto active:scale-95"
            >
              {step === steps.length - 1 ? "Discover Results" : "Next Step"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl font-black mb-3"
              >
                {results.length > 0
                  ? `Your Top ${results.length} Matches`
                  : "No exact matches"}
              </motion.h2>
              <p className="text-muted-foreground font-medium">Based on your unique preferences and budget.</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={prev}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary/50 text-foreground font-black text-xs tracking-widest uppercase hover:bg-secondary transition-all"
              >
                Adjust
              </button>
              <button 
                onClick={reset}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 font-black text-xs tracking-widest uppercase hover:bg-primary/20 transition-all"
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
              <p className="text-muted-foreground mb-6 text-sm">We couldn't find an exact match. Try adjusting your budget or usage preferences.</p>
              <Button onClick={reset} className="rounded-2xl">Start Over</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;