import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import customerLogo from "../../../assets/customer-top.png"

const testimonials = [
  {
    name: "Awlad Hossin",
    title: "Senior Product Designer",
    review:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Rasel Ahmed",
    title: "CEO",
    review:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Nasir Uddin",
    title: "CTO",
    review:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Tanvir Hasan",
    title: "UX Researcher",
    review:
      "Using this product has improved my daily posture. I highly recommend it to anyone suffering from back pain.",
    image: "https://i.pravatar.cc/100?img=4",
  },
];

const CustomerSay = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    arrows: false,
    dots: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="bg-[#f6f9fb] py-12 px-4 my-12 rounded-3xl">
      {/* Title */}
      <div className="text-center mb-8">
        <img
          src={customerLogo}
          alt="icon"
          className="w-50 h-25 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">
          What our customers are sayings
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-3">
              <div
                className={`bg-white rounded-xl shadow-md p-6 h-59 flex flex-col justify-between text-center transition-all duration-300 ${
                  index === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-40 scale-95"
                }`}
              >
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  "{item.review}"
                </p>
                <div className="flex justify-center items-center gap-3 mt-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

       
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSay;
