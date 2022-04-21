import React from "react";
import {IoPlay, IoShuffle, IoRepeat, IoShareSocial, IoMic, IoList} from "react-icons/io5";

export const MusicControls = () => {
  return (
    <div className={"flex flex-row justify-evenly items-center"}>
      <div className={"cursor-pointer text-xl text-gray-900"}>
        <IoList/>
      </div>
      <div className={"cursor-pointer text-xl text-gray-900"}>
        <IoRepeat/>
      </div>
      {/* Play Button */}
      <div className={"flex w-12 h-12 bg-gray-900 hover:bg-gray-700 cursor-pointer text-white justify-center items-center rounded-full text-xl"}>
        <IoPlay />
      </div>
      <div className={"cursor-pointer text-xl text-gray-900"}>
        <IoShuffle/>
      </div>
      <div className={"cursor-pointer text-xl text-gray-900"}>
        <IoMic/>
      </div>
    </div>
  )
};

export const MusicTimeline = () => {
  return (
    <div className={"w-full mb-2 flex flex-row items-center"}>
      <div className={"text-left time-area w-10"}>
        12:30
      </div>
      <input
        type="range"
        className="form-range w-full h-6 p-0 focus:outline-none focus:ring-0 focus:shadow-none"
        id="music-timeline"
      />
      <div className={"text-right time-area w-10"}>
        15:30
      </div>
    </div>
  );
};

export const MusicController = () => {
  return (
    <div className={"max-w-lg"}>
      <MusicTimeline/>
      <MusicControls/>
    </div>
  )
};
