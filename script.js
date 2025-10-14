// script.js — Random Clint Stevens Player (static JSON version)

// Global player reference
let player;
let videos = [];

// Utility: pick random item from array
function getRandomVideo() {
  return videos[Math.floor(Math.random() * videos.length)];
}

// Called automatically when the YouTube IFrame API is ready
function onYouTubeIframeAPIReady() {
  // Load video list first
  fetch('videos.json')
    .then(response => response.json())
    .then(data => {
      videos = data;
      const firstVideo = getRandomVideo();
      createPlayer(firstVideo);
      setupControls();
    })
    .catch(err => console.error('Error loading videos.json:', err));
}

function createPlayer(videoId) {
  player = new YT.Player('player', {
    height: '720',
    width: '1280',
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0
    },
    events: {
      'onStateChange': onPlayerStateChange
    }
  });

  updateTitle(videoId);
}

function onPlayerStateChange(event) {
  // When video ends, pick and load a new random one
  if (event.data === YT.PlayerState.ENDED) {
    const next = getRandomVideo();
    player.loadVideoById(next);
    updateTitle(next);
  }
}

function updateTitle(videoId) {
  document.getElementById('video-title').textContent = `Now playing: https://www.youtube.com/watch?v=${videoId}`;
}

// --- UI Controls (Next, Shuffle) ---
function setupControls() {
  const nextBtn = document.getElementById('next-btn');
  const shuffleBtn = document.getElementById('shuffle-btn');

  nextBtn.disabled = false;
  nextBtn.addEventListener('click', () => {
    const next = getRandomVideo();
    player.loadVideoById(next);
    updateTitle(next);
  });

  // Optional shuffle toggle (doesn’t do much yet, but placeholder)
//   let shuffle = false;
//   shuffleBtn.addEventListener('click', () => {
//     shuffle = !shuffle;
//     shuffleBtn.textContent = `Shuffle mode: ${shuffle ? 'ON' : 'OFF'}`;
//   });

// Once the YouTube player is ready
document.getElementById('player-placeholder').style.display = 'none';
}
