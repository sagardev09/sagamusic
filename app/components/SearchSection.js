"use client"
import { useAppContext } from "@/context/GlobalContext";
import SongItem from "./SongItem";


const SearchSection = () => {
    const { SearchSongs } = useAppContext()

    return (
        <div
            className={`fixed left-[100px] right-[100px] bottom-[100px] top-[100px] flex justify-center items-center flex-wrap gap-4 z-50 bg-white bg-opacity-50 backdrop-blur-lg ${SearchSongs.length === 0 ? "-translate-y-[1200px]" : "translate-y-0"
                } transition-all duration-500 ease-linear`}
        >
            {SearchSongs?.map((song) => (
                <SongItem key={song.id} {...song} />
            ))}
        </div>
    );
};

export default SearchSection;