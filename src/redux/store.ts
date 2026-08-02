import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import favouriteReducer from "./slices/favouriteSlice";
import playlistReducer from "./slices/playlistSlice"
export const store = configureStore({
  reducer: {
    player: playerReducer,
    favourites: favouriteReducer,
    playlists : playlistReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
