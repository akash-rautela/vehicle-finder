import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
  icon: string;
  description?: string;
}

interface QuestionnaireStepProps {
  question: string;
  subtitle: string;
  options: Option[];
  selected: string | null;
  onSelect: (value: string) => void;
  multiSelect?: boolean;
  selectedMulti?: string[];
  onSelectMulti?: (value: string) => void;
}

/* Friendly descriptions per option value */
const DESCRIPTIONS: Record<string, string> = {
  "0-100000": "Entry-level budget",
  "100000-300000": "Affordable commuters",
  "300000-1000000": "Mid-range picks",
  "1000000-50000000": "Premium & luxury",
  custom: "Set your own range",
  Petrol: "Most widely available",
  Electric: "Zero emissions, low cost",
  Diesel: "Efficient for long drives",
  CNG: "Eco-friendly & cheap",
  daily: "Reliable everyday ride",
  sports: "Performance-tuned machines",
  cruiser: "Comfort for long hauls",
  adventure: "Built for rough terrain",
};

const QuestionnaireStep = ({
  question,
  subtitle,
  options,
  selected,
  onSelect,
  multiSelect = false,
  selectedMulti = [],
  onSelectMulti,
}: QuestionnaireStepProps) => {
  const isSelected = (val: string) =>
    multiSelect ? selectedMulti.includes(val) : selected === val;

  const handleClick = (val: string) => {
    if (multiSelect && onSelectMulti) onSelectMulti(val);
    else if (!multiSelect) onSelect(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-[2.4rem] font-bold mb-3 text-foreground tracking-tight leading-tight">
          {question}
        </h2>
        <p className="text-muted-foreground font-medium text-base opacity-70">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((opt, i) => {
          const active = isSelected(opt.value);
          const desc = opt.description || DESCRIPTIONS[opt.value];

          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClick(opt.value)}
              aria-pressed={active}
              className={`group relative rounded-2xl border p-6 text-left transition-all duration-300 cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                active
                  ? "border-primary/55 bg-primary/5"
                  : "border-border/40 bg-card/40 backdrop-blur-xl hover:border-primary/25 hover:bg-card/60"
              }`}
              style={
                active
                  ? {
                      boxShadow:
                        "0 0 0 1px hsl(var(--primary) / 0.35), 0 12px 30px -8px hsl(var(--primary) / 0.15)",
                    }
                  : {}
              }
            >
              {/* SELECTION INDICATOR */}
              <div
                className={`absolute top-5 right-5 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  active
                    ? "bg-primary border-primary scale-110"
                    : "border-muted-foreground/25 group-hover:border-primary/45"
                }`}
              >
                {active && (
                  <Check className="w-3 h-3 text-primary-foreground stroke-[3px]" />
                )}
              </div>

              <div className="flex flex-col gap-3">
                {/* Icon */}
                <span
                  className={`text-3xl transition-all duration-300 ${
                    active ? "" : "grayscale group-hover:grayscale-0"
                  }`}
                >
                  {opt.icon}
                </span>

                <div>
                  <span
                    className={`block text-[1.05rem] font-bold tracking-tight transition-colors ${
                      active ? "text-primary" : "text-foreground/90"
                    }`}
                  >
                    {opt.label}
                  </span>
                  {desc && (
                    <p className="text-xs font-medium text-muted-foreground/60 mt-0.5">
                      {desc}
                    </p>
                  )}
                </div>
              </div>

              {/* DECORATIVE BACKGROUND */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none transition-opacity duration-300 ${
                  active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                }`}
              />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuestionnaireStep;