import React from "react";
import CoverageMap from "./CoverageMap";
import { useLoaderData } from "react-router";


const Coverage = () => {
    const serviceCenter =useLoaderData()
 
  return (
   <div className="max-w-4xl mx-auto px-4 py-10">
      <CoverageMap serviceCenter={serviceCenter} />
    </div>
  );
};

export default Coverage;
