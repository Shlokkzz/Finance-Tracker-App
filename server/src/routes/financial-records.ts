import express, { Request, Response } from "express";

import financialRecordModel from "../schema/financial-record";

const router = express.Router();

router.get("/getAllByUserId/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const records = await financialRecordModel.find({ userId: userId });
    if (records.length === 0) {
      return res.status(404).send("No records found");
    }
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new financialRecordModel(newRecordBody);
    const savedRecrod = await newRecord.save();
    res.status(200).send(savedRecrod);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const id = req.params.id;
    const record = await financialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );
    if (!record) {
      return res.status(404).send();
    }
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const record = await financialRecordModel.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).send();
    }
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
