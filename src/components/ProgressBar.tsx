import { motion } from "framer-motion";

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full max-w-2xl mx-auto mb-8">
    <div className="flex justify-between text-sm text-muted-foreground mb-2">
      <span>Step {current} of {total}</span>
      <span>{Math.round((current / total) * 100)}%</span>
    </div>
    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${(current / total) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  </div>
);

export default ProgressBar;
