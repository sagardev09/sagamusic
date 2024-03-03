import { useAppContext } from '@/context/GlobalContext';
import React from 'react'
import { GoPlay } from "react-icons/go";

const SongList = ({
    name,
    primaryArtists,
    downloadUrl,
    image,
    id,
    duration
}) => {

    const { isPlaying, currentSong, playMusic } = useAppContext()

    const convertTime = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="flex justify-between items-center w-[80vw] lg:w-[50vw] p-1 lg:px-3 px-2 hover:bg-white hover:shadow-md rounded-md border-b-[1px] border-b-gray-100">
            <GoPlay className="text-3xl text-gray-500 hover:text-gray-700 transition-all ease-in-out duration-300 cursor-pointer"
                onClick={() => playMusic(downloadUrl, name, duration, image, id, primaryArtists)}
            />

            <div className="flex flex-col lg:flex-row gap-2 justify-between items-start w-[80%]">
                <span
                    className={`font-bold text-xs ${id === currentSong?.id && "text-[#46c7b6ff]"
                        }
                        }`}
                >
                    {name}
                </span>
                <span className="font-thin text-xs text-gray-700">
                    {primaryArtists}
                </span>
            </div>

            <div>
                <span className="font-thin text-xs text-gray-700 hidden lg:block">
                    {convertTime(duration)}
                </span>
            </div>
        </div>
    )
}

export default SongList