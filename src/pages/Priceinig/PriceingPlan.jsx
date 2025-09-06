import { Rocket, Square } from "lucide-react";
import { FaUserAlt } from "react-icons/fa";

export default function PricingPlan() {
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
                            <button className="bg-[var(--color-auth-button-bg)] hover:bg-[var(--color-auth-button-bg)]/80 text-white px-4 py-1 rounded transition hover:cursor-pointer">
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

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full mt-8">
                    {/* Trial Plan */}
                    <div className="bg-[#1a1a332f] backdrop-blur-md rounded-xl p-6 flex flex-col text-left shadow-lg border border-[var(--color-outer-button-bg)] hover:shadow-xl transition-shadow duration-300">
                        <div className="flex flex-col flex-grow w-full">
                            <div className="bg-[var(--color-outer-button-bg)] rounded-md px-4 py-3 mb-6 w-fit">
                                <FaUserAlt className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-4">Trial</h2>
                            <ul className="text-[var(--color-text-notActive)] text-base space-y-3 mb-8 w-full">
                                <li className="flex items-center gap-2">
                                    <Square className="w-5 h-5 text-[var(--color-text-notActive)]" />
                                    Temporary Number (50 Customers Calls)
                                </li>
                                <li className="flex items-center gap-2">
                                    <Square className="w-5 h-5 text-[var(--color-text-notActive)]" />
                                    Basic Dashboard / No Booking Calendar Integration (Only Indur.ai
                                    platform Calendar FREE)
                                </li>
                            </ul>
                            <div className="text-4xl md:text-5xl font-bold mb-8">
                                $0<span className="text-xl font-normal text-[var(--color-text-notActive)]">/Month</span>
                            </div>
                        </div>
                        <button className="w-full py-3 px-6 bg-[var(--color-gray-button-bg)] rounded-lg text-lg font-medium hover:bg-[var(--color-outer-button-bg)] transition-colors duration-300">
                            Try Now
                        </button>
                    </div>

                    {/* Standard Plan */}
                    <div className="bg-[#1a1a332f] backdrop-blur-md rounded-xl flex flex-col shadow-2xl border-2 border-[#400C6F] scale-105 transition-transform duration-300 hover:scale-107 relative">
                        <div className="bg-[#400C6F] py-3 text-center text-sm md:text-lg font-semibold uppercase tracking-wider text-white">
                            MOST POPULAR
                        </div>
                        <div className="p-6 flex flex-col text-left flex-grow w-full">
                            <div className="bg-[var(--color-landing-icon)] rounded-md p-3 mb-6 w-fit">
                                <Rocket className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-4">Standard</h2>
                            <ul className="text-[var(--color-text-notActive)] text-base space-y-3 mb-8 w-full">
                                <li className="flex items-center gap-2">
                                    <Square className="w-5 h-5" />
                                    Personal AI Agent Number
                                </li>
                                <li className="flex items-center gap-2">
                                    <Square className="w-5 h-5" />
                                    Unlimited Customer Calls
                                </li>
                                <li className="flex items-center gap-2">
                                    <Square className="w-5 h-5" />
                                    Dashboard with Calendar Integration
                                </li>
                            </ul>
                            <div className="text-4xl md:text-5xl font-bold mb-8">
                                $100<span className="text-xl font-normal text-[var(--color-text-notActive)]">/Month</span>
                            </div>
                            <button className="w-full py-3 px-6 bg-gradient-to-r from-[#6A00FF] to-[#4A00FF] rounded-lg text-lg font-medium hover:from-[#7A10FF] hover:to-[#5A10FF] transition-colors duration-300">
                                Subscribe Now
                            </button>
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-[#1a1a332f] backdrop-blur-md rounded-xl p-6 flex flex-col text-left shadow-lg border border-[var(--color-outer-button-bg)] hover:shadow-xl transition-shadow duration-300">
                        <div className="flex flex-col flex-grow w-full">
                            <div className="bg-[var(--color-outer-button-bg)] rounded-md px-4 py-3 mb-6 w-fit">
                                <FaUserAlt className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-4">Pro</h2>
                            <ul className="text-[var(--color-text-notActive)] text-base space-y-3 mb-8 w-full">
                                <li className="flex items-center gap-2">
                                    <Square className="w-5 h-5" />
                                    Personal AI Agent Number
                                </li>
                                <li className="flex items-center gap-2">
                                    <Square className="w-5 h-5" />
                                    Unlimited Customer Calls
                                </li>
                                <li className="flex items-center gap-2">
                                    <Square className="w-5 h-5" />
                                    Dashboard with Calendar Integration
                                </li>
                            </ul>
                            <div className="text-4xl md:text-5xl font-bold mb-8">
                                $300<span className="text-xl font-normal text-[var(--color-text-notActive)]">/Month</span>
                            </div>
                        </div>
                        <button className="w-full py-3 px-6 bg-[var(--color-gray-button-bg)] rounded-lg text-lg font-medium hover:bg-[var(--color-outer-button-bg)] transition-colors duration-300">
                            Subscribe Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
