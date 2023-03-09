import { useSession } from "next-auth/react";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../Atoms/SongAtom";
import { debounce } from "lodash";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  ReplyIcon,
  SwitchHorizontalIcon,
  ArrowsRightLeftIcon,
  BackwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  ForwardIcon,
  ArrowPathRoundedSquareIcon,
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";

function Player() {
  const SpotifyAPI = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  //   const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      SpotifyAPI.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);
        console.log("Now Playing ", data.body?.item);
        SpotifyAPI.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    SpotifyAPI.getMyCurrentPlaybackState().then((data) => {
      console.log("data", data);
      if (data.body.is_playing) {
        SpotifyAPI.pause();
        setIsPlaying(false);
      } else {
        SpotifyAPI.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (SpotifyAPI.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, SpotifyAPI, session]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      SpotifyAPI.setVolume(volume).catch((err) => {});
    }, 300),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) debouncedAdjustVolume(volume);
  }, [volume]);

  return (
    <div>
      {/* {left} */}
      <div className="h-24 bg-gradient-to-b  from-black to-gray-700 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8  border-t border-gray-800">
        <div className="flex items-center space-x-4">
          <img
            className="hidden md:inline h-10 w-10"
            src={songInfo?.album.images?.[0]?.url}
            alt=""
          />
          <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists?.[0].name}</p>
          </div>
        </div>

        {/* {Center} */}

        <div className="flex items-center justify-evenly">
          <ArrowsRightLeftIcon className="button" />
          <BackwardIcon
            className="button" /*onClick={() => spotifyApi.skipToPrevious()} -- the api is not working */
          />

          {isPlaying ? (
            <PauseCircleIcon
              className="button w-10 h-10"
              onClick={() => {
                setIsPlaying(false);
              }}
            />
          ) : (
            <PlayCircleIcon
              className="button w-10 h-10"
              onClick={() => {
                setIsPlaying(true);
              }}
            />
          )}

          <ForwardIcon className="button" />
          <ArrowPathRoundedSquareIcon className="button" />
        </div>

        {/* <PlayHandler /> */}
        {/* {Right} */}
        <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
          <SpeakerXMarkIcon
            className="button"
            onClick={(e) => volume > 0 && setVolume(volume - 10)}
          />
          <input
            type="range"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            min={0}
            max={100}
          />
          <SpeakerWaveIcon
            className="button"
            onClick={(e) => volume < 100 && setVolume(volume + 10)}
          />
        </div>
      </div>
    </div>
  );
}

export default Player;
