import { Check, Music2, X } from "lucide-react";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import type { Song } from "../types/songType";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addSongToPlayList } from "../redux/slices/playlistSlice";

interface ModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedSong: Song | null;
}

export default function AddSongToPlayListModal({
  setIsModalOpen,
  selectedSong,
}: ModalProps) {
  const dispatch = useAppDispatch();
  const { playLists } = useAppSelector((state) => state.playlists);
  const addSongToPlayListHandler = (PlayListId: string) => {
    if (selectedSong)
      dispatch(addSongToPlayList({ PlayListId, SongId: selectedSong.id }));
  };
  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");

    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <div className="fixed inset-0 z-99">
      <div className="absolute bg-black/45 inset-0" />
      <div className="absolute inset-0 grid place-items-center px-6">
        <div className="min-w-0 w-full overflow-hidden border border-white/10 max-w-md bg-white/8 backdrop-blur-xl p-5 rounded-3xl text-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Add song</p>
              <h2 className="text-white mt-1 text-lg font-bold">
                Choose playlist
              </h2>
            </div>
            <button
              aria-label="close create playlist modal"
              className="size-10 bg-white/2 backdrop-blur-2xl place-items-center rounded-full border border-white/10 "
              onClick={() => setIsModalOpen(false)}
            >
              <X size={19} />
            </button>
          </div>
          <div className="mt-6 w-full max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white/8 p-3">
            <div className="flex w-full min-w-0 items-center gap-3">
              <img
                src={selectedSong?.cover}
                alt={selectedSong?.title}
                className="size-12 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1 overflow-hidden">
                <h3 className="truncate text-white">{selectedSong?.title}</h3>
                <p className="truncate text-sm">{selectedSong?.artist}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-3 mt-4 overflow-y-auto  max-h-75 ">
            {playLists.map((playlistItem) => (
              <div
                className={`w-full max-w-full overflow-hidden flex items-center rounded-2xl border border-white/10 bg-white/8 p-3 shrink-0 ${selectedSong && playlistItem.songs.includes(selectedSong.id) && "opacity-50"}`}
                onClick={() => addSongToPlayListHandler(playlistItem.id)}
              >
                <div className="flex w-full min-w-0 items-center gap-3">
                  <div className="size-13 grid place-items-center bg-(--color-surface)/20 rounded-2xl text-(--color-primary) border border-violet-500/20">
                    <Music2 />
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <h3 className="truncate text-white">
                      {playlistItem.title}
                    </h3>
                    <p className="truncate text-sm">
                      {playlistItem.songs.length} songs
                    </p>
                  </div>
                </div>
                {selectedSong &&
                  playlistItem.songs.includes(selectedSong.id) && (
                    <div className="text-green-300">
                      <Check />
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
