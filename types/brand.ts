import { LucideIcon } from "lucide-react";

export type Brand = {
  id: number;
  name: string;
  href: string;
  image: string;
  description: string;
  icon?: LucideIcon;
  iconColor?: string;
  bgGradient?: string;
};
