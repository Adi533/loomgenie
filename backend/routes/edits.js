import express from "express";
import { emailChange,passChange,planChange } from "../controllers/edit.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.put("/email/:id",emailChange);

router.put("/pass/:id",passChange);

router.put("/plan/:id",planChange);


export default router;