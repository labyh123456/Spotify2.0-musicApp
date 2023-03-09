import React, { useEffect, useState } from "react";
import { BuildingLibraryIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, PlusIcon, RssIcon } from '@heroicons/react/24/outline'
import { } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react';
import  useSpotify  from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState, isInput } from '../Atoms/PlaylistAtom';
function SidebarForMobile() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    const [input, setInput] = useRecoilState(isInput);
    console.log("You Picked playlist >>", playlistId);
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });

        }

    }, [session,spotifyApi]);
   
  return (
    <div className= "sm:min-w-[12rem] lg:min-w-[15rem]  text-gray-500 p-5 bg-black text-xs lg:text-sm border-r border-gray-900 font-bold overflow-y-scroll  scrollbar-hide  z-10">
      <div className='space-y-4 overflow-y-scroll max-h-[400px] scrollbar-hide'>
      {/* <button className="flex items-center space-x-2 hover:text-white" onClick={()=> signOut()}>
                  <HomeIcon className="h-5 w-5"  />
                  
                  <p>Logout</p>
              </button> */}
              <a href="#" className="">
              <img className="h-[60px] mr-auto" 
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="spotify-logo"
                  />
                  </a>

        <button className="flex items-center space-x-2 hover:text-white">
                  <HomeIcon className="h-5 w-5" />
                  
                  <p>Home</p>
              </button>
    
              
              <button className="flex items-center space-x-2 hover:text-white" onClick={() => {setInput(true)}}>
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  
                  <p>Search</p>
              </button>


              <button className="flex items-center space-x-2 hover:text-white">
                  <BuildingLibraryIcon className="h-5 w-5" />
                  
                  <p>Your library</p>
              </button>

              <hr className="border-t-[0.1px] border-gray-900" />

              <button className="flex items-center space-x-2 hover:text-white">
                  <PlusCircleIcon className="h-5 w-5" />
                  
                  <p>Create Playlist</p>
              </button>

              <button className="flex items-center space-x-2 hover:text-white">
                  <HeartIcon className="h-5 w-5" />
                  
                  <p>Linked Songs</p>
              </button>
    
              
              <button className="flex items-center space-x-2 hover:text-white">
                  <RssIcon className="h-5 w-5" />
                  
                  <p>Your episodes</p>
              </button>

              <hr className="border-t-[0.1px] border-gray-900" />

              {/* PlayLists */}
              {playlists.map((playlist) => (
                  <p key={playlist.id}  onClick={() => setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white">
                      {playlist.name}
                </p>  
              ))}
      </div>
    </div>
  );
}

export default SidebarForMobile;
