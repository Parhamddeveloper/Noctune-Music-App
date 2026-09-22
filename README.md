# 🎵 Noctune - Modern Music Player

A modern and customizable music player built with React and TypeScript, featuring local MP3 imports, persistent storage, playback queues, custom wallpapers, and more.

---

## 💻 Live Demo

🔗 **[View Live Project](https://noctune-music-app.vercel.app/)**

---

## ⚡ Highlights

- 🎵 Import and play local MP3 files
- 💾 Persistent local storage using IndexedDB
- 🖼️ Automatic album cover and metadata extraction
- 🎨 Custom wallpaper support
- 🔀 Queue-based playback with Shuffle, Next, and Previous
- 🔁 Multiple loop modes
- 🔎 Search imported music by title, artist, or album
- 📱 Responsive modern interface

---

## 🛠️ Tech Stack & Tools

- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- IndexedDB
- music-metadata
- Vite

---

## ✨ App Features

- Local Music Import: Import MP3 files directly from your device and keep them available between sessions.

- Metadata Extraction: Automatically extracts song title, artist, album, duration, and embedded album artwork from imported MP3 files.

- Persistent Music Library: Imported audio files and their metadata are stored locally using IndexedDB.

- Music Player: Play, pause, seek, control volume, mute, and manage playback directly from the player.

- Playback Queue: Each music collection creates its own playback queue for Next and Previous navigation.

- Shuffle Mode: Play random tracks from the active queue while avoiding the currently playing song.

- Loop Modes: Control how tracks repeat using the available playback loop modes.

- Built-in & Imported Music: Supports both bundled tracks and user-imported music with separate source identification.

- Music Search: Search imported tracks by song title, artist, or album.

- Delete Imported Music: Remove imported tracks permanently from the local music library.

- Favourites: Add built-in songs to your favourites collection.

- Custom Wallpapers: Personalize the app with custom wallpapers stored persistently in IndexedDB.

- Persistent Local Experience: Music and wallpaper data remain available after refreshing or reopening the app.

---

## 🧠 How Local Music Works

When a user imports an MP3 file, Noctune extracts its metadata and stores the original audio file locally in IndexedDB.

The playback flow looks like this:

File
→ Metadata Extraction
→ IndexedDB
→ Redux
→ Playback Queue
→ Player

Large binary data such as audio files and album artwork are kept inside IndexedDB, while Redux manages the lightweight application state used by the interface.

---

## ⬇️ How To Install?

If you want to install this app and run it locally, make sure you have Node.js installed on your machine and follow these steps:

### 1. Clone the repository

`git clone https://github.com/Parhamddeveloper/Noctune-Music-App.git`

### 2. Navigate to the project directory

`cd noctune`

### 3. Install dependencies

`npm install`

### 4. Run the App

`npm run dev`

You can open the app using this address:

`http://localhost:5173/`

---

Note: If you want to build the App, after installing dependencies, follow these steps:

### 1. Build the App

`npm run build`

### 2. Preview the App

`npm run preview`

You can preview the production build using:

`http://localhost:4173/`

---

## Credits

This app was made and designed by Parham Daneshnejad with love ❤️❤️