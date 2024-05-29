import mongoose from "mongoose";

const LimitSchema= new mongoose.Schema(
    {
        planName: {
            type: String,
            required: true,
        },
        limit: {
            type: Number,
            required: true,
            max:280,
        },
    },{
        timestamps: true,
    }
);

export default mongoose.model("Limit", LimitSchema);
// Silver Gold Platinum
// 5 10 15