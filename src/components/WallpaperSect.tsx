// import { Trash, Wallpaper, X } from "lucide-react";

import { Wallpaper } from "lucide-react";

// import { useAppSelector } from "../hooks/hooks";
export default function WallpaperSect() {
  // const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if(!file) return;
  // }
  // const wallpapers = useAppSelector((state) => state.wallpaper.wallpapers);
  // const currentWallpaper = useAppSelector(
  //   (state) => state.wallpaper.currentWallpaper,
  // );
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
          {/* <div className="w-full relative">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdMdanxYdzw9Usr_9V7aDz1mQODmjhXnCADTyePJYxNw&s" className="w-full" />
            <button className="absolute top-2 right-2 bg-(--color-text)/20 p-1 rounded-full hover:bg-(--color-text)/40 transition-all">
              <X />
            </button>
          </div>
          <div className="flex gap-x-3 mt-3">
            <input type="file" onChange={uploadHandler} placeholder="upload Image" accept="image/*" className="flex-1 line- text-center rounded-lg bg-(--color-primary)/20 placeholder:text-(--color-text)/70 border border-(--color-text)/10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="bg-(--color-text)/20 hover:bg-(--color-text)/40 p-3  rounded-lg transition-all flex gap-x-3 items-center justify-center flex-1"><Trash size={20}/>Remove</button>
          </div> */}
          <h2 className="text-2xl">Work In Progress</h2>
        </div>
      </div>
    </>
  );
}
