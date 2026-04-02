import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { vehicles } from "@/data/vehicles";
import VehicleCard from "@/components/VehicleCard";

const Browse = () => {
  const [selected, setSelected] = useState<"2W" | "4W" | null>(null);

  /* -------- COUNT (optimized) -------- */
  const counts = useMemo(() => {
    const result = { "2W": 0, "4W": 0 };
    vehicles.forEach((v) => {
      if (v.vehicleType === "2W") result["2W"]++;
      if (v.vehicleType === "4W") result["4W"]++;
    });
    return result;
  }, []);

  /* -------- FILTER -------- */
  const filtered = useMemo(() => {
    if (!selected) return [];
    return vehicles
      .filter((v) => v.vehicleType === selected)
      .sort((a, b) => a.price - b.price);
  }, [selected]);

  /* -------- UI -------- */
  return (
    <section className="min-h-screen px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-foreground mb-2"
        >
          Browse Vehicles
        </motion.h1>

        <p className="text-muted-foreground mb-10">
          Pick a category to see all available vehicles.
        </p>

        {/* CATEGORY BUTTONS */}
        <div className="flex gap-4 mb-10 flex-wrap">
          {[
            { value: "2W" as const, label: "Two Wheelers", icon: "🏍️" },
            { value: "4W" as const, label: "Four Wheelers", icon: "🚗" },
          ].map((opt) => (
            <motion.button
              key={opt.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                setSelected((prev) =>
                  prev === opt.value ? null : opt.value
                )
              }
              aria-pressed={selected === opt.value}
              className={`glass-card px-8 py-6 text-left transition-all duration-200 cursor-pointer ${
                selected === opt.value
                  ? "glow-border border-primary/60"
                  : "hover:border-muted-foreground/30"
              }`}
            >
              <span className="text-3xl block mb-2">{opt.icon}</span>
              <span className="text-foreground font-semibold text-lg">
                {opt.label}
              </span>
              <span className="block text-sm text-muted-foreground mt-1">
                {counts[opt.value]} vehicles
              </span>
            </motion.button>
          ))}
        </div>

        {/* RESULTS */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.length > 0 ? (
                filtered.map((v, i) => (
                  <VehicleCard key={v.id} vehicle={v} index={i} />
                ))
              ) : (
                <p className="text-muted-foreground col-span-full text-center">
                  No vehicles found
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Browse;