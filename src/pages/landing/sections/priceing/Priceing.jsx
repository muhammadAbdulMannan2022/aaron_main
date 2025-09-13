import React, { useState } from "react";
import PricingCard from "./PriceingCard";

const pricingPlans = [
  {
    title: "Demo",
    price: "$0",
    duration: "30days",
    description: "Perfect for using in a personal website or a client project.",
    features: [
      "Don't just watch the future-Claim your free access now",
      "full access to all feature",
      "Lifetime access",
      "One user",
      "5 diffrent process uploads",
      "Xxx inquiries to ChatBot",
    ],
    buttonText: "Start your demo",
    isCustomizable: false,
  },
  {
    title: "Premium",
    price: "$250",
    duration: "Yearly",
    buttonText: "Calculate Model Now",
    isCustomizable: true,
  },
];

const Pricing = () => {
  const [users, setUsers] = useState(10);
  const [processes, setProcesses] = useState(5);
  const [inquiries, setInquiries] = useState(5000);

  const premiumPrice = `$${Math.round(
    users * 10 + processes * 20 + inquiries * 0.01
  )}`;

  return (
    <section
      id="priceing"
      className="relative py-20 px-4 bg-black overflow-hidden w-full flex flex-col items-center justify-center"
    >
      <div className="max-w-7xl flex flex-col items-center justify-center text-center">
        <div className="mb-16">
          <p className="text-[#5d52fc] text-sm font-medium mb-2">
            Pricing Table
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pricing Plans
          </h2>
          <p className="text-text-primary max-w-2xl mx-auto">
            Simple to start, flexible to scale
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch gap-8 w-full mx-auto">
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
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
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
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
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
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
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
        </div>
      </div>
    </section>
  );
};

export default Pricing;
