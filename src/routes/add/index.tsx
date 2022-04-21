import React, {useEffect, useState} from "react";
import {YouTubeHandler} from "../../services/YouTubeHandler";
import {current} from "@reduxjs/toolkit";
import {getYouTubeID} from "../../utils";
import {useDispatch} from "react-redux";
import {addVideo} from "../../redux/slices/player.slice";
import {useNavigate} from "react-router-dom";

export const AddSong = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentUrl, setCurrentUrl] = useState<string>('');
  return <>
    <a href="/" className="text-sky-500 hover:text-sky-600">&larr; Back</a>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        YouTube URL
      </label>
      <input
        value={currentUrl}
        onChange={e => {
          setCurrentUrl(e.target.value);
        }}
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
        type="text" placeholder="https://www.youtube.com/watch?v=-S4s97hsag8"
      />
      <button
        className={"bg-gray-800 w-full text-white mt-2 py-1 rounded"}
        onClick={() => {
          let ytbId: any = getYouTubeID(currentUrl);
          if (!!ytbId) {
            YouTubeHandler.getVideoInfo(ytbId).then(data => {
              console.log(data);
              const newVideo: VideoInfo = {
                url: currentUrl,
                avatarUrl: `https://img.youtube.com/vi/${ytbId}/0.jpg`,
                id: ytbId,
                name: data.Name,
                duration: 0
              }
              dispatch(addVideo(newVideo));
              navigate('/');
            }).catch(() => {
              console.error("Video error");
            });
          }
        }}
        disabled={currentUrl.trim() === '' || !getYouTubeID(currentUrl)}
      >
        Add
      </button>
    </div>
  </>
}
