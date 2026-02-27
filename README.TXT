ClintTV

A simple web app that automatically plays random videos from Clint Stevens' YouTube channel.

When a video ends, the site randomly selects another video from a static list and plays it — creating an endless Clint Stevens stream.

---

## Live Demo

Deployed using Firebase Hosting.

---

## Features

* Embedded YouTube IFrame Player
* Random video selection
* Automatically plays a new video when one ends
* Responsive layout (centers player and adapts to window size)
* No YouTube API key required
* Static hosting (no backend)

---

## Tech Stack

Frontend

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)

YouTube Integration

* YouTube IFrame Player API

  * Used to control playback events
  * Detects when a video ends
  * Dynamically loads new video IDs

Hosting

* Firebase Hosting
* Firebase CLI

Development Tools

* Node.js
* npm
* Optional: Python (for local static server during development)

---

## Project Structure

ClintTV/

```
index.html  
style.css  
script.js  
videos.json  
firebase.json  
.firebaserc  
README.md  
```

---

## How It Works

1. videos.json contains a static array of YouTube video IDs.

2. When the page loads:

   * The JSON file is fetched.
   * A random ID is selected.

3. The YouTube IFrame Player loads the video.

4. When the video ends:

   * The onStateChange event detects ENDED.
   * Another random video ID is selected.
   * The new video loads automatically.

No YouTube Data API is used — only the IFrame Player API.

---

## Local Development

Option 1 — Python Static Server

Command:
python -m http.server 8000

Then open:
[http://localhost:8000](http://localhost:8000)

---

## Deployment (Firebase Hosting)

1. Install Firebase CLI

Command:
npm install -g firebase-tools

2. Login

Command:
firebase login

3. Initialize Hosting

Command:
firebase init

Select:

* Hosting
* Choose existing project
* Public directory: .
* Single-page app: No

4. Deploy

Command:
firebase deploy

Your site will be live at:
[https://your-project-name.web.app](https://your-project-name.web.app)

---

## Dependencies & External Libraries

Required

* Node.js (for Firebase CLI)
* npm (comes with Node.js)
* Firebase CLI (firebase-tools)
* YouTube IFrame Player API (loaded via script tag)

No External Frontend Frameworks Used

This project intentionally avoids:

* React
* Vue
* Angular
* jQuery

Everything is written in vanilla JavaScript for simplicity.

---

## Notes

* This project uses a static JSON list of video IDs.
* If new Clint Stevens videos are uploaded, videos.json must be updated manually.
* No monetization or API key usage is included.
* This project is for educational purposes.

---

## Future Improvements

* Auto-fetch video IDs using YouTube Data API
* Shuffle without repeats until full cycle completes
* Fullscreen toggle
* Dark mode toggle
* Chat integration
* Playlist support

---

## Author

Built as a personal project to experiment with:

* Frontend JavaScript
* YouTube embed APIs
* Static site hosting
* Firebase deployment
