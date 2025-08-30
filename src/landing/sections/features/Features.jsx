import { AiFillThunderbolt } from "react-icons/ai";
import { FaDatabase, FaChartBar, FaChartLine, FaPaintBrush } from "react-icons/fa"; // Importing React icons
import { IoExtensionPuzzle } from "react-icons/io5";

export function Features() {
    const features = [
        {
            title: "Data Management",
            description:
                "At Squareup, our design team is passionate about creating beautiful, user-centric designs that captivate your audience and elevate your brand. We believe that great design is not just about aesthetics; it's about creating seamless and intuitive user experiences.",
            icon: <FaPaintBrush className="w-6 h-6 text-landing-icon" />,
            bgClass: "bg-gradient-to-tr from-[#242424] to-[#9dff0027]",
        },
        {
            title: "Analysis",
            description:
                "Our engineering team combines technical expertise with a passion for innovation to build robust and scalable digital solutions. We leverage the latest technologies and best practices to deliver high-performance applications tailored to your specific needs.",
            icon: <IoExtensionPuzzle className="w-6 h-6 text-landing-icon" />,
            bgClass: "bg-gradient-to-tr from-[#242424] to-[#9dff0027]",
        },
        {
            title: "Insights and Charts",
            description:
                "Our experienced project management team ensures that your projects are delivered on time, within budget, and according to your specifications. We follow industry-standard methodologies and employ effective communication and collaboration tools to keep you informed throughout the development process.",
            icon: <AiFillThunderbolt className="w-6 h-6 text-landing-icon" />,
            bgClass: "bg-gradient-to-tr from-[#242424] to-[#9dff0027]",
        },
    ];

    return (
        <section className="bg-black px-4 pb-10">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center border-b border-x border-gray-button-bg py-12 md:py-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Our Features</h2>
                    <p className="text-text-primary text-lg md:text-xl max-w-3xl mx-auto">
                        Transform your brand with our innovative digital solutions that captivate and engage your audience.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3  border-y border-gray-button-bg">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 flex flex-col justify-between border-x border-y md:border-y-0 border-gray-button-bg"
                        >
                            <div>
                                <div
                                    className={`w-12 h-12 ${feature.bgClass} rounded-lg flex items-center justify-center mb-6`}
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary mb-4">{feature.title}</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">{feature.description}</p>
                            </div>
                            <button className="w-full bg-gray-button-bg hover:bg-gray-button-bg/80 hover:cursor-pointer text-white py-3 px-6 rounded-lg transition-colors duration-200">
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
