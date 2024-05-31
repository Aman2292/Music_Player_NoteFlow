document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause');
    const volumeBtn = document.getElementById('volume-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const songListButton = document.getElementById('list-button');
    const closeListButton = document.getElementById('close-list');
    const songList = document.querySelector('.song-list');
    const songItems = document.querySelectorAll('.song-list li');
    const progressContainer = document.querySelector('.progress-container');
    const progress = document.querySelector('.progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const albumArt = document.getElementById('album-art');
    const songTitleEl = document.querySelector('.song-title');
    const artistNameEl = document.querySelector('.artist-name');
    const shuffleButton = document.getElementById('shuffle');
    const likeButton = document.getElementById('like');
    const skipForwardButton = document.getElementById('skip-forward');
    const skipBackwardButton = document.getElementById('skip-backward');

    let isPlaying = false;
    let songIndex = 0;

    const songs = [
        { title: 'Animal_transe', artist: 'Martin garix', src: 'songs/animal_transe.mp3', img: './images/Animals-English-2013-20180118120505-500x500.jpg' },
        { title: 'Kholo Kholo', artist: 'Raman Mahadevan', src: 'songs/Kholo Kholo - Taare Zameen Par 320 Kbps.mp3', img: './images/taarezameenpar.jpg' },
        { title: 'Senorita', artist: 'Shawn-Mendes', src: 'songs/Senorita-Shawn-Mendes_320(PaglaSongs).mp3', img: './images/Se-orita-English-2019-20190701174502-500x500.jpg' },
        { title: 'O Mahi O Mahi', artist: 'Arijit Singh', src: 'songs/O Mahi O Mahi.mp3', img: './images/dunki-drop-5-o-maahi-song-promo-released_b_1112230923.jpg' },
        { title: 'Runaway', artist: 'Aurora', src: 'songs/Runaway(PagalNew.Com.Se).mp3', img: './images/All-My-Demons-Greeting-Me-As-A-Friend-Deluxe-English-2016-500x500.jpg' },
        { title: 'Sajni-Re', artist: 'Arijit Singh', src: 'songs/Sajni-Re.mp3', img: './images/20202_4.jpg' },
        { title: 'Beautiful-Things', artist: 'Benson-Boone', src: 'songs/Benson-Boone-Beautiful-Things-(CeeNaija.com).mp3', img: './images/artworks-yozHWjWpjaFSXbvH-JVqSbg-t500x500.jpg' },
    ];

    function toggleLike() {
        likeButton.classList.toggle('liked');
        const currentSongItem = document.querySelector(`.song-list li[data-index="${songIndex}"]`);
        if (likeButton.classList.contains('liked')) {
            currentSongItem.classList.add('liked');
        } else {
            currentSongItem.classList.remove('liked');
        }
    }

    likeButton.addEventListener('click', toggleLike);

    function loadSong(song) {
        songTitleEl.textContent = song.title;
        artistNameEl.textContent = song.artist;
        audioPlayer.src = song.src;
        albumArt.src = song.img;
        document.body.style.backgroundImage = `url(${song.img})`;

        // Update like button state
        const currentSongItem = document.querySelector(`.song-list li[data-index="${songIndex}"]`);
        if (currentSongItem.classList.contains('liked')) {
            likeButton.classList.add('liked');
        } else {
            likeButton.classList.remove('liked');
        }
    }

    function playSong() {
        isPlaying = true;
        audioPlayer.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function pauseSong() {
        isPlaying = false;
        audioPlayer.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }

    function togglePlayPause() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    function updateProgressBar(e) {
        if (isPlaying) {
            const { duration, currentTime } = e.srcElement;
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;

            const durationMinutes = Math.floor(duration / 60);
            let durationSeconds = Math.floor(duration % 60);
            if (durationSeconds < 10) {
                durationSeconds = `0${durationSeconds}`;
            }

            if (durationSeconds) {
                durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
            }

            const currentMinutes = Math.floor(currentTime / 60);
            let currentSeconds = Math.floor(currentTime % 60);
            if (currentSeconds < 10) {
                currentSeconds = `0${currentSeconds}`;
            }
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }

    function nextSong() {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }
        loadSong(songs[songIndex]);
        playSong();
    }

    function prevSong() {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }
        loadSong(songs[songIndex]);
        playSong();
    }

    function setProgressBar(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const { duration } = audioPlayer;
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    function setVolume() {
        audioPlayer.volume = volumeSlider.value / 100;
    }

    function toggleMute() {
        if (audioPlayer.muted) {
            audioPlayer.muted = false;
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            audioPlayer.muted = true;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    }

    function toggleSongList() {
        songList.classList.toggle('show');
    }

    function playSelectedSong() {
        songIndex = this.dataset.index;
        loadSong(songs[songIndex]);
        playSong();
        songList.classList.remove('show');
    }

    function shuffleSong() {
        songIndex = Math.floor(Math.random() * songs.length);
        loadSong(songs[songIndex]);
        playSong();
    }
    playPauseButton.addEventListener('click', togglePlayPause);
    volumeBtn.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('change', setVolume);
    songListButton.addEventListener('click', toggleSongList);
    closeListButton.addEventListener('click', toggleSongList);
    songItems.forEach(item => item.addEventListener('click', playSelectedSong));
    audioPlayer.addEventListener('timeupdate', updateProgressBar);
    progressContainer.addEventListener('click', setProgressBar);
    skipForwardButton.addEventListener('click', nextSong);
    skipBackwardButton.addEventListener('click', prevSong);
    shuffleButton.addEventListener('click', shuffleSong);

    loadSong(songs[songIndex]);
});
