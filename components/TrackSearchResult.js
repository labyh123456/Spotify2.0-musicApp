import { HeartIcon } from '@heroicons/react/24/outline'
import { millisToMinutesAndSeconds } from '../lib/time'
const TrackSearchResult = ({ track }) => {
  function truncateText(text) {
    if (text.length > 30) { return text.substring(0, 30) + '...'; }
    else return text;
}
  return (
      <div className='flex group space-x-2 items-center justify-between px-2 group-hover:bg-gray-700 hover:bg-gray-700 rounded-sm space-y-5 py-1'>
          <div className='flex items-center'>
          <img src={track.albumUrl} className="h-10 w-10 mr-2" alt="" />
          <div>
              <p>{truncateText(track.title)}</p>
              <p>{truncateText(track.artist)}</p>
          </div>
          </div>
          <div className='flex justify-center items-center space-x-5'>
              <HeartIcon className='hidden group-hover:flex text-white h-5 w-5' />
              <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
            </div>
          </div>
      
  )
}

export default TrackSearchResult