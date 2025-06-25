import React from 'react';

const Testimonial = () => {
    return (
        <section className="py-20 bg-[#0e0e0e] text-white my-28">
            <div className="container mx-auto px-6">
                <div className="grid gap-12 xl:grid-cols-5">
                    {/* Heading */}
                    <div className="xl:col-span-2">
                        <h2 className="text-4xl font-bold text-[#4BAF47] mb-4">What Our Users Say</h2>
                        <p className="text-gray-300">
                            Hear how FoodFlow is transforming the way people share food, reduce waste, and build real community connections.
                        </p>
                    </div>

                    {/* Testimonials */}
                    <div className="xl:col-span-3 grid gap-6 md:grid-cols-2">
                        {/* Testimonial 1 */}
                        <div className="p-6 bg-[#1c1c1c] rounded-lg shadow hover:shadow-lg transition">
                            <p className="italic text-gray-200">
                                “FoodFlow helped me connect with my neighbors for the first time in years. Now we exchange meals every weekend.”
                            </p>
                            <div className="flex items-center mt-6 space-x-4">
                                <img
                                    src="https://i.ibb.co/Xr3VsNcL/testi1.jpg"
                                    alt="Sara Williams"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-white">Sara Williams</p>
                                    <p className="text-sm text-gray-400">Home Chef & Mom of 3</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="p-6 bg-[#1c1c1c] rounded-lg shadow hover:shadow-lg transition">
                            <p className="italic text-gray-200">
                                “As a student on a tight budget, finding fresh food shared nearby has been a blessing. Thank you FoodFlow!”
                            </p>
                            <div className="flex items-center mt-6 space-x-4">
                                <img
                                    src="https://i.ibb.co/Mkb9sXDj/testi2.jpg"
                                    alt="Jason Lee"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-white">Jason Lee</p>
                                    <p className="text-sm text-gray-400">University Student</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="p-6 bg-[#1c1c1c] rounded-lg shadow hover:shadow-lg transition">
                            <p className="italic text-gray-200">
                                “We started using FoodFlow to reduce food waste at our bakery. Now we donate unsold goods every night.”
                            </p>
                            <div className="flex items-center mt-6 space-x-4">
                                <img
                                    src="https://i.ibb.co/Y5gsFzy/testi3.jpg"
                                    alt="Amira Hassan"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-white">Amira Hassan</p>
                                    <p className="text-sm text-gray-400">Bakery Owner</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 4 */}
                        <div className="p-6 bg-[#1c1c1c] rounded-lg shadow hover:shadow-lg transition">
                            <p className="italic text-gray-200">
                                “What started as a quick leftover share turned into monthly neighborhood potlucks. We love it!”
                            </p>
                            <div className="flex items-center mt-6 space-x-4">
                                <img
                                    src="https://i.ibb.co/bgpkrdZ2/testi4.jpg"
                                    alt="George R."
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-white">George R.</p>
                                    <p className="text-sm text-gray-400">Retired Teacher</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
