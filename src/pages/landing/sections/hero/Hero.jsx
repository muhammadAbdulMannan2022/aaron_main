import { FaPlay } from "react-icons/fa6";
import GradientText from "../../../../helpers/GradientText";
import MarqueeSection from "./Marquee";
import { useRef } from "react";
export function Hero() {
  const videoRef = useRef(null);
  return (
    <section className="relative bg-[#0f0f0f] flex items-center justify-center overflow-hidden md:h-[calc(100vh-70px)] h-[calc(100vh-70px)] ">
      {/* Content */}
      <div className="max-w-7xl w-full h-full flex items-center justify-center bg-[url('/illastrationHero.png')] bg-bottom bg-no-repeat flex-col-reverse md:flex-row relative py-10">
        {/* Section 1 - Text */}
        <div className="relative z-10 max-w-3xl h-fit -mt-[10%] md:-mt-[5%] px-4 text-center md:text-start">
          <GradientText
            from="from-white"
            to="to-gray-600"
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          >
            Process Mining for SME´s – from Data to Clarity
          </GradientText>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-lg">
            Do you really know how your processes run — or just how they should
            run?
          </p>

          <div className="flex flex-row gap-4 justify-center md:justify-start">
            <button className="bg-outer-button-bg hover:bg-outer-button-bg/80 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-colors duration-200 md:min-w-[160px]">
              Get Started Now
            </button>

            <button className="bg-gray-button-bg hover:bg-gray-button-bg/80 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-colors duration-200 flex items-center gap-2 md:min-w-[160px] justify-center border border-gray-700">
              <FaPlay />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Section 2 - Video */}
        <div className="mt-6 md:mt-0 md:ml-8 w-full max-w-lg">
          <video
            src="/heroa.mp4"
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-xl mix-blend-difference"
          ></video>
        </div>
      </div>

      <MarqueeSection />
    </section>
  );
}
