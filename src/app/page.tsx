import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventSection from "@/components/EventSection";
import ClubsSection from "@/components/ClubsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Hero />
      <EventSection />
      <ClubsSection />
    </main>
  );
}