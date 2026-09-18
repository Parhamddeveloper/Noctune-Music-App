import WallpaperSect from "../components/WallpaperSect";
import ThemeSect from "../components/ThemeSect";
import ImportSongSect from "../components/ImportSongSect";

export default function ProfilePage() {
  return (
    <>
      <div className="mt-8">
        <p className="text-(--color-text)/50 text-sm mt-2">
          Manage your theme and music preferences.
        </p>
        <h1 className="text-(--color-text) text-3xl font-bold mt-1">Profile</h1>
      </div>
      <div className="mt-7">
        <div className="grid-cols-3 grid gap-x-5">
          <ThemeSect />
          <WallpaperSect />
          <ImportSongSect/>
        </div>
      </div>
    </>
  );
}
