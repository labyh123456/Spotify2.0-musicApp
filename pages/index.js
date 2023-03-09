import Head from "next/head";
import Sidebar from "./../components/Sidebar";
import Player from "./../components/Player";
import Center from "../components/Center";
import Announc from "../components/Announc";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
export default function Home() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        // console.log("ddddd");
        handleShow(true);
        alert("dd");
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  return (
    <div className="bg-black h-screen ">
      <main className="flex">
        <Announc />
        <Sidebar />
        <Center search={false} />
      </main>

      <div className="sticky bottom-0 z-30">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
