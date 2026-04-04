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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-2 text-foreground">
        {question}
      </h2>

      <p className="text-muted-foreground mb-8">
        {subtitle}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((opt) => (
          <motion.button
            key={opt.value}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleClick(opt.value)}
            aria-pressed={isSelected(opt.value)}
            className={`glass-card p-6 text-left transition-all duration-200 cursor-pointer relative ${
              isSelected(opt.value)
                ? "bg-primary/15 border-primary border-2 shadow-lg shadow-primary/30"
                : "hover:border-muted-foreground/30"
            }`}
          >
            {isSelected(opt.value) && (
              <div className="absolute top-3 right-3 bg-primary rounded-full p-1.5">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <span className="text-3xl block mb-3">{opt.icon}</span>
            <span className="text-foreground font-semibold text-lg">
              {opt.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionnaireStep;