// import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../Atoms/PlaylistAtom';
import {Song}  from './Song';
function Songs() {
    
  const playlist = useRecoilValue(playlistState);
  console.log('song', playlist);

    return (
      <div className='px-8 flex flex-col space-y-1 pb-2 text-white'>
            {playlist?.tracks.items.map((track, i) => (
              // <div>{track.track.name}</div>
              <Song key={track.track.id} track={track} order={i} />
            ))}    
    </div>
  )
}

export default Songs