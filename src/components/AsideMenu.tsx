import { AudioLines, Home, Library, Plus, Search, User } from "lucide-react";
import { Link, NavLink } from "react-router";
import { useAppSelector } from "../hooks/hooks";
import PlayListCard from "./PlayListCard";

const navLinks = [
  { id: 1, title: "Home", href: "/", icon: Home },
  { id: 2, title: "Search", href: "/search", icon: Search },
  { id: 3, title: "Player", href: "/player", icon: AudioLines },
  { id: 4, title: "Library", href: "/library", icon: Library },
  { id: 5, title: "Profile", href: "/profile", icon: User },
];
export default function AsideMenu() {
  const { playLists } = useAppSelector((state) => state.playlists);
  const latestFourPlayLists = playLists.slice(0, 4).reverse();
  return (
    <aside className="hidden fixed lg:block left-0 top-0 w-70 h-full text-white  p-5 z-99 ">
      <div className="border-white/10 border bg-white/5 backdrop-blur-lg h-full rounded-2xl flex flex-col  py-4 px-4">
        <div className="flex items-center gap-x-2">
          <img src="App logo.png" alt="Noctune logo" className="size-12" />
          <span className="text-2xl">Noctune</span>
        </div>
        <hr className="w-full bg-white opacity-30 my-4" />
        <nav className="flex flex-col w-full gap-y-2">
          {navLinks.map((Link) => {
            const Icon = Link.icon;
            return (
              <NavLink
                key={Link.id}
                to={Link.href}
                className={({ isActive }) =>
                  `${isActive && "bg-linear-to-r from-violet-500/25 to-cyan-400/2 border border-white/10"} flex items-center gap-x-4 text-xl w-full ps-2 py-3 rounded-2xl`
                }
              >
                <Icon size={28} />
                <span>{Link.title}</span>
              </NavLink>
            );
          })}
        </nav>
        <hr className="w-full bg-white opacity-30 my-4" />
        <div className="flex justify-between items-center">
          <h2 className="text-white/50">YOUR LIBRARY</h2>
          <Link to={"/library"}>
            <button
              aria-label="add new playlist"
              className="hover:rotate-90 transition-transform duration-300"
            >
              <Plus className="text-white/70" />
            </button>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-y-3">
          {latestFourPlayLists.map((playListItem) => (
            <PlayListCard
              key={playListItem.id}
              Playlist={playListItem}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
