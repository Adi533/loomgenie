import express from "express";
import {countData} from "../controllers/total.js";

const router = express.Router();

router.post("/",countData);



export default router;