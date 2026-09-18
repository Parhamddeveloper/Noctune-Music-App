import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { WallpaperType } from "../../types/wallpaperType";
import { getWallpapers } from "../../utils/wallpaperDB";

type WallpaperState = {
  currentWallpaper: string | null;
  wallpapers: WallpaperType[];
  loading: boolean;
};

const initialState: WallpaperState = {
  currentWallpaper: null,
  wallpapers: [],
  loading: false,
};

export const loadWallpapers = createAsyncThunk(
  "wallpaper/loadWallpapers",
  async () => {
    const wallpapers = await getWallpapers();
    return wallpapers;
  },
);
export const addNewWallpaper = createAsyncThunk(
  "wallpaper/addNewWallpaper",
  async (wallpaper: WallpaperType) => {
    // await saveWallpaper(wallpaper);

    return wallpaper;
  },
);
const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState,
  reducers: {
    changeWallpaper: (state, action: PayloadAction<string>) => {
      state.currentWallpaper = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadWallpapers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loadWallpapers.fulfilled,
      (state, action: PayloadAction<WallpaperType[]>) => {
        state.wallpapers = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(loadWallpapers.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addNewWallpaper.fulfilled, (state, action) => {
      state.wallpapers.push(action.payload);
    });
  },
});

export const { changeWallpaper } = wallpaperSlice.actions;
export default wallpaperSlice.reducer;
