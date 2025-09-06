import { FaUpload, FaSearch, FaProjectDiagram, FaRocket, FaChartLine } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function HowItsWorks() {
    const steps = [
        {
            title: "Visualize",
            icon: <FaUpload className="text-purple-400 text-2xl" />,
            subTitle: "Import your data and get an instant process map.",
        },
        {
            title: "Analyze",
            icon: <FaSearch className="text-purple-400 text-2xl" />,
            subTitle: "Detect inefficiencies, waiting times, bottlenecks and process dropouts.",
        },
        {
            title: "Simulate",
            icon: <FaProjectDiagram className="text-purple-400 text-2xl" />,
            subTitle: "Test potential changes with “what-if” analysis. (Digital Twin)",
        },
        {
            title: "Optimize",
            icon: <FaRocket className="text-purple-400 text-2xl" />,
            subTitle: "Apply improvements where they create the most value.",
        },
        {
            title: "Monitor",
            icon: <FaChartLine className="text-purple-400 text-2xl" />,
            subTitle: "Track progress and ensure lasting results.",
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        dotsClass: "slick-dots custom-dots !flex justify-center mt-6", // center dots
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section className="w-full py-10 md:py-16">
            <style>
                {`
                    .custom-dots li button:before {
                        color: #9CA3AF !important; /* Tailwind gray-400 */
                        font-size: 10px;
                    }
                    .custom-dots li.slick-active button:before {
                        color: #A855F7 !important; /* Tailwind purple-500 */
                    }
                `}
            </style>
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center items-start md:items-end mb-16">
                    <div className="mb-8 lg:mb-0 flex flex-col justify-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-md text-center">
                            How It Works
                        </h2>
                        <p className="text-gray-400 text-center">Line software suite that simplifies process mining</p>
                    </div>
                </div>

                {/* Steps Carousel */}
                <Slider {...settings} className="testimonial-carousel">
                    {steps.map((item, index) => (
                        <div key={index} className="h-[180px] px-3">
                            <div className="flex flex-col items-start bg-gray-900 text-white p-6 rounded-lg shadow-lg h-full">
                                <div className="p-3 mb-4 rounded-lg flex-shrink-0 bg-gradient-to-tr from-[#090909] to-[#1F1F1F] w-fit flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm">{item.subTitle}</p>
                                <div className="flex-grow"></div> {/* pushes content to equal height */}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
