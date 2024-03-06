"use client"
import { useAppContext } from '@/context/GlobalContext';
import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { CiCamera } from 'react-icons/ci';

const ProfileModal = () => {
    const { setIsProfileModal, UserDetails, handleImageSelect, imageSrc, uploadImage } = useAppContext();


    return (
        <div className='w-[500px] h-[300px] rounded-lg shadow-lg bg-red-100 flex items-center justify-center gap-8 relative'>
            <div
                onClick={() => setIsProfileModal(false)}
                className='absolute top-2 right-2 p-2 m-3 h-8 w-8 text-white cursor-pointer rounded-full bg-red-500 flex items-center justify-center'>X</div>
            <div className='h-[150px] w-[150px] rounded-full bg-indigo-600 flex items-center justify-center relative overflow-hidden'>
                {imageSrc ? (
                    <img src={imageSrc} alt="Profile" className="w-full h-full object-cover" />
                ) : UserDetails?.imgurl ? (
                    <img src={UserDetails.imgurl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <h1 className='font-extrabold text-6xl'>{UserDetails.name.substring(0, 1)}</h1>
                )}

                <label htmlFor="imageInput" className='absolute bottom-0 cursor-pointer w-full bg-gray-50 h-6 flex items-center justify-center'>
                    <CiCamera />
                    <input type="file" id="imageInput" accept="image/*" onChange={handleImageSelect} className="hidden" />
                </label>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                    <label htmlFor="username">Username:</label>
                    <FaRegEdit className='cursor-pointer' />
                </div>
                <div>
                    <input type="text" disabled name="username" className='text-black rounded-lg border-1 border px-3 p-2 border-gray-500' value={UserDetails?.name} id="username" />
                </div>
                <div>
                    <button className='bg-indigo-500 px-4 py-2 text-xs rounded-lg text-white'
                        onClick={uploadImage}
                    >Save</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
