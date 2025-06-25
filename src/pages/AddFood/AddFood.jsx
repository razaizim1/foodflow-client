import React from 'react';
import UseAuth from '../../hooks/UseAuth';
import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addFoodItem = async (newFood) => {
    const res = await fetch('https://b11a11-server-site.vercel.app/foods', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newFood),
    });
    if (!res.ok) {
        throw new Error("Failed to add food");
    }
    return res.json();
};

const AddFood = () => {
    const { userInfo } = UseAuth();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: addFoodItem,
        onSuccess: (data) => {
            if (data.insertedId) {
                Swal.fire({
                    position: "center-center",
                    icon: "success",
                    title: "Food has been added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                // Invalidate relevant queries to refetch data (e.g., available foods)
                queryClient.invalidateQueries(['availableFoods']);
                // Reset the form
                document.getElementById('addFoodForm').reset();
            }
        },
        onError: (error) => {
            console.error('Error adding food:', error.message || error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong while adding the food!",
            });
        },
    });

    const handleAddFood = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const addedFood = Object.fromEntries(formData.entries());

        addedFood.quantity = parseInt(addedFood.quantity);
        addedFood.status = "available";
        addedFood.createdAt = new Date().toISOString();
        addedFood.donorName = userInfo.displayName;
        addedFood.donorEmail = userInfo.email;
        addedFood.donorImage = userInfo.photoURL;

        mutate(addedFood);
    };

    return (
        <div className="min-h-screen text-white py-12 px-4">
            <div className="max-w-3xl mx-auto bg-[#1c1c1c] p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-green-400">Add a New Food Item</h2>
                <form onSubmit={handleAddFood} className="space-y-6" id="addFoodForm">
                    <div>
                        <label className="block mb-1">Food Name</label>
                        <input
                            type="text"
                            name="foodName"
                            required
                            className="w-full p-2 rounded bg-gray-800 text-white"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Food Image URL</label>
                        <input
                            type="text"
                            name="foodImage"
                            required
                            className="w-full p-2 rounded bg-gray-800 text-white"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Food Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            required
                            className="w-full p-2 rounded bg-gray-800 text-white"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Pickup Location</label>
                        <input
                            type="text"
                            name="pickupLocation"
                            required
                            className="w-full p-2 rounded bg-gray-800 text-white"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Expired Date/Time</label>
                        <input
                            type="datetime-local"
                            name="expireDateTime"
                            required
                            className="w-full p-2 rounded bg-gray-800 text-white [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        />
                    </div>


                    <div>
                        <label className="block mb-1">Additional Notes</label>
                        <textarea
                            name="notes"
                            rows="3"
                            className="w-full p-2 rounded bg-gray-800 text-white"
                        ></textarea>
                    </div>

                    {/* Donor Info (Display Only) */}
                    <div className="flex items-center gap-4 bg-gray-800 p-4 rounded">
                        <img src={userInfo?.photoURL} alt="User" className="w-12 h-12 rounded-full ring-2 ring-green-500" />
                        <div>
                            <p className="font-semibold">{userInfo?.displayName}</p>
                            <p className="text-sm text-gray-400">{userInfo?.email}</p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded text-white font-medium"
                    >
                        Add Food
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFood;