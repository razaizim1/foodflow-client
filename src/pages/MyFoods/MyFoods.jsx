import React, { Suspense } from 'react';
import Swal from 'sweetalert2';
import UseAuth from '../../hooks/UseAuth';
import MyFood from '../../components/MyFood';

const MyFoods = () => {

    return (
        <div className="min-h-screen py-16 px-4 bg-white dark:bg-black">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
                    🍽️ Manage My Foods
                </h2>

                <Suspense>
                    <MyFood></MyFood>
                </Suspense>
            </div>
        </div>
    );
};

export default MyFoods;
