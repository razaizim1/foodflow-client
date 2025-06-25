import React from 'react';

const HowItWorks = () => {
    return (
        <section className="p-6 bg-white dark:bg-black dark:text-white pb-28">
            <div className="container mx-auto">
                <span className="block mb-2 text-xs font-medium tracking-widest text-center uppercase text-[#4BAF47]">
                    How it works
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12">
                    Share Food. Build Community.
                </h2>
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center p-8 rounded-md shadow-md bg-gray-50 dark:bg-gray-900">
                        <div className="w-12 h-12 mb-4 flex items-center justify-center text-xl font-bold rounded-full bg-[#4BAF47] text-white">
                            1
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Sign Up & Create Profile</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Join FoodFlow by creating a profile. Let your neighbors know what you love to cook or share.
                        </p>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center p-8 rounded-md shadow-md bg-gray-50 dark:bg-gray-900">
                        <div className="w-12 h-12 mb-4 flex items-center justify-center text-xl font-bold rounded-full bg-[#4BAF47] text-white">
                            2
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Share or Request Meals</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Post meals, leftovers, or grocery extras—or find food shared by others in your neighborhood.
                        </p>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center p-8 rounded-md shadow-md bg-gray-50 dark:bg-gray-900">
                        <div className="w-12 h-12 mb-4 flex items-center justify-center text-xl font-bold rounded-full bg-[#4BAF47] text-white">
                            3
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Meet, Exchange & Enjoy</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Connect with fellow food lovers, coordinate exchanges, and build lasting community bonds.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
