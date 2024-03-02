"use client"
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/GlobalContext";
import AlbumCard from "./components/AlbumCard";
import axios from "axios";

export default function Home() {

  const { fetchMusicHomePage, homemusic, trending, albums, setSearchSongs, } = useAppContext()
  useEffect(() => {
    fetchMusicHomePage()
    console.log(homemusic);
  }, [])

  const SearchSong = async (e) => {
    if (e.target.value.trim() === "") { // Check if the input value is empty after trimming whitespace
      setSearchSongs([]);
      return; // Exit the function early if the input is empty
    }
    try {
      const res = await axios.get(`https://saavn.dev/search/songs?query=${encodeURIComponent(e.target.value.trim())}`);
      const { data } = res.data;

      if (data.results.length === 0) {
        setSearchSongs([]);
      } else {
        setSearchSongs(data.results);
      }

      console.log(data.results);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
      // Handle error as needed, for example, display an error message to the user
    }
  }


  return (
    <main className="p-4 h-screen overflow-y-auto overflow-hidden mx-auto py-16 relative ">
      <div className="absolute lg:right-4 right-0 top-3 lg:w-[400px] w-full">
        <label for="Search" class="sr-only"> Search </label>
        <input
          type="text"
          id="Search"
          placeholder="Search for..."
          autoComplete="off"
          autoCorrect="off"
          onChange={SearchSong}
          class="lg:w-[400px] w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm px-3 border"
        />

        <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" class="text-gray-600 hover:text-gray-700">
            <span class="sr-only">Search</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>

      </div>
      <h1 className="text-2xl font-bold">Trending</h1>
      <div className="flex items-center md:justify-start justify-between flex-wrap gap-2 py-3 mx-auto w-full">
        {
          trending?.albums?.map((item, index) => {
            return (
              <div key={index} className=" mx-auto">
                <AlbumCard  {...item} />
              </div>
            )
          })
        }
      </div>
      <h1 className="text-2xl font-bold">Albums</h1>
      <div className="flex items-center flex-wrap md:justify-start justify-between gap-2 py-3 mx-auto w-full">
        {
          albums?.map((item, index) => {
            return (
              <div key={index} className="mx-auto">
                <AlbumCard  {...item} />
              </div>
            )
          })
        }
      </div>


    </main>
  );
}
