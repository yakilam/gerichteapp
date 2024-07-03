import { GerichtZutat } from "./gerichtZutat";

export interface GerichtResponse {
    name: string;
    author: string;
    zutaten: GerichtZutat[];
    anleitung: String;
    tags: String[];
    images: String[];
  }