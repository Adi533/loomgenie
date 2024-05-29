import { handleError } from "../error.js";
import Upload from "../models/Upload.js";

export const countData = async(req,res,next)=>{
    try{
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        const sendCount = await Upload.countDocuments({ "userId": req.body.userId,createdAt: { $gte: startDate } });
        res.status(200).json(sendCount);
    }catch(err){
        return next(handleError(403, "Error"));
    }
}

