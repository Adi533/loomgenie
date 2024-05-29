import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// export const AdminEntry = async (req, res, next) => {
//     const newAdmin = new Admin(req.body);
//     try {
//         const savedAdmin = await newAdmin.save();
//         res.status(200).json(savedAdmin);
//     } catch (err) {
//         handleError(500, err);
//     }
// }; 

export const AdminEntry = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new Admin({ ...req.body, password: hash });

        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT);
        const {password, ...otherData}= newUser._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(otherData);
    } catch (err) {
        next(err);
    }
};