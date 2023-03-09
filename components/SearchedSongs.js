import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isSearched } from "../Atoms/SearchSongAtom";
import useSpotify from "../hooks/useSpotify";
import BrowseCategory from "../components/BrowseCategory";
import TrackSearchResult from "./TrackSearchResult";
import Artists from "./Artists";
import Playlist from "./Playlist";
import SearchedAlbum from "./SearchedAlbum";
import SearchedCategory from "./SearchedCategory";
const colors = [
  "bg-red-500",
  "bg-blue-700",
  "bg-green-700",
  "bg-gray-500",
  "bg-yellow-600",
  "bg-pink-300",
  "bg-purple-700",
  "bg-orange-700",
  "bg-cyan-500",
  "bg-indigo-400",
  "bg-red-500",
];

const SearchedSongs = () => {
  const [response, setResponse] = useState([]);
  const [searchResults, setSearchResults] = useRecoilState(isSearched);
  const [searchArtists, setSearchArtists] = useState([]);
  const [searchPlaylists, setSearchPlaylists] = useState([]);
  const [searchAlbum, setSearchAlbum] = useState([]);
  const spotifyApi = useSpotify();
  console.log(response);
  useEffect(() => {
    //Extra Checking if user is login or have token
    let cancel = false;
    spotifyApi
      .searchTracks(searchResults)
      .then((res) => {
        if (cancel) return;
        setResponse(
          res.body.tracks.items.map((track) => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
              duration_ms: track.duration_ms,
            };
          })
        );
        // console.log('res',res.body)
      })
      .catch((err) => {
        console.log(err);
      });

    // search artists
    spotifyApi
      .searchArtists(searchResults)
      .then((res) => {
        if (cancel) return;
        console.log("sss", res.body);
        setSearchArtists(
          res.body.artists.items.map((art) => {
            const smallestAlbumImage2 = art.images.reduce((smallest, image) => {
              if (image.height > smallest.height) return image;
              return smallest;
            }, art.images[0]);
            return {
              name: art.name,
              uri: art.uri,
              img: smallestAlbumImage2.url,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });

    //         // Search playlists whose name or description contains 'workout'
    // spotifyApi.searchPlaylists(searchResults)
    // .then(function(data) {
    //   console.log('Found playlists are', data.body);
    // }, function(err) {
    //   console.log('Something went wrong!', err);
    // });
    spotifyApi
      .searchPlaylists(searchResults)
      .then((res) => {
        if (cancel) return;
        console.log("playslits", res.body);
        setSearchPlaylists(
          res.body.playlists.items.map((art) => {
            const smallestAlbumImage2 = art.images.reduce((smallest, image) => {
              if (image.height > smallest.height) return image;
              return smallest;
            }, art.images[0]);
            return {
              name: art.name,
              uri: art.uri,
              img: smallestAlbumImage2.url,
              owner: art.owner.display_name,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });

    spotifyApi.getMyTopTracks().then(
      function (data) {
        let topTracks = data.body.items;
        console.log("top tracks", topTracks);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );

    // spotifyApi.searchAlbums('Love')
    // .then(function(data) {
    //   console.log('Search album by "Love"', data.body);
    // }, function(err) {
    //   console.error(err);
    // });

    spotifyApi
      .searchAlbums(searchResults)
      .then((res) => {
        if (cancel) return;
        console.log("playslits", res.body);
        setSearchAlbum(
          res.body.albums.items.map((art) => {
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
              date: art.release_date.split("-")[0],
              singer: sea().join(", "),
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });

    return () => (cancel = true);
  }, [searchResults]);

  function truncateText(text) {
    if (text?.length > 26) {
      return text.substring(0, 26) + "...";
    } else return text;
  }
  return (
    <div className="min-h-screen mt-10 pb-10 md:mt-20 text-white overflow-y-scroll scrollbar-hide">
      {searchResults && (
        <>
          <div className="sticky top-0 left-0 w-full  blackish z-50 flex space-x-4 px-8 py-2 items-center justify-start">
            <SearchedCategory name="All" />
            <SearchedCategory name="Artists" />
            <SearchedCategory name="Songs" />
            <SearchedCategory name="Geners Modes" />
            <SearchedCategory name="Playlist" />
            <SearchedCategory name="Albums" />
            <SearchedCategory name="Prodcast & shows" />
            <SearchedCategory name="Profiles" />
          </div>
          {/* <div className="min-h-screen overflow-scroll"> */}
          <div className="flex px-8 py-10 flex-wrap  items-center flex-wrap w-full space-y-8   md:space-y-0 md:space-x-3">
            <div className="w-[80%] md:w-[40%]">
              <h1 className="font-bold text-[1.5rem] capitalize mb-2">
                Top Results
              </h1>
              {/* #0d0d10 */}
              <div className="h-[200px] rounded-sm blackish">
                <div className="flex flex-col items-start  px-2 py-4 space-y-2">
                  <img
                    src={response[0]?.albumUrl}
                    className="h-20 w-20"
                    alt=""
                  />

                  <h1 className="font-bold text-white text-[25px]">
                    {truncateText(response[0]?.title)}
                  </h1>

                  <p className="text-gray-400">
                    {truncateText(response[0]?.artist)}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[80%] md:w-[55%]">
              <h1 className="font-bold text-[1.5rem] capitalize mb-2">
                Top Songs
              </h1>
              <div className="max-h-[200px] overflow-y-scroll scrollbar-hide">
                {response.map((track) => (
                  <TrackSearchResult track={track} key={track.uri} />
                ))}
              </div>
            </div>
          </div>
          {/* </div> */}
        </>
      )}
      {!searchResults && (
        <>
          <div className="mt-16 pb-16 px-4 md:px-12 ">
            <h1 className="text-[2rem] font-bold">Browse All</h1>
            <div className="mt-2 pb-4 custom-grid">
              <BrowseCategory
                color={colors[0]}
                text={"2022 Wrapped"}
                img={
                  "https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
              />
              <BrowseCategory
                color={colors[1]}
                text={"Made For You"}
                img={
                  "https://images.pexels.com/photos/556414/pexels-photo-556414.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                }
              />
              <BrowseCategory
                color={colors[2]}
                text={"New Release"}
                img={
                  "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
              />
              <BrowseCategory
                color={colors[3]}
                text={"Desi"}
                img={
                  "https://images.pexels.com/photos/534210/pexels-photo-534210.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                }
              />
              <BrowseCategory
                color={colors[4]}
                text={"Pop"}
                img={
                  "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
              />
              <BrowseCategory
                color={colors[5]}
                text={"Hip Hop"}
                img={
                  "https://images.pexels.com/photos/541484/sun-flower-blossom-bloom-pollen-541484.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                }
              />
              <BrowseCategory
                color={colors[6]}
                text={"Punjabi"}
                img={
                  "https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
              />
              <BrowseCategory
                color={colors[10]}
                text={"Live Events"}
                img={
                  "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
              />
              <BrowseCategory
                color={colors[7]}
                text={"Equal"}
                img={
                  "https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=600"
                }
              />
              <BrowseCategory
                color={colors[8]}
                text={"Forie Appr"}
                img={
                  "https://images.pexels.com/photos/1490844/pexels-photo-1490844.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
              />
              <BrowseCategory
                color={colors[9]}
                text={"Fashion Wth"}
                img={
                  "https://images.pexels.com/photos/668295/pexels-photo-668295.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
              />
            </div>
          </div>
        </>
      )}

      {/* { Searched Artists} */}
      {searchResults && (
        <>
          <div className="px-8 py-4">
            <h1 className="font-bold text-[1.5rem] capitalize mb-4 lg:text-center">
              Artists
            </h1>
            <div className="flex lg:mt-8 md:space-x-5 flex-wrap md:flex-nowrap lg:justify-evenly">
              {searchArtists.slice(0, 5).map((artist) => (
                <Artists artist={artist} key={artist.uri} />
              ))}
            </div>
          </div>

          {/* Searched Playlists */}
          <div className="px-8 py-2">
            <h1 className="font-bold text-[1.5rem] capitalize mb-4 lg:text-center ">
              Playlists
            </h1>
            <div className="flex lg:mt-8 md:space-x-5 flex-wrap md:flex-nowrap lg:justify-evenly">
              {searchPlaylists.slice(0, 5).map((artist) => (
                // console.log('dd', artist)
                <Playlist artist={artist} key={artist.uri} />
              ))}
            </div>
          </div>

          {/* Searched Albums */}
          <div className="px-8 py-2 pb-8">
            <h1 className="font-bold text-[1.5rem] text-center md:text-start capitalize mb-4 lg:text-center">
              Albums
            </h1>
            <div className="flex lg:mt-8 md:space-x-5 flex-wrap md:flex-nowrap lg:justify-evenly">
              {searchAlbum.slice(0, 5).map((artist) => (
                // console.log('dd', artist)
                <SearchedAlbum artist={artist} key={artist.uri} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchedSongs;
