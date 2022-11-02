import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const addPayment = async (req, res) => {
  try {
    const { token, amount } = req.body;
    await stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    res.status(200).json({ msg: "Successfull payment!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
