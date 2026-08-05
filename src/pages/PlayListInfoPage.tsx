import { ArrowLeft, Ellipsis, Music } from "lucide-react";
import { Link, useParams } from "react-router";
import { useAppSelector } from "../hooks/hooks";
import { songs } from "../data/songs";
import PlayListSongsCard from "../components/playListSongsCard";
import { useState } from "react";
import EditPlayListModal from "../components/EditPlayListModal";
export default function PlayListInfoPage() {
  const { playlistId } = useParams();
  const playlist = useAppSelector((state) =>
    state.playlists.playLists.find(
      (playListItem) => playListItem.id === playlistId,
    ),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!playlist)
    return (
      <h2 className="text-2xl text-white font-bold text-center mt-6">
        Playlist not found
      </h2>
    );
  const playListSongs = songs.filter((song) =>
    playlist.songs.includes(song.id),
  );
  return (
    <>
      {isModalOpen && (
        <EditPlayListModal
          setIsModalOpen={setIsModalOpen}
          playlistInfos={playlist}
        />
      )}
      <div className="flex justify-between items-center pt-5 gap-x-3">
        <div className="flex items-center gap-x-4 min-w-0">
          <Link to={"/library"}>
            <button
              aria-label="search button"
              className="text-white/80 size-11 bg-white/8 backdrop-blur-2xl grid place-items-center rounded-full border border-white/10 shrink-0 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={19} />
            </button>
          </Link>
          <div className="flex flex-col gap-y-2 min-w-0">
            <p className="text-white/45">playlist</p>
            <h1 className="text-white text-xl font-bold truncate">Discover </h1>
          </div>
        </div>
        <div className="flex gap-x-3">
          <button
            aria-label="notification button"
            className="text-white/80 size-11 bg-white/8 backdrop-blur-2xl grid place-items-center rounded-full border border-white/10 hover:bg-white/20 transition-colors"
            onClick={()=> setIsModalOpen(true)}
          >
            <Ellipsis size={19} />
          </button>
        </div>
      </div>
      <div className=" border border-white/15 bg-linear-to-br from-violet-500/25 via-fuchsia-500/10 to-cyan-400/10 p-5 shadow-2xl shadow-violet-950/30 backdrop-blur-3xl text-white rounded-3xl mt-5">
        <div className="w-4/6 md:w-full flex flex-col items-start">
          <div className="grid text-violet-300 size-15 bg-white/8 backdrop-blur-2xl place-items-center rounded-2xl border border-violet-300/30">
            <Music size={26} />
          </div>
          <p className="text-lg font-bold mt-5">{playlist.title}</p>
          <p className="text-white/50 mt-2">{playlist.songs.length} songs</p>
        </div>
      </div>
      <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playListSongs.map((playlistSong) => (
          <PlayListSongsCard key={playlistSong.id} song={playlistSong} />
        ))}
      </div>
    </>
  );
}
