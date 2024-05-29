import Upload from "./models/Upload.js";
import User from "./models/User.js";
import Limit from "./models/Limit.js";
export const checkDailySendLimit = async (req, res, next) => {
    try{
        const userId = String(req.params.id);
        const user = await User.findOne({ _id: req.params.id });
        if(user==null){
            return res.status(500).json({ message: "Invalid User" });
        }
        const plan = await Limit.findOne({ planName: user.plandetails});
        let limit
        if(plan==null){
            limit=0;
        }else{
            limit=plan.limit;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        try {
            const sendCount = await Upload.countDocuments({ "userId": userId, createdAt: { $gte: today } });
            if (sendCount >= limit) {
                return res.status(403).json({ message: "Daily send limit exceeded" });
            }
        } catch (err) {
            console.error("Error checking daily send limit:", err);
            return res.status(500).json({ message: "Internal server1 error" });
        }
    }catch(err){
        console.error("User Invalid", err);
        return res.status(500).json({ message: "Internal server error" });
    }
    

    next();
};