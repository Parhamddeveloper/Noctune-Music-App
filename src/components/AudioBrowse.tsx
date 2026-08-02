import { Dot, Heart, ListPlus, Pause, Play } from "lucide-react";
import type { Song } from "../types/songType";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { playSong } from "../redux/slices/playerSlice";
import { toggleFavourite } from "../redux/slices/favouriteSlice";
import type { Dispatch, SetStateAction } from "react";

interface AudioBrowseProps {
  Song: Song;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedSong: Dispatch<SetStateAction<Song | null>>
}
export default function AudioBrowse({ Song,setIsModalOpen,setSelectedSong }: AudioBrowseProps) {
  const { currentSong, isPlaying } = useAppSelector((state) => state.player);
  const { favouriteSongs } = useAppSelector((state) => state.favourites);
  const dispatch = useAppDispatch();
  let isSongFavourite = favouriteSongs.find(
    (favouriteSong) => favouriteSong === Song.id,
  );
  let IsSongPlaying = Song.id === currentSong?.id && isPlaying;
  return (
    <div className="flex w-full justify-between items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/8 p-3 backdrop-blur-3xl">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={Song.cover}
          alt={Song.title}
          className="size-14  rounded-2xl object-cover"
        />

        <div className="min-w-0">
          <h3 className="truncate font-semibold">{Song.title}</h3>

          <div className="flex min-w-0 items-center text-sm text-white/50">
            <span className="truncate">{Song.artist}</span>

            <Dot className="" size={18} />

            <span>{Song.duration}</span>
          </div>
        </div>
      </div>
      <div className="flex  items-center gap-2">
        <button
          className="grid size-8 place-items-center text-white/50"
          aria-label="Add song to playlist"
          onClick={()=>{
            setIsModalOpen(true)
            setSelectedSong(Song)
          }}
        >
          <ListPlus size={19} />
        </button>

        <button
          className={`grid size-8 shrink-0 place-items-center ${isSongFavourite ? "text-violet-300" : "text-white/50"}`}
          aria-label={`${isSongFavourite ? "remove song from favourites" : "add song to favourites"}`}
          onClick={() => dispatch(toggleFavourite(Song.id))}
        >
          <Heart
            fill={`${isSongFavourite ? "currentColor" : "transparent"}`}
            size={19}
          />
        </button>

        <button
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-violet-200 backdrop-blur-2xl cursor-pointer"
          aria-label={IsSongPlaying ? "Pause song" : "Play song"}
          onClick={() => dispatch(playSong(Song))}
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
