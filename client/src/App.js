import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import "./App.css";

const KEY =
  "pk_test_51Lzh2dAHYKK97YFRkw9wRMW0Aljct47Ut85EzDMP2hXYUip26l88beqYmyz5akg6LMzHGOluEg10NOa4CaytfYUW00518v6c0R";

function App() {
  const [product, setProduct] = useState({
    name: "Headphone",
    price: 100000,
  });

  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:8000/api/payment",
        method: "post",
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        console.log("Your payment was successfull");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      <h2>Complete React & Stripe payment</h2>
      <p>
        <span>Product: </span>
        {product.name}
      </p>
      <p>
        <span>Price: </span>
        {product.price}$
      </p>
      <StripeCheckout
        stripeKey={KEY}
        label="Pay Now"
        name="Pay with credit card"
        description={`Your total is ${product.price}`}
        billingAddress
        shippingAddress
        amount={product.price * 100}
        token={payNow}
      />
    </div>
  );
}

export default App;
