import { Bell, Search } from "lucide-react";
import SongCard from "../components/SongCard";
import { songs } from "../data/songs";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <>
      <div className="flex justify-between pt-5">
        <div className="flex flex-col gap-y-2">
          <p className="text-(--color-text)/45">Good evening</p>
          <h1 className="text-(--color-text) text-3xl font-bold">
            Discover Music
          </h1>
        </div>
        <div className="flex gap-x-3">
          <Link
            to={"/search"}
            aria-label="search button"
            className="text-(--color-text)/80 size-11 bg-white/8 backdrop-blur-2xl grid place-items-center rounded-full border border-(--color-text)/10"
          >
            <Search size={19} />
          </Link>
          <button
            aria-label="notification button"
            className="text-(--color-text)/80 size-11 bg-white/8 backdrop-blur-2xl grid place-items-center rounded-full border border-(--color-text)/10"
          >
            <Bell size={19} />
          </button>
        </div>
      </div>

      <div className=" border border-(--color-text)/15 bg-linear-to-br from-(--color-surface)/25 via-fuchsia-500/10 to-cyan-400/10 p-5 shadow-2xl shadow-violet-950/30 backdrop-blur-3xl text-(--color-text) rounded-3xl mt-5">
        <div className="w-4/6 md:w-full flex flex-col gap-y-5 items-start">
          <p className="text-(--color-primary)">Featured Playlist</p>
          <h2 className="font-bold text-3xl">
            Music for your <br className="md:hidden" /> mood
          </h2>
          <p className="text-(--color-text)/60">
            Dreamy sounds, soft synths, and late-night energy.
          </p>
          <Link to={"/library"}>
            <button className="bg-cyan-500/40 py-2 px-6 rounded-full border border-white/20 transition-colors hover:bg-cyan-600/30">
              Play playlist
            </button>
          </Link>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mt-10">
          <h2 className="text-(--color-text) font-bold text-lg">
            Made for you
          </h2>
          <p className="text-(--color-primary) text-sm">View all</p>
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
