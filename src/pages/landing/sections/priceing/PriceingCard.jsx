import React from "react";

function PricingCard({
  title,
  price,
  duration,
  description,
  features,
  buttonText,
  onClick,
}) {
  return (
    <div
      className={`bg-gradient-to-bl from-[#272727] to-[#000000] border border-gray-800 rounded-lg p-8 relative transform`}
    >
      <img src="/priceing.png" alt="" className="absolute top-0 right-0" />
      <div className="mb-6 text-center">
        <h3 className={`text-[#5d52fc] text-lg font-semibold mb-2`}>{title}</h3>
        <div className="flex items-baseline my-5">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-[#5d52fc] ml-2">/{duration}</span>
        </div>
        <p className="text-gray-400 text-sm mt-2 text-start">{description}</p>
      </div>

      <ul className="space-y-3 mb-8 text-left">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-300 text-sm">
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        className={`w-full py-3 hover:cursor-pointer px-6 bg- border border-[#342BAD] text-[#5d52fc] rounded-lg hover:bg-[#342BAD] hover:text-white transition-colors`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default PricingCard;
