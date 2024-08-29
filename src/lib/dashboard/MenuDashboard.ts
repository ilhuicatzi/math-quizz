import { LayoutGrid, Activity, AlarmClock, Trophy } from "lucide-react";

export const mainMenu = [
    {
      id: 1,
      name: "General",
      value: "general",
      icon: LayoutGrid,
    },
    {
      id: 2,
      name: "Actividades",
      value: "actividades",
      icon: Activity,
    },
    {
      id: 3,
      name: "Actividades Pendientes",
      value: "actividadesPendientes",
      icon: AlarmClock,
    },
    {
      id: 4,
      name: "Actividades Realizadas",
      value: "actividadesRealizadas",
      icon: Trophy,
    },
  ];