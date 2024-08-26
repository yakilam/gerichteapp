import { GerichtZutat } from "../gerichte-my/gerichtZutat";

export interface PlanRequest {
    days: number;
    zutaten: GerichtZutat[];
  }