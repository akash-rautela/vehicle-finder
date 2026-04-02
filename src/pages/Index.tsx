import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QuestionnaireStep from "@/components/QuestionnaireStep";
import ProgressBar from "@/components/ProgressBar";
import VehicleCard from "@/components/VehicleCard";
import { vehicles, Vehicle } from "@/data/vehicles";
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Car className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-extrabold">VehicleFinder</h1>
        </div>
        <p className="text-muted-foreground">
          Answer a few questions and we’ll find your perfect ride
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
              selected={answers[steps[step].key as keyof Answers] || null}
              onSelect={(v) =>
                handleSelect(steps[step].key as keyof Answers, v)
              }
              multiSelect={steps[step].multi}
              selectedMulti={usageAnswers}
              onSelectMulti={handleUsageToggle}
            />
          </AnimatePresence>

          {/* CUSTOM BUDGET */}
          {steps[step].key === "budget" && answers.budget === "custom" && (
            <div className="mt-6">
              <input
                type="number"
                placeholder="e.g. 10 (₹10 Lakhs)"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                className="border p-3 rounded-lg w-full"
              />
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10">
            {step > 0 && (
              <Button variant="outline" onClick={prev}>
                <ArrowLeft /> Back
              </Button>
            )}
            <Button onClick={next} disabled={!canProceed}>
              {step === steps.length - 1 ? "Show Results" : "Next"}{" "}
              <ArrowRight />
            </Button>
          </div>
        </>
      ) : (
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl font-bold mb-6">
            {results.length > 0
              ? `${results.length} vehicles found`
              : "No matches"}
          </h2>

          <div className="flex gap-3 mb-6">
            <Button onClick={prev}>Back</Button>
            <Button onClick={reset}>
              <RotateCcw /> Reset
            </Button>
          </div>

          {results.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {results.map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} index={i} />
              ))}
            </div>
          ) : (
            <p>No vehicles match your filters.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;