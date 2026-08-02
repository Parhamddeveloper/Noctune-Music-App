import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useRef } from "react";
import {
  clearSeek,
  getSongDuration,
  GoNextSong,
  setCurrentTime,
  songEnded,
} from "../redux/slices/playerSlice";

export default function AudioPlayer() {
  const { currentSong, isPlaying, volume, isMuted, seekTo, loop } =
    useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!audioref.current || !currentSong) return;
    audioref.current.src = currentSong.audio;
    audioref.current.load();
    dispatch(setCurrentTime(0));
    if (isPlaying) audioref.current.play();
  }, [currentSong]);

  useEffect(() => {
    if (audioref.current) {
      if (isPlaying) {
        audioref.current
          .play()
          .catch(() => console.error("Cannot play audio, please try again"));
      } else {
        audioref.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioref.current) return;
    if (isMuted) audioref.current.muted = true;
    else {
      audioref.current.muted = false;
      audioref.current.volume = volume / 100;
    }
  }, [volume, isMuted]);
  useEffect(() => {
    if (!audioref.current) return;
    if (seekTo !== null) audioref.current.currentTime = seekTo;
  }, [seekTo]);
  const audioref = useRef<HTMLAudioElement>(null);
  return (
    <audio
      ref={audioref}
      onTimeUpdate={() => {
        if (!audioref.current) return;
        dispatch(setCurrentTime(audioref.current.currentTime));
      }}
      onLoadedMetadata={() =>
        dispatch(getSongDuration(audioref.current!.duration))
      }
      onEnded={() => {
        if (loop === "one" || loop === "infinite") {
          dispatch(songEnded());
          audioref.current!.play();
        } else {
          dispatch(GoNextSong());
          dispatch(clearSeek());
        }
      }}
    />
  );
}
