import React from 'react'

export default function HowToImprove() {
    return (
        <section className="bg-[#151414] py-16 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Image */}
                <div className="flex-shrink-0 w-full md:w-1/2">
                    <img
                        src="/HowToImprove.png"
                        alt="How to improve your business"
                        width={700}
                        className="rounded-lg shadow-lg w-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">
                        How to improve your business like we did in ours (secured way)
                    </h1>
                    <p className="text-base text-[#848484] mb-6">
                        Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus efficitur quis massa.
                    </p>
                    <button className="bg-outer-button-bg text-white py-3 px-6 rounded-lg hover:bg-outer-button-bg/80 transition-colors duration-200 w-fit hover:cursor-pointer">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    )
}
