import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotelRooms,
  getSingleHotel,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// get single hotel info
router.get("/find/:id", getSingleHotel);

// get all hotels
router.get("/", getAllHotel);

// create hotel
router.post("/", verifyAdmin, createHotel);

// update hotel
router.put("/:id", verifyAdmin, updateHotel);

// delete hotel
router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
