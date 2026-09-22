export const openNoctuneDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("noctuneDB", 4);

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

      if (!db.objectStoreNames.contains("importedMusics")) {
        db.createObjectStore("importedMusics", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  });
};
