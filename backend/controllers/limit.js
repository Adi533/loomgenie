import Limit from "../models/Limit.js";


export const LimitEntry = async (req, res, next) => {
    const newLimit = new Limit(req.body);
    try {
        const savedLimit = await newLimit.save();
        res.status(200).json(savedLimit);
    } catch (err) {
        handleError(500, err);
    }
}; 