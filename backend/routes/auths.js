import express from "express";
import { signup,signin,signinadmin } from "../controllers/auth.js";


const router = express.Router();

router.post("/signup",signup);

router.post("/signin",signin);
router.post("/admin",signinadmin);


export default router;