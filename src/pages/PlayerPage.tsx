import {
  ChevronDown,
  Ellipsis,
  Heart,
  Music,
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
import { formatTime } from "../utils/formatTime";
import { toggleFavourite } from "../redux/slices/favouriteSlice";

export default function PlayerPage() {
  const {
    isPlaying,
    currentSong,
    volume,
    isMuted,
    duration,
    currentTime,
    loop,
    isShuffled,
  } = useAppSelector((state) => state.player);
  const { favouriteSongs } = useAppSelector((state) => state.favourites);
  let isSongFavourite = favouriteSongs.find(
    (favouriteSong) => favouriteSong === currentSong?.id,
  );
  const dispatch = useAppDispatch();
  const changeVolumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeVolume(Number(e.target.value)));
  };
  const muteHandler = () => {
    dispatch(MuteSong());
  };
  return (
    <>
      {currentSong ? (
        <div className="max-w-7xl mx-auto">
          <div className="flex py-7 justify-between">
            <button className="bg-white/8 text-white backdrop-blur-2xl size-10 place-items-center rounded-full border border-white/10">
              <ChevronDown size={20} />
            </button>
            <div className="flex">
              <p className="text-white/50 font-light tracking-widest text-sm">
                NOW PLAYING
                <span className="block text-center text-white tracking-normal font-semibold">
                  Noctune
                </span>
              </p>
            </div>
            <button className="bg-white/8 text-white backdrop-blur-2xl size-10 place-items-center rounded-full border border-white/10">
              <Ellipsis size={20} />
            </button>
          </div>
          <img
            src={currentSong.cover}
            className="w-full object-cover aspect-square shadow-2xl max-w-100 max-h-100 shadow-violet-950/60  mx-auto rounded-4xl border border-white/10"
            alt={currentSong.title}
          />
          <div>
            <div className="flex justify-between items-center gap-x-3">
              <div className="mt-6 min-w-0">
                <h2 className="text-white text-2xl font-bold truncate">
                  {currentSong.title}
                </h2>
                <p className="text-white/50 truncate">{currentSong.artist}</p>
              </div>
              <div>
                <button
                  className={`shrink-0 border border-white/10 bg-white/8 backdrop-blur-2xl size-11 rounded-full place-items-center ${isSongFavourite ? "text-violet-300" : "text-white/50"}`}
                  aria-label="make song favourite"
                  onClick={() => dispatch(toggleFavourite(currentSong.id))}
                >
                  <Heart
                    size={20}
                    fill={`${isSongFavourite ? "currentColor" : "transparent"}`}
                  />
                </button>
              </div>
            </div>
            <div className="mt-8">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                className="w-full"
                onChange={(e) => dispatch(seekTo(e.target.value))}
              />
              <div className="flex justify-between text-white/40 mt-5 text-sm">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(Number(duration))}</span>
              </div>
              <div className="flex mt-5 justify-between items-center">
                <button
                  className={`${isShuffled ? "text-violet-300 drop-shadow-md drop-shadow-violet-300" : "text-white/40"}`}
                  onClick={() => dispatch(toggleShuffle())}
                >
                  <Shuffle size={20} />
                </button>
                <button
                  className="text-white/85 hover:bg-white/10 size-12 place-items-center rounded-full"
                  onClick={() => dispatch(GoPreviousSong())}
                >
                  <SkipBack fill="currentColor" />
                </button>
                <button
                  aria-label={isPlaying ? "Pause song" : "Play song"}
                  className="grid size-18 place-items-center rounded-full border border-white/20 bg-linear-to-br from-violet-400/80 to-fuchsia-500/70 shadow-lg shadow-violet-500/25 transition hover:scale-105 text-white"
                  onClick={() => dispatch(togglePlay())}
                >
                  {isPlaying ? <Pause fill="white" /> : <Play fill="white" />}
                </button>
                <button
                  className="text-white/85 hover:bg-white/10 size-12 place-items-center rounded-full"
                  aria-label="Skip forward"
                  onClick={() => dispatch(GoNextSong())}
                >
                  <SkipForward fill="currentColor" />
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
              <div className="w-full h-12 bg-white/10 backdrop-blur-2xl rounded-2xl mt-7 border border-white/10 flex justify-between items-center px-5 gap-3">
                <button className="text-white/50" onClick={muteHandler}>
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
                <span className="text-white/50 text-sm">{volume}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center gap-y-3 pb-10">
          <div className="grid text-violet-300 bg-white/10 size-19 place-items-center rounded-full border border-white/10">
            <Music size={35} />
          </div>
          <h2 className="text-white font-bold text-2xl">No song selected</h2>
          <p className="text-white/50">Please choose a song first</p>
        </div>
      )}
    </>
  );
}
