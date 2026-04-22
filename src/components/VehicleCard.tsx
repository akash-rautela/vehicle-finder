import { motion } from "framer-motion";
// import { Vehicle } from "@/data/vehicles"; // Removed
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

/* ---------- HELPERS ---------- */
const formatPrice = (price: number) => {
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
  return `₹${price.toLocaleString("en-IN")}`;
};

/* ---------- COMPONENT ---------- */
const VehicleCard = ({ vehicle, index }: { vehicle: any; index: number }) => {
  const getIcon = () => {
    if (vehicle.vehicleType === "4W") return "🚗";
    if (vehicle.energyType === "Electric") return "⚡";
    return "🏍️";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass-card group relative flex flex-col h-full"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-[2rem]">
        <img
          src={vehicle.image || "/images/default.jpeg"}
          alt={vehicle.model}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => (e.currentTarget.src = "/images/default.jpeg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute top-4 right-4 bg-background/60 backdrop-blur-xl px-3 py-1.5 rounded-2xl text-[10px] font-black text-primary border border-white/10 shadow-lg uppercase tracking-widest">
          {getIcon()} {vehicle.energyType}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">
            {vehicle.brand}
          </span>
          <Badge
            variant="outline"
            className="text-[9px] px-2 py-0.5 border-primary/20 text-primary uppercase font-black tracking-widest bg-primary/5 rounded-full"
          >
            {vehicle.usageType}
          </Badge>
        </div>

        <h3 className="text-xl font-black text-foreground mb-1 tracking-tight group-hover:text-primary transition-colors">
          {vehicle.model}
        </h3>

        <p className="text-lg font-black text-foreground/80 mb-6">
          {formatPrice(vehicle.price)}
        </p>

        {/* SPECS - More realistic pill design */}
        <div className="grid grid-cols-2 gap-2 mb-8">
          {[
            { label: "Power", value: `${vehicle.powerBHP ?? "-"} BHP` },
            { label: "Torque", value: `${vehicle.torqueNM ?? "-"} Nm` },
            { label: "Mileage", value: `${vehicle.mileage}${vehicle.energyType === 'Electric' ? 'km' : 'kmpl'}` },
            { label: "Weight", value: `${vehicle.weightKG ?? "-"} kg` },
          ].map((spec) => (
            <div key={spec.label} className="bg-secondary/20 border border-border/5 px-3 py-2 rounded-2xl">
              <p className="text-[8px] text-muted-foreground/50 uppercase font-black tracking-widest mb-0.5">{spec.label}</p>
              <p className="text-xs font-bold text-foreground/90">{spec.value}</p>
            </div>
          ))}
        </div>

        {/* ACTION */}
        {vehicle.link && (
          <a
            href={vehicle.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center justify-center gap-2 w-full py-4 rounded-[1.5rem] bg-foreground text-background font-black text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xl active:scale-[0.98]"
          >
            EXPLORE VEHICLE
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default VehicleCard;