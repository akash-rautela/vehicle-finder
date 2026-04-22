import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
  icon: string;
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
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black mb-4 text-foreground tracking-tight">
          {question}
        </h2>
        <p className="text-muted-foreground font-medium text-lg opacity-60">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((opt, i) => (
          <motion.button
            key={opt.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(opt.value)}
            aria-pressed={isSelected(opt.value)}
            className={`group relative glass-card p-8 text-left transition-all duration-300 cursor-pointer overflow-hidden ${
              isSelected(opt.value)
                ? "bg-primary/5 border-primary/40 ring-1 ring-primary/20 shadow-2xl shadow-primary/5"
                : "hover:bg-card/60"
            }`}
          >
            {/* SELECTION INDICATOR */}
            <div className={`absolute top-6 right-6 w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
              isSelected(opt.value) 
              ? "bg-primary border-primary scale-110" 
              : "border-muted-foreground/20 group-hover:border-primary/40"
            }`}>
              {isSelected(opt.value) && <Check className="w-3.5 h-3.5 text-primary-foreground stroke-[4px]" />}
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                {opt.icon}
              </span>
              <div>
                <span className={`block text-xl font-black tracking-tight transition-colors ${
                  isSelected(opt.value) ? "text-primary" : "text-foreground/90"
                }`}>
                  {opt.label}
                </span>
                <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/40 mt-1">
                  Select this option
                </p>
              </div>
            </div>
            
            {/* DECORATIVE BACKGROUND GRADIENT */}
            <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${isSelected(opt.value) ? 'opacity-100' : ''}`} />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionnaireStep;