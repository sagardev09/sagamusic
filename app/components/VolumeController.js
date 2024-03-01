"use client"
import { useAppContext } from '@/context/GlobalContext';
import React, { useState, useLayoutEffect } from 'react'

const VolumeController = ({ isvolumevisible }) => {

    const { currentSong } = useAppContext();
    const [volume, setVolume] = useState(50);

    useLayoutEffect(() => {
        if (currentSong) {
            console.log(currentSong.audio.volume);
            setVolume(currentSong.audio.volume * 100);
        }
    }, [currentSong, volume]);

    const handleVolumeChange = (e) => {
        if (currentSong) {
            const newVolume = parseFloat(e.target.value) / 100;
            currentSong.audio.volume = newVolume;
            setVolume(newVolume);
        }
    };

    return (
        <div className={`${isvolumevisible ? " block" : "hidden"} w-[180px] absolute -rotate-90 bottom-[120px] -right-[55px] shadow-md px-2 rounded-lg bg-gray-100  `}>
            <input type="range" min={0} max={100} step={0.1} value={volume} onChange={handleVolumeChange} className='h-[5px] text-indigo-500 range mb-10' />
        </div>
    )
}

export default VolumeController