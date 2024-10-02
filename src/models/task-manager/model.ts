import mongoose, { Schema, Document } from "mongoose";

export enum Status {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
}

export interface Task extends Document {
  title: string;
  description: string;
  status: ["pending", "in-progress", "completed"];
  dueDate: Date;
}

const TaskManagerSchema: Schema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  dueDate: { type: String, require: true },
});

export const TaskManager = mongoose.model<Task>("tasks", TaskManagerSchema);
