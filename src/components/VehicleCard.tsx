import { motion } from "framer-motion";
import { Vehicle } from "@/data/vehicles";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const formatPrice = (price: number) => {
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)}L`;
  return `₹${price.toLocaleString("en-IN")}`;
};

const VehicleCard = ({ vehicle, index }: { vehicle: Vehicle; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    className="glass-card p-6 hover:glow-border transition-all duration-300 group"
  >
    <div className="text-4xl mb-3">
      {vehicle.vehicleType === "4W" ? "🚗" : vehicle.energyType === "Electric" ? "⚡" : "🏍️"}
    </div>
    <div className="flex items-center gap-2 mb-1 flex-wrap">
      <span className="text-muted-foreground text-sm font-medium">{vehicle.brand}</span>
      <Badge variant="outline" className="text-xs border-primary/40 text-primary capitalize">
        {vehicle.usageType}
      </Badge>
    </div>
    <h3 className="text-xl font-bold text-foreground mb-2">{vehicle.model}</h3>
    <p className="text-gradient font-bold text-lg mb-3">{formatPrice(vehicle.price)}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
        {vehicle.energyType}
      </span>
      <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
        {vehicle.energyType === "Electric" ? `${vehicle.mileage} km/charge` : `${vehicle.mileage} km/l`}
      </span>
      {vehicle.engineCC > 0 && (
        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
          {vehicle.engineCC}cc
        </span>
      )}
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
      <span>Power: {vehicle.powerBHP} BHP</span>
      <span>Torque: {vehicle.torqueNM} Nm</span>
      <span>Weight: {vehicle.weightKG} kg</span>
      <span>GC: {vehicle.groundClearanceMM} mm</span>
    </div>
    <a
      href={vehicle.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
    >
      <ExternalLink className="h-4 w-4" />
      View Details
    </a>
  </motion.div>
);

export default VehicleCard;