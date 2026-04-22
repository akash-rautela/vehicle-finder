import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { X, ExternalLink, Plus } from "lucide-react";

const formatPrice = (price: number) => {
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)}L`;
  return `₹${price.toLocaleString("en-IN")}`;
};

const getImage = (v: any) => {
  return `/images/${v.brand}-${v.model}.jpg`
    .replace(/\s+/g, "")
    .toLowerCase();
};

/* ---------- AI COMPARISON ---------- */
const getBestVehicle = (list: any[]) => {
  if (list.length < 2) return null;

  return list.map((v) => {
    let score = 0;

    score += v.mileage * 2;          // mileage important
    score += v.powerBHP * 1.5;      // performance
    score += v.groundClearanceMM;   // terrain
    score -= v.price / 10000;       // cheaper better

    return { ...v, score };
  }).sort((a, b) => b.score - a.score)[0];
};

const Compare = () => {
  const [vehicleType, setVehicleType] = useState<"2W" | "4W">("2W");
  const [selected, setSelected] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const { data: vehicles = [] } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data } = await api.get('/vehicles');
      return data.map((v: any) => ({ ...v, model: v.vehicleModel, id: v._id }));
    },
  });

  const available = useMemo(
    () =>
      vehicles
        .filter((v: any) => v.vehicleType === vehicleType)
        .filter((v: any) => !selected.find((s: any) => s.id === v.id))
        .filter((v: any) =>
          `${v.brand} ${v.model}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ),
    [vehicleType, selected, searchTerm, vehicles]
  );

  const bestVehicle = getBestVehicle(selected);

  const addVehicle = (v: any) => {
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

  const specRows = [
    { label: "Price", key: "price" },
    { label: "Mileage", key: "mileage" },
    { label: "Power", key: "powerBHP" },
    { label: "Torque", key: "torqueNM" },
    { label: "Weight", key: "weightKG" },
    { label: "Ground Clearance", key: "groundClearanceMM" },
  ];

  return (
    <section className="min-h-screen px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-2">Compare Vehicles</h1>
        <p className="text-muted-foreground mb-8">
          Select up to 3 vehicles
        </p>

        {/* TYPE */}
        <div className="flex gap-3 mb-8">
          {(["2W", "4W"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setVehicleType(t); resetAll(); }}
              className={`px-6 py-3 rounded-lg font-semibold ${
                vehicleType === t
                  ? "bg-primary text-white"
                  : "bg-secondary"
              }`}
            >
              {t === "2W" ? "🏍️ Two Wheelers" : "🚗 Four Wheelers"}
            </button>
          ))}
        </div>

        {/* SELECTED */}
        <div className="flex flex-wrap gap-3 mb-8">
          {selected.map((v) => (
            <div key={v.id} className="bg-secondary px-4 py-2 flex items-center gap-2 rounded-lg">
              <span>{v.brand} {v.model}</span>
              <button onClick={() => removeVehicle(v.id)}>
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          {selected.length < 3 && (
            <button
              onClick={() => setShowPicker(!showPicker)}
              className="bg-primary text-white px-4 py-2 rounded-lg flex gap-2"
            >
              <Plus /> Add
            </button>
          )}
        </div>

        {/* PICKER */}
        <AnimatePresence>
          {showPicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card p-4 mb-8 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/40"
            >
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-3 rounded bg-secondary"
              />

              {available.map((v) => (
                <div
                  key={v.id}
                  onClick={() => addVehicle(v)}
                  className="p-2 hover:bg-secondary cursor-pointer rounded"
                >
                  {v.brand} {v.model}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI RESULT */}
        {bestVehicle && (
          <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
            🧠 <b>AI Suggestion:</b> Best choice is{" "}
            <span className="font-bold text-primary">
              {bestVehicle.brand} {bestVehicle.model}
            </span>
          </div>
        )}

        {/* TABLE */}
        {selected.length >= 2 && (
          <div className="overflow-x-auto">
            <table className="w-full text-center border rounded-lg overflow-hidden">

              <thead className="bg-secondary sticky top-0">
                <tr>
                  <th className="p-4 text-left">Spec</th>

                  {selected.map((v) => (
                    <th key={v.id} className="p-4">
                      <img
                        src={getImage(v)}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/images/default.jpeg";
                        }}
                        className="h-20 mx-auto mb-2 object-contain"
                      />

                      <div className="font-bold">{v.model}</div>
                      <div className="text-xs text-muted-foreground">{v.brand}</div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {specRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 ? "bg-secondary/30" : ""}>
                    <td className="p-4 text-left">{row.label}</td>

                    {selected.map((v) => {
                      const val = (v as any)[row.key];

                      if (!val || val === 0) return <td key={v.id}>N/A</td>;

                      return (
                        <td key={v.id} className="p-4">
                          {row.key === "price" && formatPrice(val)}
                          {row.key === "mileage" &&
                            `${val} ${v.energyType === "Electric" ? "km" : "km/l"}`}
                          {row.key === "powerBHP" && `${val} BHP`}
                          {row.key === "torqueNM" && `${val} Nm`}
                          {row.key === "weightKG" && `${val} kg`}
                          {row.key === "groundClearanceMM" && `${val} mm`}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* LINK */}
                <tr>
                  <td className="p-4 text-left">Link</td>
                  {selected.map((v) => (
                    <td key={v.id}>
                      <a href={v.link} target="_blank">
                        <ExternalLink />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>

            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Compare;