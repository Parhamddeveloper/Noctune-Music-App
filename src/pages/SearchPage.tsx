import { useRef, useState } from "react";
import AudioBrowse from "../components/AudioBrowse";
import { songs } from "../data/songs";
import { genres } from "../data/genres";
import { Search } from "lucide-react";
import AddSongToPlayListModal from "../components/AddSongToPlayListModal";
import type { Song } from "../types/songType";

export default function SearchPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const trimmedSearchQuery = searchQuery.trim().toLowerCase();
  const FilteredSongs = songs.filter((song) => {
    const searchableText = `
      ${song.title.toLowerCase()}
      ${song.artist.toLowerCase()}
      ${song.genre.toLowerCase()}
    `;
    const matchesSearch = searchableText.includes(trimmedSearchQuery);
    const matchesGenre =
      selectedGenre === "All" || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <>
      {isModalOpen && (
        <AddSongToPlayListModal
          setIsModalOpen={setIsModalOpen}
          selectedSong={selectedSong}
        />
      )}
      <div className="mt-8">
        <p className="text-white/50 text-sm">Find your sound</p>
        <h1 className="text-white text-3xl font-bold mt-1">Search</h1>
      </div>
      <div className="mt-5">
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          ref={inputRef}
          placeholder="Songs, artists, or genres"
          className="w-full text-white focus:outline-0 focus:shadow-lg focus:drop-shadow-2xl focus:border-violet-300/40 focus:ring-4 focus:ring-violet-400/10 focus:bg-white/12 text-sm px-3 py-4 bg-white/8 backdrop-blur-3xl rounded-2xl placeholder:text-white/45 border border-white/15 transition-colors duration-200"
        />
        <div className="w-full flex justify-center gap-x-3 mt-3 text-sm overflow-x-auto ps-4">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.name)}
              className={`border  px-4 py-2   backdrop-blur-2xl  rounded-full transition-colors shrink-0 ${selectedGenre === genre.name ? "bg-violet-500/25 border-violet-300/40 text-violet-200" : "bg-white/8 border-white/10 hover:bg-white/10 text-white/50"}`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
      {!trimmedSearchQuery ? (
        <div className="mt-8 text-white/95 font-bold">
          {selectedGenre === "All" ? (
            <h2>Browse all songs</h2>
          ) : FilteredSongs.length > 0 ? (
            <h2>Browse {selectedGenre} songs</h2>
          ) : (
            <div className="flex flex-col items-center mt-20 gap-y-3">
              <button
                className="size-18 place-items-center bg-white/8 backdrop-blur-2xl rounded-full border border-white/10"
                aria-label="focus to search input"
                onClick={() => inputRef.current?.focus()}
              >
                <Search size={28} className="text-violet-300" />
              </button>
              <h2 className="font-bold text-white text-xl">No results found</h2>
              <p className="text-white/50 text-center">
                We couldn't find a song with
                <span className="block">"{selectedGenre}" genre.</span>
              </p>
            </div>
          )}
          <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {FilteredSongs.map((song) => (
              <AudioBrowse
                key={song.id}
                Song={song}
                setIsModalOpen={setIsModalOpen}
                setSelectedSong={setSelectedSong}
              />
            ))}
          </div>
        </div>
      ) : FilteredSongs.length > 0 ? (
        <div className="mt-8 text-white/95 font-bold">
          <h2>Browse all songs</h2>
          <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {FilteredSongs.map((song) => (
              <AudioBrowse
                key={song.id}
                Song={song}
                setIsModalOpen={setIsModalOpen}
                setSelectedSong={setSelectedSong}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20 gap-y-3">
          <button
            className="size-18 place-items-center bg-white/8 backdrop-blur-2xl rounded-full border border-white/10"
            aria-label="focus to search input"
            onClick={() => inputRef.current?.focus()}
          >
            <Search size={28} className="text-violet-300" />
          </button>
          <h2 className="font-bold text-white text-xl">No results found</h2>
          <p className="text-white/50 text-center">
            We couldn't find anything matching
            <span className="block">"{searchQuery}".</span>
          </p>
        </div>
      )}
    </>
  );
}
