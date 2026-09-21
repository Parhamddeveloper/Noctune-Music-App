import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import favouriteReducer from "./slices/favouriteSlice";
import playlistReducer from "./slices/playlistSlice";
import themeReducer from "./slices/themeSlice";
import wallpaperReducer from "./slices/wallpaperSlice";
import ImportedMusicsReducer from "./slices/importedMusicSlice"
export const store = configureStore({
  reducer: {
    player: playerReducer,
    favourites: favouriteReducer,
    playlists: playlistReducer,
    theme: themeReducer,
    wallpaper: wallpaperReducer,
    importedMusics : ImportedMusicsReducer
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
  if (currentStates.theme.theme !== previousStates.theme.theme) {
    localStorage.setItem(
      "theme",
      JSON.stringify({ theme: currentStates.theme.theme }),
    );
  }
  if (
    currentStates.wallpaper.currentWallpaperID !==
    previousStates.wallpaper.currentWallpaperID
  )
    if (
      currentStates.wallpaper.currentWallpaperID !==
      previousStates.wallpaper.currentWallpaperID
    ) {
      if (currentStates.wallpaper.currentWallpaperID === null) {
        localStorage.removeItem("currentWallpaperID");
      } else {
        localStorage.setItem(
          "currentWallpaperID",
          String(currentStates.wallpaper.currentWallpaperID),
        );
      }
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
