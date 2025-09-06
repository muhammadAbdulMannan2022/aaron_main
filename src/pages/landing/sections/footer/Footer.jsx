import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa"
import { Link } from "react-router"

export function Footer() {
    return (
        <footer className="bg-[#0f0f0f] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Logo and Address */}
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-bold mb-4">Logohere</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Villa No. 45, Street 12, Khalifa City,
                            <br />
                            Abu Dhabi, United Arab Emirates
                        </p>
                    </div>

                    {/* Contact Links */}
                    <div className="md:col-span-1">
                        <ul className="space-y-3">
                            <li>
                                <Link href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#get-started" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Get started
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Policy Links */}
                    <div className="md:col-span-1">
                        <ul className="space-y-3">
                            <li>
                                <Link href="#privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#reviews" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Reviews
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="md:col-span-1">
                        <h4 className="text-gray-300 mb-4">Follow us on</h4>
                        <div className="flex space-x-4">
                            <Link
                                to=""
                                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                                aria-label="Facebook"
                            >
                                <FaFacebookF className="w-4 h-4" />
                            </Link>
                            <Link
                                to=""
                                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-4 h-4" />
                            </Link>
                            <Link
                                to=""
                                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="w-4 h-4" />
                            </Link>
                            <Link
                                to=""
                                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">Aaron@Aarondata.com</div>
                        <div className="text-gray-400 text-sm">© 2025 Aarondata. All rights reserved</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
