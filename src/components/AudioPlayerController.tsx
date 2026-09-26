import { Dot, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  goNextSong,
  goPreviousSong,
  togglePlay,
} from "../redux/slices/playerSlice";
import { formatTime } from "../utils/formatTime";
import { motion } from "framer-motion";
export default function AudioPlayerController() {
  const dispatch = useAppDispatch();
  const { currentSong, isPlaying, currentTime } = useAppSelector(
    (state) => state.player,
  );
  return (
    <motion.div
      className="fixed bottom-30 lg:hidden left-1/2 z-10 max-w-137.5 md:max-w-180 w-full px-3 -translate-x-1/2"
      initial={{
        y: 80,
        width: 40,
        opacity: 0,
      }}
      animate={{
        y: [80, -10, 0],
        width:"100%",
        opacity: [0, 1, 1],
      }}
      transition={{
        duration: 0.8,
        times: [0, 0.4, 1],
        ease: "easeOut",
      }}
    >
      <div className="rounded-[1.75rem] border border-(--color-text)/15 bg-(--color-text)/10 p-2.5 shadow-2xl shadow-violet-950/50 backdrop-blur-3xl">
        <motion.div
          className="flex items-center gap-3"
          initial={{
            opacity: 0,
            y: 5,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.55,
            duration: 0.25,
            ease: "easeOut",
          }}
        >
          <Link to="/player" className="flex min-w-0 flex-1 items-center gap-3">
            <img
              className="size-12 rounded-2xl object-cover"
              src={currentSong?.cover}
            />

            <div className="min-w-0">
              <h3 className="text-(--color-text) text-sm font-semibold truncate">
                {currentSong?.title}
              </h3>

              <p className="mt-0.5 truncate text-xs text-(--color-text)/50 ">
                {currentSong?.artist}
                <span>
                  <Dot size={14} className="inline" />
                </span>
                {formatTime(currentTime)}
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-1">
            <motion.button
              type="button"
              aria-label="Previous song"
              className="grid size-9 place-items-center rounded-full text-(--color-player-icons)/55 transition hover:bg-(--color-text)/10 hover:text-(--color-primary)"
              onClick={() => dispatch(goPreviousSong())}
            >
              <SkipBack size={18} />
            </motion.button>

            <motion.button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-white/20 bg-linear-to-br from-(--color-primary)/80 to-fuchsia-500/70 shadow-lg shadow-violet-500/25 transition hover:scale-105 text-white"
              onClick={() => dispatch(togglePlay())}
            >
              {isPlaying ? <Pause fill="white" /> : <Play fill="white" />}
            </motion.button>

            <motion.button
              type="button"
              aria-label="Next song"
              className="grid size-9 place-items-center rounded-full text-(--color-player-icons)/55 transition hover:bg-(--color-text)/10 hover:text-(--color-primary)"
              onClick={() => dispatch(goNextSong())}
            >
              <SkipForward size={18} />
            </motion.button>
          </div>{" "}
        </motion.div>
      </div>
    </motion.div>
  );
}
