import { PlayCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import SearchedAlbum from "./SearchedAlbum";
import useSpotify from "../hooks/useSpotify";
import Artists from "./Artists";
const HomeScreen = ({ data, toptracks, topArtists }) => {
  const [SearchedAlbums, setSearchAlbum] = useState([]);
  const [searchArtists, setSearchArtists] = useState([]);
  const spotifyApi = useSpotify();
  const [isLoading, setIsLoding] = useState(true);

  const tempTopTrack = [
    {
      name: "Pasoori",
      uri: "spotify:track:7lvDsmTRXFE3dK4OjvRiWB",
      img: "https://i.scdn.co/image/ab67616d0000b2733f3d35703bdcd917dad51c4f",
    },
    {
      name: "Jo Tu Na Mila",
      uri: "spotify:track:6DefzsWqnwrFrmNVnJxWkS",
      img: "https://i.scdn.co/image/ab67616d0000b273e50a6d11c72c3c11c134e5a0",
    },
    {
      name: "Balam Pichkari",
      uri: "spotify:track:18e3XXYCv4Tx8uUl1mP3CN",
      img: "https://i.scdn.co/image/ab67616d0000b273707ea5b8023ac77d31756ed4",
    },
    {
      name: "Kesariya",
      uri: "spotify:track:4UMIv5jd9gK98a39BQRD9X",
      img: "https://i.scdn.co/image/ab67616d0000b273913edcaccb2268647d0c495b",
    },
    {
      name: "Dil Deewana",
      uri: "spotify:track:6toZIttVTq28b6YprzBeYA",
      img: "https://i.scdn.co/image/ab67616d0000b2736aaaeb0a2f057de6f9074b0a",
    },
    {
      name: "Main Hoon Hero Tera (Armaan Malik Version)",
      uri: "spotify:track:7jDKrOCSA26DfGy3ZAVVoI",
      img: "https://i.scdn.co/image/ab67616d0000b273f4784b225409e357075ffa80",
    },
    {
      name: "Tera Ghata",
      uri: "spotify:track:0JBhoxPKHJc1ZeJrjSt0VO",
      img: "https://i.scdn.co/image/ab67616d0000b27361a438f3c82f1b9ebc1ae0c8",
    },
  ];

  const tempTopArtists = [
    {
      name: "Mehram",
      uri: "spotify:album:1I7fGWBGZzOfsbkxxLGSyq",
      img: "https://i.scdn.co/image/ab67616d0000b273be2b0649006cac70a91380f2",
      singer: "Asfar Hussain, Arooj Aftab",
    },
    {
      name: "Agay Dekh (Pakistan Super League)",
      uri: "spotify:album:6qx1BnOps9ktzb08PEC7kV",
      img: "https://i.scdn.co/image/ab67616d0000b2732c2874e3815e4d8ccf72fca3",
      singer: "Atif Aslam, Aima Baig",
    },
    {
      name: "High",
      uri: "spotify:album:5xo6DC8pajMhzbLxVzTmxP",
      img: "https://i.scdn.co/image/ab67616d0000b27312f02bba975d698976c95c96",
      singer: "The Chainsmokers",
    },
    {
      name: "Tu Jhoom",
      uri: "spotify:album:61yLyqdz6hdZiAHMk4Bxxi",
      img: "https://i.scdn.co/image/ab67616d0000b273778ce20f0ce76fa3050b7558",
      singer: "Abida Parveen, Naseebo Lal",
    },
    {
      name: "DS4EVER",
      uri: "spotify:album:02uWB8Kekadkl3yGBoOOcx",
      img: "https://i.scdn.co/image/ab67616d0000b27314d91ebdd6d7e2931322cc1a",
      singer: "Gunna",
    },
  ];

  useEffect(() => {
    if (toptracks) {
      setIsLoding(false);
      console.log("top", toptracks);
    }
  }, []);

  return (
    <div>
      <div className="mt-20 p-2 min-h-screen overflow-y-scroll scrollbar-hide group-hover:flex pb-28 ">
        <h1 className="mt-2 px-8 text-white font-bold text-[2rem]">
          Good AfterNoon
        </h1>
        <div className="grid mt-4 grid-cols-1   items-center px-4 gap-4 md:grid-cols-3">
          {data?.map((song) => (
            <div className="bg-[#323131] min-h-[80px] flex items-center   group rounded-[.250rem]">
              <img
                src={song.img}
                className="w-[80px] h-[80px] object-cover  rounded-l-[.250rem]"
              />
              <div className="flex px-4 items-center justify-between w-full">
                <h4 className="text-lg font-bold text-white">{song.title}</h4>
                <PlayCircleIcon className="hidden button text-green-500 rounded-full  group-hover:block   w-12 h-12" />
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-white text-[30px] px-8 font-bold mt-8 text-center md:text-start lg:text-center">
          Top Track
        </h1>
        <div className="px-4 mt-8 flex md:space-x-5 flex-wrap md:flex-nowrap text-white space-x-4 mt-4 items-center justify-center md:items-start md:justify-start lg:justify-evenly">
          {/* {isLoading ? (
            <div role="status" className="mx-auto">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) :  */}

          {toptracks.length > 0
            ? tempTopTrack
                ?.slice(0, 5)
                ?.map((artist) => (
                  <SearchedAlbum artist={artist} key={artist.uri} />
                ))
            : tempTopTrack
                ?.slice(0, 5)
                ?.map((artist) => (
                  <SearchedAlbum artist={artist} key={artist.uri} />
                ))}
        </div>
        <h1 className="text-white text-[30px] px-8 font-bold mt-4 text-center md:text-start lg:text-center">
          Top Artists
        </h1>
        <div className="px-4 mt-8 flex md:space-x-5 flex-wrap md:flex-nowrap text-white space-x-4 lg:justify-evenly mt-4 items-center justify-center md:items-start md:justify-start">
          {tempTopArtists.length > 0
            ? tempTopArtists
                .slice(0, 5)
                .map((artist) => <Artists artist={artist} key={artist.uri} />)
            : searchArtists
                .slice(0, 5)
                .map((artist) => <Artists artist={artist} key={artist.uri} />)}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
