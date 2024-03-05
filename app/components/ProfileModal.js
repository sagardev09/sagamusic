import { useAppContext } from '@/context/GlobalContext'
import React from 'react'

const ProfileModal = () => {
    const { setIsProfileModal, user, UserDetails } = useAppContext()
    return (
        <div className='w-[500px] h-[300px] rounded-lg shadow-lg bg-red-100'>
            <div
                onClick={() => setIsProfileModal(false)}
                className='float-right p-2 m-3 h-8 w-8 text-white cursor-pointer rounded-full bg-red-500 flex items-center justify-center'>X</div>
            <div>
                <img src="" alt="" />
            </div>
            <div>
                <input type="text" name="" className='text-black' value={UserDetails?.name} id="" />
            </div>
        </div>
    )
}

export default ProfileModal