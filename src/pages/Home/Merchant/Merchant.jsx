import React from "react";
import location from "../../../assets/location-merchant.png"

const Merchant = () => {
  return (
    <div className="bg-no-repeat bg-[url('assets/be-a-merchant-bg.png')] bg-[#03373D] rounded-3xl">
      <div className="hero-content flex-col gap-8 lg:flex-row-reverse px-20 py-12 ">
        <img
          src={location}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
          <p className="py-6 text-[#DADADA]">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary rounded-full text-black">Become a Merchant</button>
          <button className="btn btn-primary btn-outline ms-5 rounded-full">Earn with Profast Courier </button>
        </div>
      </div>
    </div>
  );
};

export default Merchant;
