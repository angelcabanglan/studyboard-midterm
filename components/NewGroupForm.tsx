"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function NewGroupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [memberCount, setMemberCount] = useState(1);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await fetch("/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, subject, memberCount }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Something went wrong");
      setIsSubmitting(false);
      return;
    }

    const newGroup = await response.json();
    router.push(`/groups/${newGroup.id}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-pink-200 bg-pink-50/50 p-6 shadow-sm backdrop-blur-sm"
    >
      <div className="text-center">
        <h3 className="text-lg font-bold text-pink-700"> Create Study Group ✨</h3>
        <p className="text-xs text-pink-400">Set up a space for your study team!</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-xs font-semibold text-pink-700">
          Group Name 🎀
        </label>
        <input
          id="name"
          type="text"
          required
          placeholder="e.g., Cute Study Club"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3.5 py-2 text-sm text-pink-900 placeholder-pink-300 shadow-sm outline-none transition-all focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-semibold text-pink-700">
          Subject 📚
        </label>
        <input
          id="subject"
          type="text"
          required
          placeholder="e.g., Computer Science"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3.5 py-2 text-sm text-pink-900 placeholder-pink-300 shadow-sm outline-none transition-all focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
        />
      </div>

      <div>
        <label htmlFor="memberCount" className="block text-xs font-semibold text-pink-700">
          Initial Member Count 🩰
        </label>
        <input
          id="memberCount"
          type="number"
          min={1}
          required
          value={memberCount}
          onChange={(e) => setMemberCount(Number(e.target.value))}
          className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3.5 py-2 text-sm text-pink-900 shadow-sm outline-none transition-all focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
        />
      </div>

      {error && (
        <p className="rounded-xl border border-pink-200 bg-pink-100/60 p-2 text-center text-xs font-medium text-pink-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 w-full rounded-xl bg-pink-400 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-pink-500 hover:shadow-pink-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "✨ Create Group ✨"}
      </button>
    </form>
  );
}