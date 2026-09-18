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
        <p className="text-(--color-text)/50 text-sm">Find your sound</p>
        <h1 className="text-(--color-text) text-3xl font-bold mt-1">Search</h1>
      </div>
      <div className="mt-5">
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          ref={inputRef}
          placeholder="Songs, artists, or genres"
          className="w-full text-(--color-text) focus:outline-0 focus:shadow-lg focus:drop-shadow-2xl focus:border-(--color-primary)/40 focus:ring-4 focus:ring-(--color-primary)/5 focus:bg-(--color-text)/12 text-sm px-3 py-4 bg-(--color-text)/8 backdrop-blur-3xl rounded-2xl placeholder:text-(--color-text)/45 border border-white/15 transition-colors duration-200"
        />
        <div className="w-full flex justify-center gap-x-3 mt-3 text-sm overflow-x-auto ps-4">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.name)}
              className={`border  px-4 py-2   backdrop-blur-2xl  rounded-full transition-colors shrink-0 ${selectedGenre === genre.name ? "bg-(--color-surface)/25 border-(--color-primary)/40 text-(--color-primary)" : "bg-(--color-text)/8 border-(--color-text)/10 hover:bg-(--color-text)/10 text-(--color-text)/50"}`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
      {!trimmedSearchQuery ? (
        <div className="mt-8 text-(--color-text)/95 font-bold">
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
                <Search size={28} className="text-(--color-primary)" />
              </button>
              <h2 className="font-bold text-(--color-text) text-xl">No results found</h2>
              <p className="text-(--color-text)/50 text-center">
                We couldn't find a song with
                <span className="block">"{selectedGenre}" genre.</span>
              </p>
            </div>
          )}
          <div className="mt-3 grid md:grid-cols-2 xl:grid-cols-3 gap-3">
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
          <h2 className="font-bold text-(--color-text) text-xl">No results found</h2>
          <p className="text-(--color-text)/50 text-center">
            We couldn't find anything matching
            <span className="block">"{searchQuery}".</span>
          </p>
        </div>
      )}
    </>
  );
}
