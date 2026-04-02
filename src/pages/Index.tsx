import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QuestionnaireStep from "@/components/QuestionnaireStep";
import ProgressBar from "@/components/ProgressBar";
import VehicleCard from "@/components/VehicleCard";
import { vehicles, Vehicle } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RotateCcw, Car } from "lucide-react";

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

const getSteps = (vehicleType: string) => [
  {
    question: "What type of vehicle are you looking for?",
    subtitle: "Choose between two-wheelers and four-wheelers",
    key: "type" as const,
    options: [
      { value: "2W", label: "Two Wheeler", icon: "🏍️" },
      { value: "4W", label: "Four Wheeler", icon: "🚗" },
    ],
  },
  {
    question: "What's your budget?",
    subtitle: "Select a price range that works for you",
    key: "budget" as const,
    options: vehicleType === "4W" ? budgetOptions4W : budgetOptions2W,
  },
  {
    question: "What will you use it for?",
    subtitle: "Select all that apply",
    key: "usage" as const,
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
    key: "engine" as const,
    options: vehicleType === "2W" ? engineOptions2W : engineOptions4W,
  },
];

const parseBudget = (b: string): [number, number] => {
  const [min, max] = b.split("-").map(Number);
  return [min, max];
};

const Index = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [usageAnswers, setUsageAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [customBudget, setCustomBudget] = useState("");

  const steps = useMemo(() => getSteps(answers.type || "2W"), [answers.type]);
  const handleSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleUsageToggle = (value: string) => {
    setUsageAnswers((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const canProceed =
    step < steps.length &&
    (steps[step].multi
      ? usageAnswers.length > 0
      : steps[step].key === "budget" && answers.budget === "custom"
        ? customBudget.trim() !== "" && Number(customBudget) > 0
        : !!answers[steps[step].key]);

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

  const results = useMemo(() => {
    if (!showResults) return [];
    let minB: number, maxB: number;
    if (answers.budget === "custom" && customBudget) {
      const val = Number(customBudget) * 100000; // convert lakhs to INR
      minB = Math.max(0, val * 0.8);
      maxB = val * 1.2;
    } else {
      [minB, maxB] = parseBudget(answers.budget || "0-50000000");
    }
    return vehicles.filter((v) => {
      if (v.vehicleType !== answers.type) return false;
      if (v.price < minB || v.price > maxB) return false;
      if (v.energyType.toLowerCase() !== answers.engine?.toLowerCase()) return false;
      if (usageAnswers.length > 0) {
        const normalizedUsage = v.usageType === "cruise" ? "cruiser" : v.usageType;
        if (!usageAnswers.includes(normalizedUsage)) return false;
      }
      return true;
    });
  }, [showResults, answers, usageAnswers, customBudget]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Car className="w-8 h-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gradient">VehicleFinder</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Answer a few questions and we'll find your perfect ride
        </p>
      </motion.div>

      {!showResults ? (
        <>
          <ProgressBar current={step + 1} total={steps.length} />
          <AnimatePresence mode="wait">
            <QuestionnaireStep
              key={step}
              question={steps[step].question}
              subtitle={steps[step].subtitle}
              options={steps[step].options}
              selected={answers[steps[step].key] || null}
              onSelect={(v) => handleSelect(steps[step].key, v)}
              multiSelect={steps[step].multi}
              selectedMulti={usageAnswers}
              onSelectMulti={handleUsageToggle}
            />
           </AnimatePresence>
          {steps[step].key === "budget" && answers.budget === "custom" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl mx-auto mt-6"
            >
              <div className="glass-card p-6">
                <label className="block text-foreground font-semibold mb-2">
                  Enter your budget (in Lakhs ₹)
                </label>
                <p className="text-sm text-muted-foreground mb-3">
                  We'll show vehicles within ±20% of your budget
                </p>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={customBudget}
                  onChange={(e) => setCustomBudget(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                {customBudget && Number(customBudget) > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing vehicles from ₹{(Number(customBudget) * 0.8).toFixed(1)}L to ₹{(Number(customBudget) * 1.2).toFixed(1)}L
                  </p>
                )}
              </div>
            </motion.div>
          )}
          <div className="flex gap-4 mt-10">
            {step > 0 && (
              <Button variant="outline" onClick={prev} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            )}
            <Button onClick={next} disabled={!canProceed} className="gap-2">
              {step === steps.length - 1 ? "Show Results" : "Next"} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-5xl"
        >
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {results.length > 0
                  ? `We found ${results.length} vehicle${results.length > 1 ? "s" : ""} for you!`
                  : "No exact matches found"}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {results.length > 0
                  ? "Based on your preferences, here are our top picks"
                  : "Try adjusting your filters for more options"}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={prev} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <Button variant="outline" onClick={reset} className="gap-2">
                <RotateCcw className="w-4 h-4" /> Start Over
              </Button>
            </div>
          </div>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} index={i} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-muted-foreground">
                No vehicles match all your criteria. Try broadening your budget or usage preferences.
              </p>
              <Button onClick={reset} className="mt-6 gap-2">
                <RotateCcw className="w-4 h-4" /> Try Again
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Index;