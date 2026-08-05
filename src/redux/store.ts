import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import favouriteReducer from "./slices/favouriteSlice";
import playlistReducer from "./slices/playlistSlice";
export const store = configureStore({
  reducer: {
    player: playerReducer,
    favourites: favouriteReducer,
    playlists: playlistReducer,
  },
});

let previousStates = store.getState();

store.subscribe(() => {
  const currentStates = store.getState();

  if (currentStates.player.volume !== previousStates.player.volume) {
    localStorage.setItem("volume", String(currentStates.player.volume));
  }

  if (currentStates.player.isMuted !== previousStates.player.isMuted) {
    localStorage.setItem("isMuted", String(currentStates.player.isMuted));
  }

  if (
    currentStates.favourites.favouriteSongs !==
    previousStates.favourites.favouriteSongs
  ) {
    localStorage.setItem(
      "favourite_songs",
      JSON.stringify(currentStates.favourites.favouriteSongs),
    );
  }
  if (
    currentStates.playlists.playLists !== previousStates.playlists.playLists
  ) {
    localStorage.setItem(
      "playlists",
      JSON.stringify(currentStates.playlists.playLists),
    );
  }
  previousStates = currentStates;
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
