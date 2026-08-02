import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const FavouriteSongsSaved = localStorage.getItem("favourite_songs");

interface favouriteSongs {
  favouriteSongs: number[];
}

const IsFavouriteSongsSaved = () => {
  try {
    return FavouriteSongsSaved ? JSON.parse(FavouriteSongsSaved) : [];
  } catch {
    return [];
  }
};
const initialState = (): favouriteSongs => {
  return { favouriteSongs: IsFavouriteSongsSaved() };
};

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: initialState(),
  reducers: {
    toggleFavourite: (state, action: PayloadAction<number>) => {
      if (state.favouriteSongs.includes(action.payload)) {
        const filteredFavouriteSongs = state.favouriteSongs.filter(
          (Item) => Item !== action.payload,
        );
        state.favouriteSongs = filteredFavouriteSongs;
        localStorage.setItem(
          "favourite_songs",
          JSON.stringify(filteredFavouriteSongs),
        );
        return;
      }
      state.favouriteSongs.push(action.payload);
      localStorage.setItem(
        "favourite_songs",
        JSON.stringify(state.favouriteSongs),
      );
    },
  },
});

export default favouriteSlice.reducer;
export const { toggleFavourite } = favouriteSlice.actions;
