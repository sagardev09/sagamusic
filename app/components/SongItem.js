import { useAppContext } from "@/context/GlobalContext";

const SongItem = ({
    name,
    image,
    duration,
    downloadUrl,
    id,
    primaryArtists,
}) => {
    const { playMusic } = useAppContext()

    return (
        <div className="lg:w-[160px] lg:max-h-[220px] w-[120px] max-h-[180px] overflow-y-clip flex flex-col justify-center items-center gap-3 rounded-lg mb-0">
            <div>
                <img
                    src={image[2].link}
                    alt=""
                    className="rounded-lg cursor-pointer"
                    onClick={() =>
                        playMusic(downloadUrl, name, duration, image, id, primaryArtists)
                    }
                />
            </div>
            <div className=" w-full flex flex-col justify-center items-center h-[50px]">
                <span className="overflow-x-clip text-center font-thin text-xs">{name}</span>
            </div>
        </div>
    );
};

export default SongItem;