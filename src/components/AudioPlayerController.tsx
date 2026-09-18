import { Dot, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  GoNextSong,
  GoPreviousSong,
  togglePlay,
} from "../redux/slices/playerSlice";
import { formatTime } from "../utils/formatTime";
export default function AudioPlayerController() {
  const dispatch = useAppDispatch();
  const { currentSong, isPlaying, currentTime } = useAppSelector(
    (state) => state.player,
  );
  return (
    <div className="fixed bottom-30 lg:hidden left-1/2 z-10 max-w-137.5 md:max-w-180 w-full px-3 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-[1.75rem] border border-(--color-text)/15 bg-(--color-text)/10 p-2.5 shadow-2xl shadow-violet-950/50 backdrop-blur-3xl">
        <Link to="/player" className="flex min-w-0 flex-1 items-center gap-3">
          <img
            className="size-12 rounded-2xl object-cover"
            src={currentSong?.cover}
          />

          <div className="min-w-0">
            <h3 className="text-(--color-text) text-sm font-semibold truncate">
              {currentSong?.title}
            </h3>

            <p className="mt-0.5 truncate text-xs text-(--color-text)/50 ">
              {currentSong?.artist}
              <span>
                <Dot size={14} className="inline" />
              </span>
              {formatTime(currentTime)}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous song"
            className="grid size-9 place-items-center rounded-full text-(--color-player-icons)/55 transition hover:bg-(--color-text)/10 hover:text-(--color-primary)"
            onClick={() => dispatch(GoPreviousSong())}
          >
            <SkipBack size={18} />
          </button>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/20 bg-linear-to-br from-(--color-primary)/80 to-fuchsia-500/70 shadow-lg shadow-violet-500/25 transition hover:scale-105 text-white"
            onClick={() => dispatch(togglePlay())}
          >
            {isPlaying ? <Pause fill="white" /> : <Play fill="white" />}
          </button>

          <button
            type="button"
            aria-label="Next song"
            className="grid size-9 place-items-center rounded-full text-(--color-player-icons)/55 transition hover:bg-(--color-text)/10 hover:text-(--color-primary)"
            onClick={() => dispatch(GoNextSong())}
          >
            <SkipForward size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
