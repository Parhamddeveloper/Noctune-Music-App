import { Heart, Pause, Play } from "lucide-react";
import type { Song } from "../types/songType";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { playSong } from "../redux/slices/playerSlice";
import { toggleFavourite } from "../redux/slices/favouriteSlice";

interface MusicCardProps {
  song: Song;
}

export default function SongCard({ song }: MusicCardProps) {
  const dispatch = useAppDispatch();
  const { currentSong, isPlaying } = useAppSelector((state) => state.player);
  const favourites = useAppSelector((state) => state.favourites);
  const IsSongPlaying = currentSong?.id === song.id && isPlaying;
  const IsSongFavourite = favourites.favouriteSongs.includes(song.id);
  const PlaySongHandler = () => {
    dispatch(playSong(song));
  };
  const toggleFavouriteHandler = () => {
    dispatch(toggleFavourite(song.id));
  };
  return (
    <div className="min-w-40 relative p-3 rounded-3xl bg-(--color-text)/8 hover:bg-(--color-text)/20 hover:scale-102 backdrop-blur-2xl flex flex-col gap-y-1 hover:-translate-y-2 transition-all duration-300 border border-white/10 hover:border-white/40">
      <button
        className={`absolute right-2 top-2 bg-black/40 backdrop-blur-2xl rounded-full size-9 place-items-center ${IsSongFavourite ? "text-(--color-primary) bg-(--color-surface)/60" : "text-white/70"} z-10`}
        aria-label="make favourite"
        onClick={toggleFavouriteHandler}
      >
        <Heart
          size={18}
          fill={`${IsSongFavourite ? "currentColor" : "transparent"}`}
        />
      </button>
      <div className="relative">
        <button
          className="absolute bottom-1 right-1 bg-white/30 backdrop-blur-2xl rounded-full size-9 place-items-center text-white/70 border border-white/20"
          aria-label="make favourite"
          onClick={PlaySongHandler}
        >
          {IsSongPlaying ? (
            <Pause size={19} fill="white" />
          ) : (
            <Play size={19} fill="white" />
          )}
        </button>
        <img src={song.cover} alt={song.title} className="rounded-2xl " />
      </div>
      <div className="flex flex-col flex-1">
        <h2 className="text-(--color-text) font-bold line-clamp-2 leading-7 h-14">
          {song.title}
        </h2>
        <div className="mt-auto">
          <p className="text-(--color-text)/50 text-sm">{song.artist}</p>
          <span className="text-xs  text-(--color-primary)/80">{song.genre}</span>
        </div>
      </div>
    </div>
  );
}
