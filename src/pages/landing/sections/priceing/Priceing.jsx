import React from 'react';
import PricingCard from './PriceingCard';


const pricingPlans = [
    {
        title: "Free",
        price: "$59",
        duration: "Monthly",
        description: "Perfect for using in a personal website or a client project.",
        features: [
            "Free using version",
            "All UI design by sajib",
            "Lifetime access",
            "Free updates",
            "Use on 1 (one) project",
            "3 Months support",
        ],
        buttonText: "Choose Free plan",
        isFeatured: false,
    },
    {
        title: "Standard",
        price: "$199",
        duration: "Half yearly",
        description: "Perfect for using in a personal website or a client project.",
        features: [
            "Free using version",
            "All UI design by sajib",
            "Lifetime access",
            "Free updates",
            "Use on 1 (one) project",
            "3 Months support",
        ],
        buttonText: "Choose Standard",
        isFeatured: false,  // Featured plan
    },
    {
        title: "Premium",
        price: "$250",
        duration: "Yearly",
        description: "Perfect for using in a personal website or a client project.",
        features: [
            "Free using version",
            "All UI design by sajib",
            "Lifetime access",
            "Free updates",
            "Use on 1 (one) project",
            "3 Months support",
        ],
        buttonText: "Choose Premium",
        isFeatured: false,
    },
];

export default function Pricing() {
    return (
        <section className="relative py-20 px-4 bg-black overflow-hidden w-full flex flex-col items-center justify-center">
            <div className="max-w-7xl flex flex-col items-center justify-center text-center">
                {/* Header */}
                <div className="mb-16">
                    <p className="text-[#4D81DA] text-sm font-medium mb-2">Pricing Table</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Pricing Plans</h2>
                    <p className="text-text-primary max-w-2xl mx-auto">
                        There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in
                        some form.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 w-full mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard
                            key={index}
                            title={plan.title}
                            price={plan.price}
                            duration={plan.duration}
                            description={plan.description}
                            features={plan.features}
                            buttonText={plan.buttonText}
                            isFeatured={plan.isFeatured}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
