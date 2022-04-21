import React from "react";
import {Aside} from "../components/layout-components/Aside";
import {MusicController} from "../components/player/MusicController";
import {IoWarning, IoWifi} from "react-icons/io5";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

interface AppLayoutProps {
  children: any
}

export const AppLayout = ({children}: AppLayoutProps) => {
  const {rtcConnected} = useSelector((state: RootState) => state.player);

  return (
    <div className="flex relative min-h-screen flex-row justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div
        className="md:w-1/4 relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 my-auto sm:max-h-lg sm:rounded-lg sm:px-10">
        <div className={"w-full flex flex-row justify-between items-center"}>
          <h3 className={"text-2xl font-bold"}>WebRTC Music Player</h3>
          <div className={"text-2xl"}>
            {rtcConnected ? (
              <IoWifi className={"text-green-600"}/>
            ) : (
              <IoWarning className={"text-red-600"}/>
            )}
          </div>
        </div>
        <div className="divide-y divide-gray-300/50">
          <div className={"py-4 text-base leading-7 text-gray-600"}>
            {children}
          </div>
          <div className="pt-4 text-base font-semibold leading-7">
            <MusicController/>
          </div>
        </div>
      </div>
    </div>
  );
}
