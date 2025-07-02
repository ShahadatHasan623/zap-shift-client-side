import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentFrom from "./PaymentFrom";

const stribePromise = loadStripe(import.meta.env.VITE_payment_key);
const Payment = () => {
  return (
    <Elements stripe={stribePromise}>
      <PaymentFrom></PaymentFrom>
    </Elements>
  );
};

export default Payment;
