import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { WallpaperType } from "../../types/wallpaperType";
import { addWallpaper, getWallpapers } from "../../utils/wallpaperDB";

type WallpaperState = {
  currentWallpaper: string | null;
  currentWallpaperID: number | null;
  wallpapers: WallpaperType[];
  loading: boolean;
};
const savedWallpaperID = localStorage.getItem("currentWallpaperID");
const initialState: WallpaperState = {
  currentWallpaper: null,
  currentWallpaperID: savedWallpaperID ? Number(savedWallpaperID) : null,
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
  async ({ wallpaper, name }: { wallpaper: Blob; name: string }) => {
    const id = await addWallpaper(wallpaper, name);

    return {
      id: Number(id),
      name,
      image: URL.createObjectURL(wallpaper),
    };
  },
);
export const deleteWallpaper = createAsyncThunk(
  "wallpaper/deleteWallpaper",
  async (id: number) => {
    await deleteWallpaper(id);
    return id;
  },
);

const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState,
  reducers: {
    changeWallpaper: (state, action: PayloadAction<WallpaperType>) => {
      state.currentWallpaper = action.payload.image;
      state.currentWallpaperID = action.payload.id;
    },
    setDefaultWallpaper: (state) => {
      state.currentWallpaper = null;
      state.currentWallpaperID = null;
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

        const selectedWallpaper = action.payload.find(
          (wallpaper) => wallpaper.id === state.currentWallpaperID,
        );

        state.currentWallpaper = selectedWallpaper?.image ?? null;

        state.loading = false;
      },
    );
    builder.addCase(loadWallpapers.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addNewWallpaper.fulfilled, (state, action) => {
      state.wallpapers.push(action.payload);
      state.currentWallpaper = action.payload.image;
      state.currentWallpaperID = action.payload.id;
    });
    builder.addCase(deleteWallpaper.fulfilled, (state, action) => {
      const deletedId = action.payload;

      state.wallpapers = state.wallpapers.filter(
        (wallpaper) => wallpaper.id !== deletedId,
      );

      if (state.currentWallpaperID === deletedId) {
        state.currentWallpaperID = null;
        state.currentWallpaper = null;
      }
    });
  },
});

export const { changeWallpaper, setDefaultWallpaper } = wallpaperSlice.actions;
export default wallpaperSlice.reducer;
