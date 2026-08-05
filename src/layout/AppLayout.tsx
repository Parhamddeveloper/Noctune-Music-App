import { Outlet, useLocation } from "react-router";
import BottomNav from "../components/BottomNav";
import AudioPlayer from "../components/AudioPlayer";
import AudioPlayerController from "../components/AudioPlayerController";
import { useAppSelector } from "../hooks/hooks";
import AsideMenu from "../components/AsideMenu";
import DesktopMiniMusicPlayer from "../components/DesktopMiniMusicPlayer";

export default function AppLayout() {
  const { currentSong } = useAppSelector((state) => state.player);
  const location = useLocation();
  return (
    <>
      <div className="min-h-screen overflow-hidden relative bg-[#090b16]">
        <AsideMenu />
        <div className="absolute h-80 w-80 -top-32 -left-32 rounded-full bg-violet-600/30 blur-[100px] z-0" />
        <div className="absolute h-72 w-72 -bottom-32 -right-32 rounded-full bg-violet-600/30 blur-[100px] z-0" />
        <main className="relative min-h-screen overflow-hidden px-5 pb-45 lg:ml-70">
          <div className="relative z-10">
            <Outlet />
          </div>
          {currentSong && location.pathname !== "/player" && (
            <AudioPlayerController />
          )}
          <AudioPlayer />
          <BottomNav />
        </main>
        {currentSong && location.pathname !== "/player" && (
          <DesktopMiniMusicPlayer />
        )}
      </div>
    </>
  );
}
