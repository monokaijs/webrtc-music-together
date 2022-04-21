import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {stat} from "fs";

export interface PlayerState {
  rtcConnected: boolean,
  value: number,
  playlist: VideoInfo[]
}

const initialState: PlayerState = {
  rtcConnected: false,
  value: 0,
  playlist: []
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setRtcConnectionStatus(state, action: PayloadAction<boolean>) {
      state.rtcConnected = action.payload;
    },
    addVideo(state, action: PayloadAction<VideoInfo>) {
      if (!state.playlist.find(video => video.id === action.payload.id)) {
        state.playlist = [
          ...state.playlist,
          action.payload
        ]
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRtcConnectionStatus, addVideo } = playerSlice.actions

export default playerSlice.reducer
