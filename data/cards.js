import { CarTaxiFront, Users, Clock, DollarSign } from "lucide-react";

export const statCards = [
  {
    id: "total-rides",
    title: "Total Rides Today",
    value: "1,322",
    icon: CarTaxiFront,
    badge: { type: "trend", text: "+12.4%" },
  },
  {
    id: "active-drivers",
    title: "Active Drivers",
    value: "42",
    icon: Users,
    badge: { type: "status", text: "Steady Fleet" },
  },
  {
    id: "avg-wait",
    title: "Avg Wait Time",
    value: "4m 12s",
    icon: Clock,
    badge: { type: "warning", text: "Normal" },
  },
  {
    id: "revenue",
    title: "Revenue Today",
    value: "$8,410",
    icon: DollarSign,
    badge: { type: "trend", text: "+7.1%" },
  },
];
