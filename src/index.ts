import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router } from "./routes/task-manager/routes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/task", router);

const DB_URL = process.env.MONGODB_URL!;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Mongodb connection successfully");
    app.listen(PORT, () => {
      console.log(`Server started ${PORT}`);
    });
  })
  .catch((err) => console.error(`connection err ${err}`));
