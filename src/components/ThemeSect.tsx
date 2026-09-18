import { Palette } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { toggleTheme } from "../redux/slices/themeSlice";
import type { themeType } from "../types/themeType";
const Themes: { id: number; name: themeType["theme"]; image: string }[] = [
  {
    id: 1,
    name: "midnight",
    image: "/midnight theme preview.png",
  },
  {
    id: 2,
    name: "ocean",
    image: "/ocean theme preview.png",
  },
  {
    id: 3,
    name: "sunset",
    image: "/sunset theme preview.png",
  },
  {
    id: 4,
    name: "forest",
    image: "/forest theme preview.png",
  },
  {
    id: 5,
    name: "cyber",
    image: "/cyber theme preview.png",
  },
  {
    id: 6,
    name: "light",
    image: "/light theme preview.png",
  },
];
export default function ThemeSect() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((store) => store.theme);
  return (
    <div className="flex flex-col text-(--color-text) gap-y-3 backdrop-blur-2xl bg-(--color-text)/8 rounded-2xl p-5">
      <div className="flex items-center gap-x-3">
        <Palette />
        <div className="flex flex-col">
          <h2>Theme</h2>
          <p className="text-(--color-text)/70">
            Choose your theme and make it yours
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {Themes.map((themeItem) => (
          <div
            className={`py-2 px-1.5 border transition rounded-2xl ${themeItem.name === theme ? "border-(--color-surface)/70" : "border-(--color-text)/10"}`}
            key={themeItem.id}
            onClick={() => dispatch(toggleTheme(themeItem.name))}
          >
            <img
              src={themeItem.image}
              className="rounded-xl"
              alt={themeItem.name}
            />
            <h3 className="ps-1 mt-2 text-sm capitalize">{themeItem.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
