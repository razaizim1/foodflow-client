import {
    createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import AddFood from "../pages/AddFood/AddFood";
import PrivateRoute from "./PrivateRoute";
import FoodDetails from "../components/FoodDetails";
import AvailableFoods from "../pages/AvailableFoods/AvailableFoods";
import MyFoodRequest from "../pages/MyFoodRequest/MyFoodRequest";
import MyFoods from "../pages/MyFoods/MyFoods";
import { foodLoader } from "../api/myFoodApi";


const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                loader: foodLoader,
                Component: Home
            },
            {
                path: "login",
                Component: Login
            },
            {
                path: "signup",
                Component: Signup
            },
            {
                path: "addfood",
                element: (
                    <PrivateRoute>
                        <AddFood />
                    </PrivateRoute>
                ),
                hydrateFallbackElement: (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <span className="loading loading-bars loading-xl"></span>
                    </div>
                ),
            },
            {
                path: "availablefoods",
                element: (
                    <PrivateRoute>
                        <AvailableFoods />
                    </PrivateRoute>
                ),
                hydrateFallbackElement: (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <span className="loading loading-bars loading-xl"></span>
                    </div>
                ),
            },
            {
                path: "myrequests",
                loader: foodLoader,
                element: (
                    <PrivateRoute>
                        <MyFoodRequest />
                    </PrivateRoute>
                ),
                hydrateFallbackElement: (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <span className="loading loading-bars loading-xl"></span>
                    </div>
                ),
            },
            {
                path: "myfoods",
                element: (
                    <PrivateRoute>
                        <MyFoods />
                    </PrivateRoute>
                ),
                hydrateFallbackElement: (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <span className="loading loading-bars loading-xl"></span>
                    </div>
                ),
            },
            {
                path: "food/:id",
                loader: ({ params }) => fetch(`https://b11a11-server-site.vercel.app/foods/${params.id}`),
                element: (
                    <PrivateRoute>
                        <FoodDetails />
                    </PrivateRoute>
                ),
                hydrateFallbackElement: (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <span className="loading loading-bars loading-xl"></span>
                    </div>
                ),
            }
        ]
    },
]);

export default router;