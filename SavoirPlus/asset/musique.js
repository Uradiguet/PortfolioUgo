// Liste des morceaux (ajoutez vos propres fichiers audio ici)
const trackList = [
    {
        title: "戦士の夢",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/戦士の夢 (Warrior's Dream).mp3",
        cover: "../Asset/Musique/Cover/C1.jpeg"
    },
    {
        title: "L'Homme De L'Ombre",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/L'Homme De L'Ombre.mp3",
        cover: "../Asset/Musique/Cover/C2.jpeg"
    },
    {
        title: "サックスは出たとこ勝負",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/サックスは出たとこ勝負.mp3",
        cover: "../Asset/Musique/Cover/C3.jpeg"
    },
    {
        title: "サックスは出たとこ勝負 v2",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/サックスは出たとこ勝負 (2).mp3",
        cover: "../Asset/Musique/Cover/C4.jpeg"
    },
    {
        title: "Victory Tango",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/Victory Tango.mp3",
        cover: "../Asset/Musique/Cover/C5.jpeg"
    },
    {
        title: "NxW The Animation",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/NxW_ The Animation.mp3",
        cover: "../Asset/Musique/Cover/C6.jpeg"
    },
    {
        title: "Queen of the Ring",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/Queen of the Ring.mp3",
        cover: "../Asset/Musique/Cover/C7.jpeg"
    },
    {
        title: "Unbreakable Force",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/Unbreakable Force.mp3",
        cover: "../Asset/Musique/Cover/C8.jpeg"
    },
    {
        title: "L'Éclat du Combat",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/L'Éclat du Combat.mp3",
        cover: "../Asset/Musique/Cover/C9.jpeg"
    },
    {
        title: "Loucas, Le Démon du CCTV",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/Loucas, Le Démon du CCTV.mp3",
        cover: "../Asset/Musique/Cover/C10.jpeg"
    },
    {
        title: "Victoria, Démon de la Richesse",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/Victoria, Démon de la Richesse.mp3",
        cover: "../Asset/Musique/Cover/C11.jpeg"
    },
    {
        title: "Ugo, le démon du Net",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/Ugo, le démon du Net.mp3",
        cover: "../Asset/Musique/Cover/C12.jpeg"
    },
    {
        title: "A Saga dos Radiguet",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/A Saga dos Radiguet.mp3",
        cover: "../Asset/Musique/Cover/C13.jpeg"
    },
    {
        title: "Code Samurai",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/Code Samurai.mp3",
        cover: "../Asset/Musique/Cover/C14.jpeg"
    },
    {
        title: "RPZ Rêve Électrique",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/RPZ Rêve Électrique.mp3",
        cover: "../Asset/Musique/Cover/C15.jpeg"
    },
    {
        title: "Skyline Reverie",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/Skyline Reverie.mp3",
        cover: "../Asset/Musique/Cover/C16.jpeg"
    },
    {
        title: "Ring of Fire",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/Ring of Fire.mp3",
        cover: "../Asset/Musique/Cover/C17.jpeg"
    },
    {
        title: "疾風の軌跡",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/疾風の軌跡 (Shippū no Kiseki - Trail of the Gale).mp3",
        cover: "../Asset/Musique/Cover/C18.jpeg"
    },
    {
        title: "Containment Breach",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/Containment Breach.mp3",
        cover: "../Asset/Musique/Cover/C19.jpeg"
    },
    {
        title: "Victoria, Démon de la Richesse V2",
        artist: "Ugo RADIGUET",
        path: "../Asset/Musique/Victoria, Démon de la Richesse (2).mp3",
        cover: "../Asset/Musique/Cover/C20.jpeg"
    },

    // Ajoutez d'autres morceaux ici
];

// Références aux éléments DOM
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const seekSlider = document.getElementById('seek-slider');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('total-duration');
const titleDisplay = document.getElementById('track-title');
const artistDisplay = document.getElementById('track-artist');
const imageDisplay = document.getElementById('track-image');

let trackIndex = 0;
let isPlaying = false;

// --- Fonctions utilitaires ---

/** Charge le morceau actuel dans l'élément audio et met à jour l'interface. */
function loadTrack(index) {
    const track = trackList[index];
    audioPlayer.src = track.path;
    audioPlayer.load(); // Charge le nouveau fichier

    titleDisplay.textContent = track.title;
    artistDisplay.textContent = track.artist;
    // Vérifie si la pochette existe
    if (track.cover) {
        imageDisplay.src = track.cover;
    } else {
        imageDisplay.src = 'default-cover.png'; // Image par défaut
    }

    // Réinitialise le bouton à 'Play'
    playPauseBtn.textContent = '▶️';
    isPlaying = false;
}

/** Passe au morceau suivant */
function nextTrack() {
    trackIndex = (trackIndex + 1) % trackList.length; // Boucle si on arrive à la fin
    loadTrack(trackIndex);
    playTrack();
}

/** Passe au morceau précédent */
function prevTrack() {
    trackIndex = (trackIndex - 1 + trackList.length) % trackList.length; // Boucle si on est au début
    loadTrack(trackIndex);
    playTrack();
}

/** Démarre la lecture */
function playTrack() {
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = '⏸️';
}

/** Met en pause la lecture */
function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.textContent = '▶️';
}

/** Gère la lecture/pause au clic */
function togglePlayPause() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

/** Convertit les secondes en format M:SS */
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
}


// --- Événements ---

// 1. Bouton Play/Pause
playPauseBtn.addEventListener('click', togglePlayPause);

// 2. Boutons Suivant/Précédent
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

// 3. Mise à jour de la barre de progression (curseur)
audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    // Met à jour la position du curseur
    if (!isNaN(duration)) {
        seekSlider.value = (currentTime / duration) * 100;
        currentTimeDisplay.textContent = formatTime(currentTime);
    }
});

// 4. Une fois que l'audio a chargé ses métadonnées (durée)
audioPlayer.addEventListener('loadedmetadata', () => {
    const duration = audioPlayer.duration;
    if (!isNaN(duration)) {
        durationDisplay.textContent = formatTime(duration);
        seekSlider.max = 100; // S'assurer que le max est 100 pour le pourcentage
    }
});

// 5. Lecture terminée -> Passer au morceau suivant
audioPlayer.addEventListener('ended', nextTrack);

// 6. Changement de position manuellement (slider)
seekSlider.addEventListener('input', () => {
    const seekTo = audioPlayer.duration * (seekSlider.value / 100);
    audioPlayer.currentTime = seekTo;
});


// --- Initialisation ---
// Démarrer en chargeant le premier morceau
loadTrack(trackIndex);