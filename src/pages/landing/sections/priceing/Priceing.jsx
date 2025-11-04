import React from "react";
import PricingCard from "./PriceingCard"; // your component
import { useNavigate } from "react-router";

const pricingPlans = [
  {
    title: "Small Enterprise",
    price: "200 €",
    duration: "Month",
    description: "Perfect for growing teams with moderate automation needs.",
    features: [
      "50 process uploads",
      "5,000 chatbot inquiries/month",
      "Email support",
      "Basic analytics",
    ],
    buttonText: "Get Started",
    highlight: false,
  },
  {
    title: "Medium Enterprise",
    price: "750 €",
    duration: "Month",
    description: "Ideal for mid-sized companies scaling automation.",
    features: [
      "250 process uploads",
      "25,000 chatbot inquiries/month",
      "Priority email & chat support",
      "Advanced analytics + export",
      "API access",
    ],
    buttonText: "Get Started",
    highlight: true,
  },
  {
    title: "Individual Offer",
    price: "Contact Us",
    duration: "",
    description: "Custom solutions for large-scale or unique needs.",
    features: [
      "Unlimited processes",
      "Dedicated support manager",
      "Custom integrations",
      "SLA & uptime guarantee",
      "On-premise option",
    ],
    buttonText: "Contact Sales",
    highlight: false,
  },
];

const Pricing = () => {
  const navigation = useNavigate();
  return (
    <section
      id="pricing"
      className="relative py-20 px-4 bg-black overflow-hidden w-full flex flex-col items-center justify-center"
    >
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-black" />

      <div className="relative max-w-7xl w-full text-center z-10">
        <div className="mb-16">
          <p className="text-[#5d52fc] text-sm font-medium mb-2 tracking-wider uppercase">
            Pricing Plans
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple & Transparent
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your business needs.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative group ${
                plan.highlight ? "md:scale-105 md:-translate-y-6" : ""
              } transition-all duration-300`}
            >
              {/* Glow for highlighted card */}
              {plan.highlight && (
                <div className="absolute -inset-1 bg-gradient-to-r from-[#5d52fc] to-[#342BAD] rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
              )}

              {/* Badge for popular plan */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-[#5d52fc] to-[#342BAD] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <PricingCard
                title={plan.title}
                price={plan.price}
                duration={plan.duration}
                description={plan.description}
                features={plan.features}
                buttonText={plan.buttonText}
                onClick={() => {
                  if (plan.buttonText === "Contact Sales") {
                    window.location.href = "mailto:sales@yourcompany.com";
                  } else {
                    navigation("/auth/login");
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* OLD CUSTOMIZABLE VERSION (COMMENTED) */}

      {/* <div className="flex flex-col md:flex-row items-stretch gap-8 w-full mx-auto">
        {pricingPlans.map((plan, index) => (
          <div key={index} className="relative flex-1">
            {plan.isCustomizable ? (
              <div className="bg-gradient-to-bl from-[#272727] to-[#000000] border border-gray-800 rounded-lg p-8 h-full flex flex-col">
                <img
                  src="/priceing.png"
                  alt=""
                  className="absolute top-0 right-0"
                />
                <div className="mb-6 text-center">
                  <h3 className="text-[#5d52fc] text-lg font-semibold mb-2">
                    {plan.title}
                  </h3>
                  <div className="flex items-baseline my-5 justify-center">
                    <span className="text-4xl font-bold text-white">
                      {premiumPrice}
                    </span>
                    <span className="text-[#5d52fc] ml-2">
                      /{plan.duration}
                    </span>
                  </div>
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-gray-300 text-sm">
                      Users: {users}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={users}
                      onChange={(e) => setUsers(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:w-4
      [&::-webkit-slider-thumb]:h-4
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:bg-[#5d52fc]
      [&::-webkit-slider-thumb]:cursor-pointer
      [&::-moz-range-thumb]:appearance-none
      [&::-moz-range-thumb]:w-4
      [&::-moz-range-thumb]:h-4
      [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:bg-[#5d52fc]
      [&::-moz-range-thumb]:cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm">
                      Processes: {processes}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={processes}
                      onChange={(e) => setProcesses(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:w-4
      [&::-webkit-slider-thumb]:h-4
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:bg-[#5d52fc]
      [&::-webkit-slider-thumb]:cursor-pointer
      [&::-moz-range-thumb]:appearance-none
      [&::-moz-range-thumb]:w-4
      [&::-moz-range-thumb]:h-4
      [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:bg-[#5d52fc]
      [&::-moz-range-thumb]:cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm">
                      Chatbot Inquiries: {inquiries}
                    </label>
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={inquiries}
                      onChange={(e) => setInquiries(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:w-4
      [&::-webkit-slider-thumb]:h-4
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:bg-[#5d52fc]
      [&::-webkit-slider-thumb]:cursor-pointer
      [&::-moz-range-thumb]:appearance-none
      [&::-moz-range-thumb]:w-4
      [&::-moz-range-thumb]:h-4
      [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:bg-[#5d52fc]
      [&::-moz-range-thumb]:cursor-pointer"
                    />
                  </div>
                </div>
                <button className="w-full py-3 hover:cursor-pointer px-6 bg-transparent border border-[#342BAD] text-[#5d52fc] rounded-lg hover:bg-[#342BAD] hover:text-white transition-colors mt-8">
                  {plan.buttonText}
                </button>
              </div>
            ) : (
              <PricingCard
                title={plan.title}
                price={plan.price}
                duration={plan.duration}
                description={plan.description}
                features={plan.features}
                buttonText={plan.buttonText}
              />
            )}
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default Pricing;
