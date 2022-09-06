import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user you're logged in!");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user you're logged in and you can delete your account!");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello admin you're logged in and you can delete all account!");
// });

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getSingleUser);

router.get("/", verifyAdmin, getAllUser);

export default router;
