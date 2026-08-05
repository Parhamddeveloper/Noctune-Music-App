import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Song } from "../../types/songType";
import { songs } from "../../data/songs";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  duration: number;
  currentTime: number;
  seekTo: number | null;
  loop: "off" | "one" | "infinite";
  isShuffled: boolean;
}

const savedVolume = localStorage.getItem("volume");
const savedMuteState = localStorage.getItem("isMuted");
const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  volume: savedVolume ? Number(localStorage.getItem("volume")) : 100,
  isMuted: savedMuteState === "true" ? Boolean(localStorage.getItem("isMuted")) : false,
  duration: 0,
  currentTime: 0,
  seekTo: null,
  loop: "off",
  isShuffled: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playSong: (state, action: PayloadAction<Song>) => {
      if (state.currentSong?.id === action.payload.id) {
        state.isPlaying = !state.isPlaying;
        return;
      }
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    togglePlay: (state) => {
      if (state.currentSong) {
        state.isPlaying = !state.isPlaying;
      }
    },
    GoNextSong: (state) => {
      if (!state.currentSong) return;
      const currentSongIndex = songs.findIndex(
        (song) => state.currentSong?.id === song.id,
      );
      if (state.isShuffled && songs.length > 1) {
        let RandomIndex = currentSongIndex;
        while (RandomIndex === currentSongIndex)
          RandomIndex = Math.floor(Math.random() * songs.length);
        state.currentSong = songs[RandomIndex];
      } else {
        if (songs.length > 0) {
          let nextSongIndex =
            currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;
          state.currentSong = songs[nextSongIndex];
        }
      }
    },
    GoPreviousSong: (state) => {
      if (!state.currentSong) return;
      const currentSongIndex = songs.findIndex(
        (song) => state.currentSong?.id === song.id,
      );
      const previousSongIndex =
        currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
      state.currentSong = songs[previousSongIndex];
    },
    changeVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    MuteSong: (state) => {
      state.isMuted = !state.isMuted;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    getSongDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    seekTo: (state, action: PayloadAction<string>) => {
      state.seekTo = Number(action.payload);
    },
    clearSeek: (state) => {
      state.seekTo = null;
    },
    songEnded: (state) => {
      if (state.loop === "one") {
        state.currentTime = 0;
        state.loop = "off";
      }
    },
    changeLoop: (state) => {
      switch (state.loop) {
        case "off":
          state.loop = "one";
          break;
        case "one": {
          state.loop = "infinite";
          break;
        }
        case "infinite": {
          state.loop = "off";
          break;
        }
        default:
          break;
      }
    },
    toggleShuffle: (state) => {
      state.isShuffled = !state.isShuffled;
    },
  },
});

export const {
  playSong,
  togglePlay,
  GoNextSong,
  GoPreviousSong,
  changeVolume,
  MuteSong,
  setCurrentTime,
  getSongDuration,
  seekTo,
  clearSeek,
  songEnded,
  changeLoop,
  toggleShuffle,
} = playerSlice.actions;
export default playerSlice.reducer;
