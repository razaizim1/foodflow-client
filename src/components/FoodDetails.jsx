import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import moment from 'moment';
import UseAuth from '../hooks/UseAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const requestFoodItem = async ({ foodId, requestData }) => {
    const res = await fetch(`https://b11a11-server-site.vercel.app/foods/request/${foodId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestData),
    });
    if (!res.ok) {
        throw new Error("Failed to request food");
    }
    return res.json();
};

const FoodDetails = () => {
    const food = useLoaderData();
    console.log(food.foodImage);
    const { userInfo } = UseAuth();
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState("");
    const {
        _id,
        foodName,
        foodImage,
        quantity,
        pickupLocation,
        expireDateTime,
        notes: foodNotes,
        donorName,
        donorEmail,
        donorImage
    } = food;
    console.log(foodImage);

    const { mutate } = useMutation({
        mutationFn: requestFoodItem,
        onSuccess: (data) => {
            if (data.modifiedCount) {
                Swal.fire({
                    icon: "success",
                    title: "Food Requested Successfully!",
                    timer: 1500,
                    showConfirmButton: false,
                });
                setShowModal(false);
                queryClient.invalidateQueries(['availableFoods']); // Invalidate cache for available foods
            }
        },
        onError: (error) => {
            console.error('Error requesting food:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong while requesting the food!",
            });
        },
    });

    const handleRequest = () => {
        const requestData = {
            foodId: _id,
            foodName,
            foodImage,
            donorName,
            donorEmail,
            userEmail: userInfo.email,
            userName: userInfo.displayName,
            userImage: userInfo.photoURL,
            requestDate: new Date().toISOString(),
            pickupLocation,
            expireDateTime,
            notes,
            status: 'requested'
        };

        mutate({ foodId: _id, requestData });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                <img src={foodImage} alt={foodName} className="w-full h-72 object-cover" />
                <div className="p-6 space-y-4">
                    <h2 className="text-3xl font-bold">{foodName}</h2>
                    <p><strong>Quantity:</strong> {quantity}</p>
                    <p><strong>Pickup Location:</strong> {pickupLocation}</p>
                    <p><strong>Expires On:</strong> {moment(expireDateTime).format("YYYY-MM-DD HH:mm")}</p>
                    <p><strong>Notes:</strong> {foodNotes || "None"}</p>

                    <div className="flex items-center gap-3 mt-6">
                        <img src={donorImage} className="w-12 h-12 rounded-full ring-2 ring-green-500" alt="Donor" />
                        <div>
                            <p className="font-semibold">{donorName}</p>
                            <p className="text-sm text-gray-500">{donorEmail}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                    >
                        Request Food
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center">
                    <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-500 text-xl font-bold"
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-semibold mb-4">Request Form</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input value={foodName} readOnly className="input input-bordered" />
                            <input value={_id} readOnly className="input input-bordered" />
                            <input value={donorEmail} readOnly className="input input-bordered" />
                            <input value={donorName} readOnly className="input input-bordered" />
                            <input value={userInfo.email} readOnly className="input input-bordered" />
                            <input value={moment().format("YYYY-MM-DD HH:mm")} readOnly className="input input-bordered" />
                            <input value={pickupLocation} readOnly className="input input-bordered" />
                            <input value={moment(expireDateTime).format("YYYY-MM-DD HH:mm")} readOnly className="input input-bordered" />
                        </div>
                        <div className="mt-4">
                            <textarea
                                placeholder="Additional Notes"
                                rows="3"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="textarea textarea-bordered w-full"
                            />
                        </div>
                        <div className="mt-4 text-right">
                            <button
                                onClick={handleRequest}
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
                            >
                                Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetails;
