import React from "react";
import image1 from "../../../assets/livetracking.png";
import image2 from "../../../assets/safedelivery.png";
import image3 from "../../../assets/safedelivery.png";

const highlights = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: image1,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: image2,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: image3,
  },
];

const ServiceHighlightsList = () => {
  return (
    <section className="py-16 bg-base-100" data-aos="fade-up"  data-aos-anchor-placement="bottom-center">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary mb-2">Why Choose Us</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          We are committed to providing exceptional service to ensure your satisfaction.
        </p>
      </div>

      <div className="container mx-auto px-4 space-y-6">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start bg-base-200 rounded-xl shadow-md overflow-hidden py-10"
          >
            {/* Image Box with Dotted Border */}
            <div className="md:w-40 w-full p-4 flex justify-center border-b md:border-b-0 md:border-r-2 border-dotted border-gray-400">
              <img
                src={item.image}
                alt={item.title}
                className="h-24 w-24 object-contain"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1 p-4">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceHighlightsList;
