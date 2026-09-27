"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteGroupButton({ groupId }: { groupId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this group? This cannot be undone."
    );
    if (!confirmed) return;

    setError("");
    setIsDeleting(true);

    const res = await fetch(`/api/groups/${groupId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      setError("Something went wrong deleting the group.");
      setIsDeleting(false);
      return;
    }

    router.push("/groups");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-1.5">
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="w-fit whitespace-nowrap rounded-xl border border-pink-200 bg-pink-50 px-4 py-2 text-xs font-semibold text-pink-600 shadow-sm transition-all hover:border-pink-300 hover:bg-pink-100 hover:text-pink-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isDeleting ? "Deleting..." : "🌸 Delete Group"}
      </button>
      {error && <p className="text-xs font-medium text-pink-500">{error}</p>}
    </div>
  );
}