import { Pause, Play, Trash } from "lucide-react";
import {
  deleteMusic,
  getImportedMusicForPlay,
} from "../redux/slices/importedMusicSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import type { ImportedMusicStateType } from "../types/ImportedMusicType";
import { setQueue } from "../redux/slices/playerSlice";

interface ImportedSongPageCardProps {
  music: ImportedMusicStateType;
  importedMusics: ImportedMusicStateType[];
}
export default function ImportedSongPageCard({
  music,
  importedMusics,
}: ImportedSongPageCardProps) {
  const dispatch = useAppDispatch();
  const { currentSong, isPlaying } = useAppSelector((state) => state.player);
    const isCurrentSongPlaying = currentSong?.id === music.id && currentSong?.source === "imported" && isPlaying
  return (
    <div
      key={music.id}
      className={`flex items-center gap-x-3 bg-(--color-text)/10 p-2 rounded-xl border  ${currentSong?.id === music.id ? "border-(--color-primary) shadow-sm shadow-(color:--color-surface)" : "border-(--color-text)/5"}`}
    >
      <div className="group relative">
        <img
          src={music.coverURL ?? ""}
          alt={music.name}
          className="size-19 rounded-lg"
        />

        <button
          className={`absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100`}
          onClick={() => {
            const queue = importedMusics.map((Item) => ({
              id: Item.id,
              source: "imported" as const,
            }));
            dispatch(setQueue(queue));
            dispatch(getImportedMusicForPlay(music.id));
          }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
            {isCurrentSongPlaying ? (
              <Pause className="ml-0.5 fill-white text-white" size={20} />
            ) : (
              <Play className="ml-0.5 fill-white text-white " size={20} />
            )}
          </span>
        </button>
      </div>
      <div>
        <p>{music.name}</p>
        <p>{music.artist}</p>
      </div>
      <div className="ml-auto">
        <button
          onClick={() => dispatch(deleteMusic({ id: music.id }))}
          className="opacity-50 transition hover:text-red-400 hover:opacity-100"
        >
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
}
