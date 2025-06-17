import type { Metadata } from "next";
import ArtisticHome from "./home/ArtisticHome";

export const metadata: Metadata = {
  title: "Creative Coaching & Artistic Expression | Natalia",
  description:
    "Unlock your creative potential through personalized coaching and artistic guidance. Transform your life through the power of creativity and personal growth.",
  keywords: [
    "creative coaching",
    "artistic expression",
    "personal development",
    "art therapy",
    "creative workshops",
  ],
  openGraph: {
    title: "Creative Coaching & Artistic Expression | Natalia",
    description: "Where imagination meets reality through artistic vision",
    type: "website",
  },
};

export default function ArtisticPage() {
  return <ArtisticHome />;
}
