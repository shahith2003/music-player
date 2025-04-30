const songs = [
    { name: "Ashes on the fire", file: "Songs/Attack on Titan Season 4 OST - Ashes on The FireMain Theme.mp3", poster: "images/poster1.jpeg" },
    { name: "WDL - Bob's Beat", file: "Songs/WDL - Bob's Beat (Audio).mp3", poster: "images/poster2.jpeg"  },
    { name: "K'NAAN - Wavin' Flag (Coca-Cola Celebration Mix).mp3", file: "Songs/K'NAAN - Wavin' Flag (Coca-Cola Celebration Mix).mp3", poster: "images/poster3.jpeg"  }
  ];
  
  let currentSong = 0;
  let isPlaying = false;
  
  const audio = document.getElementById("audio");
  const title = document.getElementById("title");
  const playBtn = document.getElementById("playBtn");
  const playlist = document.getElementById("playlist");
  
  function loadSong(index) {
    currentSong = index;
    audio.src = songs[index].file;
    title.textContent = songs[index].name;
    document.getElementById("poster").src = songs[index].poster;
    updatePlaylistHighlight();
  }  
  
  function togglePlay() {
    if (isPlaying) {
      audio.pause();
      playBtn.innerHTML = "<i class='fa-solid fa-play'></i>";
    } else {
      audio.play();
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
  }
  
  function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;
  }
  
  function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;
  }
  
  function updatePlaylistHighlight() {
    const items = document.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
      item.classList.toggle('active', index === currentSong);
    });
  }
  
  function buildPlaylist() {
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
      const item = document.createElement("div");
      item.className = "playlist-item";
      item.textContent = song.name;
      item.onclick = () => {
        loadSong(index);
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        isPlaying = true;
      };
      playlist.appendChild(item);
    });
  }
  
  function toggleMenu() {
    playlist.classList.toggle("open");
  }
  
  audio.addEventListener("ended", nextSong);
  
  // Initialize
  buildPlaylist();
  loadSong(currentSong);
  const progress = document.getElementById("progress");

// Update slider as song plays
audio.addEventListener("timeupdate", () => {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progress.value = percentage || 0;
});

// Seek song when user moves slider
progress.addEventListener("input", () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});
