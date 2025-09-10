"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Hero() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data?.user) {
        const fullName = data.user.user_metadata?.full_name || data.user.user_metadata?.first_name || data.user.email;
        setUserName(fullName);
      }
    };

    getUser();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center text-center px-4 py-20 bg-blue-50">
      <h2 className="text-4xl font-bold mb-4 max-w-2xl">
        Find & Join the Best Events on Elon’s Campus
      </h2>
      <p className="text-lg text-gray-700 mb-6 max-w-xl">
        {userName
          ? `👋 Hello, ${userName}! Explore what’s happening today.`
          : `Explore trending events, join your favorite clubs, and never miss a moment.`}
      </p>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
        Browse Events
      </button>
    </section>
  );
}