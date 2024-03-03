"use client"
import SongList from '@/app/components/SongList'
import { useAppContext } from '@/context/GlobalContext'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation'

const Album = ({ params }) => {

    const { songs, setsongs } = useAppContext()
    const router = useRouter()

    const [Album, setAlbum] = useState([])
    const [songimg, setsongimg] = useState([])

    const getImg = (img) => {
        return img = img[2].link
    }

    useEffect(() => {
        const fetchmusics = async () => {
            const res = await axios.get(`https://saavn.dev/albums?id=${params?.id}`)
            const { data } = await res.data
            setsongs(data.songs)
            setAlbum(data)
            setsongimg(getImg(data.image))
            console.log(data);
        }
        fetchmusics()
    }, [params.id])

    return (
        <div className='flex flex-col  lg:flex-row justify-center items-center gap-8 lg:gap-24
         h-screen  lg:pb-20  lg:py-56 pb-[170px] lg:pt-0 pt-[80px] lg:my-0  lg:px-10 px-2  lg:mx-auto  overflow-x-hidden overflow-y-scroll lg:w-[80vw]
          w-[100vw] relative'>
            <div className='absolute h-[50px] w-[50px] flex items-center justify-center top-4 left-4 shadow-2xl rounded-full bg-gray-100 hover:bg-gray-200'
                onClick={() => router.back()}>
                <FaArrowLeft />
            </div>
            <div className='flex lg:flex-row flex-col items-center justify-center text-center gap-4 '>
                <div className='h-[250px] w-[250px]'>
                    <img src={songimg} alt={Album.name} className='mx-auto h-full w-full  rounded-full object-cover' />
                </div>
                <div>
                    <h1 className='font-thin text-lg'>Album Name :{Album.name}</h1>
                    <p className='font-extralight text-xs'>By {Album.primaryArtists} <br /> {Album.songCount} Songs</p>
                </div>
            </div>
            <div className='lg:py-2 pt-2 h-[60vh] overflow-x-hidden overflow-y-scroll shadow-lg'>
                {
                    Album.songs?.map((item, index) => {
                        return (
                            <SongList key={item.id} {...item} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Album