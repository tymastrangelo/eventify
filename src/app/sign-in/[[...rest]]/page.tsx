"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/"); // redirect to homepage or dashboard
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white text-black px-4">
      <form onSubmit={handleSubmit} className="bg-neutral-800 text-white p-8 rounded-xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600"
        />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
          Log In
        </button>

        <p className="text-sm text-center text-neutral-400">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-blue-400 hover:underline">
            Sign up instead
          </Link>
        </p>
      </form>
    </main>
  );
}