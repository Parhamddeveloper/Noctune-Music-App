import { useState, type Dispatch, type SetStateAction } from "react";
import type { playlist } from "../types/playListType";
import { Pencil, Trash2, X } from "lucide-react";
import { useAppDispatch } from "../hooks/hooks";
import {
  deletePlayList,
  editPlayListTitle,
} from "../redux/slices/playlistSlice";
import { useNavigate } from "react-router";

interface EditPlayListModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  playlistInfos: playlist;
}
export default function EditPlayListModal({
  setIsModalOpen,
  playlistInfos,
}: EditPlayListModalProps) {
  const [searchQuery, setSearchQuery] = useState(playlistInfos.title);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const deletePlayListHandler = () => {
    dispatch(deletePlayList(playlistInfos.id));
    navigate("/");
  };
  const changeTitleHandler = () => {
    dispatch(
      editPlayListTitle({
        id: playlistInfos.id,
        title: searchQuery,
      }),
    );
    setIsModalOpen(false);
  };
  return (
    <div className="fixed inset-0 z-99">
      <div className="absolute bg-black/45 inset-0" />
      <div className="absolute inset-0 grid place-items-center px-6">
        <div className="min-w-0 w-full overflow-hidden border border-white/10 max-w-md bg-white/8 backdrop-blur-xl p-5 rounded-3xl text-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Playlist settings</p>
              <h2 className="text-white mt-1 text-lg font-bold">
                Edit playlist
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
          <div className="mt-4 space-y-3">
            <h3>playlist name</h3>
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Songs, artists, or genres"
              className="w-full text-white focus:outline-0 focus:shadow-lg focus:drop-shadow-2xl focus:border-violet-300/40 focus:ring-4 focus:ring-violet-400/10 focus:bg-white/12 text-sm px-3 py-4 bg-white/8 backdrop-blur-3xl rounded-2xl placeholder:text-white/45 border border-white/15 transition-colors duration-200"
            />
            <button
              className="w-full flex items-center justify-center gap-x-2 bg-(--color-surface) text-white flex-1 py-3 rounded-full font-bold drop-shadow-lg  drop-shadow-(color:--color-surface)/50 text-sm transition-colors hover:bg-(--color-primary)"
              onClick={changeTitleHandler}
            >
              <Pencil size={19} /> Save changes
            </button>
            <button
              onClick={deletePlayListHandler}
              className="w-full flex items-center justify-center gap-x-2 border border-white/10 bg-white/3 flex-1 py-3 rounded-full font-bold text-sm text-red-500 transition-colors hover:bg-white/8"
            >
              <Trash2 size={19} /> Delete playlist
            </button>
          </div>
          <div className="flex flex-col items-center gap-y-3 mt-4 overflow-y-auto  max-h-75 "></div>
        </div>
      </div>
    </div>
  );
}
