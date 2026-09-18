import { AudioLines, Home, Library, Search, User } from "lucide-react";
import { NavLink } from "react-router";

const navLinks = [
  { id: 1, title: "Home", href: "/", icon: Home },
  { id: 2, title: "Search", href: "/search", icon: Search },
  { id: 3, title: "Player", href: "/player", icon: AudioLines },
  { id: 4, title: "Library", href: "/library", icon: Library },
  { id: 5, title: "Profile", href: "/profile", icon: User },
];
export default function BottomNav() {
  return (
    <nav className="fixed bottom-10 left-1/2 z-99 max-w-137.5 w-full px-3 -translate-x-1/2 lg:hidden">
      <ul className="flex items-center justify-between rounded-4xl border border-(--color-text)/15 bg-(--color-text)/10 px-3 py-2 shadow-2xl shadow-violet-950/40 backdrop-blur-2xl">
        {navLinks.map((LinkItem) => {
          const Icon = LinkItem.icon;
          return (
            <NavLink
              key={LinkItem.id}
              to={LinkItem.href}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs transition min-w-14 ${isActive ? "bg-(--color-text)/15 text-(--color-primary) shadow-inner shadow-white/10" : "text-(--color-text)/45 hover:text-(--color-text)"}`
              }
            >
              <Icon />
              {LinkItem.title}
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}
