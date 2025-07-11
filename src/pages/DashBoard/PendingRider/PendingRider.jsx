import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxioseSecure from "../../../hooks/useAxioseSecure";

export default function PendingRider() {
  const axiosSecure = useAxioseSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    isPending,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, newStatus) => {
    const confirm = await Swal.fire({
      title: `${newStatus === "active" ? "Approve this rider?" : "Reject this rider?"}`,
      icon: newStatus === "active" ? "success" : "warning",
      showCancelButton: true,
      confirmButtonText: newStatus === "active" ? "Yes, Approve" : "Yes, Reject",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${id}`, { status: newStatus });
        Swal.fire(
          newStatus === "active" ? "Rider Approved!" : "Rider Rejected!",
          "",
          "success"
        );
        setSelectedRider(null);
        refetch();
      } catch {
        Swal.fire("Error", "Failed to update rider status", "error");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🕓 Pending Riders</h2>

      {isPending ? (
        <div className="text-center py-10">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : riders.length === 0 ? (
        <p className="text-center text-gray-500">No pending applications.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Region</th>
                <th>District</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, i) => (
                <tr key={rider._id}>
                  <td>{i + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.phone}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td className="flex gap-1 flex-wrap">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => setSelectedRider(rider)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleStatusUpdate(rider._id, "active")}
                    >
                      ✅ Approve
                    </button>
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => handleStatusUpdate(rider._id, "rejected")}
                    >
                      ❌ Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rider Details Modal */}
      {selectedRider && (
        <dialog id="riderModal" className="modal modal-open">
          <div className="modal-box w-full max-w-2xl">
            <h3 className="font-bold text-xl mb-2">👤 Rider Details</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Name:</strong> {selectedRider.name}</p>
              <p><strong>Email:</strong> {selectedRider.email}</p>
              <p><strong>Phone:</strong> {selectedRider.phone}</p>
              <p><strong>Age:</strong> {selectedRider.age}</p>
              <p><strong>Region:</strong> {selectedRider.region}</p>
              <p><strong>District:</strong> {selectedRider.district}</p>
              <p><strong>NID:</strong> {selectedRider.nid}</p>
              <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
              <p><strong>Bike Number:</strong> {selectedRider.bikeNumber}</p>
              {selectedRider.note && <p><strong>Note:</strong> {selectedRider.note}</p>}
            </div>

            <div className="modal-action flex flex-wrap justify-between gap-2 mt-4">
              <button className="btn" onClick={() => setSelectedRider(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
