import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth"; // Adjust the path
import "sweetalert2/dist/sweetalert2.min.css";

const SendParcel = () => {
  const { user } = useAuth(); // get logged-in user
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // const [parcelData, setParcelData] = useState(null);
  const serviceCenters = useLoaderData();

  const regions = [...new Set(serviceCenters.map((c) => c.region))];
  const getCentersByRegion = (region) =>
    serviceCenters.filter((c) => c.region === region);

  const type = watch("type");
  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  useEffect(() => {
    setValue("sender_center", "");
  }, [senderRegion, setValue]);

  useEffect(() => {
    setValue("receiver_center", "");
  }, [receiverRegion, setValue]);

  const getDistrictByCenter = (centerName) => {
    const center = serviceCenters.find((c) => c.name === centerName);
    return center ? center.district : "";
  };

  const generateTrackingId = () => {
    const now = new Date();
    return `SPX-${now.getFullYear()}${
      now.getMonth() + 1
    }${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
  };

  const calculateCost = (data) => {
    const senderDistrict = getDistrictByCenter(data.sender_center);
    const receiverDistrict = getDistrictByCenter(data.receiver_center);
    const sameDistrict =
      senderDistrict.toLowerCase() === receiverDistrict.toLowerCase();

    const type = data.type;
    const weight = parseFloat(data.weight || 0);

    let cost = 0;
    let breakdown = "";

    if (type === "document") {
      cost = sameDistrict ? 60 : 80;
      breakdown = `Document Delivery (${
        sameDistrict ? "Within City" : "Outside City"
      }): ৳${cost}`;
    } else if (type === "non-document") {
      if (weight <= 3) {
        cost = sameDistrict ? 110 : 150;
        breakdown = `Non-Document ≤ 3kg (${
          sameDistrict ? "Within City" : "Outside City"
        }): ৳${cost}`;
      } else {
        const extraWeight = weight - 3;
        const base = sameDistrict ? 110 : 150;
        const extra = extraWeight * 40;
        cost = base + extra;
        if (!sameDistrict) cost += 40;
        breakdown = `Non-Document > 3kg:\n- Base (${
          sameDistrict ? "Within" : "Outside"
        }): ৳${base}\n- Extra Weight (${extraWeight.toFixed(
          2
        )}kg × ৳40): ৳${extra}\n${
          !sameDistrict ? "- Outside City Extra: ৳40\n" : ""
        }`;
      }
    }

    return { cost, breakdown };
  };

  const onSubmit = (data) => {
    const { cost, breakdown } = calculateCost(data);
    Swal.fire({
      title: "Confirm Delivery",
      html: `<pre style="text-align:left; white-space:pre-wrap; font-size:14px">${breakdown}</pre><hr/><strong>Total Cost: ৳${cost}</strong>`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Back to Edit",
    }).then((result) => {
      if (result.isConfirmed) {
        const fullData = {
          ...data,
          cost,
          email: user?.email || "anonymous",
          createdAt: new Date().toISOString(),
          payment_status: "unpaid",
          delivery_status: "not_collected",
          trackingId: generateTrackingId(),
        };

        // TODO: Send to backend
        console.log("Saving to database:", fullData);
        Swal.fire("Saved!", "Your parcel has been saved.", "success");
        reset();
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Send a Parcel</h1>
      <p className="text-center text-gray-500">
        Fill out the details to send your parcel
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <div className="bg-base-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-lg mb-4">Parcel Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Type</label>
              <select
                {...register("type", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm">Type is required</p>
              )}
            </div>
            <div>
              <label className="label">Title</label>
              <input
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">Title is required</p>
              )}
            </div>
            {type === "non-document" && (
              <div>
                <label className="label">Weight (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("weight", {
                    required: "Weight is required for non-document",
                    min: { value: 0.1, message: "Weight must be positive" },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.weight && (
                  <p className="text-red-500 text-sm">
                    {errors.weight.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sender Info */}
        <div className="bg-base-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-lg mb-4">Sender Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("sender_name", { required: true })}
              className="input input-bordered w-full"
              placeholder="Name"
              defaultValue={user?.displayName || ""}
            />
            <input
              {...register("sender_contact", { required: true })}
              className="input input-bordered w-full"
              placeholder="Contact"
            />
            <select
              {...register("sender_region", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <select
              {...register("sender_center", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Center</option>
              {getCentersByRegion(senderRegion).map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.district})
                </option>
              ))}
            </select>
            <textarea
              {...register("sender_address", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Address"
            />
            <input
              {...register("pickup_instruction", { required: true })}
              className="input input-bordered w-full"
              placeholder="Pickup Instruction"
            />
          </div>
        </div>

        {/* Receiver Info */}
        <div className="bg-base-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-lg mb-4">Receiver Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("receiver_name", { required: true })}
              className="input input-bordered w-full"
              placeholder="Name"
            />
            <input
              {...register("receiver_contact", { required: true })}
              className="input input-bordered w-full"
              placeholder="Contact"
            />
            <select
              {...register("receiver_region", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <select
              {...register("receiver_center", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Center</option>
              {getCentersByRegion(receiverRegion).map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.district})
                </option>
              ))}
            </select>
            <textarea
              {...register("receiver_address", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Address"
            />
            <input
              {...register("delivery_instruction", { required: true })}
              className="input input-bordered w-full"
              placeholder="Delivery Instruction"
            />
          </div>
        </div>

        <div className="text-center">
          <button className="btn btn-primary text-black">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
