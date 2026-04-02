import { motion } from "framer-motion";
import { Vehicle } from "@/data/vehicles";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

/* ---------- HELPERS ---------- */
const formatPrice = (price: number) => {
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
  return `₹${price.toLocaleString("en-IN")}`;
};

/* ---------- COMPONENT ---------- */
const VehicleCard = ({ vehicle, index }: { vehicle: Vehicle; index: number }) => {
  const getIcon = () => {
    if (vehicle.vehicleType === "4W") return "🚗";
    if (vehicle.energyType === "Electric") return "🏍️⚡";
    return "🏍️";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.04,
        rotateX: 3,
        rotateY: -3,
      }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="relative glass-card p-4 rounded-2xl overflow-hidden group transition-all duration-300"
    >
      {/* 🔥 Glow Border */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/60 group-hover:shadow-[0_0_25px_rgba(255,0,0,0.4)] transition-all duration-300 pointer-events-none"></div>

      {/* IMAGE */}
      <div className="w-full h-40 mb-4 overflow-hidden rounded-xl">
        <img
          src={vehicle.image || "/images/default.jpeg"}
          alt={vehicle.model}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          onError={(e) => (e.currentTarget.src = "/images/default.jpeg")}
        />
      </div>

      {/* ICON */}
      <div className="text-3xl mb-2">{getIcon()}</div>

      {/* BRAND + USAGE */}
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <span className="text-muted-foreground text-sm font-medium">
          {vehicle.brand}
        </span>
        <Badge
          variant="outline"
          className="text-xs border-primary/40 text-primary capitalize"
        >
          {vehicle.usageType}
        </Badge>
      </div>

      {/* MODEL */}
      <h3 className="text-xl font-bold text-foreground mb-2">
        {vehicle.model}
      </h3>

      {/* PRICE */}
      <p className="text-gradient font-bold text-lg mb-3">
        {formatPrice(vehicle.price)}
      </p>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
          {vehicle.energyType}
        </span>

        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
          {vehicle.energyType === "Electric"
            ? `${vehicle.mileage} km`
            : `${vehicle.mileage} km/l`}
        </span>

        {vehicle.engineCC > 0 && (
          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
            {vehicle.engineCC}cc
          </span>
        )}
      </div>

      {/* SPECS */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
        <span>Power: {vehicle.powerBHP ?? "-"} BHP</span>
        <span>Torque: {vehicle.torqueNM ?? "-"} Nm</span>
        <span>Weight: {vehicle.weightKG ?? "-"} kg</span>
        <span>GC: {vehicle.groundClearanceMM ?? "-"} mm</span>
      </div>

      {/* LINK */}
      {vehicle.link && (
        <a
          href={vehicle.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View Details
        </a>
      )}
    </motion.div>
  );
};

export default VehicleCard;