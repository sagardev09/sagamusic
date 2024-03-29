"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, setDoc, doc } from "firebase/firestore";
import { app } from '@/utils/firebase.config';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage();

    const [user, setuser] = useState(null)
    const [homemusic, sethomemusic] = useState([])
    const [albums, setalbums] = useState([])
    const [trending, settrending] = useState([])
    const [songs, setsongs] = useState([])
    const [isPlaying, setisPlaying] = useState(false)
    const [currentSong, setcurrentSong] = useState(null)
    const [SearchSongs, setSearchSongs] = useState([])
    const [closemenu, setclosemenu] = useState(false)
    const [IsProfileModal, setIsProfileModal] = useState(false)
    const [UserDetails, setUserDetails] = useState({})
    const [imageSrc, setImageSrc] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [ImgUrl, setImgUrl] = useState(null)
    const [file, setfile] = useState(null)
    // const [error, setError] = useState(null);

    const handleImageSelect = (event) => {
        const selectedFile = event.target.files[0];
        setfile(selectedFile);
        console.log("selectedFile", selectedFile);
        const reader = new FileReader();
        reader.onload = (event) => {
            setImageSrc(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const uploadImage = async () => {
        if (!file) return;

        const storageRef = ref(storage, `files/${UserDetails?.userid}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                    setDoc(doc(db, "users", UserDetails?.userid), {
                        ...UserDetails,
                        imgurl: downloadURL
                    });
                    console.log(downloadURL);
                });
            }
        );

    };


    const FetchCurrUserDetails = async (userId) => {
        try {
            // Assuming "users" is the collection where user details are stored
            const q = query(collection(db, "users"), where("userid", "==", userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    setUserDetails(userData); // Update state with fetched user data
                    console.log(userData);
                });
            } else {
                console.log("No matching documents.");
            }
        } catch (error) {
            console.log("Error getting documents: ", error);
        }
    }

    //sign up / create the user

    const signup = (userdata) => {
        createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);

                // Store the user in the database
                const userRef = doc(db, "users", user.uid);
                setDoc(userRef, {
                    userid: user.uid,
                    name: userdata.name,
                    email: userdata.email,
                    imgurl: "",
                })
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            })
            .catch((error) => {
                console.error("Error signing up: ", error.code);
                alert(error.code);
                setuser(null); // Assuming setuser is a state setter function
            });
    };

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
                        console.log(loggedInUser, "User");
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
            const res = await axios.get("https://saavn.dev/modules?language=hindi,english")
            const { data } = await res.data
            setalbums(data.albums)
            settrending(data.trending)

        } catch (error) {
            console.log(error);
        }
    }


    const playMusic = async (music, name, duration, image, id, primaryArtists) => {
        if (currentSong && currentSong.id === id) {
            if (isPlaying) {
                setisPlaying(false);
                currentSong.audio.pause();
            } else {
                setisPlaying(true);
                await currentSong.audio.play();
            }
        } else {
            if (currentSong) {
                currentSong.audio.pause();
                setisPlaying(false);
            }
            const newAudio = new Audio(music[4].link)
            setcurrentSong({
                name,
                duration,
                image: image[2].link,
                id,
                audio: newAudio,
                primaryArtists
            })
            setisPlaying(true);
            console.log(currentSong);
            await newAudio.play();
        }
    }

    const nextSong = () => {
        if (currentSong) {
            const index = songs.findIndex((song) => song.id === currentSong.id);
            if (index === songs.length - 1) {
                const { downloadUrl, name, duration, image, id, primaryArtists } = songs[0];
                playMusic(downloadUrl, name, duration, image, id, primaryArtists);
            } else {
                const { downloadUrl, name, duration, image, id, primaryArtists } = songs[index + 1];
                playMusic(downloadUrl, name, duration, image, id, primaryArtists);
            }
        }
    };

    const prevSong = () => {
        if (currentSong) {
            const index = songs.findIndex((song) => song.id === currentSong.id);
            if (index === 0) {
                const { downloadUrl, name, duration, image, id, primaryArtists } = songs[songs.length - 1];
                playMusic(downloadUrl, name, duration, image, id, primaryArtists);
            } else {
                const { downloadUrl, name, duration, image, id, primaryArtists } = songs[index - 1];
                playMusic(downloadUrl, name, duration, image, id, primaryArtists);
            }
        }
    };

    useEffect(() => {
        // Use onAuthStateChanged to handle initial authentication state
        const unsubscribe = onAuthStateChanged(auth, (User) => {
            if (User) {
                // User is signed in
                FetchCurrUserDetails(User.uid)
                console.log("UserDetails", UserDetails);
                setuser(User);
                console.log(User, "User");
            } else {
                // User is signed out
                setuser(null);
            }
        });

        return () => unsubscribe(); // Cleanup the listener when the component unmounts
    }, [auth]);



    return (
        <GlobalContext.Provider value={{ user, signup, login, logout, fetchMusicHomePage, homemusic, trending, albums, setsongs, songs, playMusic, isPlaying, currentSong, nextSong, prevSong, setSearchSongs, SearchSongs, setclosemenu, closemenu, setIsProfileModal, IsProfileModal, UserDetails, imageSrc, handleImageSelect, uploadImage, ImgUrl }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(GlobalContext);
};