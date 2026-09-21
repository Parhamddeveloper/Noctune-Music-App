import { createBrowserRouter } from "react-router";
import AppLayout from "./layout/AppLayout";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import PlayerPage from "./pages/PlayerPage";
import LibraryPage from "./pages/LibraryPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import PlayListInfoPage from "./pages/PlayListInfoPage";
import ImportedMusicPage from "./pages/ImportedMusicPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "player",
        element: <PlayerPage />,
      },
      {
        path: "library",
        element: <LibraryPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "playlist/:playlistId",
        element: <PlayListInfoPage />,
      },
      {
        path: "profile/imported-musics",
        element: <ImportedMusicPage />,
      },
    ],
  },
]);
