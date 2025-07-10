
import { useState } from "react";
import useAxioseSecure from "./useAxioseSecure";


const useUpdateTracking = () => {
  const axiosSecure = useAxioseSecure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const updateTracking = async ({ trackingId, status, location }) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await axiosSecure.post("/tracking", {
        trackingId,
        status,
        location,
      });

      if (res.status === 201 || res.data.success) {
        setSuccess(true);
        return true;
      } else {
        throw new Error(res.data.error || "Failed to update tracking");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateTracking, loading, error, success };
};

export default useUpdateTracking;
