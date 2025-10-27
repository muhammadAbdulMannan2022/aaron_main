import { Rocket, Square } from "lucide-react";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import PricingCard from "../landing/sections/priceing/PriceingCard";
import {
  useCancelSubscriptionMutation,
  useGetProfileDataQuery,
  useSubscribeNowMutation,
} from "../../../redux/api/api";

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
  //  rtk
  const [error, setError] = useState(null);
  const [subscribeNow, { isLoading, isSuccess }] = useSubscribeNowMutation();
  const [cancelSubscription, { isLoading: isCancelLoading }] =
    useCancelSubscriptionMutation();
  const { data: profileData, isLoading: isProfileDataLoading } =
    useGetProfileDataQuery();

  const premiumPrice = `$${Math.round(
    users * 10 + processes * 20 + inquiries * 0.01
  )}`;

  const cancelSub = async () => {
    try {
      const res = await cancelSubscription();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubscribeNow = async (type) => {
    if (!profileData) return;

    try {
      let payload;
      if (type !== "free") {
        payload = {
          email: profileData.email,
          amount: Math.round(users * 10 + processes * 20 + inquiries * 0.01),
          currency: "usd",
          plan_data: {
            processes: processes,
            chatbot_inq: inquiries,
            duration_months: 12,
          },
        };
      } else {
        payload = {
          email: profileData.email,
          amount: 0,
          currency: "usd",
          plan_data: {
            processes: 1,
            chatbot_inq: 4,
            duration_months: 1,
          },
        };
      }

      const res = await subscribeNow(payload).unwrap();

      if (res.checkout_url) {
        window.location.href = res.checkout_url;
      } else {
        throw new Error("No checkout URL found");
      }
    } catch (err) {
      console.error(err);

      // Handle backend JSON error shape
      if (err?.data?.error) {
        setError(err.data.error);
      } else if (err?.error) {
        setError(err.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  if (isProfileDataLoading) return <div>Loading...</div>;

  return (
    <div
      onClick={() => setError(null)}
      className="h-full flex-1 overflow-y-auto text-[var(--color-text-primary)] py-12 pt-28 md:pt-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[var(--color-main-bg)] to-[#1a1a33]"
    >
      {/* Membership Section */}
      <div className="text-[var(--color-main-text)] py-8 px-4 flex flex-col items-center w-full max-w-6xl">
        {/* Table container */}
        <div className="border border-[var(--color-button-outline)] rounded-lg overflow-hidden w-full text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-4">
              <p className="text-[var(--color-dark-text)] text-sm mb-2">
                Subscription duration
              </p>
              <p className="font-medium">
                {profileData && profileData.subscription_status}
              </p>
            </div>
            <div className="p-4 flex flex-col items-center justify-center">
              <p className="text-[var(--color-dark-text)] text-sm mb-2">
                Membership {profileData.is_subscribed ? "" : "(Freebie)"}
              </p>
              {profileData.is_subscribed && (
                <button
                  onClick={cancelSub}
                  disabled={isCancelLoading}
                  className="bg-[#574bff] hover:bg-[#574bff]/80 text-white px-4 py-1 rounded transition hover:cursor-pointer disabled:text-gray-500"
                >
                  Cancel
                </button>
              )}
            </div>
            <div className="p-4 flex flex-col items-end">
              <p className="text-[var(--color-dark-text)] text-sm mb-2">
                Renewal Date
              </p>
              <p className="font-medium">
                {profileData.subsciption_expires_on &&
                  new Date(
                    profileData.subsciption_expires_on.split("T")[0]
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
              </p>
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
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500 text-red-400 rounded-lg text-center max-w-lg">
              {error}
            </div>
          )}
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
                    {/* <div>
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
                    </div> */}
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
                  <button
                    onClick={() => handleSubscribeNow("premium")}
                    className="w-full py-3 hover:cursor-pointer px-6 bg-transparent border border-[#342BAD] text-[#5d52fc] rounded-lg hover:bg-[#342BAD] hover:text-white transition-colors mt-8"
                  >
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
                  onClick={() => handleSubscribeNow("free")}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
