import { Music4, Search } from "lucide-react";
import { parseBlob } from "music-metadata";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  addNewMusic,
  getAllMusics,
} from "../redux/slices/importedMusicSlice";
import React, { useEffect, useState} from "react";
import { Link } from "react-router";
import ImportedSongPageCard from "./ImportedSongPageCard";

export default function ImportMusicSect() {
  const importedMusics = useAppSelector((store) => store.importedMusics);
  const [searchQuery, setSearchQuery] = useState("");
  const searchImportedSongHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  const filteredMusics = importedMusics.filter((music) => {
    const searchableText = `
    ${music.name.toLowerCase()}
    ${music.artist.toLowerCase()}
    ${music.album?.toLowerCase() ?? ""}
  `;
    const matchesSearch = searchableText.includes(
      searchQuery.toLowerCase().trim(),
    );
    return matchesSearch;
  });
  const dispatch = useAppDispatch();
  const UploadMusicHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const metadata = await parseBlob(file);
    const picture = metadata.common.picture?.[0];
    const cover = picture
      ? new Blob([new Uint8Array(picture.data)], { type: picture.format })
      : null;
    dispatch(
      addNewMusic({
        name: metadata.common.title ?? file.name,
        artist: metadata.common.artist ?? "Unknown Artist",
        album: metadata.common.album ?? null,
        cover,
        file: file,
        duration: metadata.format.duration ?? 0,
      }),
    );
  };
  useEffect(() => {
    dispatch(getAllMusics());
  }, [dispatch]);
  return (
    <div className="flex flex-col  text-(--color-text) gap-y-3 backdrop-blur-2xl bg-(--color-text)/8 rounded-2xl p-5">
      <div className="flex items-center gap-x-3">
        <Music4 />
        <div className="flex flex-col">
          <h2>Import music</h2>
          <p className="text-(--color-text)/70">Import your songs</p>
        </div>
      </div>
      <div>
        <div className="relative">
          <Search className="absolute size-5  top-1/2 -translate-y-1/2 left-2 text-(--color-text)/50" />
          <input
            type="text"
            onChange={(e) => searchImportedSongHandler(e)}
            className="bg-(--color-primary)/10 w-full p-2 px-8 rounded-lg outline-0 border border-(--color-text)/10"
          />
        </div>
        <div>
          <input
            type="file"
            accept="audio/mpeg"
            className="hidden"
            id="MusicInput"
            onChange={UploadMusicHandler}
          />
          <label
            htmlFor="MusicInput"
            className="cursor-pointer w-full flex items-center justify-center bg-(--color-primary)/10 border border-(--color-text)/10 rounded-lg p-4 mt-4"
          >
            choose a mp3 file
          </label>
        </div>
        <div className="mt-4 flex flex-col gap-y-4 overflow-y-auto max-h-80 custom-scrollbar pr-2">
          {!searchQuery.trim()
            ? importedMusics
                .slice(0, 3)
                .map((music) => (
                  <ImportedSongPageCard
                    key={music.id}
                    music={music}
                    importedMusics={importedMusics}
                  />
                ))
            : filteredMusics.map((music) => (
                <ImportedSongPageCard
                  key={music.id}
                  music={music}
                  importedMusics={importedMusics}
                />
              ))}
        </div>
      </div>
      <div className="mt-auto">
        <Link
          to={"/profile/imported-musics"}
          className="block bg-(--color-text)/10 w-full p-3  rounded-lg border border-(color:--color-text)/15 hover:bg-(--color-text)/30 transition-colors text-center "
        >
          see all musics
        </Link>
      </div>
    </div>
  );
}
