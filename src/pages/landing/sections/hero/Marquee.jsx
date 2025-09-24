import React from "react";
import Marquee from "react-fast-marquee";
import { baseUrl, useGetLogosQuery } from "../../../../../redux/auth/auth";

export default function MarqueeSection() {
  const { data, isLoading } = useGetLogosQuery();

  if (isLoading) {
    return <>loading.....</>;
  }
  return (
    <div className="py-6 absolute bottom-0 max-w-full ">
      <div className="w-full h-full flex items-center justify-center flex-col relative">
        <div
          className="w-fit h-fit px-4 py-3 absolute -translate-y-[50px] rounded-full bg-gray-button-bg"
          style={{
            boxShadow: "0 0px 30px rgba(255, 105, 180, 0.3)", // top-only pink glow
          }}
        >
          <p className="text-white font-semibold">
            Trusted By {data[0] && data[0].total}+ Companies
          </p>
        </div>

        <div className="relative h-full">
          <div className="w-10 md:w-36 h-20 absolute top-0 bg-gradient-to-r from-main-bg to-transparent z-[999]"></div>
          {data && (
            <Marquee
              pauseOnHover={false}
              gradient={false}
              speed={50} // adjust speed to your liking
            >
              {console.log(data[0])}
              {data[0].company_logo.map((src, index) => (
                <img
                  key={index}
                  src={baseUrl + src.logo}
                  alt={`logo-${index}`}
                  height={40}
                  className="h-12 mx-8 object-contain"
                />
              ))}
            </Marquee>
          )}
          <div className="w-10 md:w-36 h-20 absolute top-0 right-0 bg-gradient-to-l from-main-bg to-transparent z-[999]"></div>
        </div>
      </div>
    </div>
  );
}
