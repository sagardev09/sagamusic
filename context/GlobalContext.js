"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from '@/utils/firebase.config';
import { toast } from 'react-toastify';
import axios from 'axios';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const [user, setuser] = useState(null)
    const [homemusic, sethomemusic] = useState([])
    const [albums, setalbums] = useState([])
    const [trending, settrending] = useState([])
    // const [error, setError] = useState(null);

    //sign up / create the user

    const signup = (userdata) => {
        createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                //store the user in the database
                const docRef = addDoc(collection(db, "users"), {
                    name: userdata.name,
                    email: userdata.email,
                });
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((err) => {
                if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
                    console.log("The password is too weak.");
                } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
                    console.log("The email address is already in use.");
                } else {
                    console.log(err.code);
                    alert(err.code);
                }
            });
    }

    // login user  with email and password

    const login = (user) => {
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const loggedInUser = userCredential.user;

                // Use onAuthStateChanged to update user state
                onAuthStateChanged(auth, (User) => {
                    if (User) {
                        // User is signed in
                        setuser(User);
                    } else {
                        // User is signed out
                        setuser(null);
                    }
                });

                console.log(loggedInUser, "User");
            })
            .catch((err) => {
                if (
                    err.code === AuthErrorCodes.INVALID_PASSWORD ||
                    err.code === AuthErrorCodes.USER_DELETED
                ) {
                    console.log("The email address or password is incorrect");
                } else {
                    console.log(err.code);
                    alert(err.code);
                }
            });
    }


    // logout function

    const logout = async () => {
        try {
            await signOut(auth)
            toast.success("logged out");
        } catch (e) {
            console.log(e);
        }
    }

    //fetch music for home page

    const fetchMusicHomePage = async () => {
        try {
            const res = await axios.get("https://saavn.me/modules?language=hindi,english")
            const { data } = await res.data
            // sethomemusic(data)
            setalbums(data.albums)
            settrending(data.trending)
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        // Use onAuthStateChanged to handle initial authentication state
        const unsubscribe = onAuthStateChanged(auth, (User) => {
            if (User) {
                // User is signed in
                setuser(User);
            } else {
                // User is signed out
                setuser(null);
            }
        });

        return () => unsubscribe(); // Cleanup the listener when the component unmounts
    }, [auth]);



    return (
        <GlobalContext.Provider value={{ user, signup, login, logout, fetchMusicHomePage, homemusic, trending, albums }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(GlobalContext);
};