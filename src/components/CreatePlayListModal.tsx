import { X } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { createPlayList } from "../redux/slices/playlistSlice";

interface CreatePlayListModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CreatePlayListModal({
  setIsModalOpen,
}: CreatePlayListModalProps) {
  const [title, setTItle] = useState("");
  const dispatch = useAppDispatch();
  const addPlayListHandler = () => {
    if (!title) {
      return;
    }

    dispatch(createPlayList(title));
    setIsModalOpen(false);
  };
  return (
    <div className="fixed inset-0 z-99">
      <div className="absolute bg-black/45 inset-0" />
      <div className="absolute inset-0 grid place-items-center px-6">
        <div className="border border-white/10 max-w-md w-full bg-white/8 backdrop-blur-xl p-5 rounded-3xl text-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">New collection</p>
              <h2 className="text-white mt-1 text-lg font-bold">
                Create playlist
              </h2>
            </div>
            <button
              aria-label="close create playlist modal"
              className="size-10 bg-white/2 backdrop-blur-2xl place-items-center rounded-full border border-white/10"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={19} />
            </button>
          </div>
          <div className="mt-6">
            <h3>Playlist name</h3>
            <input
              type="text"
              onChange={(e) => setTItle(e.target.value)}
              placeholder="Example : Night Drive"
              className="mt-2 bg-white/10 rounded-2xl backdrop-blur-2xl border border-white/10 w-full p-3 focus:outline-0 focus:border-2 focus:border-violet-300/40 focus:drop-shadow-xl focus:drop-shadow-violet-400 focus:text-white"
            />
          </div>
          <div className="flex items-center gap-x-3 mt-6">
            <button
              className="bg-white/4 backdrop-blur-2xl border border-white/10 flex-1 py-3 rounded-full text-sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              onClick={addPlayListHandler}
              className="bg-blue-600 text-white flex-1 py-3 rounded-full font-bold drop-shadow-lg  drop-shadow-blue-500/50 text-sm disabled:opacity-35 disabled:drop-shadow-none"
              disabled={!title}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
