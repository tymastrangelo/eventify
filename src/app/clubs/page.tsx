"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ClubsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/sign-in");
      } else {
        setUserEmail(user.email ?? null);
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Explore Clubs</h1>
      <p className="text-center text-sm text-gray-500 mb-4">Signed in as {userEmail}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            name: "Animal Protection Alliance 🐾",
            description:
              "Help promote animal welfare through service and advocacy. Weekly meetings and volunteering!",
          },
          {
            name: "Outdoor Adventure Club 🏕️",
            description:
              "Join us for hikes, camping trips, and nature-focused activities throughout the semester.",
          },
          {
            name: "Film Society 🎬",
            description:
              "Watch and discuss films from all genres and eras. Weekly screenings and guest speakers.",
          },
        ].map((club, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-green-50 p-6 border border-green-100 shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{club.name}</h3>
            <p className="text-sm text-gray-700">{club.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}