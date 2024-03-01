"use client"
import SongList from '@/app/components/SongList'
import { useAppContext } from '@/context/GlobalContext'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Album = ({ params }) => {

    const { songs, setsongs } = useAppContext()

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
        <div className='flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-24 h-screen my-48 lg:my-0 mx-2 lg:mx-auto  w-[80vw]'>
            <div className=''>
                <div className=''>
                    <img src={songimg} alt={Album.name} className='mx-auto mb-4 h-[250px] w-[250px] rounded-full object-cover' />
                </div>
                <div>
                    <h1>Album Name :{Album.name}</h1>
                    <p>By {Album.primaryArtists} . {Album.songCount} Songs</p>
                </div>
            </div>
            <div className='py-2'>
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