import React from "react";
import { MdArrowOutward } from "react-icons/md";

const Frequently = () => {
  return (
    <div className="bg-base-100 px-6 md:px-20 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your
          body with ease!
        </p>
      </div>

      <div className="flex flex-col max-w-3xl mx-auto gap-4">
        <div className="collapse collapse-arrow border border-gray-300 rounded-lg bg-white  transition  focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300 focus-within:bg-[#E6F2F3]">
          <input type="radio" name="faq-accordion" defaultChecked />
          <div className="collapse-title text-lg font-semibold text-gray-800">
            How does this posture corrector work?
          </div>
          <div className="collapse-content text-gray-700 text-base leading-relaxed">
            A posture corrector works by providing support and gentle alignment
            to your shoulders, back, and spine, encouraging you to maintain
            proper posture throughout the day. Here’s how it typically
            functions: A posture corrector works by providing support and gentle
            alignment to your shoulders.
          </div>
        </div>

        <div className="collapse collapse-arrow border border-gray-300 rounded-lg bg-white  transition  focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300 focus-within:bg-[#E6F2F3]">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold text-gray-800">
            Is it suitable for all ages and body types?
          </div>
          <div className="collapse-content text-gray-700 text-base leading-relaxed">
            Click on "Forgot Password" on the login page and follow the
            instructions sent to your email.
          </div>
        </div>

        <div className="collapse collapse-arrow border border-gray-300 rounded-lg bg-white  transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300 focus-within:bg-[#E6F2F3]">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold text-gray-800">
            How do I update my profile information?
          </div>
          <div className="collapse-content text-gray-700 text-base leading-relaxed">
            Go to "My Account" settings and select "Edit Profile" to make
            changes.
          </div>
        </div>
        <div className="collapse collapse-arrow border border-gray-300 rounded-lg bg-white  transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300 focus-within:bg-[#E6F2F3]">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold text-gray-800">
            How do I update my profile information?
          </div>
          <div className="collapse-content text-gray-700 text-base leading-relaxed">
            Go to "My Account" settings and select "Edit Profile" to make
            changes.
          </div>
        </div>
      </div>
      <div className="mt-10 text-center flex justify-center items-center">
        <button className="btn btn-primary text-black">See More FAQ’s</button>
        <h1 className="bg-[#1F1F1F] p-2 rounded-full"><MdArrowOutward className="text-[#CAEB66]"  size={20} /></h1>
      </div>
    </div>
  );
};

export default Frequently;
