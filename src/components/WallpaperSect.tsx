import { Check, Trash, Wallpaper, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  addNewWallpaper,
  changeWallpaper,
  deleteWallpaper,
  setDefaultWallpaper,
} from "../redux/slices/wallpaperSlice";
export default function WallpaperSect() {
  const currentWallpaper = useAppSelector(
    (state) => state.wallpaper.currentWallpaper,
  );
  const currentWallpaperID = useAppSelector(
    (state) => state.wallpaper.currentWallpaperID,
  );
  const wallpapers = useAppSelector((state) => state.wallpaper.wallpapers);
  const dispatch = useAppDispatch();
  const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await dispatch(
      addNewWallpaper({ wallpaper: file, name: file.name }),
    ).unwrap();
    dispatch(changeWallpaper(result));
  };
  return (
    <>
      <div className="flex flex-col text-(--color-text) gap-y-3 backdrop-blur-2xl bg-(--color-text)/8 rounded-2xl p-5">
        <div className="flex items-center gap-x-3">
          <Wallpaper />
          <div className="flex flex-col">
            <h2>Wallpaper</h2>
            <p className="text-(--color-text)/70">Set a custom wallpaper</p>
          </div>
        </div>
        <div>
          <div className="w-full relative">
            {currentWallpaper ? (
              <>
                <div className="aspect-video overflow-hidden rounded-2xl">
                  <img
                    src={currentWallpaper}
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() => dispatch(setDefaultWallpaper())}
                    className="absolute top-2 right-2 bg-(--color-text)/20 p-1 rounded-full hover:bg-(--color-text)/40 transition-all z-999"
                  >
                    <X />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex aspect-video justify-center items-center bg-(--color-text)/10 rounded-lg border border-(--color-surface)">
                  <h3>No image selected</h3>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-x-3 mt-3">
            <input
              id="wallpaper-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={uploadHandler}
            />

            <label
              htmlFor="wallpaper-upload"
              className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3"
            >
              Add wallpaper
            </label>
            <button
              type="button"
              onClick={() => dispatch(setDefaultWallpaper())}
              disabled={currentWallpaperID === null}
              className="
              flex-1
    rounded-xl
    border border-white/10
    bg-white/5
    px-4 py-2
    text-white
    backdrop-blur-md
    transition
    hover:bg-white/10
    disabled:cursor-not-allowed
    disabled:opacity-40
  "
            >
              Set default wallpaper
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 overflow-y-auto mt-3">
            {wallpapers.length === 0 && (
              <div className="flex justify-center items-center h-20 flex-1 bg-(--color-text)/10 rounded-lg border border-(--color-surface) col-span-full">
                <h3>No wallpapers added</h3>
              </div>
            )}
            {wallpapers.map((wallpaper) => (
              <div
                key={wallpaper.id}
                className={`
    relative overflow-hidden rounded-2xl
    aspect-video border
    ${
      currentWallpaperID === wallpaper.id
        ? "border-(--color-primary)"
        : "border-white/10"
    }
  `}
              >
                <button
                  type="button"
                  onClick={() => dispatch(changeWallpaper(wallpaper))}
                  className="absolute inset-0 h-full w-full"
                >
                  <img
                    src={wallpaper.image}
                    alt={wallpaper.name}
                    className="h-full w-full object-cover"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(deleteWallpaper(wallpaper.id))}
                  className="
      absolute left-3 top-3 z-10
      flex size-8 items-center justify-center
      rounded-full
      bg-black/40
      text-white
      backdrop-blur-md
      transition
      hover:bg-red-500
    "
                >
                  <Trash />
                </button>
                {currentWallpaperID === wallpaper.id && (
                  <div className="pointer-events-none absolute top-3 right-3  flex size-8 items-center justify-center  rounded-full  bg-(--color-surface) text-white">
                    <Check />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
