import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import SpotifyApi from "../lib/Spotify";
// const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
//     clientSecret:process.env.NEXT_PUBLIC_CLIENT_SECRET,
// });

function useSpotify() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      if (session?.error === "RefreshAccessTokenError") {
        signIn();
        console.log("eedd", session);
      }

      SpotifyApi.setAccessToken(session.user.accessToken);
      console.log("dddd", session.user.accessToken);
    }
  }, [session]);
  return SpotifyApi;
}

export default useSpotify;
