import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';

const fetchAvailableFoods = async () => {
    const res = await fetch('https://b11a11-server-site.vercel.app/foods', {
        credentials: 'include',
    });
    if (!res.ok) {
        throw new Error("Network response was not ok");
    }
    return res.json();
};

const AvailableFoods = () => {
    const { data: allFoods, isLoading, isError } = useQuery({
        queryKey: ['availableFoods'],
        queryFn: fetchAvailableFoods,
    });

    const [sortBy, setSortBy] = useState('');
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [gridCols, setGridCols] = useState(3);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (allFoods) {
            const availableFoods = allFoods.filter(food => food.status === 'available');

            let sortedFoods = [...availableFoods];
            if (sortBy === 'asc') {
                sortedFoods.sort((a, b) => new Date(a.expireDateTime) - new Date(b.expireDateTime));
            } else if (sortBy === 'desc') {
                sortedFoods.sort((a, b) => new Date(b.expireDateTime) - new Date(a.expireDateTime));
            }

            const searchedFoods = sortedFoods.filter(food =>
                food.foodName.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setFilteredFoods(searchedFoods);
        }
    }, [allFoods, sortBy, searchQuery]);

    const toggleGridCols = () => setGridCols(prev => (prev === 3 ? 2 : 3));

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                Error loading foods.
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-black min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
                        🍽️ Available Foods
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-3">
                        Browse fresh and ready-to-pick food donations.
                    </p>
                </div>

                {/* Controls Section */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-10 shadow-sm grid gap-4 sm:flex sm:items-center sm:justify-between">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <label className="text-gray-700 dark:text-gray-200 font-medium">Sort by Expire Date:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Default</option>
                            <option value="asc">Soonest Expire First</option>
                            <option value="desc">Latest Expire First</option>
                        </select>
                    </div>

                    <div className="w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by food name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-64 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <button
                        onClick={toggleGridCols}
                        className="px-4 py-2 w-full sm:w-auto bg-green-600 hover:bg-green-700 transition text-white rounded-md font-medium shadow"
                    >
                        Switch to {gridCols === 3 ? '2' : '3'} Columns
                    </button>
                </div>

                {/* Food Grid */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
                    {filteredFoods.length > 0 ? (
                        filteredFoods.map(food => (
                            <div
                                key={food._id}
                                className="group bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all p-4 flex flex-col"
                            >
                                <div className="relative">
                                    <img
                                        src={food.foodImage}
                                        alt={food.foodName}
                                        className="h-48 w-full object-cover rounded-md"
                                    />
                                    <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow-sm">
                                        {food.quantity}x
                                    </span>
                                </div>
                                <div className="mt-4 flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-green-600 transition">
                                        {food.foodName}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Pickup: {food.pickupLocation}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Expires: {moment(food.expireDateTime).format('LLL')}
                                    </p>
                                </div>
                                <Link to={`/food/${food._id}`}>
                                    <button className="mt-4 w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-md font-medium shadow">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-600 dark:text-gray-300 text-lg font-medium">
                            No food items match your search.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AvailableFoods;
