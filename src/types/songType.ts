export type Song = {
  id: number;
  source : "built-in" | "imported";
  title: string;
  artist: string;
  cover: string;
  audio: string;
  duration: number;
  genre: string | null;
};
