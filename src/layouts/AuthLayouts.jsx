import React from "react";
import { Outlet } from "react-router";
import ProFastLogo from "../pages/shared/Profastlogo/ProFastLogo";
import authImage from "../assets/authImage.png"

const AuthLayouts = () => {
  return (
    <div className=" bg-base-200 p-12 min-h-screen flex justify-center">
      <div>
        <ProFastLogo></ProFastLogo>
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img
            src={authImage}
            className="max-w-sm rounded-lg shadow-2xl"
          />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
