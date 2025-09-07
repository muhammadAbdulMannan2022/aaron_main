import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqData = [
    {
        id: 1,
        question: "What services does SquareUp provide?",
        answer:
            "SquareUp offers a range of services including design, engineering, and project management. We specialize in user experience design, web development, mobile app development, custom software development, branding and identity, and more.",
    },
    {
        id: 2,
        question: "How can SquareUp help my business?",
        answer:
            "We help businesses transform their digital presence through innovative solutions, streamlined processes, and user-centric design approaches that drive growth and engagement.",
    },
    {
        id: 3,
        question: "What industries does SquareUp work with?",
        answer:
            "We work across various industries including technology, healthcare, finance, e-commerce, education, and startups, adapting our expertise to meet specific industry requirements.",
    },
    {
        id: 4,
        question: "How long does it take to complete a project with SquareUp?",
        answer:
            "Project timelines vary based on scope and complexity. Typically, projects range from 4-12 weeks, with clear milestones and regular updates throughout the development process.",
    },
    {
        id: 5,
        question: "Do you offer ongoing support and maintenance after the project is completed?",
        answer:
            "Yes, we provide comprehensive ongoing support and maintenance packages to ensure your digital solutions continue to perform optimally and stay up-to-date with the latest technologies.",
    },
    {
        id: 6,
        question: "Can you work with existing design or development frameworks?",
        answer:
            "We're experienced in working with various existing frameworks and can seamlessly integrate with your current tech stack or design systems.",
    },
    {
        id: 7,
        question: "How involved will I be in the project development process?",
        answer:
            "We believe in collaborative partnerships. You'll be involved in key decision points, regular check-ins, and milestone reviews to ensure the project aligns with your vision and goals.",
    },
    {
        id: 8,
        question: "Can you help with website or app maintenance and updates?",
        answer:
            "Yes, we offer comprehensive maintenance services including regular updates, security patches, performance optimization, and feature enhancements to keep your digital assets running smoothly.",
    },
];

export function FAQ() {
    const [openItem, setOpenItem] = useState(null);  // Only one item open at a time

    const toggleItem = (id) => {
        setOpenItem((prev) => (prev === id ? null : id)); // Toggle between open and closed
    };

    const leftColumnItems = faqData.slice(0, 4);
    const rightColumnItems = faqData.slice(4, 8);

    return (
        <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto border-x px-5 pb-12 flex flex-col gap-10 md:gap-20">
                {/* Header */}
                <div className="text-center my-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Still you have any questions? Contact our Team via hello@squareup.com
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {leftColumnItems.map((item) => (
                            <div key={item.id} className="border-b border-gray-700 pb-6">
                                <button
                                    onClick={() => toggleItem(item.id)}
                                    className="w-full flex items-start justify-between text-left group hover:cursor-pointer"
                                >
                                    <div className="flex items-center justify-between gap-4 flex-1">
                                        <div className="flex items-center gap-4">
                                            <div className="border border-gray-button-bg bg-gradient-to-bl from-gray-800 p-3 rounded-xl to-black">
                                                <span className="text-blue-400 font-semibold text-lg flex-shrink-0">
                                                    {item.id.toString().padStart(2, "0")}
                                                </span>
                                            </div>
                                            <h3 className="text-white text-lg font-medium group-hover:text-blue-400 transition-colors duration-200">
                                                {item.question}
                                            </h3>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            {openItem === item.id ? (
                                                <FiMinus className="w-6 h-6 text-blue-400" />
                                            ) : (
                                                <FiPlus className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                                            )}
                                        </div>
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openItem === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="pt-4 pl-12">
                                        <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {rightColumnItems.map((item) => (
                            <div key={item.id} className="border-b border-gray-700 pb-6">
                                <button
                                    onClick={() => toggleItem(item.id)}
                                    className="w-full flex items-center justify-between text-left group hover:cursor-pointer"
                                >
                                    <div className="flex items-center justify-between gap-4 flex-1">
                                        <div className="flex items-center gap-4">
                                            <div className="border border-gray-button-bg bg-gradient-to-bl from-gray-800 p-3 rounded-xl to-black">
                                                <span className="text-blue-400 font-semibold text-lg flex-shrink-0">
                                                    {item.id.toString().padStart(2, "0")}
                                                </span>
                                            </div>
                                            <h3 className="text-white text-lg font-medium group-hover:text-blue-400 transition-colors duration-200">
                                                {item.question}
                                            </h3>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            {openItem === item.id ? (
                                                <FiMinus className="w-6 h-6 text-blue-400" />
                                            ) : (
                                                <FiPlus className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                                            )}
                                        </div>
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openItem === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="pt-4 pl-12">
                                        <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
