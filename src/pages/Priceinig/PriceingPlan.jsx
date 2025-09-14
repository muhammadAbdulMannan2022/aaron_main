import { Rocket, Square } from "lucide-react";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import PricingCard from "../landing/sections/priceing/PriceingCard";

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
      "15 inquiries to ChatBot",
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

export default function PricingPlan() {
  const [users, setUsers] = useState(10);
  const [processes, setProcesses] = useState(5);
  const [inquiries, setInquiries] = useState(5000);

  const premiumPrice = `$${Math.round(
    users * 10 + processes * 20 + inquiries * 0.01
  )}`;
  return (
    <div className="h-full flex-1 overflow-y-auto text-[var(--color-text-primary)] py-12 pt-28 md:pt-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[var(--color-main-bg)] to-[#1a1a33]">
      {/* Membership Section */}
      <div className="text-[var(--color-main-text)] py-8 px-4 flex flex-col items-center w-full max-w-6xl">
        {/* Table container */}
        <div className="border border-[var(--color-button-outline)] rounded-lg overflow-hidden w-full text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-4">
              <p className="text-[var(--color-dark-text)] text-sm mb-2">
                Date of Starting
              </p>
              <p className="font-medium">12 July, 2025</p>
            </div>
            <div className="p-4 flex flex-col items-center justify-center">
              <p className="text-[var(--color-dark-text)] text-sm mb-2">
                Membership (Freebie)
              </p>
              <button className="bg-[#574bff] hover:bg-[#574bff]/80 text-white px-4 py-1 rounded transition hover:cursor-pointer">
                Cancel
              </button>
            </div>
            <div className="p-4">
              <p className="text-[var(--color-dark-text)] text-sm mb-2">
                Date of End
              </p>
              <p className="font-medium">12 July, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="flex items-center justify-center flex-col">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Our Pricing Plan</h2>
          <p className="text-[var(--color-text-notActive)] mb-8">
            Find your best package here
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
        </div>
      </div>
    </div>
  );
}
