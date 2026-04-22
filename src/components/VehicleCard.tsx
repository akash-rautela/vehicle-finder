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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="relative glass-card p-5 rounded-3xl group"
    >
      {/* 🔥 Glow Border */}
      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-primary/40 group-hover:shadow-[0_0_40px_rgba(var(--primary),0.1)] transition-all duration-300 pointer-events-none"></div>

      {/* IMAGE */}
      <div className="w-full h-48 mb-5 overflow-hidden rounded-2xl relative shadow-inner bg-secondary/50">
        <img
          src={vehicle.image || "/images/default.jpeg"}
          alt={vehicle.model}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          onError={(e) => (e.currentTarget.src = "/images/default.jpeg")}
        />
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary border border-primary/20">
          {getIcon()} {vehicle.energyType}
        </div>
      </div>

      {/* BRAND + USAGE */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
          {vehicle.brand}
        </span>
        <Badge
          variant="outline"
          className="text-[10px] px-2 py-0 h-5 border-primary/20 text-primary uppercase font-bold tracking-widest bg-primary/5"
        >
          {vehicle.usageType}
        </Badge>
      </div>

      {/* MODEL */}
      <h3 className="text-2xl font-black text-foreground mb-1 leading-tight">
        {vehicle.model}
      </h3>

      {/* PRICE */}
      <p className="text-primary font-black text-xl mb-5">
        {formatPrice(vehicle.price)}
      </p>

      {/* SPECS GRID */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-secondary/30 border border-border/50">
          <p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">Power</p>
          <p className="text-sm font-bold">{vehicle.powerBHP ?? "-"} BHP</p>
        </div>
        <div className="p-2.5 rounded-xl bg-secondary/30 border border-border/50">
          <p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">Torque</p>
          <p className="text-sm font-bold">{vehicle.torqueNM ?? "-"} Nm</p>
        </div>
        <div className="p-2.5 rounded-xl bg-secondary/30 border border-border/50">
          <p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">Mileage</p>
          <p className="text-sm font-bold">{vehicle.mileage}{vehicle.energyType === 'Electric' ? 'km' : 'kmpl'}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-secondary/30 border border-border/50">
          <p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">Weight</p>
          <p className="text-sm font-bold">{vehicle.weightKG ?? "-"} kg</p>
        </div>
      </div>

      {/* LINK */}
      {vehicle.link && (
        <a
          href={vehicle.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          View Details
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </motion.div>
  );
};

export default VehicleCard;