// script.js — Random Clint Stevens Player (static JSON version)

// Global player reference
let player;
let videos = [];
let seconds = 0;

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
      'onReady': onPlayerReady,
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

function onPlayerReady(event) {
  event.target.playVideo(); // optional — ensures playback starts
}

function updateTitle(videoId) {
  // document.getElementById('video-title').textContent = `Now playing:    https://www.youtube.com/watch?v=${videoId}`;
  document.getElementById('video-title').innerHTML = `Now playing: <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">https://www.youtube.com/watch?v=${videoId}</a>`;
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

function updateTimer() {
  seconds++;

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let formattedTime =
    //`${hrs.toString().padStart(2, '0')}:` +
    `${mins.toString().padStart(2, '0')}:` +
    `${secs.toString().padStart(2, '0')}`;

  if(hrs != 0) {
    formattedTime = `${hrs.toString().padStart(2, '0')}:` + formattedTime;
  }

  document.getElementById('time-on-page').textContent = `TIME SPENT CLINT'ING: ${formattedTime}`;
}

  // Optional shuffle toggle (doesn’t do much yet, but placeholder)
//   let shuffle = false;
//   shuffleBtn.addEventListener('click', () => {
//     shuffle = !shuffle;
//     shuffleBtn.textContent = `Shuffle mode: ${shuffle ? 'ON' : 'OFF'}`;
//   });

// Once the YouTube player is ready
document.getElementById('player-placeholder').style.display = 'none';

// Update Timer every second
setInterval(updateTimer, 1000);
}
