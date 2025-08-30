import { FaQuoteLeft, FaStar } from "react-icons/fa"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export function Testimonials() {
    const testimonials = [
        {
            name: "Cameron Williamson",
            role: "Designer",
            image: "https://i.ibb.co.com/QxXFHBB/83b6d281974dc2066cc5ac7c0dfee3d2.jpg",
            text: "Searches for multiplexes, property comparisons, and the loan estimator. Works great. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolores.Searches for multiplexes, property comparisons, and the loan estimator. Works great. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolores.Searches for multiplexes, property comparisons, and the loan estimator. Works great. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolores.",
        },
        {
            name: "Esther Howard",
            role: "Marketing",
            image: "https://i.ibb.co.com/JRLCCtBj/alone-boy-pictures-7itzym8tc15q8y8u.jpg",
            text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.",
        },
        {
            name: "Devon Lane",
            role: "Developer",
            image: "https://i.ibb.co.com/QxXFHBB/83b6d281974dc2066cc5ac7c0dfee3d2.jpg",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est",
        },
        {
            name: "Jane Smith",
            role: "Product Manager",
            image: "https://i.ibb.co.com/JRLCCtBj/alone-boy-pictures-7itzym8tc15q8y8u.jpg",
            text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate.",
        },
        {
            name: "John Doe",
            role: "Engineer",
            image: "https://i.ibb.co.com/QxXFHBB/83b6d281974dc2066cc5ac7c0dfee3d2.jpg",
            text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
        },
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        dotsClass: "slick-dots custom-dots",
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
    }

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <style>
                {`
                    .custom-dots li button:before {
                        color: #9CA3AF !important; /* Tailwind gray-400 */
                        font-size: 12px;
                    }
                    .custom-dots li.slick-active button:before {
                        color: #9CA3AF !important; /* Tailwind gray-400 */
                    }
                `}
            </style>
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between items-start md:items-end mb-16">
                    <div className="mb-8 lg:mb-0">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-md">
                            What our Users are saying us?
                        </h2>
                    </div>

                    {/* Statistics */}
                    <div className="flex flex-row-reverse md:flex-row gap-8 lg:gap-16">
                        <div className="text-center lg:text-left">
                            <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">10m+</div>
                            <div className="text-gray-300 text-sm">Happy People</div>
                        </div>
                        <div className="text-center lg:text-left">
                            <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">4.88</div>
                            <div className="text-gray-300 text-sm mb-2">Overall rating</div>
                            <div className="flex justify-center lg:justify-start gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400 text-sm" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Carousel */}
                <Slider {...settings} className="testimonial-carousel">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="px-4">
                            <div className="bg-gray-button-bg rounded-lg p-6 relative h-72 flex flex-col">
                                {/* Quote Icon */}
                                <div className="absolute top-4 right-4">
                                    <FaQuoteLeft className="text-gray-600 text-2xl" />
                                </div>

                                {/* Profile Section */}
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.image || "/placeholder.svg"}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">{testimonial.name}</h3>
                                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-gray-300 text-sm leading-relaxed line-clamp-6">{testimonial.text}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}