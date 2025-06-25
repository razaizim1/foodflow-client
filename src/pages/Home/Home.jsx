import React from 'react';
import Hero from '../../components/Hero';
import HowItWorks from '../../components/HowItWorks';
import Testimonial from '../../components/Testimonial';
import { useLoaderData } from 'react-router';
import FeaturedFoods from '../../components/FeaturedFoods';

const Home = () => {
    const allFoods = useLoaderData();

    // 🔽 Process featured foods
    const featuredFoods = allFoods
        .filter(food => food.status === 'available')
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 6);

    return (
        <div>
            <Hero />
            <div className='bg-white dark:bg-black'>
                <div className="container mx-auto px-4 lg:px-8 py-28">
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl font-semibold sm:text-4xl dark:text-white">🍽️ Featured Foods</h2>
                        <p className="mt-4 mb-8 text-gray-600 dark:text-gray-300">
                            Discover the top shared food items, available for a limited time.
                        </p>
                        <div className="mb-6">
                            <button
                                onClick={() => window.location.href = '/availablefoods'}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition"
                            >
                                Show All
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredFoods.map(food => (
                            <FeaturedFoods key={food._id} food={food} />
                        ))}
                    </div>
                </div>
            </div>
            <Testimonial />
            <HowItWorks />
        </div>
    );
};

export default Home;
