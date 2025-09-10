"use client";
import { useState } from "react";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Create an Account" : "Log In to Eventify"}
        </h2>

        <form className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border px-4 py-2 rounded-md"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </main>
  );
}