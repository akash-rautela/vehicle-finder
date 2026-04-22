import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import VehicleCard from "@/components/VehicleCard";

const Browse = () => {
  const [selected, setSelected] = useState<"2W" | "4W" | null>(null);

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data } = await api.get('/vehicles');
      return data.map((v: any) => ({ ...v, model: v.vehicleModel, id: v._id }));
    },
  });

  /* -------- COUNT (optimized) -------- */
  const counts = useMemo(() => {
    const result = { "2W": 0, "4W": 0 };
    vehicles.forEach((v: any) => {
      if (v.vehicleType === "2W") result["2W"]++;
      if (v.vehicleType === "4W") result["4W"]++;
    });
    return result;
  }, [vehicles]);

  /* -------- FILTER -------- */
  const filtered = useMemo(() => {
    if (!selected) return [];
    return vehicles
      .filter((v: any) => v.vehicleType === selected)
      .sort((a: any, b: any) => a.price - b.price);
  }, [selected, vehicles]);

  /* -------- UI -------- */
  return (
    <section className="min-h-screen px-4 py-20 md:px-8 bg-mesh">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-black text-foreground mb-4 tracking-tight">
            Explore <span className="text-primary">Inventory</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl">
            Filter through our curated selection of high-performance vehicles. 
            Choose a category to begin your journey.
          </p>
        </motion.div>

        {/* CATEGORY BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { value: "2W" as const, label: "Two Wheelers", icon: "🏍️", desc: "Performance & Efficiency" },
            { value: "4W" as const, label: "Four Wheelers", icon: "🚗", desc: "Luxury & Comfort" },
          ].map((opt) => (
            <motion.button
              key={opt.value}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                setSelected((prev) =>
                  prev === opt.value ? null : opt.value
                )
              }
              aria-pressed={selected === opt.value}
              className={`glass-card p-6 text-left transition-all duration-300 relative group ${
                selected === opt.value
                  ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                  : "hover:border-primary/20"
              }`}
            >
              {selected === opt.value && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
              <span className="text-4xl block mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">{opt.icon}</span>
              <h3 className="text-xl font-bold text-foreground mb-1">
                {opt.label}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {opt.desc}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <span className="text-xs font-bold text-primary tracking-widest uppercase">
                  {counts[opt.value]} Available
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* RESULTS */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.length > 0 ? (
                filtered.map((v, i) => (
                  <VehicleCard key={v.id} vehicle={v} index={i} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-xl text-muted-foreground font-medium">
                    No vehicles found in this category
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center glass-card border-dashed"
            >
              <p className="text-xl text-muted-foreground font-medium">
                Please select a category above to view vehicles
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Browse;