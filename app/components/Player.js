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
        <div className='fixed bottom-4 shadow-xl rounded-md p-6 left-0 right-0 bg-slate-100 flex flex-col z-10 max-w-2xl mx-auto gap-2'>

            <input type="range"
                name="progress"
                id="progress"
                min={0}
                max={100}
                step="0.1"
                value={0}
                ref={inputref}
                onChange={handleProgressChange}
                class="w-full bg-transparent range cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
[&::-webkit-slider-thumb]:w-2.5
[&::-webkit-slider-thumb]:h-2.5
[&::-webkit-slider-thumb]:-mt-0.5
[&::-webkit-slider-thumb]:appearance-none
[&::-webkit-slider-thumb]:bg-white
[&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(112,39,235,1)]
[&::-webkit-slider-thumb]:rounded-full
[&::-webkit-slider-thumb]:transition-all
[&::-webkit-slider-thumb]:duration-150
[&::-webkit-slider-thumb]:ease-in-out

[&::-moz-range-thumb]:w-2.5
[&::-moz-range-thumb]:h-2.5
[&::-moz-range-thumb]:appearance-none
[&::-moz-range-thumb]:bg-red-500
[&::-moz-range-thumb]:border-2
[&::-moz-range-thumb]:border-red-600

[&::-moz-range-thumb]:transition-all
[&::-moz-range-thumb]:duration-150
[&::-moz-range-thumb]:ease-in-out

[&::-webkit-slider-runnable-track]:w-full
[&::-webkit-slider-runnable-track]:h-2
[&::-webkit-slider-runnable-track]:bg-purple-400
[&::-webkit-slider-runnable-track]:rounded-full
[&::-moz-range-track]:w-full
[&::-moz-range-track]:h-2
[&::-moz-range-track]:bg-gray-100
"  />

            <div className='flex items-center justify-between px-4 pb-2'>
                <div className='flex items-center justify-start gap-5 lg:w-[30vw]'>
                    <img className='rounded-full h-[50px] w-[50px]'
                        src={currentSong?.image} alt="" />
                    <div className='hidden lg:block'>
                        <span className='text-[14px]'>{currentSong?.name}</span>
                        <p className='text-[8px] '>{currentSong?.primaryArtists}</p>
                    </div>
                </div>
                <div className='flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[40vw] justify-center'>

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

                </div>
                <div className='flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[30vw] relative items-center justify-end'

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