import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import authRoutes from "./routes/auths.js";
import uploadRoutes from "./routes/uploads.js";
import editRoutes from "./routes/edits.js";
import planRoutes from "./routes/plans.js";
// import limitRoutes from "./routes/limits.js";
// import adminRoutes from "./routes/admin.js";
import countRoutes from "./routes/count.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import Limit from './models/Limit.js';
import User from './models/User.js';
const app = express();
app.use(cors({credentials: true, origin: true}));
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGO)
        .then(() => {
            console.log("connect to mongodb database");
        })
        .catch((err) => {
            throw err;
        })
};

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/edit', editRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/checkcount', countRoutes);
// app.use('/api/limit',limitRoutes);
// app.use('/api/admin',adminRoutes);
app.get("/api/users", async (req, res) => {
    try {
        const currentUsers = await User.find({});
        res.json(currentUsers);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/api/remove", async (req, res) => {
    const { username } = req.body;
    try {
        await User.findOneAndDelete({ username: username });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/api/plan", async (req, res) => {
    const { username, plan } = req.body;
    try {
        await User.updateOne({ username: username }, { plandetails: plan });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/limit", async (req, res) => {
    const { plan, limit } = req.body;
    try {
        await Limit.updateOne({ planName: plan }, { limit: limit });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" + error });
    }
});
app.get('/', (req, res) => {
    res.send("Hello World");
})

const PORT = 8000;
app.listen(PORT, () => {
    connect();
    console.log(`Server started at port ${PORT}`);
})