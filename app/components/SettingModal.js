"use client"
import { useAppContext } from '@/context/GlobalContext'
import React from 'react'

const SettingModal = () => {
    const { setIsProfileModal } = useAppContext()
    return (
        <div>
            <div class="relative">
                <div
                    class=" z-10 mt-2 w-[300px] divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                    role="menu"
                >
                    <div class="p-2">
                        <strong class="block p-2 text-xs font-medium uppercase text-gray-400"> General Setting </strong>

                        <div
                            onClick={() => setIsProfileModal(true)}
                            class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"

                        >
                            Edit Profile
                        </div>

                        <div

                            class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"

                        >
                            Favourite Songs
                        </div>

                        <div

                            class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"

                        >
                            Favourite Playlist
                        </div>

                        <div

                            class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"

                        >
                            Guide
                        </div>
                        <div

                            class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"

                        >
                            Help Center
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingModal