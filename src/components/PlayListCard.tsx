import { Link } from "react-router";
import type { playlist } from "../types/playListType";

interface playListProps {
  Playlist: playlist;
}
export default function PlayListCard({ Playlist }: playListProps) {
  return (
    <Link to={`/playlist/${Playlist.id}`}>
      <div className="bg-(--color-text)/8 backdrop-blur-2xl border border-(--color-text)/10 rounded-2xl p-4">
        <h3 className="font-bold truncate">{Playlist.title}</h3>
        <p className="text-sm text-(--color-text)/50 mt-1.5">
          {Playlist.songs.length} songs
        </p>
      </div>
    </Link>
  );
}
