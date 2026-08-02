import { Bell, Search } from "lucide-react";
import SongCard from "../components/SongCard";
import { songs } from "../data/songs";

export default function HomePage() {
  return (
    <>
      <div className="flex justify-between pt-5">
        <div className="flex flex-col gap-y-2">
          <p className="text-white/45">Good evening</p>
          <h1 className="text-white text-3xl font-bold">Discover Music</h1>
        </div>
        <div className="flex gap-x-3">
          <button
            aria-label="search button"
            className="text-white/80 size-11 bg-white/8 backdrop-blur-2xl grid place-items-center rounded-full border border-white/10"
          >
            <Search size={19} />
          </button>
          <button
            aria-label="notification button"
            className="text-white/80 size-11 bg-white/8 backdrop-blur-2xl grid place-items-center rounded-full border border-white/10"
          >
            <Bell size={19} />
          </button>
        </div>
      </div>

      <div className=" border border-white/15 bg-linear-to-br from-violet-500/25 via-fuchsia-500/10 to-cyan-400/10 p-5 shadow-2xl shadow-violet-950/30 backdrop-blur-3xl text-white rounded-3xl mt-5">
        <div className="w-4/6 md:w-full flex flex-col gap-y-5 items-start">
          <p className="text-violet-300">Featured Playlist</p>
          <h2 className="font-bold text-3xl">
            Music for your midnight <br className="md:hidden" /> mood
          </h2>
          <p className="text-white/60">
            Dreamy sounds, soft synths, and late-night energy.
          </p>
          <button className="bg-cyan-500/40 py-2 px-6 rounded-full border border-white/20">
            Play playlist
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mt-10">
          <h2 className="text-white font-bold text-lg">Made for you</h2>
          <p className="text-violet-300 text-sm">View all</p>
        </div>
        <div className="flex overflow-x-auto gap-4 pt-4 -mx-5 px-5 mt-4">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </>
  );
}
