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
    },
    deletePlayList: (state, action: PayloadAction<string>) => {
      const FilteredState = state.playLists.filter(
        (playList) => playList.id !== action.payload,
      );
      state.playLists = FilteredState;
    },
    editPlayListTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>,
    ) => {
      const { id, title } = action.payload;

      const playList = state.playLists.find((playList) => playList.id === id);

      if (!playList) return;

      playList.title = title;
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
    },
  },
});

export const {
  createPlayList,
  addSongToPlayList,
  deletePlayList,
  editPlayListTitle,
} = playListSlicer.actions;
export default playListSlicer.reducer;
