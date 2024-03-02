"use client"
import { useAppContext } from "@/context/GlobalContext";
import SongItem from "./SongItem";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';


const SearchSection = () => {
    const { SearchSongs } = useAppContext()



    return (
        <>
            <div
                className={`fixed lg:left-[0px] lg:right-[0px] lg:bottom-[120px] lg:top-[150px]  right-[50%] translate-x-[50%] p-8 flex lg:translate-x-0 lg:w-full w-[350px] lg:h-[50vh] h-[1000px] overflow-x-hidden overflow-y-scroll top-[15%] justify-center items-center flex-wrap gap-4 z-50 bg-white bg-opacity-50 backdrop-blur-lg ${SearchSongs.length === 0 ? "-translate-y-[1800px] " : "translate-y-0"
                    } transition-all duration-500 ease-linear`}
            >
                <div className="absolute right-4 top-4 shadow-2xl rounded-full bg-red-400 p-2 text-white"
                >
                    <IoClose />
                </div>
                <div className="py-3 my-3 flex flex-row justify-start flex-wrap items-center gap-8">
                    {SearchSongs?.map((song) => (
                        <SongItem key={song.id} {...song} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default SearchSection;