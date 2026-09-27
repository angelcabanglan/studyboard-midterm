"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (!result || result.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/groups");
    router.refresh();
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-pink-200 bg-pink-50/60 p-8 shadow-sm backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-2xl font-black text-pink-700">Welcome Back! ✨</h1>
          <p className="mt-1 text-xs text-pink-400">Log in to check your study groups</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-pink-700">
              Email Address ✉️
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="cutie@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3.5 py-2 text-sm text-pink-900 placeholder-pink-300 shadow-sm outline-none transition-all focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-pink-700">
              Password 🔒
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3.5 py-2 text-sm text-pink-900 placeholder-pink-300 shadow-sm outline-none transition-all focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-pink-200 bg-pink-100/70 p-2 text-center text-xs font-medium text-pink-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-xl bg-pink-400 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-pink-500 hover:shadow-pink-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "🌸 Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs font-medium text-pink-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-pink-600 underline hover:text-pink-700">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}