import { motion } from "framer-motion";

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
  question, subtitle, options, selected, onSelect, multiSelect, selectedMulti, onSelectMulti,
}: QuestionnaireStepProps) => {
  const isSelected = (val: string) =>
    multiSelect ? (selectedMulti || []).includes(val) : selected === val;

  const handleClick = (val: string) => {
    if (multiSelect && onSelectMulti) onSelectMulti(val);
    else onSelect(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-2 text-foreground">{question}</h2>
      <p className="text-muted-foreground mb-8">{subtitle}</p>
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt) => (
          <motion.button
            key={opt.value}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleClick(opt.value)}
            className={`glass-card p-6 text-left transition-all duration-200 cursor-pointer ${
              isSelected(opt.value)
                ? "glow-border border-primary/60"
                : "hover:border-muted-foreground/30"
            }`}
          >
            <span className="text-3xl block mb-3">{opt.icon}</span>
            <span className="text-foreground font-semibold text-lg">{opt.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionnaireStep;
