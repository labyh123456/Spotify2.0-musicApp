import React from "react";
import Sidebar from "./../components/Sidebar";
import Player from "./../components/Player";
import Center from "../components/Center";
import SearchedSongs from "../components/SearchedSongs";
const search = () => {
  return (
    <div className="bg-black h-screen  overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center search={true} />
      </main>

      {/* <section>
        <SearchedSongs />
      </section> */}

      {/* <div className="sticky bottom-0 z-30">
        <Player />
      </div> */}
    </div>
  );
};

export default search;

export async function getServerSideProps() {
  return {
    props: {
      // todos:value
    },
  };
}
