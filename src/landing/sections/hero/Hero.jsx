import { FaPlay } from "react-icons/fa6";
import GradientText from "../../../helpers/GradientText";
import MarqueeSection from "./Marquee";

export function Hero() {
    return (
        <section className="relative bg-black flex items-center justify-center overflow-hidden md:h-[calc(100vh-70px)] h-[calc(100vh-70px)] ">
            {/* Content */}
            <div className="max-w-7xl w-full h-full flex items-center justify-center border-x border-gray-button-bg bg-[url('/illastrationHero.png')] bg-bottom bg-no-repeat flex-col relative">
                <div className="relative z-10 max-w-4xl h-fit -mt-[20%] md:-mt-[10%] mx-auto px-4 text-center">

                    <GradientText
                        from="from-white"
                        to="to-gray-600"
                        className="text-5xl md:text-[70px] font-bold leading-tight text-center"
                    >
                        Turn Process Complexity
                        <br />
                        into Business Clarity
                    </GradientText>


                    <div className="text-gray-400 hidden md:flex border border-gray-button-bg text-lg md:text-xl mb-12 max-w-2xl mx-auto p-4 rounded-2xl my-4  flex-wrap gap-y-1">
                        <span>For</span> <span className="text-text-primary bg-gray-button-bg p-1 rounded-md px-2">Businessman</span><span>,</span> <span className="text-text-primary bg-gray-button-bg p-1 rounded-md px-2">Enterprise</span><span>,</span>{" "}
                        <span className="text-text-primary bg-gray-button-bg p-1 rounded-md px-2">Startups</span> <span>{" "} and {" "}</span> <span className="text-text-primary bg-gray-button-bg p-1 rounded-md px-2">Store management</span>
                    </div>
                    <div className="text-gray-400 md:hidden flex border border-gray-button-bg text-lg md:text-xl mb-12 max-w-2xl mx-auto p-4 rounded-2xl my-4  flex-wrap gap-1 items-center justify-center">
                        <span className="text-text-primary bg-gray-button-bg p-1 rounded-md px-2">For</span>  <span className="text-text-primary bg-gray-button-bg p-1 rounded-md px-2">Businessman</span><span>,</span> <span className="text-text-primary bg-gray-button-bg p-1 rounded-md px-2">Enterprise</span><span>,</span>{" "}
                        <span className="text-text-primary bg-gray-button-bg p-1 rounded-md px-2">Startups</span> <span className="text-text-primary bg-gray-button-bg p-1 rounded-md px-2">{" "} and {" "}</span> <span className="text-text-primary bg-gray-button-bg p-1 rounded-md px-2">Store management</span>
                    </div>


                    <div className="flex flex-row gap-4 justify-center items-center">
                        <button className="bg-outer-button-bg hover:bg-outer-button-bg/80 hover:cursor-pointer text-white px-3 md:px-8 py-2 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-colors duration-200 md:min-w-[180px]">
                            Get Started Now
                        </button>

                        <button className="bg-gray-button-bg hover:bg-gray-button-bg/80 hover:cursor-pointer text-white px-3 md:px-8 py-2 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-colors duration-200 flex items-center gap-3 md:min-w-[180px] justify-center border border-gray-700">
                            <span>
                                <FaPlay />
                            </span>
                            Watch Demo
                        </button>
                    </div>
                </div>
                <MarqueeSection />
            </div>
        </section>
    )
}
