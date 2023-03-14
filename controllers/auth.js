import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res, next) => {
  const saltRounds = 10;
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
      isAdmin: req.body.isAdmin,
    });
    await newUser.save();
    res.status(200).json("user has been created.");
  } catch (err) {
    next(err);
  }
};

export const logIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) return next({ status: 404, message: "user not found!" });

    const passwordIsCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordIsCorrect)
      return next({
        status: 404,
        message: "wrong password or user name is incorrect!",
      });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY
    );
    const { password, isAdmin, ...otherData } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        signed: true,
      })
      .status(200)
      .json({ details: { ...otherData }, isAdmin });
  } catch (err) {
    next(err);
  }
};
