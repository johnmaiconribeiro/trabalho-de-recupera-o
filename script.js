const songs = [
    { id: 1, title: "Summer Vibes", artist: "SoundHelix (Royalty Free)", cover: "https://picsum.photos/id/1015/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { id: 2, title: "Electronic Dreams", artist: "SoundHelix (Royalty Free)", cover: "https://picsum.photos/id/102/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { id: 3, title: "Ambient Journey", artist: "SoundHelix (Royalty Free)", cover: "https://picsum.photos/id/103/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { id: 4, title: "Groovy Beat", artist: "SoundHelix (Royalty Free)", cover: "https://picsum.photos/id/104/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { id: 5, title: "Future Bass", artist: "SoundHelix (Royalty Free)", cover: "https://picsum.photos/id/106/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    { id: 6, title: "Piano Serenity", artist: "SoundHelix (Royalty Free)", cover: "https://picsum.photos/id/107/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    { id: 7, title: "Rock Energy", artist: "SoundHelix (Royalty Free)", cover: "https://picsum.photos/id/108/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
    { id: 8, title: "Chill Lounge", artist: "SoundHelix (Royalty Free)", cover: "https://picsum.photos/id/109/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { id: 9, title: "Dance Floor", artist: "SoundHelix (Royalty Free)", cover: "https://picsum.photos/id/110/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
    { id: 10, title: "Epic Cinematic", artist: "SoundHelix (Royalty Free)", cover: "https://picsum.photos/id/111/300/300", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
];

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 'off';
let audio = document.getElementById('audio-player');

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

function loadPlaylists() {
    const container = document.getElementById('featured-playlists');
    // ... (mesmo código de antes)
}

function loadSidebarPlaylists() {
    // ... (mesmo código)
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
    if (isShuffle) currentTrackIndex = Math.floor(Math.random() * songs.length);
    else currentTrackIndex = (currentTrackIndex + 1) % songs.length;
    playSong(currentTrackIndex);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + songs.length) % songs.length;
    playSong(currentTrackIndex);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    document.getElementById('shuffle-btn').style.color = isShuffle ? '#1db954' : '#b3b3b3';
}

function toggleRepeat() {
    const modes = ['off', 'all', 'one'];
    repeatMode = modes[(modes.indexOf(repeatMode) + 1) % 3];
    document.getElementById('repeat-btn').style.color = repeatMode !== 'off' ? '#1db954' : '#b3b3b3';
}

function searchMusic() {
    // ... (lógica de busca)
}

function navigateTo(page) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(page + '-section').classList.add('active');
}

function playFeatured() { playSong(0); }

window.onload = () => {
    loadPopularSongs();
    loadPlaylists();
    loadSidebarPlaylists();

    audio.addEventListener('timeupdate', () => {
        document.getElementById('progress-bar').value = (audio.currentTime / audio.duration) * 100 || 0;
    });

    audio.addEventListener('ended', () => {
        if (repeatMode === 'one') {
            audio.currentTime = 0;
            audio.play();
        } else {
            nextTrack();
        }
    });

    document.getElementById('volume-slider').addEventListener('input', e => audio.volume = e.target.value / 100);
};
