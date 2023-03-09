import {
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { playlistIdState } from "../Atoms/PlaylistAtom";
import Songs from "./Songs";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState, isInput } from "../Atoms/PlaylistAtom";
import { isSearched } from "../Atoms/SearchSongAtom";
import SearchedSongs from "../components/SearchedSongs";
import useSpotify from "../hooks/useSpotify";
import SidebarForMobile from "./SidebarForMobile";
import HomeScreen from "./HomeScreen";
import { signOut } from "next-auth/react";
const HomeScreenSongs = [
  {
    img: "https://i.scdn.co/image/ab67616d0000b2734697d4ee22b3f63c17a3b9ec",
    title: "Kahani Suni",
  },
  {
    img: "https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/XOgdTzRIvvKqNX7tmVF7SuShcpzGy9RE_uU8xgDrHr8L1NaN1owRrCSmXa8vnVmb-0AaQge41veSfQ6q9h-_C5DkbnBxJ8x3Bpt1XpQ9Z7w=/MzA6MjM6MjJUNDAtMjAtMw==",
    title: "Discover Weekly",
  },
  {
    img: "https://i.scdn.co/image/ab67616d0000b273a75c2f26913099a420050f01",
    title: "Lambiyan Raatan",
  },
  {
    img: "https://i.scdn.co/image/ab67616d0000b2737d5255cebc2d7723eb80131f",
    title: "Qasmat 2",
  },
  {
    img: "https://i.scdn.co/image/ab67616d0000b27361a438f3c82f1b9ebc1ae0c8",
    title: "Tera Ghata",
  },
  {
    img: "https://i.scdn.co/image/ab67706c0000bebbde316c7d6a6b46a4afb13d27",
    title: "Slowed & Reverb",
  },
];

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center({ search }) {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlists, setPlaylists] = useRecoilState(playlistState);
  const [input, setInput] = useRecoilState(isInput);
  const [isSearch, setIsSearch] = useRecoilState(isSearched);
  const [toogle, setToggle] = useState(false);
  const [SearchedAlbums, setSearchAlbum] = useState([]);
  const [searchArtists, setSearchArtists] = useState([]);
  const [hamBurgerOpen, setHamBurgerOpen] = useState(false);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop());
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylists(data.body);
      })
      .catch((error) => console.log("SomeThing Went Wrong", error));

    spotifyApi
      .getMyTopTracks()
      .then((data) => {
        setSearchAlbum(
          data.body.items.map((art) => {
            const smallestAlbumImage2 = art.album.images.reduce(
              (smallest, image) => {
                if (image.height > smallest.height) return image;
                return smallest;
              },
              art.album.images[0]
            );

            function sea() {
              const result = art.artists.map((a) => a.name);
              return result;
            }
            return {
              name: art.name,
              uri: art.uri,
              img: smallestAlbumImage2.url,
              // date: art.release_date.split("-")[0],
              // singer: sea().join(", "),
            };
          })
        );
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });

    // get top track if there
    spotifyApi.getNewReleases({ limit: 5, offset: 0, country: "PK" }).then(
      function (data) {
        setSearchArtists(
          data.body.albums.items.map((art) => {
            const smallestAlbumImage2 = art.images.reduce((smallest, image) => {
              if (image.height > smallest.height) return image;
              return smallest;
            }, art.images[0]);
            function sea() {
              const result = art.artists.map((a) => a.name);
              return result;
            }
            return {
              name: art.name,
              uri: art.uri,
              img: smallestAlbumImage2.url,
              // date: art.release_date.split("-")[0],
              singer: sea().join(", "),
            };
          })
        );
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [spotifyApi, playlistId]);

  // console.log("artusts", searchArtists);
  return (
    <div className="flex flex-col flex-grow overflow-y-scroll scrollbar-hide h-screen">
      <header className="absolute top-0 w-[100%] md:w-[80%]  py-2">
        <div className="flex justify-between mt-2 pl-8 pr-2 items-center">
          <div className="flex space-x-0 md:space-x-8 items-center md:items-center ">
            <div className="circle">
              <ChevronLeftIcon className="w-5 h-5 text-white" />
            </div>
            <div className="circle mr-8">
              <ChevronRightIcon className="w-5 h-5 text-white" />
            </div>

            {/* Mobile Menu */}

            {search && (
              <>
                <div className=" flex items-center h-10 w-[300px] px-2 py-2 rounded-full bg-white">
                  <MagnifyingGlassIcon className="w-6 h-6 mr-4 cursor-pointer" />
                  <input
                    className="focus:outline-none"
                    type="text"
                    onChange={(e) => setIsSearch(e.target.value)}
                  />
                </div>{" "}
              </>
            )}
          </div>

          {session?.user ? (
            <div
              className="flex items-center opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1  bg-gray-900 text-white"
              onClick={() => setToggle(!toogle)}
            >
              <img
                src={session?.user.image}
                className="rounded-full w-8 h-8 object-cover"
                alt=""
              />
              <h2 className="hidden md:block ml-2 mr-2">
                {session?.user.name}
              </h2>
              {toogle ? (
                <ChevronUpIcon className="hidden md:block  h-5 w-5" />
              ) : (
                <ChevronDownIcon className="hidden md:block  h-5 w-5" />
              )}
            </div>
          ) : (
            <button className="bg-teal-500 text-white font-semibold rounded-lg p-2">
              <a href="/login">Login</a>
            </button>
          )}
        </div>
      </header>

      <button
        className="text-white mt-20 hamburger text-left block md:hidden  pl-8"
        onClick={() => setHamBurgerOpen(!hamBurgerOpen)}
      >
        <span className="hamburger-top"></span>
        <span className="hamburger-middle"></span>
        <span className="hamburger-bottom"></span>
      </button>

      {/* {menu Items} */}

      {/* <div className="absolute left-0 top-20 pt-4 z-50">
        {hamBurgerOpen && <SidebarForMobile />}
      </div> */}

      {/* just show */}

      {toogle && (
        <div className="absolute top-20 right-10 flex flex-col text-white space-y-4 bg-gray-700 z-50">
          <div className="flex justify-between min-w-[160px] bg-gray-700 hover:bg-gray-500 px-4 py-2">
            <span>Account</span>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </div>

          <div className="flex justify-between min-w-[160px] bg-gray-700 hover:bg-gray-500 px-4 py-2">
            <span>Profile</span>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </div>

          <div className="flex justify-between min-w-[160px] bg-gray-700 hover:bg-gray-500 px-4 py-2">
            <span className="">upgrade to premium</span>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </div>

          <div className="flex justify-between min-w-[160px] bg-gray-700 hover:bg-gray-500 px-4 py-2">
            <span className="">Support</span>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </div>

          <div className="flex justify-between min-w-[160px] bg-gray-700 hover:bg-gray-500 px-4 py-2">
            <span>Medium</span>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </div>

          <div
            className="flex cursor-pointer justify-between min-w-[160px] bg-gray-700 hover:bg-gray-500 px-4 py-2"
            onClick={() => signOut()}
          >
            <span className="">Logout</span>
            {/* <ArrowTopRightOnSquareIcon className='w-5 h-5' /> */}
          </div>
        </div>
      )}

      {search ? (
        <SearchedSongs />
      ) : (
        <>
          {playlistId && (
            <>
              <section
                className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} w-[100%] h-80 p-8 pt-16 text-white`}
              >
                <img
                  className="w-44 h-44 shadow-2xl"
                  src={playlists?.images[0]?.url}
                  alt=""
                />

                <div>
                  <p>PLAYLIST</p>
                  <h1 className="text-2xl md:text-3xl lg:text-5xl">
                    {playlists?.name}
                  </h1>
                </div>
              </section>
              <div className="">
                <Songs />
              </div>
            </>
          )}
          {!playlistId && (
            <HomeScreen
              data={HomeScreenSongs}
              toptracks={SearchedAlbums}
              topArtists={searchArtists}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Center;
