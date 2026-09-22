import type { WallpaperDBType } from "../types/wallpaperDBType";
import type { WallpaperType } from "../types/wallpaperType";
import { openNoctuneDB } from "./noctuneDB";

export const addWallpaper = async (wallpaper: Blob, name: string) => {
  const db = await openNoctuneDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("wallpapers", "readwrite");

    const store = transaction.objectStore("wallpapers");

    const request = store.add({
      name,
      image: wallpaper,
    });

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const getWallpapers = async (): Promise<WallpaperType[]> => {
  const db = await openNoctuneDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("wallpapers", "readonly");

    const store = transaction.objectStore("wallpapers");

    const request = store.getAll();

    request.onsuccess = () => {
      const wallpapers: WallpaperType[] = request.result.map(
        (wallpaper: WallpaperDBType) => ({
          id: wallpaper.id,
          name: wallpaper.name,
          image: URL.createObjectURL(wallpaper.image),
        }),
      );

      resolve(wallpapers);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const deleteWallpaper = async (id: number) => {
  const db = await openNoctuneDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("wallpapers", "readwrite");

    const store = transaction.objectStore("wallpapers");

    const request = store.delete(id);

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};
