import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxioseSecure from "../../../hooks/useAxioseSecure";

export default function BeARider() {
  const { user } = useAuth();
  const serviceCenters = useLoaderData();
  const axiosSecure = useAxioseSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedRegion, setSelectedRegion] = useState("");

  // Get unique region list
  const regions = [...new Set(serviceCenters.map((s) => s.region))];

  // Get districts based on selected region
  const districts = serviceCenters
    .filter((s) => s.region === selectedRegion)
    .map((s) => s.district);

  const onSubmit = (data) => {
    const riderApplication = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      status: "pending",
      appliedAt: new Date(),
    };
    axiosSecure.post("/riders", riderApplication).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Application submitted!",
          icon: "success",
          text: "Your application pending approval",
        });
      }
    });

    console.log("🚀 Rider Application Submitted:", riderApplication);
    // TODO: Send to backend with axiosSecure

    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🏍️ Be a Rider</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name & Email - Readonly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Name</label>
            <input
              className="input input-bordered w-full bg-gray-100"
              value={user?.displayName || ""}
              readOnly
              {...register("name")}
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              className="input input-bordered w-full bg-gray-100"
              value={user?.email || ""}
              readOnly
              {...register("email")}
            />
          </div>
        </div>

        {/* Age & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Age</label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("age", { required: true, min: 18 })}
            />
            {errors.age && <p className="text-red-500 text-sm">Must be 18+</p>}
          </div>
          <div>
            <label className="label">Phone Number</label>
            <input
              type="tel"
              className="input input-bordered w-full"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">Phone is required</p>
            )}
          </div>
        </div>

        {/* NID Number */}
        <div>
          <label className="label">NID Number</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("nid", { required: true })}
          />
          {errors.nid && (
            <p className="text-red-500 text-sm">NID is required</p>
          )}
        </div>

        {/* Region & District */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Region</label>
            <select
              className="select select-bordered w-full"
              {...register("region", { required: true })}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">-- Select Region --</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errors.region && (
              <p className="text-red-500 text-sm">Region is required</p>
            )}
          </div>

          <div>
            <label className="label">District</label>
            <select
              className="select select-bordered w-full"
              {...register("district", { required: true })}
              disabled={!selectedRegion}
            >
              <option value="">-- Select District --</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm">District is required</p>
            )}
          </div>
        </div>

        {/* Bike Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Bike Brand</label>
            <input
              className="input input-bordered w-full"
              {...register("bikeBrand", { required: true })}
            />
            {errors.bikeBrand && (
              <p className="text-red-500 text-sm">Bike brand required</p>
            )}
          </div>
          <div>
            <label className="label">Bike Registration Number</label>
            <input
              className="input input-bordered w-full"
              {...register("bikeNumber", { required: true })}
            />
            {errors.bikeNumber && (
              <p className="text-red-500 text-sm">
                Registration number required
              </p>
            )}
          </div>
        </div>

        {/* Optional Note */}
        <div>
          <label className="label">Additional Note (Optional)</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("note")}
            placeholder="Anything else you'd like to add..."
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button className="btn btn-primary text-black">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
