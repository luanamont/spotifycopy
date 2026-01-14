
const playPauseBtn = document.querySelector('.buttons button:nth-child(3) i');
const progressBar = document.querySelector('.progress');
const currentTimeEl = document.querySelector('.progress-bar span:first-child');
const durationTimeEl = document.querySelector('.progress-bar span:last-child');
const rewindBtn = document.querySelector('.buttons button:nth-child(2)');
const forwardBtn = document.querySelector('.buttons button:nth-child(4)');
const rewind20sBtn = document.querySelector('.buttons button:nth-child(1)');
const forward20sBtn = document.querySelector('.buttons button:nth-child(5)');

let isPlaying = false;
let duration = 225; // duração total da música em segundos (3:45)
let currentTime = 92;  // tempo inicial (1:32)
let intervalId;

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function updateProgress() {
    currentTime++;
    if (currentTime >= duration) {
        clearInterval(intervalId);
        isPlaying = false;
        playPauseBtn.classList.remove('fa-circle-pause');
        playPauseBtn.classList.add('fa-circle-play');
        currentTime = duration;
    }
    progressBar.style.width = `${(currentTime / duration) * 100}%`;
    currentTimeEl.textContent = formatTime(currentTime);
}

function playMusic() {
    isPlaying = true;
    playPauseBtn.classList.remove('fa-circle-play');
    playPauseBtn.classList.add('fa-circle-pause');
    intervalId = setInterval(updateProgress, 1000);
}

function pauseMusic() {
    isPlaying = false;
    playPauseBtn.classList.remove('fa-circle-pause');
    playPauseBtn.classList.add('fa-circle-play');
    clearInterval(intervalId);
}

playPauseBtn.parentElement.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

function seek(seconds) {
    currentTime += seconds;
    if (currentTime < 0) currentTime = 0;
    if (currentTime > duration) currentTime = duration;
    progressBar.style.width = `${percentage}%`;
    currentTimeEl.textContent = formatTime(currentTime);
}

rewind20sBtn.addEventListener('click', () => {
    seek(-20);
});

forward20sBtn.addEventListener('click', () => {
    seek(20);
});

// Inicializa a barra e tempo ao carregar a página
progressBar.style.width = `${(currentTime / duration) * 100}%`;
currentTimeEl.textContent = formatTime(currentTime);
durationTimeEl.textContent = formatTime(duration);

//simulando a troca de musica
const playlist = [
  {
    title: "Cottonwood",
    artist: "Twenty One Pilots",
    duration: 187, // 3:45
    img: "https://i.scdn.co/image/ab67616d00001e0278cba6a1edfe4235def632ed"
  },
  {
    title: "City Walls",
    artist: "Twenty One Pilots",
    duration: 322, // Exemplo
    img: "https://i.scdn.co/image/ab67616d00001e0278cba6a1edfe4235def632ed"
  },
  {
    title: "Rawfear",
    artist: "Twenty One Pilots",
    duration: 201,
    img: "https://i.scdn.co/image/ab67616d00001e0278cba6a1edfe4235def632ed"
  },
  {
    title: "Tally",
    artist: "Twenty One Pilots",
    duration: 225,
    img: "https://i.scdn.co/image/ab67616d00001e0278cba6a1edfe4235def632ed"
  },
];

let currentTrackIndex = 0;

const songTitleEl = document.querySelector('.song-info .title strong');
const songArtistEl = document.querySelector('.song-info .artist');
const songImgEl = document.querySelector('.song-info img');

function loadTrack(index) {
  const track = playlist[index];
  currentTrackIndex = index;
  currentTime = 0;
  duration = track.duration;

  // Atualiza UI
  songTitleEl.textContent = track.title;
  songArtistEl.textContent = track.artist;
  songImgEl.src = track.img;

  // Atualiza barra e tempo
  progressBar.style.width = '0%';
  currentTimeEl.textContent = formatTime(0);
  durationTimeEl.textContent = formatTime(duration);
}

// Altera eventos dos botões de avanço e retrocesso para trocar música
rewindBtn.addEventListener('click', () => {
    // Voltar para música anterior (loopando para última se estiver na primeira)
    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) prevIndex = playlist.length - 1;
    loadTrack(prevIndex);
  
    if (isPlaying) {
      clearInterval(intervalId);
      playMusic();
    }
    rewindBtn.blur();
  });
  
  forwardBtn.addEventListener('click', () => {
    // Ir para próxima música (loopando para primeira se estiver na última)
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= playlist.length) nextIndex = 0;
    loadTrack(nextIndex);
  
    if (isPlaying) {
      clearInterval(intervalId);
      playMusic();
    }
    forwardBtn.blur();
});

loadTrack(currentTrackIndex);

//visualização do sidebar
document.querySelectorAll('.sidebar-recent li').forEach(li => {
    const span = li.querySelector('.scroll-text');
    if (!span) return;
    
    const textWidth = span.scrollWidth;      // largura total do texto
    const containerWidth = li.clientWidth;  // largura do container
  
    if (textWidth > containerWidth) {
      // seta a variável CSS --text-width para usar no calc da animação
      span.style.setProperty('--text-width', `${textWidth}px`);
    } else {
      // se texto não ultrapassa, não anima
      span.style.setProperty('--text-width', `${containerWidth}px`);
    }
});
  
const volumeSlider = document.getElementById("volumeSlider");
const likeBtn = document.getElementById("likeBtn");
const likeIcon = likeBtn.querySelector("i");
  
// Volume slider

function updateSliderBackground(slider) {
  const value = slider.value;
  const percentage = value * 100;
  slider.style.background = `linear-gradient(to right, #1DB954 ${percentage}%, #444 ${percentage}%)`;
}

// Atualiza o background ao iniciar
updateSliderBackground(volumeSlider);

// Atualiza ao interagir
volumeSlider.addEventListener("input", function () {
  updateSliderBackground(this);
  // audio.volume = this.value; // opcional
});

// Like Button
likeBtn.addEventListener("click", () => {
  likeBtn.classList.toggle("liked");
  if (likeBtn.classList.contains("liked")) {
      likeIcon.classList.remove("fa-regular");
      likeIcon.classList.add("fa-solid");
  } else {
      likeIcon.classList.remove("fa-solid");
      likeIcon.classList.add("fa-regular");
  }
});



