import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import stripeRoute from "./routes/stripe.js";

//App configuration
dotenv.config();

//App variables
const PORT = process.env.PORT || 8000;
const app = express();

//Express middlewares
app.use(express.json());
app.use(cors());

//App middlewares
app.use("/api/payment", stripeRoute);

//Root page middleware
app.get("/", (req, res) => {
  return res.status(200).json({ msg: "Root page created!" });
});

//404 page middleware
app.use((req, res, next) => {
  return res.status(404).json({ err: "Page not found!" });
});

//Initiating the app
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
