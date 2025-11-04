import React from "react";

export default function HowToImprove() {
  return (
    <section className="bg-[#151414] py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Image */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src="/HowToImprove.svg"
            alt="How to improve your business"
            width={600}
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">
            Uncover and Identify Weaknesses in Your Processes with Alevio:
          </h1>
          <p className="text-base text-[#848484] mb-6">
            Alevio helps you visualize and understand your business processes as
            they truly run. By identifying inefficiencies, bottlenecks, and
            hidden risks, you gain the insights you need to optimize
            performance. With data-driven transparency, Alevio empowers you to
            continuously improve workflows, reduce costs, and drive measurable
            results across your organization.
          </p>
          {/* <button className="bg-outer-button-bg text-white py-3 px-6 rounded-lg hover:bg-outer-button-bg/80 transition-colors duration-200 w-fit hover:cursor-pointer">
            Learn More
          </button> */}
        </div>
      </div>
    </section>
  );
}
