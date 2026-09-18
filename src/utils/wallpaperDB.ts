import type { WallpaperType } from "../types/wallpaperType";

export const openWallpaperDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("noctuneDB", 3);
    request.onerror = () => {
      reject(request.error);
    };
    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("wallpapers")) {
        db.createObjectStore("wallpapers", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  });
};

export const addWallpaper = async (
  wallpaper: Blob,
  name: string
) => {
  const db = await openWallpaperDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      "wallpapers",
      "readwrite"
    );

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
  const db = await openWallpaperDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      "wallpapers",
      "readonly"
    );

    const store = transaction.objectStore("wallpapers");

    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const deleteWallpaper = async (id: number) => {
  const db = await openWallpaperDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      "wallpapers",
      "readwrite"
    );

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