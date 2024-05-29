import Upload from "../models/Upload.js";
import { handleError } from "../error.js";


export const uploadLoom = async (req, res, next) => {
  console.log(req.params.id);
    console.log(req.user);
  if (req.params.id == req.user.id) {
    const newUpload = new Upload(req.body);
    try {
      const savedUpload = await newUpload.save();
      res.status(200).json(savedUpload);
    } catch (err) {
      handleError(500, err);
    }
  } else {
    return next(handleError(403, "You can upload on only your account"));
  }

};