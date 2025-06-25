import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const AuthProvider = ({ children }) => {

    // set user
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    // create user function
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //Update User Profile
    const updateUserProfile = (userData) => {
        return updateProfile(auth.currentUser, userData);
    }

    // Google Provider Instance
    const googleProvider = new GoogleAuthProvider();

    // Sign In with Google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .finally(() => setLoading(false));
    };

        // signin with email and password
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // create an observer for user login state
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('has user', currentUser);
            if (currentUser?.email) {
                const userData = { email: currentUser.email };
                axios.post('https://b11a11-server-site.vercel.app/jwt', userData, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            setUserInfo(currentUser);
            setLoading(false);
        });

        return () => {
            unSubscribe();
        }
    }, []);

    // logOut User
    const logout = () => {
        setLoading(true);
        return signOut(auth)
    };

    // set values in object
    const user = {
        createUser,
        signInUser,
        signInWithGoogle,
        updateUserProfile,
        userInfo,
        loading,
        logout
    }
    return (
        <AuthContext value={user}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;