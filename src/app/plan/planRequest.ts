import { GerichtZutat } from "../interfaces/gerichtZutat";

export interface PlanRequest {
    days: number;
    zutaten: GerichtZutat[];
  }