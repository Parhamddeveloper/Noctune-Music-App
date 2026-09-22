import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Song } from "../../types/songType";
import { songs } from "../../data/songs";
import { getImportedMusicForPlay } from "./importedMusicSlice";
import type { RootState } from "../store";

type QueueItem = {
  id: number;
  source: "built-in" | "imported";
};

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: QueueItem[];
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
  queue: [],
  volume: savedVolume ? Number(localStorage.getItem("volume")) : 100,
  isMuted:
    savedMuteState === "true"
      ? Boolean(localStorage.getItem("isMuted"))
      : false,
  duration: 0,
  currentTime: 0,
  seekTo: null,
  loop: "off",
  isShuffled: false,
};

export const goPreviousSong = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("player/goPreviousSong", async (_, { getState, dispatch }) => {
  const state = getState();
  const currentSong = state.player.currentSong;
  const queue = state.player.queue;
  if (queue.length <= 1) return;

  if (!currentSong) return;
  const currentSongIndex = queue.findIndex(
    (song) => currentSong.id === song.id && currentSong.source === song.source,
  );
  if (currentSongIndex === -1) return;
  const previousSongIndex =
    currentSongIndex === 0 ? queue.length - 1 : currentSongIndex - 1;
  const previousQueueItem = queue[previousSongIndex];
  if (previousQueueItem.source === "imported")
    dispatch(getImportedMusicForPlay(previousQueueItem.id));
  else {
    const previousSong = songs.find((song) => song.id === previousQueueItem.id);

    if (!previousSong) return;

    dispatch(playSong(previousSong));
  }
});

export const goNextSong = createAsyncThunk<void, void, { state: RootState }>(
  "player/goNextSong",
  async (_, { getState, dispatch }) => {
    const currentSong = getState().player.currentSong;
    const isShuffled = getState().player.isShuffled;
    const queue = getState().player.queue;
    if (queue.length <= 1) return;
    if (!currentSong) return;
    const currentSongIndex = queue.findIndex(
      (song) =>
        currentSong.id === song.id && currentSong.source === song.source,
    );
    if (isShuffled) {
      if (queue.length === 1) return;
      let randomMusicIndex = Math.floor(Math.random() * queue.length);
      while (randomMusicIndex === currentSongIndex)
        randomMusicIndex = Math.random() * queue.length;
      const randomMusicQueue = queue[randomMusicIndex];
      if (randomMusicQueue.source === "built-in") {
        const randomMusicItem = songs.find(
          (music) => music.id === randomMusicQueue.id,
        );
        if (!randomMusicItem) return;
        dispatch(playSong(randomMusicItem));
        return;
      } else {
        dispatch(getImportedMusicForPlay(randomMusicQueue.id));
        return;
      }
    }
    const nextSongIndex =
      currentSongIndex === queue.length - 1 ? 0 : currentSongIndex + 1;
    const nextQueueItem = queue[nextSongIndex];
    if (nextQueueItem.source === "imported")
      dispatch(getImportedMusicForPlay(nextQueueItem.id));
    else {
      const nextSong = songs.find((song) => song.id === nextQueueItem.id);
      if (!nextSong) return;
      dispatch(playSong(nextSong));
    }
  },
);
const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playSong: (state, action: PayloadAction<Song>) => {
      if (
        state.currentSong?.id === action.payload.id &&
        state.currentSong.source === action.payload.source
      ) {
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
    setQueue: (state, action: PayloadAction<QueueItem[]>) => {
      state.queue = action.payload;
    },
  },
});

export const {
  playSong,
  togglePlay,
  changeVolume,
  MuteSong,
  setCurrentTime,
  getSongDuration,
  seekTo,
  clearSeek,
  songEnded,
  changeLoop,
  toggleShuffle,
  setQueue,
} = playerSlice.actions;
export default playerSlice.reducer;
