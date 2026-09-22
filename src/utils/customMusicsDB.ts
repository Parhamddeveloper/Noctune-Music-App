import type { ImportedMusicType } from "../types/ImportedMusicType";
import { openNoctuneDB } from "./noctuneDB";

export const getAllMusicsFromDB = async (): Promise<ImportedMusicType[]> => {
  const db = await openNoctuneDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("importedMusics", "readonly");
    const store = transaction.objectStore("importedMusics");
    const request = store.getAll();
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.onerror);
    };
  });
};

export const getMusicByIDFromDB = async (
  id: number,
): Promise<ImportedMusicType | undefined> => {
  const db = await openNoctuneDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("importedMusics", "readonly");
    const store = transaction.objectStore("importedMusics");
    const request = store.get(id);
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const AddMusicToDB = async (
  name: string,
  artist: string,
  album: string | null,
  cover: Blob | null,
  audio: Blob,
  duration: number,
): Promise<number> => {
  const db = await openNoctuneDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("importedMusics", "readwrite");
    const store = transaction.objectStore("importedMusics");
    const request = store.add({
      name,
      artist,
      album,
      cover,
      audio,
      duration,
    });

    request.onsuccess = () => {
      const id = request.result;
      if (typeof id !== "number") {
        reject(new Error("Generated music id is not a number"));
        return;
      }
      resolve(id);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const removeMusicFromDB = async (id: number): Promise<void> => {
  const db = await openNoctuneDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("importedMusics", "readwrite");
    const store = transaction.objectStore("importedMusics");
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const updateMusicFromDB = async (
  music: ImportedMusicType,
): Promise<void> => {
  const db = await openNoctuneDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("importedMusics", "readwrite");
    const store = transaction.objectStore("importedMusics");
    const request = store.put(music);
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};
