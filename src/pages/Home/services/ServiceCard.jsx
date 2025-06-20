import React from "react";

const ServiceCard = ({ service }) => {
    const{title,description,icon:Icon}=service
  return (
    <div className="bg-white hover:bg-[#CAEB66] transition-all duration-300 rounded-xl shadow-md p-6 hover:shadow-lg  flex flex-col items-center justify-center text-center">
      <div className="text-red-800 text-4xl mb-4">
        <Icon />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
