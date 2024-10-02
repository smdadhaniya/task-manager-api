import { NextFunction, Request, Response } from "express";

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { title, description, status, dueDate } = req.body;

  if (!title || !description || !status || !dueDate) {
    return res.status(400).json({
      message: "All field are required: title, description, status, dueDate",
    });
  }

  const validateStatus = ["pending", "in-progress", "completed"];
  if (!validateStatus.includes(status)) {
    return res
      .status(400)
      .json({ message: "Status must be: pending, completed, in-progress" });
  }

  next();
};

export const validateUpdateTask = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { status, dueDate } = req.body;

  if (!status || !dueDate) {
    return res.status(400).json({
      message: "All field are required:status, dueDate",
    });
  }

  const validateStatus = ["pending", "in-progress", "completed"];
  if (!validateStatus.includes(status)) {
    return res
      .status(400)
      .json({ message: "Status must be: pending, completed, in-progress" });
  }

  next();
};
