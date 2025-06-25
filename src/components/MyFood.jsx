import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UseAuth from '../hooks/UseAuth';


const fetchMyFoods = async (email) => {
    const res = await fetch(`https://b11a11-server-site.vercel.app/foods?email=${email}`);
    if (!res.ok) {
        throw new Error("Failed to fetch my foods");
    }
    return res.json();
};

const deleteFoodItem = async (id) => {
    const res = await fetch(`https://b11a11-server-site.vercel.app/foods/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error("Failed to delete food");
    }
    return res.json();
};

const updateFoodItem = async ({ id, updatedFood }) => {
    const res = await fetch(`https://b11a11-server-site.vercel.app/foods/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFood),
    });
    if (!res.ok) {
        throw new Error("Failed to update food");
    }
    return res.json();
};

const MyFood = () => {
    const { userInfo } = UseAuth();
    const queryClient = useQueryClient();

    const { data: foods, isLoading, isError } = useQuery({
        queryKey: ['myFoods', userInfo.email],
        queryFn: () => fetchMyFoods(userInfo.email),
        enabled: !!userInfo.email,
    });

    const [editingFood, setEditingFood] = useState(null);

    const deleteMutation = useMutation({
        mutationFn: deleteFoodItem,
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                Swal.fire('Deleted!', 'The food has been deleted.', 'success');
                queryClient.invalidateQueries(['myFoods']);
            }
        },
        onError: (error) => {
            console.error('Delete failed:', error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateFoodItem,
        onSuccess: (data) => {
            if (data.modifiedCount > 0) {
                Swal.fire('Updated!', 'Food updated successfully.', 'success');
                setEditingFood(null);
                queryClient.invalidateQueries(['myFoods']);
            }
        },
        onError: (error) => {
            console.error('Update failed:', error);
            Swal.fire('Error!', 'Something went wrong while updating.', 'error');
        },
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this food?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            deleteMutation.mutate(id);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedFood = {
            foodName: form.foodName.value,
            quantity: parseInt(form.quantity.value),
            pickupLocation: form.pickupLocation.value,
            expireDateTime: form.expireDateTime.value,
        };

        updateMutation.mutate({ id: editingFood._id, updatedFood });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-[200px] text-red-500">
                Error loading your foods.
            </div>
        );
    }

    if (!foods || foods.length === 0) {
        return (
            <div className="text-center py-10 text-gray-600 dark:text-gray-300">
                <p className="text-lg">You haven't added any food items yet.</p>
            </div>
        );
    }

    return (
        <div className="">
            <div className="overflow-x-auto shadow-md rounded-xl">
                <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900">
                    <thead className="bg-green-600 text-white text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Food Name</th>
                            <th className="px-6 py-4">Quantity</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map((food) => (
                            <tr key={food._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                <td className="px-6 py-4">
                                    <img src={food.foodImage} alt={food.foodName} className="w-14 h-14 object-cover rounded-md border" />
                                </td>
                                <td className="px-6 py-4 font-semibold">{food.foodName}</td>
                                <td className="px-6 py-4">{food.quantity}</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700">{food.status}</span>
                                </td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button
                                        onClick={() => setEditingFood(food)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(food._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {editingFood && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md relative">
                        <button
                            onClick={() => setEditingFood(null)}
                            className="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-500"
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-bold mb-4 dark:text-white">Update Food</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input
                                name="foodName"
                                defaultValue={editingFood.foodName}
                                className="w-full px-4 py-2 border rounded focus:outline-none"
                                placeholder="Food Name"
                            />
                            <input
                                name="quantity"
                                type="number"
                                defaultValue={editingFood.quantity}
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Quantity"
                            />
                            <input
                                name="pickupLocation"
                                defaultValue={editingFood.pickupLocation}
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Pickup Location"
                            />
                            <input
                                name="expireDateTime"
                                type="datetime-local"
                                defaultValue={editingFood.expireDateTime}
                                className="w-full px-4 py-2 border rounded"
                            />
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
                            >
                                Submit Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyFood;
