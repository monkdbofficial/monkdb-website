import { ReactNode } from "react";

export type Feature = {
  id: number;
  icon: string | ReactNode;
  title: string;
  description: string;
  highlights?: string[];
};
