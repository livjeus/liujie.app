export interface Hero {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  videoUrl?: string; // Optional, specific for Grumpy Bro
  baseTraits: string[];
  colorTheme: string; // Tailwind class for border/bg
}

export interface GeneratedContent {
  bio: string;
  powerMove: string;
  weakness: string;
}
