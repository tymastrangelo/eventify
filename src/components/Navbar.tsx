"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [canPost, setCanPost] = useState(false);

  useEffect(() => {
    const getUserAndRole = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      const currentUser = userData?.user;

      console.log("🔍 Supabase Auth User:", currentUser);
      if (userError) {
        console.error("❌ Error fetching auth user:", userError);
      }

      if (currentUser) {
        setUser(currentUser);

        // Debug: Log current user ID
        console.log("🆔 Checking posters table for UID:", currentUser.id);

        // Query the posters table
        const { data, error } = await supabase
          .from("posters")
          .select("*")
          .eq("uid", currentUser.id)
          .maybeSingle();

        if (error) {
          console.error("❌ Error querying posters table:", error);
        } else {
          console.log("✅ Poster record found:", data);
        }

        setCanPost(!!data);
      } else {
        console.warn("⚠️ No authenticated user found.");
        setUser(null);
        setCanPost(false);
      }
    };

    getUserAndRole();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      console.log("🔁 Auth state changed. Re-fetching user...");
      getUserAndRole();
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCanPost(false);
  };

  return (
    <header className="w-full px-6 py-4 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Eventify
        </Link>

        {/* Navigation */}
        <nav className="space-x-6 hidden sm:flex">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/events" className="text-gray-700 hover:text-blue-600 transition-colors">
            Events
          </Link>
          <Link href="/clubs" className="text-gray-700 hover:text-blue-600 transition-colors">
            Clubs
          </Link>
          {canPost && (
            <Link
              href="/create-event"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Post Event
            </Link>
          )}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={handleSignOut}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/sign-in"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}