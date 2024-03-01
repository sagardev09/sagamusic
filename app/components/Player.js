"use client"
import React, { useState, useRef, useEffect } from 'react'
import { BiRepeat } from 'react-icons/bi'
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io"
import { PiShuffleBold } from "react-icons/pi"
import { FaPause, FaPlay } from 'react-icons/fa'
import { HiSpeakerWave } from "react-icons/hi2"
import { LuHardDriveDownload } from "react-icons/lu"
import VolumeController from './VolumeController'
import { useAppContext } from '@/context/GlobalContext'

const Player = () => {

    const [isvolumevisible, setisvolumevisible] = useState(false)
    const { currentSong, playMusic, isPlaying, nextSong, prevSong } = useAppContext()

    const inputref = useRef()

    useEffect(() => {
        if (currentSong) {
            const audioElement = currentSong.audio;

            const handleTimeUpdate = () => {
                const duration = Number(currentSong.duration);
                const currentTime = audioElement.currentTime;
                const newTiming = (currentTime / duration) * 100;
                inputref.current.value = newTiming;
            };

            const handleSongEnd = () => nextSong();

            audioElement.addEventListener("timeupdate", handleTimeUpdate);
            audioElement.addEventListener("ended", handleSongEnd);

            return () => {
                audioElement.removeEventListener("timeupdate", handleTimeUpdate);
                audioElement.addEventListener("ended", handleSongEnd);
            };
        }
    }, [currentSong]);


    const handleProgressChange = (event) => {
        const newPercentage = parseFloat(event.target.value);
        const newTime = (newPercentage / 100) * Number(currentSong?.duration);
        if (newTime >= 0) {
            currentSong.audio.currentTime = newTime;
        }
    };

    const handleDownloadSong = async (url) => {
        try {
            const res = await fetch(url);
            const blob = await res.blob();

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${currentSong.name}.mp3`;

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        } catch (error) {
            console.log("Error fetching or downloading files", error);
        }
    };

    return (
        <div className='fixed bottom-0 left-0 right-0 bg-slate-100 flex flex-col z-10'>
            <input
                type="range"
                name="progress"
                id="progress"
                min={0}
                max={100}
                step="0.1"
                value={0}
                ref={inputref}
                onChange={handleProgressChange}
                className="w-full h-[5px] text-purple-400 range"
            />

            <div className='flex items-center justify-between px-4 pb-2'>
                <div className='flex items-center justify-start gap-5 lg:w-[30vw]'>
                    <img className='rounded-full h-[50px] w-[50px]'
                        src={currentSong?.image} alt="" />
                    <div className='hidden lg:block'>
                        <span>{currentSong?.name}</span>
                        <p className='text-xs '>{currentSong?.primaryArtists}</p>
                    </div>
                </div>
                <div className='flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[40vw] justify-center'>
                    <BiRepeat className='text-gray-400 cursor-pointer' />
                    <IoMdSkipBackward className='text-gray-700 hover:text-gray-500 cursor-pointer'
                        onClick={prevSong} />
                    {isPlaying ? (
                        <FaPause
                            className="text-gray-700 hover:text-gray-500 cursor-pointer"
                            onClick={() =>
                                playMusic(
                                    currentSong?.audio,
                                    currentSong.name,
                                    currentSong.duration,
                                    currentSong.image,
                                    currentSong.id
                                )
                            }
                        />
                    ) : (
                        <FaPlay
                            className="text-gray-700 hover:text-gray-500 cursor-pointer"
                            onClick={() =>
                                playMusic(
                                    currentSong.audio,
                                    currentSong.name,
                                    currentSong.duration,
                                    currentSong.image,
                                    currentSong.id
                                )
                            }
                        />
                    )}
                    <IoMdSkipForward className='text-gray-700 hover:text-gray-500 cursor-pointer'
                        onClick={nextSong} />
                    <PiShuffleBold className='text-gray-400 cursor-pointer' />
                </div>
                <div className='flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[30vw] items-center justify-end'

                >
                    <LuHardDriveDownload className='text-gray-700 hover:text-gray-500 cursor-pointer'
                        onClick={() => handleDownloadSong(currentSong.audio.src)}
                    />
                    <HiSpeakerWave className='text-gray-700 hover:text-gray-500 cursor-pointer h-[50px] hidden lg:block'
                        onClick={() => setisvolumevisible(!isvolumevisible)} />
                    <VolumeController isvolumevisible={isvolumevisible} />
                </div>
            </div>
        </div>
    )
}

export default Player