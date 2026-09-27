import { z } from "zod";

// Schema para sa Register (kasama ang name)
export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema para sa Groups
export const createGroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  subject: z.string().min(1, "Subject is required"), // <-- Idagdag ito!
});

export const updateGroupSchema = createGroupSchema.partial();

// Schema para sa Tasks
export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();