const songs = [
    { id: 1, title: "Summer Vibes", artist: "SoundHelix", cover: "https://picsum.photos/id/1015/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { id: 2, title: "Electronic Dreams", artist: "SoundHelix", cover: "https://picsum.photos/id/102/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { id: 3, title: "Ambient Journey", artist: "SoundHelix", cover: "https://picsum.photos/id/103/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { id: 4, title: "Groovy Beat", artist: "SoundHelix", cover: "https://picsum.photos/id/104/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { id: 5, title: "Future Bass", artist: "SoundHelix", cover: "https://picsum.photos/id/106/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
];

let currentTrackIndex = 0;
let isPlaying = false;
const audio = document.getElementById('audio-player');

function loadPopularSongs() {
    const container = document.getElementById('popular-songs');
    container.innerHTML = '';
    songs.forEach((song, i) => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `<img src="${song.cover}"><h4>${song.title}</h4><p>${song.artist}</p>`;
        card.onclick = () => playSong(i);
        container.appendChild(card);
    });
}

function playSong(index) {
    currentTrackIndex = index;
    const song = songs[index];
    audio.src = song.audio;
    document.getElementById('player-title').textContent = song.title;
    document.getElementById('player-artist').textContent = song.artist;
    document.getElementById('player-cover').src = song.cover;
    audio.play();
    isPlaying = true;
    document.getElementById('play-pause-btn').textContent = '⏸️';
}

function togglePlay() {
    if (isPlaying) audio.pause();
    else audio.play();
    isPlaying = !isPlaying;
    document.getElementById('play-pause-btn').textContent = isPlaying ? '⏸️' : '▶️';
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % songs.length;
    playSong(currentTrackIndex);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + songs.length) % songs.length;
    playSong(currentTrackIndex);
}

function navigateTo(page) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(page + '-section').classList.add('active');
}

function playFeatured() { playSong(0); }

window.onload = loadPopularSongs;