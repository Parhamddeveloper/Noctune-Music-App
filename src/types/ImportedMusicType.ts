export type ImportedMusicType = {
  id: number;
  name: string;
  artist: string;
  album: string | null;
  cover: Blob | null;
  audio: Blob;
  duration: number;
};

export type ImportedMusicStateType = {
  id: number;
  name: string;
  artist: string;
  album: string | null;
  coverURL: string | null;
  duration: number;
};
