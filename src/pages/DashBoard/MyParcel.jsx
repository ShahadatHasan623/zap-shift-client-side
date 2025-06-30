import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxioseSecure from "../../hooks/useAxioseSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrash, FaMoneyCheckAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxioseSecure();
  const { data: parcels = [],refetch } = useQuery({
    queryKey: ["parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  const handlePay = (id) => {
    console.log(id);
  };
  const handleView = (id) => {
    console.log("veiw details", id);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your parcel has been deleted.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              });
            }
            refetch()
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error",
            });
          });
      }
    });
  };

  const formateData = (iso) => {
    return new Date(iso).toLocaleString();
  };
  return (
    <div className="overflow-x-auto shadow-lg rounded-xl bg-base-100">
      <table className="table table-zebra w-full text-center">
        {/* Table Head */}
        <thead className="bg-base-200 text-base font-semibold">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Date</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <th className="max-w-[180px] truncate">{parcel.title}</th>
              <td className="capitalize">{parcel.type}</td>
              <td>{formateData(parcel.createdAt)}</td>
              <td>{parcel.cost}</td>
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === "paid"
                      ? "badge-success"
                      : "badge-error"
                  } badge-md text-white`}
                >
                  {parcel.payment_status}
                </span>
              </td>
              <td className="flex justify-center gap-3">
                <button
                  className="btn btn-sm btn-info text-white"
                  onClick={() => handleView(parcel._id)}
                >
                  <FaEye className="mr-1" /> View
                </button>
                {parcel.payment_status === "unpaid" && (
                  <button
                    className="btn btn-sm btn-success text-white"
                    onClick={() => handlePay(parcel._id)}
                  >
                    <FaMoneyCheckAlt className="mr-1" /> Pay
                  </button>
                )}
                <button
                  className="btn btn-sm btn-error text-white"
                  onClick={() => handleDelete(parcel._id)}
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcel;
