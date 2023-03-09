import React from "react";
import { useRecoilState } from "recoil";
import { format } from "timeago.js";
import useSpotify from "../hooks/useSpotify";
import { currentTrackIdState, isPlayingState } from "../Atoms/SongAtom";
import SpotifyWebApi from "spotify-web-api-node";
function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    console.log("s", track.track.uri);
    // spotifyApi.play({
    //     uris: [track.track.uri],

    // })

    spotifyApi
      .searchTracks("hea")
      .then((res) => {
        console.log("res", res.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function truncateText(text) {
    return text.substring(0, 30) + "...";
  }
  return (
    <div className="grid grid-cols-2 gap-x-0 md:grid-cols-5 space-y-8 hover:bg-gray-800 md:gap-x-8">
      <div
        className="flex items-center space-x-4  md:col-span-2 "
        onClick={playSong}
      >
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />
        <div>
          <p className="">{truncateText(track.track.name)}</p>
          <p className="text-[12px] text-gray-500">
            {truncateText(track.track.artists[0].name)}
          </p>
        </div>
      </div>

      {/* <div className='flex items-center justify-between'> */}
      <p className="hidden p-0 md:inline align-middle  text-gray-300 text-[14px]">
        {truncateText(track.track.album.name)}
      </p>

      <p className="hidden md:inline text-gray-300 text-[14px]">
        {format(track.added_at)}
      </p>
      <div>
        <p className="">{"Duration"}</p>
      </div>
      {/* </div> */}
    </div>
  );
}

export { Song };
