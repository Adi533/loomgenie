import express from "express";
import { uploadLoom } from "../controllers/upload.js";
import { checkDailySendLimit } from "../checkDailyLimit.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/:id",verifyToken,checkDailySendLimit,uploadLoom);

export default router;