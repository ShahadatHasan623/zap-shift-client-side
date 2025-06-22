import React from "react";
import { Outlet } from "react-router";
import ProFastLogo from "../pages/shared/Profastlogo/ProFastLogo";
import authImage from "../assets/authImage.png";

const AuthLayouts = () => {
  return (
    <div className="bg-base-200 px-12 py-12">
      <div>
        <ProFastLogo></ProFastLogo>
      </div>
      <div className="py-12 gap-20 ">
        <div className="max-w-6xl mx-auto flex flex-col items-center lg:flex-row-reverse">
          <div className="flex-1">
            <img src={authImage} className="max-w-full rounded-lg shadow-2xl" />
          </div>
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
