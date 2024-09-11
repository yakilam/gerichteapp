import { GerichtZutat } from "./gerichtZutat";

export interface GerichtResponse {
    id: string;
    name: string;
    author: string;
    zutaten: GerichtZutat[];
    anleitung: String;
    tags: String[];
    isOpen: boolean;
    images: String[];
  }