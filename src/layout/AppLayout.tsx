import { Outlet, useLocation } from "react-router";
import BottomNav from "../components/BottomNav";
import AudioPlayer from "../components/AudioPlayer";
import AudioPlayerController from "../components/AudioPlayerController";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import AsideMenu from "../components/AsideMenu";
import DesktopMiniMusicPlayer from "../components/DesktopMiniMusicPlayer";
import { loadWallpapers } from "../redux/slices/wallpaperSlice";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export default function AppLayout() {
  const { currentSong } = useAppSelector((state) => state.player);
  const { theme } = useAppSelector((state) => state.theme);
  const location = useLocation();
  const currentWallpaper = useAppSelector(
    (state) => state.wallpaper.currentWallpaper,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadWallpapers());
  }, [dispatch]);
  return (
    <>
      <div
        className={`min-h-screen overflow-x-hidden relative app-theme-${theme} bg-(--color-background) transition-colors`}
      >
        {currentWallpaper && (
          <div
            className="fixed inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentWallpaper})` }}
          />
        )}
        <AsideMenu />
        <div className="absolute h-80 w-80 -top-32 -left-32 rounded-full bg-(--color-surface)/30 blur-[100px] z-0" />
        <div className="absolute h-72 w-72 -bottom-32 -right-32 rounded-full bg-(--color-surface)/30 blur-[100px] z-0" />
        <main className="relative min-h-dvh overflow-hidden px-5 pb-45 lg:ml-70">
          <div className="relative z-10">
            <Outlet />
          </div>
          <AnimatePresence>
            {currentSong && location.pathname !== "/player" && (
              <AudioPlayerController />
            )}
          </AnimatePresence>
          <AudioPlayer />
          <BottomNav />
        </main>
        <AnimatePresence>
          {currentSong && location.pathname !== "/player" && (
            <DesktopMiniMusicPlayer />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
