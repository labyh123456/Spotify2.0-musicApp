import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

const Artists = ({ artist }) => {
  return (
    <div className="pb-4 group relative duration-700 bg-lightCard  hover:bg-slate-900 mb-12 flex flex-col blackish-card max-h-[350px]  rounded-md">
      <div className=" flex flex-col w-[190px] h-[190px] p-4">
        <div className="w-full h-[100%]">
          <img
            className="w-full h-full object-cover rounded-full"
            src={artist.img}
            alt=""
          />
        </div>
      </div>
      <h1 className="px-4 font-bold text-md">
        {artist.name.substring(0, 16) + ".."}
      </h1>
      <p className="px-4 text-gray-400 font-sm">Artists</p>
      <PlayCircleIcon className="hidden button text-green-600 rounded-full bg-black group-hover:flex absolute top-24 bottom-8 right-4 align-middle  w-12 h-12" />
    </div>
  );
};

export default Artists;
