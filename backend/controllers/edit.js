import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { handleError } from '../error.js';

export const emailChange = async (req, res, next) => {
    console.log(req.params.id);
    console.log(req.user);

    if (req.params.id === req.body.id) {
      
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
      } else {
        return next(handleError(403, "You can update only your account"));
      }
};
export const passChange = async (req, res, next) => {
  console.log(req.params.id);
    console.log(req.user);

    if (req.params.id === req.body.id) {
        try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            throw new Error('User not found');
        }
        const isCorrect = await bcrypt.compare(req.body.currpassword,user.password);
        if(!isCorrect){
          throw new Error('Wrong Password');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        

          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { password: hash } },
            { new: true }
          );
          res.status(200).json(updatedUser);
        } catch (err) {
          next(err);
        }
      } else {
        return next(handleError(403, "You can update only your account"));
      }
};

export const planChange = async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.user);

  if (req.params.id === req.body.id) {
    
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
    } else {
      return next(handleError(403, "You can update only your account"));
    }
};