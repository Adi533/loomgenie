import User from "../models/User.js";


export const planSelection = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        next(err);
      }
}; 