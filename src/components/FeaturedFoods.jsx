import React from 'react';
import { Link } from 'react-router';

const FeaturedFoods = ({ food }) => {
    const { _id, foodName, foodImage, quantity, pickupLocation, notes } = food;

    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <figure className="relative h-60 overflow-hidden">
                <img
                    src={foodImage}
                    alt={foodName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
                    {quantity} left
                </div>
            </figure>

            <div className="p-5 space-y-3">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{foodName}</h2>
                <p className="text-gray-600 text-sm dark:text-gray-300">
                    {notes}
                </p>
                <p className="text-gray-600 text-sm dark:text-gray-300">
                    <span className="font-medium">Pickup:</span> {pickupLocation}
                </p>

                <Link to={`/food/${_id}`}>
                    <button className="w-full mt-4 bg-green-600 hover:bg-green-700 transition-colors text-white py-2 rounded-md font-medium shadow">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedFoods;
