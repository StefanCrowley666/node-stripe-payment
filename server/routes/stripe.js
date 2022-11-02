import express from "express";
import { addPayment } from "../controllers/stripe.js";

const router = express.Router();

router.post("/", addPayment);

export default router;
