import React from 'react';
import { useLoaderData } from 'react-router';
import moment from 'moment';
import UseAuth from '../../hooks/UseAuth';

const MyFoodRequest = () => {
    const { userInfo } = UseAuth();
    const data = useLoaderData();
    console.log(typeof data[0].userEmail);
    console.log(typeof userInfo.email);

    // Show only requested foods for the logged-in user
    const requestedFoods = data.filter(
        item => item.status === 'requested' && item.userEmail === userInfo?.email
    );

    return (
        <div className="min-h-screen py-16 px-4 bg-white dark:bg-black">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
                    🍴 My Food Requests
                </h2>

                {requestedFoods.length > 0 ? (
                    <div className="overflow-x-auto shadow-md rounded-xl">
                        <table className="w-full table-auto text-sm text-left text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900">
                            <thead className="bg-green-600 text-white text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 rounded-tl-xl">Image</th>
                                    <th className="px-6 py-4">Food Name</th>
                                    <th className="px-6 py-4">Donor</th>
                                    <th className="px-6 py-4">Pickup Location</th>
                                    <th className="px-6 py-4">Expire Date</th>
                                    <th className="px-6 py-4 rounded-tr-xl">Request Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requestedFoods.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`hover:bg-green-50 dark:hover:bg-gray-800 ${
                                            index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
                                        } transition`}
                                    >
                                        <td className="px-6 py-4">
                                            <img
                                                src={item.foodImage}
                                                alt={item.foodName}
                                                className="w-14 h-14 object-cover rounded-full border"
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-semibold">{item.foodName}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={item.donorImage}
                                                    alt={item.donorName}
                                                    className="w-8 h-8 rounded-full border"
                                                />
                                                <span>{item.donorName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{item.pickupLocation}</td>
                                        <td className="px-6 py-4">
                                            {moment(item.expireDateTime).format('MMM DD, YYYY | hh:mm A')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {moment(item.requestDate).format('MMM DD, YYYY | hh:mm A')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-lg text-gray-600 dark:text-gray-300">
                        You haven't requested any food yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyFoodRequest;