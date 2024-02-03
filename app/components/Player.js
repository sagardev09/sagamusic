"use client"
import React, { useState } from 'react'
import { BiRepeat } from 'react-icons/bi'
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io"
import { PiShuffleBold } from "react-icons/pi"
import { FaPause, FaPlay } from 'react-icons/fa'
import { HiSpeakerWave } from "react-icons/hi2"
import { LuHardDriveDownload } from "react-icons/lu"
import VolumeController from './VolumeController'

const Player = () => {

    const [isvolumevisible, setisvolumevisible] = useState(false)

    return (
        <div className='fixed bottom-0 left-0 right-0 bg-slate-100 flex flex-col'>
            <input type="range" name="progress" id="progress" min={0} max={100} step={0.1} value={0} className='w-full h-[5px] text-indigo-500 range' />
            <div className='flex items-center justify-between px-4 pb-2'>
                <div className='flex items-center justify-start gap-5 lg:w-[30vw]'>
                    <img className='rounded-full h-[50px] w-[50px]' src="https://c.saavncdn.com/248/Evolve-English-2017-20180716230950-50x50.jpg" alt="" />
                    <div className='hidden lg:block'>
                        <span>Lorem ipsum dolor.</span>
                        <p className='text-xs '>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                </div>
                <div className='flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[40vw] justify-center'>
                    <BiRepeat className='text-gray-400 cursor-pointer' />
                    <IoMdSkipBackward className='text-gray-700 hover:text-gray-500 cursor-pointer' />
                    <FaPlay className='text-gray-700 hover:text-gray-500 cursor-pointer' />
                    <IoMdSkipForward className='text-gray-700 hover:text-gray-500 cursor-pointer' />
                    <PiShuffleBold className='text-gray-400 cursor-pointer' />
                </div>
                <div className='flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[30vw] justify-end'
                    onMouseEnter={() => setisvolumevisible(true)}
                    onMouseLeave={() => setisvolumevisible(false)}
                >
                    <LuHardDriveDownload className='text-gray-700 hover:text-gray-500 cursor-pointer' />
                    <HiSpeakerWave className='text-gray-700 hover:text-gray-500 cursor-pointer hidden lg:block' />
                    <VolumeController isvolumevisible={isvolumevisible} />
                </div>
            </div>
        </div>
    )
}

export default Player