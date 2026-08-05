import {
  Heart,
  Maximize2,
  Pause,
  Play,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeOff,
  VolumeX,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { formatTime } from "../utils/formatTime";
import { useNavigate } from "react-router";
import {
  changeLoop,
  changeVolume,
  GoNextSong,
  GoPreviousSong,
  MuteSong,
  seekTo,
  togglePlay,
  toggleShuffle,
} from "../redux/slices/playerSlice";

export default function DesktopMiniMusicPlayer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    loop,
    isMuted,
    isShuffled,
  } = useAppSelector((state) => state.player);

  const changeVolumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeVolume(Number(e.target.value)));
  };
  if (!currentSong) return null;

  return (
    <div className="fixed bottom-5 left-[276px] right-5 z-50 hidden h-24 items-center gap-6 rounded-2xl border border-white/10 bg-[#17182a]/90 px-5 text-white shadow-2xl backdrop-blur-xl lg:flex">
      <div className="flex min-w-0 w-64 items-center gap-3">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="size-14 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0">
          <p className="truncate font-medium">{currentSong.title}</p>

          <p className="truncate text-sm text-white/50">{currentSong.artist}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center gap-2">
        <div className="flex items-center gap-5">
          <button
            aria-label={`${isShuffled ? "turn off shuffle" : "turn on shuffle"}`}
            className={`${isShuffled ? "text-violet-300 drop-shadow-md drop-shadow-violet-300" : "text-white/40"}`}
            onClick={() => dispatch(toggleShuffle())}
          >
            <Shuffle size={20} />
          </button>

          <button
            className="text-white/70 hover:text-white"
            onClick={() => dispatch(GoPreviousSong())}
          >
            <SkipBack size={22} fill="currentColor" />
          </button>

          <button
            className="grid size-11 place-items-center rounded-full bg-violet-600 shadow-lg shadow-violet-600/30 hover:bg-violet-500"
            onClick={() => dispatch(togglePlay())}
          >
            {isPlaying ? (
              <Pause size={23} fill="currentColor" />
            ) : (
              <Play size={23} fill="currentColor" className="translate-x-px" />
            )}
          </button>

          <button
            className="text-white/70 hover:text-white"
            onClick={() => dispatch(GoNextSong())}
          >
            <SkipForward size={22} fill="currentColor" />
          </button>

          <button
            className={`${loop !== "off" ? "relative text-violet-300 drop-shadow-md drop-shadow-violet-300" : "text-white/40"}`}
            onClick={() => dispatch(changeLoop())}
            aria-label={`repeat ${loop}`}
          >
            {loop === "one" && (
              <span className="absolute -top-0.5 -right-1 bg-violet-300 size-3 place-items-center rounded-full text-[8px] text-violet-950">
                1
              </span>
            )}
            <Repeat2 size={20} />
          </button>
        </div>

        <div className="flex w-full max-w-xl items-center gap-3">
          <span className="w-10 text-right text-xs text-white/50">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => dispatch(seekTo(e.target.value))}
            className="song-range min-w-0 flex-1"
          />
          <span className="w-10 text-xs text-white/50">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="flex w-56 items-center justify-end gap-3">
        <button className="text-white/50" onClick={() => dispatch(MuteSong())}>
          {isMuted ? (
            <VolumeOff size={19} color="#fb2c36" />
          ) : (
            (50 <= volume && <Volume2 size={19} />) ||
            (volume !== 0 && volume < 50 && <Volume1 size={19} />) ||
            (volume === 0 && <VolumeX size={19} />)
          )}
        </button>

        <input
          type="range"
          name=""
          id=""
          defaultValue={volume}
          className="w-full h-1.5 accent-violet-400"
          onChange={changeVolumeHandler}
        />

        <button
          onClick={() => navigate("/player")}
          className="ml-2 text-white/60 hover:text-white"
          aria-label="Open player"
        >
          <Maximize2 size={20} />
        </button>
      </div>
    </div>
  );
}
