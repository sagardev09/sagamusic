"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { IoHomeSharp } from "react-icons/io5";
import { usePathname, useRouter } from 'next/navigation';
import { BsFillSearchHeartFill } from "react-icons/bs";
import { BiSolidAlbum } from "react-icons/bi";
import { MdNaturePeople } from "react-icons/md";
import { ImPodcast } from "react-icons/im";
import { MdRecentActors } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaGrinHearts } from "react-icons/fa";
import { useAppContext } from '@/context/GlobalContext';
import SettingModal from './SettingModal';


const Sidebar = () => {


    const { user, logout, UserDetails, ImgUrl } = useAppContext()
    const [settingmodal, setsettingmodal] = useState(false)

    const pathname = usePathname()
    const router = useRouter()

    const isActivelink = (link) => {
        return pathname === link
    }

    return (
        <div className='lg:w-[20vw] hidden bg-slate-100 lg:flex lg:flex-col h-screen py-4 justify-between relative'>
            {
                settingmodal ? <div className='absolute z-50 bottom-[90px] left-[9%]'>
                    <SettingModal />
                </div> : ""
            }
            {user ? <div className='flex flex-col items-center justify-center gap-2'>
                <div className='bg-indigo-500 h-[120px] w-[120px] rounded-full flex items-center justify-center overflow-hidden'>
                    {ImgUrl ? (
                        <img src={ImgUrl} className='h-full w-full object-cover' alt="" />
                    ) : UserDetails?.imgurl ? (
                        <img src={UserDetails.imgurl} className='h-full w-full object-cover' alt="" />
                    ) : (
                        <h1 className='font-bold text-6xl capitalize'>{user?.email.substring(0, 1)}</h1>
                    )}
                </div>
                <h1>username : @{UserDetails?.name}</h1>
                <h5>user email : {user?.email}</h5>
                <button
                    onClick={logout}
                    className="inline-block w-[90%] rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">logout</button>
            </div> :
                <div className='flex flex-col items-center justify-center gap-2'>

                    <button
                        onClick={() => router.push("/login")}
                        className="inline-block w-[90%] rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                    >
                        Login
                    </button>


                    <button
                        onClick={() => router.push("/register")}
                        className="inline-block w-[90%] rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                    >
                        Sign up
                    </button>



                </div>}
            <div className='flex flex-col w-full px-4  '>
                <div className='flex flex-col gap-4 mb-8 '>
                    <Link href={"/"}>
                        <div className={`${isActivelink("/") ? "bg-gray-200" : "bg-transparent"} flex items-center gap-2 p-2 rounded-md `}>
                            <IoHomeSharp className={`${isActivelink("/") ? "text-purple-500" : "text-black"} `} />
                            <h5 className={`${isActivelink("/") ? "text-purple-500" : "text-black"} font-medium capitalize`}>Home</h5>
                        </div>
                    </Link>
                    <Link href={"/browse"} >
                        <div className={`${isActivelink("/browse") ? "bg-gray-200" : "bg-transparent"} flex items-center gap-2 p-2 rounded-md `}>
                            <BsFillSearchHeartFill className={`${isActivelink("/browse") ? "text-purple-500" : "text-black"} `} />
                            <h5 className={`${isActivelink("/browse") ? "text-purple-500" : "text-black"} font-medium capitalize`}>Browse</h5>
                        </div>
                    </Link>
                    <Link href={"/Album"}>
                        <div className={`${isActivelink("/Album") ? "bg-gray-200" : "bg-transparent"} flex items-center gap-2 p-2 rounded-md `}>
                            <BiSolidAlbum className={`${isActivelink("/Album") ? "text-purple-500" : "text-black"} `} />
                            <h5 className={`${isActivelink("/Album") ? "text-purple-500" : "text-black"} font-medium capitalize`}>Album</h5>
                        </div>
                    </Link>
                    <Link href={"/artist"}>
                        <div className={`${isActivelink("/artist") ? "bg-gray-200" : "bg-transparent"} flex items-center gap-2 p-2 rounded-md `}>
                            <MdNaturePeople className={`${isActivelink("/artist") ? "text-purple-500" : "text-black"}`} />
                            <h5 className={`${isActivelink("/artist") ? "text-purple-500" : "text-black"} font-medium capitalize`}>Artists</h5>
                        </div>
                    </Link>
                    <Link href={"/podcasts"}>
                        <div className={`${isActivelink("/podcasts") ? "bg-gray-200" : "bg-transparent"} flex items-center gap-2 p-2 rounded-md `}>
                            <ImPodcast className={`${isActivelink("/podcasts") ? "text-purple-500" : "text-black"}`} />
                            <h5 className={`${isActivelink("/podcasts") ? "text-purple-500" : "text-black"} font-medium capitalize`}>Podcasts</h5>
                        </div>
                    </Link>
                </div>
                <div className={`relative py-2 ${user ? '' : 'group'}`}>
                    {/* Background Overlay (Blur Effect) */}
                    {!user && (
                        <div className='absolute inset-0 backdrop-filter backdrop-blur-sm'></div>
                    )}
                    {/* Lock Icon and Text (Displayed on top when not logged in) */}
                    {!user && (
                        <div className='absolute inset-0 flex flex-col  gap-2 items-center justify-center opacity-100  transition-opacity group-hover:animate-pulse'>
                            <FaLock className='h-10 w-10 text-gray-400' />
                            <h5 className='text-center text-xs'>Login to access this feature</h5>
                        </div>
                    )}
                    <h5 className='px-2 py-2'>My Music</h5>
                    <div className='flex items-center gap-2 p-2 my-2 rounded-md cursor-pointer'>
                        <MdRecentActors />
                        <h5>Recently played</h5>
                    </div>
                    <div className='flex items-center gap-2 p-2 rounded-md cursor-pointer'>
                        <FaGrinHearts />
                        <h5>Liked</h5>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center rounded-sm h-[100px] w-full'>
                {user && <button
                    onClick={() => setsettingmodal(!settingmodal)}
                    className="inline-block w-[90%] rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                >
                    Settings
                </button>}
            </div>
        </div>
    )
}

export default Sidebar