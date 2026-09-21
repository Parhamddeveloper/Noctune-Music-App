import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getAllMusics } from "../redux/slices/importedMusicSlice";
import { File, LibraryBig } from "lucide-react";
import ImportedSongCard from "../components/ImportedSongCard";

export default function ImportedMusicPage() {
  const importedMusics = useAppSelector((store) => store.importedMusics);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllMusics());
  }, [dispatch]);
  return (
    <>
      <div className="mt-8">
        <p className="text-(--color-text)/50 text-sm">Your taste</p>
        <h1 className="text-(--color-text) text-3xl font-bold mt-1">
          Imported songs
        </h1>
      </div>
      <div className="border border-white/15 bg-linear-to-br from-(--color-surface)/25 via-fuchsia-500/10 to-cyan-400/10 p-5 shadow-2xl shadow-violet-950/30 backdrop-blur-3xl text-white rounded-4xl mt-5">
        <div className="flex items-center gap-x-3">
          <div className="shrink-0 bg-white/8 backdrop-blur-2xl border border-violet-300/35 size-14 rounded-2xl grid place-items-center text-(--color-primary)">
            <File fill="currentColor" />
          </div>
          <div>
            <h2 className="font-bold text-md text-(--color-text)">
              Imported songs
            </h2>
            <p className="text-sm text-(--color-text)/50">
              {importedMusics.length} songs
            </p>
          </div>
        </div>
      </div>
      {importedMusics.length > 0 ? (
        <div className="mt-7 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {importedMusics.map((music) => (
            <ImportedSongCard key={music.id} song={music} importedMusics={importedMusics} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20 gap-y-3 mb-45">
          <button
            className="size-18 place-items-center bg-(--color-text)/8 backdrop-blur-2xl rounded-full border border-(--color-text)/10"
            aria-label="focus to search input"
          >
            <LibraryBig size={28} className="text-(--color-primary)" />
          </button>
          <h2 className="font-bold text-(--color-text) text-xl">
            Your library is empty
          </h2>
          <p className="text-(--color-text)/50 text-center text-sm">
            Like some songs and they will appear here.
          </p>
        </div>
      )}
    </>
  );
}
