"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password, firstName, lastName } = form;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("✅ Check your email to confirm your account.");
      setForm({ email: "", password: "", firstName: "", lastName: "" });

      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white text-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 text-white p-8 rounded-xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <div className="flex gap-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600"
          />
        </div>

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
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
        >
          Create Account
        </button>

        <p className="text-sm text-center text-neutral-400">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-400 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </main>
  );
}