import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import VehicleCard from "@/components/VehicleCard";
import { Car } from "lucide-react";

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
    <section className="min-h-screen px-4 py-20 md:px-8 bg-mesh selection:bg-primary/20">
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black tracking-widest uppercase mb-6">
            VEHICLE DIRECTORY
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4 tracking-tighter">
            Explore <span className="text-primary italic">Collections</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl opacity-70">
            A curated selection of {vehicles.length} high-performance vehicles, verified for excellence.
          </p>
        </motion.div>

        {/* CATEGORY SELECTOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20 max-w-2xl">
          {[
            { value: "2W" as const, label: "Two Wheelers", icon: "🏍️", desc: "Speed & Agility" },
            { value: "4W" as const, label: "Four Wheelers", icon: "🚗", desc: "Luxury & Power" },
          ].map((opt) => (
            <motion.button
              key={opt.value}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                setSelected((prev) =>
                  prev === opt.value ? null : opt.value
                )
              }
              className={`glass-card p-8 text-left transition-all duration-500 relative overflow-hidden group ${
                selected === opt.value
                  ? "bg-primary/5 border-primary/40 ring-1 ring-primary/20"
                  : "hover:bg-card/60"
              }`}
            >
              <div className="flex flex-col gap-4">
                <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                  {opt.icon}
                </span>
                <div>
                  <h3 className={`text-xl font-black tracking-tight transition-colors ${selected === opt.value ? "text-primary" : "text-foreground"}`}>
                    {opt.label}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/40 mt-1">
                    {counts[opt.value]} VEHICLES
                  </p>
                </div>
              </div>
              
              {selected === opt.value && (
                <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
              )}
            </motion.button>
          ))}
        </div>

        {/* RESULTS GRID */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filtered.length > 0 ? (
                filtered.map((v, i) => (
                  <VehicleCard key={v.id} vehicle={v} index={i} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center glass-card border-dashed">
                  <p className="text-xl text-muted-foreground font-black uppercase tracking-widest opacity-30">
                    No matching inventory
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center glass-card border-dashed border-2 flex flex-col items-center justify-center gap-6"
            >
              <Car className="w-12 h-12 text-muted-foreground/20" />
              <div>
                <p className="text-xl font-black text-foreground/30 uppercase tracking-widest">
                  Select a category above
                </p>
                <p className="text-xs text-muted-foreground/40 font-bold uppercase mt-2">To reveal the collection</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Browse;