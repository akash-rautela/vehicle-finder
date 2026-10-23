import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, Bike, Car, ExternalLink, Fuel, Gauge, IndianRupee, Ruler, ShieldCheck, Users, Weight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import api from "@/lib/api";
import { vehicles as fallbackVehicles } from "@/data/vehicles";

const formatPrice = (price: number) => {
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
  return `₹${price.toLocaleString("en-IN")}`;
};

const getVehicleImage = (vehicle: any) => {
  if (typeof vehicle?.image === "string" && vehicle.image.trim()) {
    return vehicle.image;
  }
  return "/images/default.jpeg";
};

const handleImageError = (e: any) => {
  const target = e.currentTarget as HTMLImageElement;
  if (target.dataset.fallbackApplied === "true") return;
  target.dataset.fallbackApplied = "true";
  target.src = "/images/default.jpeg";
};

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [id]);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const { data } = await api.get(`/vehicles/${id}`);
        setVehicle(data);
      } catch {
        const localVehicle = fallbackVehicles.find((item) => String(item.id) === String(id));
        setVehicle(localVehicle || null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <section className="page-car-bg min-h-screen px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="glass-card p-12">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-primary/70">Loading</p>
          </div>
        </div>
      </section>
    );
  }

  if (!vehicle) {
    return (
      <section className="page-car-bg min-h-screen px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="glass-card p-12">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-primary/70">Vehicle not found</p>
            <h1 className="mt-4 text-4xl font-black text-foreground">The selected vehicle does not exist.</h1>
            <Link
              to="/browse"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-black text-primary-foreground transition hover:opacity-90"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Browse
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const details = [
    { label: "Brand", value: vehicle.brand, icon: ShieldCheck },
    { label: "Type", value: vehicle.vehicleType === "2W" ? "Two Wheeler" : "Four Wheeler", icon: vehicle.vehicleType === "2W" ? Bike : Car },
    { label: "Fuel", value: vehicle.energyType, icon: Fuel },
    { label: "Price", value: formatPrice(vehicle.price), icon: IndianRupee },
    { label: "Engine", value: `${vehicle.engineCC} cc`, icon: Gauge },
    { label: "Mileage", value: `${vehicle.mileage} km/l`, icon: Gauge },
    { label: "Power", value: `${vehicle.powerBHP} BHP`, icon: Gauge },
    { label: "Torque", value: `${vehicle.torqueNM} Nm`, icon: Gauge },
    { label: "Weight", value: `${vehicle.weightKG} kg`, icon: Weight },
    { label: "Seating", value: `${vehicle.seatingCapacity} people`, icon: Users },
    { label: "Ground Clearance", value: `${vehicle.groundClearanceMM} mm`, icon: Ruler },
    { label: "Usage", value: vehicle.usageType, icon: ShieldCheck },
  ];

  return (
    <section className="page-car-bg min-h-screen px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/browse"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-foreground/80 transition hover:border-primary/40 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse Vehicles
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card overflow-hidden"
        >
          <div className="grid gap-0 lg:grid-cols-[1.1fr_1.4fr]">
            <div className="relative min-h-[280px] lg:min-h-full">
              <img
                src={getVehicleImage(vehicle)}
                alt={vehicle.model || vehicle.vehicleModel}
                className="h-full w-full object-cover"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute left-6 top-6 rounded-full bg-background/60 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-primary backdrop-blur-xl">
                {vehicle.vehicleType === "2W" ? "Two Wheeler" : "Four Wheeler"}
              </div>
            </div>

            <div className="p-6 md:p-8 lg:p-10">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-muted-foreground/70">{vehicle.brand}</p>
                  <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground md:text-5xl">{vehicle.model || vehicle.vehicleModel}</h1>
                </div>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-black uppercase tracking-widest text-primary">
                  {vehicle.energyType}
                </span>
              </div>

              <div className="mb-8 flex items-end justify-between gap-4 border-b border-border/50 pb-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-muted-foreground/60">Starting from</p>
                  <p className="mt-2 text-3xl font-black text-primary">{formatPrice(vehicle.price)}</p>
                </div>

                {vehicle.link && (
                  <a
                    href={vehicle.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-background transition hover:bg-primary hover:text-primary-foreground"
                  >
                    Explore
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {details.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-2xl border border-border/40 bg-secondary/20 p-4">
                    <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]">{label}</span>
                    </div>
                    <p className="text-base font-bold text-foreground">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-border/40 bg-card/30 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/70">Overview</p>
                <p className="mt-3 text-base leading-7 text-foreground/80">
                  {vehicle.brand} {vehicle.model} is a {vehicle.vehicleType === "2W" ? "two-wheeler" : "four-wheeler"} in the {vehicle.usageType} category, designed for {vehicle.vehicleType === "2W" ? "performance and daily usability" : "comfort and road presence"}. It delivers {vehicle.powerBHP} BHP with {vehicle.torqueNM} Nm of torque and offers {vehicle.mileage} km/l mileage in a {vehicle.weightKG} kg build.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VehicleDetail;
