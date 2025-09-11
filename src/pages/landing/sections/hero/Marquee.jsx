import React from "react";
import Marquee from "react-fast-marquee";

export default function MarqueeSection() {
  const images = [
    "/marquee/1.png",
    "/marquee/2.png",
    "/marquee/3.png",
    "/marquee/4.png",
    "/marquee/5.png",
    "/marquee/6.png",
    "/marquee/7.png",
  ];
  const repeatedImages = [...images, ...images];
  return (
    <div className="bg-[#131313] py-6 absolute bottom-0 max-w-full border-y border-gray-button-bg">
      <div className="w-full h-full flex items-center justify-center flex-col relative">
        <div
          className="w-fit h-fit px-4 py-3 absolute -translate-y-[50px] rounded-full bg-gray-button-bg"
          style={{
            boxShadow: "0 0px 30px rgba(255, 105, 180, 0.3)", // top-only pink glow
          }}
        >
          <p className="text-white font-semibold">Trusted By 300+ Companies</p>
        </div>

        <div className="relative">
          <Marquee
            pauseOnHover={false}
            gradient={false}
            speed={50} // adjust speed to your liking
          >
            {repeatedImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`logo-${index}`}
                height={40}
                className="h-12 mx-8 object-contain"
              />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
