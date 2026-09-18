import { Dot, Heart, Pause, Play } from "lucide-react";
import { playSong } from "../redux/slices/playerSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { songs } from "../data/songs";
import { toggleFavourite } from "../redux/slices/favouriteSlice";

export default function FavouriteSongCard({ id }: { id: number }) {
  const { currentSong, isPlaying } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  const song = songs.find((Item) => Item.id === id);
  if (!song) return null;
  let IsSongPlaying = song.id === currentSong?.id && isPlaying;
  return (
    <div className="flex w-full justify-between items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-(--color-text)/8 p-3 backdrop-blur-3xl">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={song.cover}
          alt={song.title}
          className="size-14  rounded-2xl object-cover"
        />

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-(--color-text)">{song.title}</h3>

          <div className="flex min-w-0 items-center text-sm text-(--color-text)/50">
            <span className="truncate">{song.artist}</span>

            <Dot className="" size={18} />

            <span className="">{song.duration}</span>
          </div>
        </div>
      </div>
      <div className="flex  items-center gap-2">
        <button
          className="grid size-8 shrink-0 place-items-center text-(--color-primary)"
          aria-label="Add song to favorites"
          onClick={()=> dispatch(toggleFavourite(id))}
        >
          <Heart size={19} fill="currentColor" />
        </button>

        <button
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-(white)/10 text-(--color-primary) backdrop-blur-2xl cursor-pointer"
          aria-label={IsSongPlaying ? "Pause song" : "Play song"}
          onClick={() => dispatch(playSong(song))}
        >
          {IsSongPlaying ? (
            <Pause fill="currentColor" size={19} />
          ) : (
            <Play fill="currentColor" size={19} />
          )}
        </button>
      </div>
    </div>
  );
}
