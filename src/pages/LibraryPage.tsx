import { Heart, LibraryBig, Plus } from "lucide-react";
import { useAppSelector } from "../hooks/hooks";
import FavouriteSongCard from "../components/FavouriteSongCard";
import { useState } from "react";
import CreatePlayListModal from "../components/CreatePlayListModal";
import PlayListCard from "../components/PlayListCard";

export default function LibraryPage() {
  const { favouriteSongs } = useAppSelector((state) => state.favourites);
  const [isPlayListModalOpen, setIsPlayListModalOpen] = useState(false);
  const { playLists } = useAppSelector((state) => state.playlists);
  
  return (
    <>
      {isPlayListModalOpen && (
        <CreatePlayListModal setIsModalOpen={setIsPlayListModalOpen} />
      )}
      <div className="mt-8">
        <p className="text-white/50 text-sm">Your collection</p>
        <h1 className="text-white text-3xl font-bold mt-1">Library</h1>
      </div>
      <div className="border border-white/15 bg-linear-to-br from-violet-500/25 via-fuchsia-500/10 to-cyan-400/10 p-5 shadow-2xl shadow-violet-950/30 backdrop-blur-3xl text-white rounded-4xl mt-5">
        <div className="flex items-center gap-x-3">
          <div className="shrink-0 bg-white/8 backdrop-blur-2xl border border-violet-300/35 size-14 rounded-2xl grid place-items-center text-violet-300">
            <Heart fill="currentColor" />
          </div>
          <div>
            <h2 className="font-bold text-md">Liked songs</h2>
            <p className="text-sm text-white/50">
              {favouriteSongs.length} songs
            </p>
          </div>
        </div>
      </div>
      {favouriteSongs.length > 0 ? (
        <div className="mt-7 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {favouriteSongs.map((favouriteSong) => (
            <FavouriteSongCard key={favouriteSong} id={favouriteSong} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20 gap-y-3 mb-45">
          <button
            className="size-18 place-items-center bg-white/8 backdrop-blur-2xl rounded-full border border-white/10"
            aria-label="focus to search input"
          >
            <LibraryBig size={28} className="text-violet-300" />
          </button>
          <h2 className="font-bold text-white text-xl">
            Your library is empty
          </h2>
          <p className="text-white/50 text-center text-sm">
            Like some songs and they will appear here.
          </p>
        </div>
      )}
      <div className="text-white">
        <div className="flex justify-between items-center mt-8">
          <h2 className="text-xl font-bold">Your playlists</h2>
          <button
            className="flex items-center gap-x-1 bg-white/8 px-3 py-2 rounded-full border border-white/10 text-sm"
            onClick={() => setIsPlayListModalOpen(true)}
          >
            Create
            <Plus size={17} />
          </button>
        </div>
        <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playLists.map((playListItem) => (
            <PlayListCard key={playListItem.id} Playlist={playListItem} />
          ))}
        </div>
      </div>
    </>
  );
}
