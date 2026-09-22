import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddMusicToDB,
  getAllMusicsFromDB,
  getMusicByIDFromDB,
  removeMusicFromDB,
} from "../../utils/customMusicsDB";
import type { ImportedMusicStateType } from "../../types/ImportedMusicType";
import type { Song } from "../../types/songType";
import { playSong } from "./playerSlice";

const initialState: ImportedMusicStateType[] = [];

export const getAllMusics = createAsyncThunk(
  "importedMusics/getAllMusics",
  async () => {
    const musics = await getAllMusicsFromDB();
    return musics.map((music) => ({
      id: music.id,
      name: music.name,
      artist: music.artist,
      album: music.album,
      coverURL: music.cover ? URL.createObjectURL(music.cover) : null,
      duration: music.duration,
    }));
  },
);
export const addNewMusic = createAsyncThunk(
  "importedMusics/addNewMusic",
  async ({
    name,
    artist,
    album,
    cover,
    file,
    duration,
  }: {
    name: string;
    artist: string;
    album: string | null;
    cover: Blob | null;
    file: Blob;
    duration: number;
  }) => {
    const id = await AddMusicToDB(name, artist, album, cover, file, duration);
    return {
      id,
      name,
      artist,
      album,
      coverURL: cover ? URL.createObjectURL(cover) : null,
      duration,
    };
  },
);

export const getImportedMusicForPlay = createAsyncThunk(
  "importedMusics/getImportedMusic",
  async (id: number, { dispatch }) => {
    const music = await getMusicByIDFromDB(id);
    if (!music) return;
    const audioURL = URL.createObjectURL(music.audio);

    const song: Song = {
      id: music.id,
      source : "imported",
      title: music.name,
      artist: music.artist,
      cover: music.cover ? URL.createObjectURL(music.cover) : "",
      audio: audioURL,
      duration: music.duration,
      genre: null,
    };
    dispatch(playSong(song));
  },
);

export const deleteMusic = createAsyncThunk(
  "importedMusics/deleteSong",
  async ({ id }: { id: number }): Promise<number> => {
    await removeMusicFromDB(id);
    return id;
  },
);

const importMusicSlicer = createSlice({
  name: "importedMusics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMusics.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(addNewMusic.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(deleteMusic.fulfilled, (state, action) => {
      return state.filter((music) => music.id !== action.payload);
    });
  },
});

export default importMusicSlicer.reducer;
