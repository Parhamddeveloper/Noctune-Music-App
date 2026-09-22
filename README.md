# 🎵 Noctune - Modern Music Player

A modern, responsive, and customizable music player built with React and TypeScript.

Noctune supports built-in tracks as well as local MP3 imports, persistent browser storage, playback queues, custom wallpapers, metadata extraction, drag-and-drop imports, and more.

---

## 💻 Live Demo

🔗 **[View Live Project](https://noctune-music-app.vercel.app/)**

---

## ⚡ Highlights

- 🎵 Import and play local MP3 files
- 🖱️ Drag & drop support for music and wallpapers
- 💾 Persistent local storage using IndexedDB
- 🖼️ Automatic album artwork and metadata extraction
- 🎨 Custom wallpaper support
- 🔀 Queue-based playback with Shuffle, Next, and Previous
- 🔁 Multiple loop modes
- 🔎 Search imported music by title, artist, or album
- ❤️ Favourite built-in tracks
- 📱 Responsive interface for desktop, tablet, and mobile
- 🎧 Support for both built-in and imported music

---

## 🛠️ Tech Stack & Tools

- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- IndexedDB
- music-metadata
- React Router
- Lucide React
- Vite

---

## ✨ App Features

### 🎵 Local Music Import

Import MP3 files directly from your device using the file picker or drag and drop.

Imported tracks remain available between sessions without requiring a server or external database.

### 🖼️ Automatic Metadata Extraction

Noctune uses `music-metadata` to automatically extract available information from imported MP3 files, including:

- Song title
- Artist
- Album
- Duration
- Embedded album artwork

Missing metadata is handled with fallback values when necessary.

### 💾 Persistent Music Library

Imported audio files, album artwork, and metadata are stored locally using IndexedDB.

This allows imported music to remain available after refreshing or reopening the application.

### 🎧 Music Player

The player includes:

- Play and pause
- Seek controls
- Volume control
- Mute
- Next and Previous
- Shuffle
- Loop modes
- Current track information
- Album artwork

### 📋 Playback Queue

Noctune creates a playback queue based on the collection the user is currently listening to.

Next, Previous, and Shuffle operate on the active queue, allowing playback to continue naturally through the selected music collection.

### 🔀 Shuffle Mode

Shuffle selects a random track from the active playback queue while avoiding immediately selecting the currently playing track.

### 🔁 Loop Modes

Multiple loop modes provide control over how the current track repeats during playback.

### 🎶 Built-in & Imported Music

Noctune supports both bundled music and user-imported tracks.

Each song includes a source identifier, allowing the player and queue system to distinguish between built-in and imported tracks even when their numeric IDs are the same.

### 🔎 Music Search

Search imported music using:

- Song title
- Artist
- Album

Search is case-insensitive and updates the displayed results dynamically.

### 🗑️ Imported Music Management

Imported tracks can be permanently removed from the local music library.

Changes are synchronized with IndexedDB so deleted tracks stay removed after refreshing the application.

### ❤️ Favourites

Built-in tracks can be added to a favourites collection for quick access.

### 🎨 Custom Wallpapers

Users can import their own images and use them as application wallpapers.

Wallpaper features include:

- Image upload
- Drag and drop
- Persistent IndexedDB storage
- Wallpaper selection
- Wallpaper deletion
- Restore default wallpaper

### 🖱️ Drag & Drop

Noctune supports drag-and-drop importing for:

- MP3 files
- Custom wallpaper images

Visual drag states provide feedback while files are being dropped into the application.

### 📱 Responsive Design

The interface adapts across desktop, tablet, and mobile screen sizes.

The responsive layout includes adaptive navigation and a mobile-friendly Profile interface for managing themes, wallpapers, and imported music.

### 🌙 Theme Customization

Noctune includes theme customization options that allow users to personalize the appearance of the application.

### 🚫 Empty & Search States

The interface provides clear feedback when:

- No music has been imported
- An imported music search has no matching results
- No custom wallpapers have been added

---

## 🧠 How Local Music Works

When a user imports an MP3 file, Noctune reads the file locally, extracts its metadata, and stores the original audio data inside IndexedDB.

The main flow looks like this:

```text
MP3 File
    ↓
Metadata Extraction
    ↓
IndexedDB
    ↓
Redux
    ↓
Playback Queue
    ↓
Player
```

Large binary data such as audio files and embedded album artwork are kept inside IndexedDB.

Redux manages the lightweight application state required by the interface and player.

When an imported track needs to be played, its audio Blob is retrieved from IndexedDB and converted into a temporary object URL that can be used by the browser's audio player.

This keeps large binary files out of Redux while still allowing the interface to manage imported tracks efficiently.

---

## 💾 Local Storage Architecture

Noctune uses a single IndexedDB database for persistent user content.

The database contains separate object stores for:

```text
noctuneDB
├── importedMusics
└── wallpapers
```

This data stays entirely inside the user's browser and does not require a backend server.

---

## ⬇️ How To Install?

If you want to run Noctune locally, make sure you have Node.js installed.

### 1. Clone the repository

```bash
git clone https://github.com/Parhamddeveloper/Noctune-Music-App.git
```

### 2. Navigate to the project directory

```bash
cd Noctune-Music-App
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the app

```bash
npm run dev
```

Then open:

```text
http://localhost:5173/
```

---

## 🏗️ Build & Preview

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

Then open:

```text
http://localhost:4173/
```

---

## 🔐 Privacy

Imported music and custom wallpapers are stored locally in the user's browser using IndexedDB.

Noctune does not upload imported music files or wallpapers to an external server.

---

## Credits

This app was made and designed by **Parham Daneshnejad** with love ❤️❤️