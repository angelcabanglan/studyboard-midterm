import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getGroupById, createTask } from "@/lib/data";

// GET /api/groups/:id/tasks — list a group's tasks. Stays PUBLIC.
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const group = await getGroupById(params.id);

  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  return NextResponse.json(group.tasks);
}

// POST /api/groups/:id/tasks — add a task to a group.
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  // 1. Session check
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // 2. Fetch parent group check
  const group = await getGroupById(params.id);

  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  // 3. Ownership check
  if (group.ownerId !== session.user.id) {
    return NextResponse.json(
      { error: "Only the owner can add tasks to this group" },
      { status: 403 }
    );
  }

  // 4. Validate body and create task
  const body = await request.json();

  if (!body.title) {
    return NextResponse.json(
      { error: "'title' is required" },
      { status: 400 }
    );
  }

  const newTask = await createTask(params.id, body.title);
  return NextResponse.json(newTask, { status: 201 });
}