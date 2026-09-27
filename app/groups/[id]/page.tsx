import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getGroupById } from "@/lib/data";
import TaskItem from "@/components/TaskItem";
import DeleteGroupButton from "@/components/DeleteGroupButton";
import NewTaskForm from "@/components/NewTaskForm";

export default async function GroupDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Step 1: fetch session and group in parallel, since neither depends on the other
  const [session, group] = await Promise.all([ // instead of waiting for the other to finish, we fire both at same time and wait
    getServerSession(authOptions), // asks who is logged in, return null if none
    getGroupById(params.id), // fetches the data
  ]);

  if (!group) {
    notFound();
  }

  // Step 2: mirrors the exact same check your API routes already make
  const isOwner = session?.user.id === group.ownerId;

  return (
    <div>
      <h1 className="text-3xl font-bold">{group.name}</h1>
      <p className="text-gray-500">
        {group.subject} · {group.memberCount} members · Created by{" "}
        {group.owner.name}
      </p>

      <h2 className="mt-8 text-lg font-semibold">Tasks</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {group.tasks.map((task) => (
          // Step 3: pass isOwner and groupId down to each TaskItem
          <TaskItem
            key={task.id}
            task={task}
            isOwner={isOwner}
            groupId={group.id}
          />
        ))}
      </ul>

      {/* Step 4: only render these when isOwner is true */}
      {isOwner && (
        <>
          <NewTaskForm groupId={group.id} />
          <DeleteGroupButton groupId={group.id} />
        </>
      )}
    </div>
  );
}