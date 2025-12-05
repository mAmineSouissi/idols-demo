import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Peep Animation Utils
export const randomRange = (min: number, max: number): number =>
  min + Math.random() * (max - min);

export const randomIndex = (array: any[]): number =>
  randomRange(0, array.length) | 0;

export const removeFromArray = <T>(array: T[], i: number): T =>
  array.splice(i, 1)[0];

export const removeItemFromArray = <T>(array: T[], item: T): T =>
  removeFromArray(array, array.indexOf(item));

export const removeRandomFromArray = <T>(array: T[]): T =>
  removeFromArray(array, randomIndex(array));
