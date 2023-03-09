import { PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'

const Playlist = ({ artist }) => {
  function truncateText(text) {
    if (text?.length > 18) {
      return text.substring(0, 15) + "...";
    } else return text;
  }
  return (
      <div className='pb-4 group relative duration-700 bg-lightCard  hover:bg-slate-900 mb-12 flex flex-col blackish-card max-h-[350px] rounded-md'>
          <div className=' flex flex-col w-[190px] h-[190px] p-4'>
            <div className='w-full h-[100%]'>
                  <img className='w-full h-full object-cover' src={artist.img} alt="" />
                  </div>
          </div>
          <h1 className='px-4 font-bold text-md'>{truncateText(artist.name)}</h1>
      <p className='px-4 text-gray-400 font-sm'>{truncateText(artist.owner)}</p>
          <PlayCircleIcon className='hidden button text-green-600 rounded-full bg-black group-hover:flex absolute top-24 bottom-8 right-4 align-middle  w-12 h-12' />
          </div>
  )
}

export default Playlist