import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxioseSecure from "../../../hooks/useAxioseSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { parcelId } = useParams();
  const axiosSecure = useAxioseSecure();
  const { user } = useAuth();
  const navigate =useNavigate()

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  if (isPending) {
    return "...loading";
  }
  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    //step-1: validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("paymentMethod", paymentMethod);
      //create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      //   step:3 confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded!");
          const transactionId =result.paymentIntent.id

          //   step-4 mark parcel paid also create payment history

          const paymentData = {
            parcelId,
            email: user.email,
            amount,
            transactionId:transactionId ,
            paymentMethod: result.paymentIntent.payment_method_types,
          };
          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "payment Successfully",
              html:`<strong>Transaction Id:</strong><code>${transactionId}</code>`,
              confirmButtonText:'Go to My Parcels',
            });
            navigate('/dashboard/myParcel')
          }
        }
      }
    }

    // console.log("res form intent", res);
  };
  return (
    <div>
      <form
        onSubmit={handlesubmit}
        className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto"
      >
        <CardElement className="p-2 border border-gray-300 rounded-md mb-4"></CardElement>
        <button
          className="btn bg-primary text-black w-full"
          type="submit"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentFrom;
