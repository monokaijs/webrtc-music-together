import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {IoEllipsisHorizontalOutline, IoPlayOutline} from "react-icons/io5";

export const Playlist = () => {
  const {playlist} = useSelector((state: RootState) => state.player);
  useEffect(() => {
    console.log("playlist", playlist);
  }, []);
  return <>
    <span className={"font-bold"}>
      Playlist
    </span>
    <hr/>
    <ul className={"mt-0"}>
      {playlist.map(video => (
        <li className="flex flex-row py-3 items-center" key={video.id}>
          <img src={video.avatarUrl} alt={"video"} className={"h-8 mr-2 rounded"}/>
          <div className={"text-ellipsis truncate"}>
            {video.name || video.url}
          </div>
          <div className={"flex flex-row controls ml-4"}>
            <IoPlayOutline/>
          </div>
        </li>
      ))}
    </ul>
  </>
}
