"use client"
import axios from 'axios'
import React, { useEffect } from 'react'

const Album = ({ params }) => {

    useEffect(() => {
        const fetchmusics = async () => {
            const res = await axios.get(`https://saavn.me/albums?id=${params?.id}`)
            const { data } = await res.data
            console.log(data);
        }
        fetchmusics()
    }, [params.id])

    return (
        <div>Album{params.id}</div>
    )
}

export default Album