import { Outlet, useLocation } from "react-router";
import BottomNav from "../components/BottomNav";
import AudioPlayer from "../components/AudioPlayer";
import AudioPlayerController from "../components/AudioPlayerController";
import { useAppSelector } from "../hooks/hooks";

export default function AppLayout() {
  const { currentSong } = useAppSelector((state) => state.player);
  const location = useLocation()
  return (
    <main className="relative min-h-screen bg-[#090b16] overflow-hidden px-5 pb-45">
      <div className="absolute h-80 w-80 -top-32 -left-32 rounded-full bg-violet-600/30 blur-[100px]" />
      <div className="absolute h-72 w-72 -bottom-32 -right-32 rounded-full bg-violet-600/30 blur-[100px]" />
      <div className="relative z-10">
        <Outlet />
      </div>
      <AudioPlayer />
      {currentSong && location.pathname !== "/player" && <AudioPlayerController />}
      <BottomNav />
    </main>
  );
}
