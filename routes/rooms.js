import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRoom,
  getSingleRoom,
  updateRoom,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);

router.put("/:id", verifyAdmin, updateRoom);

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

router.get("/:id", getSingleRoom);

router.get("/", getAllRoom);

export default router;
