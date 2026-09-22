import { Dot, Pause, Play } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setQueue } from "../redux/slices/playerSlice";
import type { ImportedMusicStateType } from "../types/ImportedMusicType";
import { formatTime } from "../utils/formatTime";
import {
  getImportedMusicForPlay,
} from "../redux/slices/importedMusicSlice";

interface MusicCardProps {
  song: ImportedMusicStateType;
  importedMusics: ImportedMusicStateType[];
}

export default function ImportedSongCard({ song,importedMusics }: MusicCardProps) {
  const { currentSong, isPlaying } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  const playSongHandler = () => {
    const builtInSongs = importedMusics.map((Item) => ({
      id: Item.id,
      source: "imported" as const,
    }));
    
    dispatch(setQueue(builtInSongs));
    dispatch(getImportedMusicForPlay(song.id));
  };
  let IsSongPlaying = song.id === currentSong?.id && isPlaying;
  return (
    <div className="flex w-full justify-between items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-(--color-text)/8 p-3 backdrop-blur-3xl group relative">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={song.coverURL ?? ""}
          className="size-14  rounded-2xl object-cover"
        />

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-(--color-text)">
            {song.name}
          </h3>

          <div className="flex min-w-0 items-center text-sm text-(--color-text)/50">
            <span className="truncate">{song.artist}</span>

            <Dot className="" size={18} />

            <span className="">{formatTime(song.duration)}</span>
          </div>
        </div>
      </div>
      <div className="flex  items-center gap-2">
        <button
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-(white)/10 text-(--color-primary) backdrop-blur-2xl cursor-pointer"
          aria-label={IsSongPlaying ? "Pause song" : "Play song"}
          onClick={playSongHandler}
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
