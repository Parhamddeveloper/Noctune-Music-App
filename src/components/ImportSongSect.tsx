import { Palette } from "lucide-react";

export default function ImportSongSect() {
  return (
    <div className="flex flex-col  text-(--color-text) gap-y-3 backdrop-blur-2xl bg-(--color-text)/8 rounded-2xl p-5">
      <div className="flex items-center gap-x-3">
        <Palette />
        <div className="flex flex-col">
          <h2>Appearance</h2>
          <p className="text-(--color-text)/70">
            Choose your theme and make it yours
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl">Work In Progress</h2>
      </div>
    </div>
  );
}
