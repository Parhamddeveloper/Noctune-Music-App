import WallpaperSect from "../components/WallpaperSect";
import ThemeSect from "../components/ThemeSect";
import ImportSongSect from "../components/ImportSongSect";
import { useState } from "react";
import { Music4, Palette, Wallpaper } from "lucide-react";
import useMediaQuery from "../hooks/useMediaQuery";

interface tabType {
  tabname: string;
  element: React.ComponentType;
}
export default function ProfilePage() {
  const Tabs: tabType[] = [
    { tabname: "theme", element: ThemeSect },
    { tabname: "wallpaper", element: WallpaperSect },
    { tabname: "importedMusic", element: ImportSongSect },
  ];
  const [selectedTab, setSelectedTab] = useState("theme");
  const activeTab = Tabs.find((tab) => tab.tabname === selectedTab);
  const ActiveComponent = activeTab?.element;
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  return (
    <>
      {isDesktop ? (
        <div className="hidden xl:block">
          <div className="mt-8">
            <p className="text-(--color-text)/50 text-sm mt-2">
              Manage your theme and music preferences.
            </p>
            <h1 className="text-(--color-text) text-3xl font-bold mt-1">
              Profile
            </h1>
          </div>
          <div className="mt-7">
            <div className="grid-cols-3 grid gap-x-5">
              <ThemeSect />
              <WallpaperSect />
              <ImportSongSect />
            </div>
          </div>
        </div>
      ) : (
        <div className="block xl:hidden">
          <div className="mt-8">
            <p className="text-(--color-text)/50 text-md mt-2">
              Manage your theme and music preferences.
            </p>
            <h1 className="text-(--color-text) text-3xl font-bold mt-1">
              Profile
            </h1>
          </div>
          <div className="mt-10">
            <div className="grid-cols-3 grid gap-x-5 text-(--color-text)/70">
              <button
                className={`flex items-center justify-center ${selectedTab === "theme" && "text-(--color-primary)"}`}
                onClick={() => setSelectedTab("theme")}
              >
                <Palette size={35} />
              </button>
              <button
                className={`flex items-center justify-center ${selectedTab === "wallpaper" && "text-(--color-primary)"}`}
                onClick={() => setSelectedTab("wallpaper")}
              >
                <Wallpaper size={35} />
              </button>
              <button
                className={`flex items-center justify-center ${selectedTab === "importedMusic" && "text-(--color-primary)"}`}
                onClick={() => setSelectedTab("importedMusic")}
              >
                <Music4 size={35} />
              </button>
            </div>
            <div className="mt-6">{ActiveComponent && <ActiveComponent />}</div>
          </div>
        </div>
      )}
    </>
  );
}
