import React from 'react';
import Link from 'next/link';

const AlbumCard = ({ name, artists, id, image }) => {
    const extractedName = name.match(/^(.*?)\s*\([^)]*\)/);
    const displayName = extractedName ? extractedName[1].trim() : name;

    return (
        <Link href={`/Album/${id}`}>
            <div className='lg:w-[240px] lg:h-[280px] md:w-[280px]  md:h-[280px] sm:h-[200px] sm:w-[200px] overflow-y-clip flex flex-col group justify-center gap-3 items-center rounded-lg'>
                <div className='h-[180px] shadow-md rounded-full w-[180px] relative flex items-center justify-center group-hover:animate-spin-slow'>
                    <img src={image[2].link} className='rounded-full h-full w-full  object-contain' alt="" />
                    <span className='absolute left-1/2 top-1/2 h-[50px] w-[50px] rounded-full bg-black translate-x-[-50%] translate-y-[-50%] z-10'></span>
                    <span className='absolute h-[35px] w-[35px] rounded-full left-1/2 top-1/2 bg-white translate-x-[-50%] translate-y-[-50%] z-20'></span>
                </div>
                <div className='text-[13px] w-full flex flex-col items-center justify-center gap-1'>
                    <span className='text-gray-600 font-semibold overflow-x-clip text-center'>{displayName}</span>
                    <p className='font-thin text-gray-500 overflow-y-clip h-[50px]'>
                        {artists.slice(0, 1).map((item, index) => (
                            index < 1 ? `${item.name}, ` : index === 1 ? `${item.name}...` : null
                        ))}
                    </p>

                </div>
            </div>
        </Link>
    );
};

export default AlbumCard;
