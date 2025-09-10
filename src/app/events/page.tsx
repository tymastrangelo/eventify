"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Event = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  location: string;
  date: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        setEvents(data as Event[]);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-center">No events found.</p>
      ) : (
        <div className="grid gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="block bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600">{event.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                📍 {event.location} • 📅 {new Date(event.date).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}