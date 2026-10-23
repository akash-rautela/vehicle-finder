import { motion } from "framer-motion";

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full max-w-2xl mx-auto">
    <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground mb-3">
      <span className="text-foreground/70">
        Step <span className="text-primary">{current}</span> of {total}
      </span>
      <span className="text-primary font-bold">
        {Math.round((current / total) * 100)}%
      </span>
    </div>
    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(270 80% 65%) 100%)",
        }}
        initial={{ width: 0 }}
        animate={{ width: `${(current / total) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  </div>
);

export default ProgressBar;
