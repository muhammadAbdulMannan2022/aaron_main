import { Rocket, Square } from "lucide-react";
import { useState } from "react";
import PricingCard from "../landing/sections/priceing/PriceingCard";
import {
  useCancelSubscriptionMutation,
  useGetProfileDataQuery,
  useSubscribeNowMutation,
} from "../../../redux/api/api";

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
    buttonText: "Subscribe Now",
    planType: "small",
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
    buttonText: "Subscribe Now",
    planType: "medium",
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
    planType: "custom",
    highlight: false,
  },
];

export default function PricingPlan() {
  // RTK Query
  const [error, setError] = useState(null);
  const [subscribeNow, { isLoading: isSubscribing }] =
    useSubscribeNowMutation();
  const [cancelSubscription, { isLoading: isCancelLoading }] =
    useCancelSubscriptionMutation();
  const { data: profileData, isLoading: isProfileDataLoading } =
    useGetProfileDataQuery();

  // Customizable state (commented but preserved)
  // const [users, setUsers] = useState(10);
  // const [processes, setProcesses] = useState(5);
  // const [inquiries, setInquiries] = useState(5000);

  const cancelSub = async () => {
    try {
      await cancelSubscription().unwrap();
    } catch (err) {
      setError(err?.data?.error || "Failed to cancel subscription.");
    }
  };

  const handleSubscribeNow = async (planType) => {
    if (!profileData?.email) {
      setError("Please log in to subscribe.");
      return;
    }

    try {
      let payload;

      if (planType === "custom") {
        window.location.href =
          "mailto:sales@yourcompany.com?subject=Custom%20Enterprise%20Plan";
        return;
      }

      if (planType === "small") {
        payload = {
          email: profileData.email,
          amount: 200,
          currency: "eur",
          plan_data: {
            processes: 50,
            chatbot_inq: 5000,
            duration_months: 1,
          },
        };
      } else if (planType === "medium") {
        payload = {
          email: profileData.email,
          amount: 750,
          currency: "eur",
          plan_data: {
            processes: 250,
            chatbot_inq: 25000,
            duration_months: 1,
          },
        };
      }

      const res = await subscribeNow(payload).unwrap();
      if (res.checkout_url) {
        window.location.href = res.checkout_url;
      }
    } catch (err) {
      const msg =
        err?.data?.error ||
        err?.error ||
        "Subscription failed. Please try again.";
      setError(msg);
    }
  };

  if (isProfileDataLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[var(--color-main-text)]">
        Loading your profile...
      </div>
    );
  }

  return (
    <div
      onClick={() => setError(null)}
      className="h-full flex-1  text-[var(--color-text-primary)] py-12 pt-28 md:pt-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden "
    >
      {/* Background Accent */}
      <div className="absolute inset-0  pointer-events-none" />

      {/* Membership Status */}
      <div className="w-full max-w-6xl mb-12">
        <div className=" backdrop-blur-sm border border-[var(--color-button-outline)] rounded-xl p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <p className="text-[var(--color-dark-text)] text-sm mb-1">
                Subscription
              </p>
              <p className="font-semibold text-[var(--color-main-text)]">
                {profileData?.subscription_status || "Free Plan"}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-[var(--color-dark-text)] text-sm mb-2">
                Membership {profileData?.is_subscribed ? "" : "(Free)"}
              </p>
              {profileData?.is_subscribed && (
                <button
                  onClick={cancelSub}
                  disabled={isCancelLoading}
                  className="bg-red-500/20 hover:bg-red-500/30 hover:cursor-pointer text-red-400 px-5 py-1.5 rounded-lg text-sm font-medium transition disabled:opacity-50"
                >
                  {isCancelLoading ? "Cancelling..." : "Cancel Subscription"}
                </button>
              )}
            </div>
            <div className="text-right">
              <p className="text-[var(--color-dark-text)] text-sm mb-1">
                Renews On
              </p>
              <p className="font-semibold text-[var(--color-main-text)]">
                {profileData?.subsciption_expires_on
                  ? new Date(
                      profileData.subsciption_expires_on.split("T")[0]
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-main-text)] mb-3">
            Choose Your Enterprise Plan
          </h2>
          <p className="text-[var(--color-text-notActive)]">
            Transparent pricing for teams of all sizes
          </p>
        </div>

        {error && (
          <div className="mb-8 max-w-2xl mx-auto px-5 py-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-center text-sm">
            {error}
          </div>
        )}

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative group ${
                plan.highlight ? "md:scale-105 md:-translate-y-4" : ""
              } transition-all duration-300`}
            >
              {/* Glow for popular */}
              {plan.highlight && (
                <div className="absolute -inset-1 bg-gradient-to-r from-[#5d52fc] to-[#342BAD] rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
              )}

              {/* Popular Badge */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-[#5d52fc] to-[#342BAD] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    RECOMMENDED
                  </span>
                </div>
              )}

              <PricingCard
                title={plan.title}
                price={plan.price}
                duration={plan.duration}
                description={plan.description}
                features={plan.features}
                buttonText={isSubscribing ? "Processing..." : plan.buttonText}
                onClick={() => handleSubscribeNow(plan.planType)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* OLD CUSTOMIZABLE VERSION (COMMENTED) */}
      {/*
        <div className="mt-16 w-full max-w-4xl">
          <div className="bg-gradient-to-bl from-[#272727] to-[#000000] border border-gray-800 rounded-lg p-8">
            <h3 className="text-[#5d52fc] text-lg font-semibold mb-2 text-center">Premium (Custom)</h3>
            <div className="flex items-baseline justify-center my-5">
              <span className="text-4xl font-bold text-white">{premiumPrice}</span>
              <span className="text-[#5d52fc] ml-2">/Yearly</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm">Processes: {processes}</label>
                <input type="range" min="1" max="50" value={processes} onChange={(e) => setProcesses(+e.target.value)} className="..." />
              </div>
              <div>
                <label className="block text-gray-300 text-sm">Chatbot Inquiries: {inquiries}</label>
                <input type="range" min="1000" max="100000" step="1000" value={inquiries} onChange={(e) => setInquiries(+e.target.value)} className="..." />
              </div>
            </div>
            <button onClick={() => handleSubscribeNow("premium")} className="w-full mt-8 py-3 ...">
              Calculate Model Now
            </button>
          </div>
        </div>
      */}
    </div>
  );
}
