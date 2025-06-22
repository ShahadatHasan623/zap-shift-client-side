import React from "react";
import proFastLogo from "../../../assets/logo.png";
import { Link } from "react-router";

const ProFastLogo = () => {
  return (
    <Link to='/'>
      <div className="flex items-end">
        <img className="mb-2" src={proFastLogo} alt="" />
        <p className="font-semibold text-3xl -ml-3">ProFast</p>
      </div>
    </Link>
  );
};

export default ProFastLogo;
