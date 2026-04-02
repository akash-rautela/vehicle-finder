import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { vehicles, Vehicle } from "@/data/vehicles";
import { X, ExternalLink, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formatPrice = (price: number) => {
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)}L`;
  return `₹${price.toLocaleString("en-IN")}`;
};

const Compare = () => {
  const [vehicleType, setVehicleType] = useState<"2W" | "4W">("2W");
  const [selected, setSelected] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const available = useMemo(
    () =>
      vehicles
        .filter((v) => v.vehicleType === vehicleType)
        .filter((v) => !selected.find((s) => s.id === v.id))
        .filter(
          (v) =>
            !searchTerm ||
            `${v.brand} ${v.model}`.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    [vehicleType, selected, searchTerm]
  );

  const addVehicle = (v: Vehicle) => {
    if (selected.length < 3) {
      setSelected((prev) => [...prev, v]);
      setShowPicker(false);
      setSearchTerm("");
    }
  };

  const removeVehicle = (id: number) => {
    setSelected((prev) => prev.filter((v) => v.id !== id));
  };

  const resetAll = () => {
    setSelected([]);
    setSearchTerm("");
    setShowPicker(false);
  };

  const specRows: { label: string; getValue: (v: Vehicle) => string }[] = [
    { label: "Brand", getValue: (v) => v.brand },
    { label: "Price", getValue: (v) => formatPrice(v.price) },
    { label: "Energy Type", getValue: (v) => v.energyType },
    { label: "Engine CC", getValue: (v) => (v.engineCC > 0 ? `${v.engineCC} cc` : "N/A") },
    { label: "Mileage", getValue: (v) => v.energyType === "Electric" ? `${v.mileage} km/charge` : `${v.mileage} km/l` },
    { label: "Power", getValue: (v) => `${v.powerBHP} BHP` },
    { label: "Torque", getValue: (v) => v.torqueNM > 0 ? `${v.torqueNM} Nm` : "N/A" },
    { label: "Weight", getValue: (v) => v.weightKG > 0 ? `${v.weightKG} kg` : "N/A" },
    { label: "Seating", getValue: (v) => `${v.seatingCapacity}` },
    { label: "Ground Clearance", getValue: (v) => `${v.groundClearanceMM} mm` },
    { label: "Usage Type", getValue: (v) => v.usageType },
  ];

  return (
    <section className="min-h-screen px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-foreground mb-2"
        >
          Compare Vehicles
        </motion.h1>
        <p className="text-muted-foreground mb-8">
          Select up to 3 vehicles to compare side by side.
        </p>

        {/* Type selector */}
        <div className="flex gap-3 mb-8">
          {(["2W", "4W"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setVehicleType(t); resetAll(); }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                vehicleType === t
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "2W" ? "🏍️ Two Wheelers" : "🚗 Four Wheelers"}
            </button>
          ))}
        </div>

        {/* Selected vehicles + add button */}
        <div className="flex flex-wrap gap-3 mb-8">
          {selected.map((v) => (
            <motion.div
              key={v.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card px-4 py-2 flex items-center gap-2"
            >
              <span className="text-sm font-medium text-foreground">
                {v.brand} {v.model}
              </span>
              <button
                onClick={() => removeVehicle(v.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
          {selected.length < 3 && (
            <button
              onClick={() => setShowPicker(!showPicker)}
              className="glass-card px-4 py-2 flex items-center gap-2 text-sm text-primary hover:glow-border transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Vehicle
            </button>
          )}
        </div>

        {/* Picker dropdown */}
        <AnimatePresence>
          {showPicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card p-4 mb-8 max-h-80 overflow-y-auto"
            >
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground border border-border mb-3 outline-none focus:border-primary"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {available.slice(0, 30).map((v) => (
                  <button
                    key={v.id}
                    onClick={() => addVehicle(v)}
                    className="text-left px-3 py-2 rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <span className="text-sm font-medium text-foreground">{v.brand} {v.model}</span>
                    <span className="block text-xs text-muted-foreground">{formatPrice(v.price)} · {v.energyType}</span>
                  </button>
                ))}
                {available.length === 0 && (
                  <p className="text-sm text-muted-foreground col-span-full">No vehicles found.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison table */}
        {selected.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card overflow-x-auto"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-muted-foreground font-medium w-40">Spec</th>
                  {selected.map((v) => (
                    <th key={v.id} className="p-4 text-center">
                      <div className="text-2xl mb-1">
                        {v.vehicleType === "4W" ? "🚗" : v.energyType === "Electric" ? "⚡" : "🏍️"}
                      </div>
                      <div className="font-bold text-foreground">{v.model}</div>
                      <div className="text-xs text-muted-foreground">{v.brand}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-secondary/30" : ""}>
                    <td className="p-4 font-medium text-muted-foreground">{row.label}</td>
                    {selected.map((v) => (
                      <td key={v.id} className="p-4 text-center text-foreground font-medium">
                        {row.getValue(v)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-4 font-medium text-muted-foreground">Link</td>
                  {selected.map((v) => (
                    <td key={v.id} className="p-4 text-center">
                      <a
                        href={v.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}

        {selected.length < 2 && selected.length > 0 && (
          <p className="text-muted-foreground text-center py-10">
            Add at least one more vehicle to see the comparison.
          </p>
        )}
      </div>
    </section>
  );
};

export default Compare;