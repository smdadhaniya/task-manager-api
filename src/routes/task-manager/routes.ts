import { Request, Response, Router } from "express";
import { Task, TaskManager } from "../../models/task-manager/model";
import { validateTask, validateUpdateTask } from "../../middleware/middleware";
import { isValidObjectId } from "../../middleware/validate";

interface IError {
  message: string;
}
const TASK_ROUTERS = {
  CREATE: "/task",
  READ: "/tasks",
  READ_BY_ID: `/task/:id`,
  UPDATE_BY_ID: `/task/:id`,
  DELETE_BY_ID: `/task/:id`,
};

export const router = Router();

// Create Task
router.post(
  TASK_ROUTERS.CREATE,
  validateTask,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const task: Task = new TaskManager(req.body);
      await task.save();
      res.json({ message: "data", task, success: true });
      return;
    } catch (error: unknown) {
      const err = error as unknown as IError;
      res.json({ message: err.message });
    }
  }
);

// Retrieve Tasks
router.get(
  TASK_ROUTERS.READ,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const tasks = await TaskManager.find({});
      if (!tasks.length) {
        res.json({ message: "No Task Found" });
      } else {
        res.json({ success: true, tasks });
      }
      return;
    } catch (error) {
      const err = error as unknown as IError;
      res.json({ message: err.message });
    }
  }
);

// Retrieve by id
router.get(TASK_ROUTERS.READ_BY_ID, async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id!;
    if (isValidObjectId(taskId)) {
      res.json({ message: `provided it was wrong ${taskId}` });
    }
    const task = await TaskManager.findById(taskId);

    if (!task) {
      res.json({ message: "No Task Found" });
    } else {
      res.sendStatus(200).json({ success: true, task });
    }
    return;
  } catch (error) {
    const err = error as unknown as IError;
    res.json({ message: err.message });
  }
});

// Update by id
router.put(
  TASK_ROUTERS.UPDATE_BY_ID,
  validateUpdateTask,
  async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id!;
      if (isValidObjectId(taskId)) {
        res.json({ message: `provided it was wrong ${taskId}` });
      }
      const updateTask = req.body;
      const task = await TaskManager.findByIdAndUpdate(taskId, updateTask, {
        new: true,
      });
      if (!task) res.sendStatus(404).json({ message: "Task not found" });
      else res.sendStatus(200).json(task);
      return;
    } catch (error) {
      const err = error as unknown as IError;
      res.json({ message: err.message });
    }
  }
);

// Delete by id
router.delete(
  TASK_ROUTERS.DELETE_BY_ID,
  async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id!;
      if (isValidObjectId(taskId)) {
        res.json({ message: `provided it was wrong ${taskId}` });
      }
      const task = await TaskManager.findByIdAndDelete(taskId, {
        new: true,
      });
      if (!task) res.sendStatus(404).json({ message: "Task not found" });
      else res.sendStatus(200).json(task);
      return;
    } catch (error) {
      const err = error as unknown as IError;
      res.json({ message: err.message });
    }
  }
);
