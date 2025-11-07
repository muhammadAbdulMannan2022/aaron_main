// Pricing.jsx  (pure JSX)
import React, { useState } from "react";
import PricingCard from "./PriceingCard";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

/* ---------- Pricing Plans (Popular first) ---------- */
const pricingPlans = [
  {
    title: "Medium Enterprise",
    price: "750 €",
    duration: "Month",
    description: "Ideal for mid-sized companies scaling automation.",
    features: [
      "25 process uploads",
      "500 chatbot inquiries/month",
      "Priority email & chat support",
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
      "Unlimited chatbot inquiries",
      "Priority email & chat support",
      "On-premise option",
    ],
    buttonText: "Contact Sales",
    highlight: false,
  },
  {
    title: "Small Enterprise",
    price: "200 €",
    duration: "Month",
    description: "Perfect for growing teams with moderate automation needs.",
    features: [
      "5 process uploads",
      "150 chatbot inquiries/month",
      "Email support",
    ],
    buttonText: "Get Started",
    highlight: false,
  },
  {
    title: "Free",
    price: "0 €",
    duration: "Forever",
    description: "Get started with basic automation at no cost.",
    features: [
      "2 process upload",
      "10 chatbot inquiries/month",
      "Community support",
    ],
    buttonText: "Get Started",
    highlight: false,
  },
];

/* ---------- Custom Arrow Components ---------- */
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="
      absolute left-[-40px] md:left-[-60px] top-1/2 -translate-y-1/2
      w-10 h-10 flex items-center justify-center rounded-full
      bg-[#5d52fc]/20 hover:bg-[#5d52fc]/40 text-white
      transition-all duration-200 z-10 hidden md:flex cursor-pointer
    "
  >
    <HiChevronLeft className="w-6 h-6" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="
      absolute right-[-40px] md:right-[-60px] top-1/2 -translate-y-1/2
      w-10 h-10 flex items-center justify-center rounded-full
      bg-[#5d52fc]/20 hover:bg-[#5d52fc]/40 text-white
      transition-all duration-200 z-10 hidden md:flex cursor-pointer
    "
  >
    <HiChevronRight className="w-6 h-6" />
  </button>
);

/* ---------- Main Component ---------- */
const Pricing = () => {
  const navigate = useNavigate();

  // Start with the first plan (Medium Enterprise) in the centre
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    focusOnSelect: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          arrows: false, // hide arrows on mobile
        },
      },
    ],
  };

  return (
    <section
      id="pricing"
      className="relative py-20 px-4 bg-black overflow-hidden w-full flex flex-col items-center justify-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-black" />

      <div className="relative max-w-7xl w-full text-center z-10">
        {/* Header */}
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

        {/* Slider */}
        <div className="relative max-w-6xl mx-auto">
          <Slider {...settings}>
            {pricingPlans.map((plan, idx) => {
              const isActive = idx === currentSlide;

              return (
                <div key={idx} className="px-4 py-20">
                  <div
                    className={`
                      relative group transition-all duration-500 ease-in-out
                      ${
                        isActive
                          ? "md:scale-105 md:-translate-y-6"
                          : "md:scale-100"
                      }
                    `}
                  >
                    {/* Glow – only on active + highlighted plan */}
                    {isActive && plan.highlight && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#5d52fc] to-[#342BAD] rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
                    )}

                    {/* Popular badge – only on active + highlighted plan */}
                    {isActive && plan.highlight && (
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
                          navigate("/auth/login");
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
