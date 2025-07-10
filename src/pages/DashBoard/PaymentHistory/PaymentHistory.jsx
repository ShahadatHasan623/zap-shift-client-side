import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxioseSecure from "../../../hooks/useAxioseSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxioseSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  if (isPending) {
    return "loading....";
  }
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        💳 Payment History
      </h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payments found.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-base-200 shadow-sm">
          <table className="table table-zebra w-full text-sm sm:text-base">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Parcel ID</th>
                <th>Amount (৳)</th>
                <th className="min-w-[150px]">Transaction ID</th>
                <th className="min-w-[140px]">Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={p.transactionId || i}>
                  <td>{i + 1}</td>
                  <td>{p.parcelId}</td>
                  <td className="font-semibold text-green-600">৳{p.amount}</td>
                  <td className="break-all">{p.transactionId}</td>
                  <td>{new Date(p.paid_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
