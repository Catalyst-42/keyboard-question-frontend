import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};

export function formatUnits(value: number): string {
  return `${value.toFixed(3)}u`;
}
