"use client"
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/GlobalContext";
import AlbumCard from "./components/AlbumCard";

export default function Home() {

  const { fetchMusicHomePage, homemusic, trending, albums } = useAppContext()
  useEffect(() => {
    fetchMusicHomePage()
    console.log(homemusic);
  }, [])

  return (
    <main className="p-4 h-screen overflow-y-auto overflow-hidden mx-auto ">
      <h1 className="text-2xl font-bold">Trending</h1>
      <div className="flex items-center justify-start flex-wrap gap-4 py-3">
        {
          trending?.albums?.map((item, index) => {
            return (
              <AlbumCard key={index} {...item} />
            )
          })
        }
      </div>
      <h1 className="text-2xl font-bold">Albums</h1>
      <div className="flex items-center flex-wrap justify-start gap-6 py-3">
        {
          albums?.map((item, index) => {
            return (
              <AlbumCard key={index} {...item} />
            )
          })
        }
      </div>


    </main>
  );
}
