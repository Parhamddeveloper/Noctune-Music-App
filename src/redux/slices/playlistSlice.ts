import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { playlist } from "../../types/playListType";

interface playListState {
  playLists: playlist[];
}

const savedPlayList = localStorage.getItem("playlists");
const isPlayListSaved = () => {
  try {
    return savedPlayList ? JSON.parse(savedPlayList) : [];
  } catch {
    return [];
  }
};
const initialState: playListState = {
  playLists: isPlayListSaved(),
};

const playListSlicer = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    createPlayList: (state, action: PayloadAction<string>) => {
      state.playLists.push({ id: uuidv4(), title: action.payload, songs: [] });
      localStorage.setItem("playlists", JSON.stringify(state.playLists));
    },
    addSongToPlayList: (
      state,
      action: PayloadAction<{ PlayListId: string; SongId: number }>,
    ) => {
      state.playLists.map((Item) => {
        if (Item.id === action.payload.PlayListId) {
          !Item.songs.includes(action.payload.SongId) &&
            Item.songs.push(action.payload.SongId);
        }
      });
      localStorage.setItem("playlists", JSON.stringify(state.playLists));
    },
  },
});

export const { createPlayList, addSongToPlayList } = playListSlicer.actions;
export default playListSlicer.reducer;
