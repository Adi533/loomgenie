import express from "express";
import { planSelection } from "../controllers/plan.js";

const router = express.Router();

router.post("/:id",planSelection);



export default router;