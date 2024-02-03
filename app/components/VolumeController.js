import React from 'react'

const VolumeController = ({ isvolumevisible }) => {
    return (
        <div className={`${isvolumevisible ? "" : "hidden"} w-[80px] absolute -rotate-90 bottom-20 -right-3 shadow-md px-2 rounded-lg bg-gray-100`}>
            <input type="range" min={0} max={100} step={0.1} value={0} className='h-[5px] text-indigo-500 range' />
        </div>
    )
}

export default VolumeController