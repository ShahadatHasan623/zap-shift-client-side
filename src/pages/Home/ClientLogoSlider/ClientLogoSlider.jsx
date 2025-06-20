import React from "react";
import Marquee from "react-fast-marquee";

// Import your logos (local or URL-based)
import logo1 from "../../../assets/brands/amazon.png";
// import logo2 from "../../../assets/brands/amazon_vector.png";
// import logo3 from "../../../assets/brands/casio.png";
// import logo4 from "../../../assets/brands/moonstar.png";
// import logo5 from "../../../assets/brands/randstad.png";
// import logo6 from "../../../assets/brands/start-people.png";
// import logo7 from "../../../assets/brands/start.png";
import logo2 from "../../../assets/brands/amazon_vector.png"
import logo3 from "../../../assets/brands/casio.png"
import logo4 from "../../../assets/brands/moonstar.png"
import logo5 from "../../../assets/brands/randstad.png"
import logo6 from "../../../assets/brands/start-people 1.png"
import logo7 from "../../../assets/brands/start.png"


const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientLogoSlider = () => {
  return (
    <section className="bg-base-200 py-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-primary">Our Clients</h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Trusted by top brands and businesses across the nation.
        </p>
      </div>

      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-24">
            <img
              src={logo}
              alt={`Client Logo ${index + 1}`}
              className="h-8 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ClientLogoSlider;
