import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 text-gray-700 dark:text-gray-600 dark:bg-black text-sm">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="text-2xl font-bold text-green-500 hover:text-green-600 transition">
                            <span className="text-gray-800 dark:text-white">Food</span>Flow
                        </Link>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
                        <Link to="/terms" className="hover:text-[#4BAF47] transition dark:text-white">Terms of Use</Link>
                        <Link to="/privacy" className="hover:text-[#4BAF47] transition dark:text-white">Privacy Policy</Link>
                        <Link to="/contact" className="hover:text-[#4BAF47] transition dark:text-white">Contact Us</Link>
                    </div>

                    {/* Socials */}
                    <div className="flex justify-center md:justify-end items-center gap-6">
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#4BAF47] transition dark:text-white">Instagram</a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#4BAF47] transition dark:text-white">Facebook</a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#4BAF47] transition dark:text-white">Twitter</a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 text-center text-xs text-gray-500 dark:text-white">
                    © {new Date().getFullYear()} FoodFlow. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;