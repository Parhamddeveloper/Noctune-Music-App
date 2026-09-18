import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { themeType } from "../../types/themeType";

const savedTheme = localStorage.getItem("theme");
const getThemeSaved = ():themeType => {
  try {
    return savedTheme
      ? JSON.parse(savedTheme) as themeType
      : {
          theme: "midnight",
        };
  } catch {
    return {
      theme: "midnight",
    };
  }
};

const initialState: themeType = getThemeSaved();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action : PayloadAction<themeType["theme"]>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
