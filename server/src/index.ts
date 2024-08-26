import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";

import cors from 'cors'
const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors(corsOptions));

// Setup mongoose
require("dotenv").config();

const dbPassword = process.env.DATABASE_PASSWORD;

const mongoURI: string =
  "mongodb+srv://f20212441:" +
  dbPassword +
  "@finance-tracker-app.op73s.mongodb.net/";

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB✅✅"))
  .catch((e) => console.error("FAILED TO CONNECT", e));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log("Server is running on port", port, "✅");
});
