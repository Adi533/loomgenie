import mongoose from "mongoose";

const UploadSchema= new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
            max:280,
        },
    },{
        timestamps: true,
    }
);

export default mongoose.model("Upload", UploadSchema);