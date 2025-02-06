document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById("audio-player");
    const songTitle = document.getElementById("song-title");
    const audioSource = document.getElementById("audio-source");
    const nextBtn = document.getElementById("next-btn");
    const shuffleBtn = document.getElementById("shuffle-btn");
    const playBtn = document.getElementById("play-btn");
    const pauseBtn = document.getElementById("pause-btn");
    const playlistQueue = document.getElementById("playlist-queue");
    const albumArt = document.getElementById("album-art");
    const backBtn = document.getElementById("back-btn");
    const playlistBtn = document.getElementById("playlist-btn");

    const songs = [
        { title: "Musings", file: "Music/Musings.mp3" },
        { title: "Love Comes, Love Goes", file: "Music/Love Comes, Love Goes.mp3" },
        { title: "Let You Go", file: "Music/Let You Go.mp3" },
        { title: "I Hope You Know Love", file: "Music/I Hope You Know Love.mp3" },
        { title: "Drowning", file: "Music/Drowning.mp3" },
        { title: "Get Over You", file: "Music/Get Over You.mp3" },
        { title: "Solo Tú", file: "Music/Solo Tu.mp3" },
        { title: "One Request", file: "Music/One Request.mp3" },
        { title: "Musings (slowed + reverb)", file: "Music/Musings (slowed + reverb).mp3" },
        { title: "Love Comes, Love Goes (stripped)", file: "Music/Love Comes, Love Goes (stripped).mp3" },
        { title: "Love Comes, Love Goes (stripped + slowed + reverb)", file: "Music/Love Comes, Love Goes (slowed_reverb).mp3" }
    ];

    let currentSongIndex = 0;
    let isShuffle = false;

    function updateSong() {
        const currentSong = songs[currentSongIndex];
        audioSource.src = currentSong.file;
        songTitle.textContent = currentSong.title;
        albumArt.src = "Album art.jpg"; // Update album art path for each song
        audioPlayer.load();
        updatePlaylistQueue();
    }

    function updatePlaylistQueue() {
        playlistQueue.innerHTML = '';
        songs.forEach((song, index) => {
            const li = document.createElement("li");
            li.textContent = song.title;

            li.addEventListener("click", () => {
                currentSongIndex = index;
                updateSong();
                playAudio();
            });

            playlistQueue.appendChild(li);
        });
    }

    function playAudio() {
        audioPlayer.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
    }

    function pauseAudio() {
        audioPlayer.pause();
        playBtn.style.display = "inline-block";
        pauseBtn.style.display = "none";
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updateSong();
        playAudio();
    }

    function toggleShuffle() {
        isShuffle = !isShuffle;
        shuffleBtn.style.backgroundColor = isShuffle ? "#1ed760" : "#1DB954";

        if (isShuffle) {
            shufflePlaylist();
        } else {
            updateSong();
        }
    }

    function shufflePlaylist() {
        songs.sort(() => Math.random() - 0.5);
        updateSong();
    }

    function togglePlaylistView() {
        const playlistContainer = document.getElementById("playlist-container");
        playlistContainer.style.display = playlistContainer.style.display === "block" ? "none" : "block";
        backBtn.style.display = playlistContainer.style.display === "block" ? "inline-block" : "none";
    }

    function goBack() {
        const playlistContainer = document.getElementById("playlist-container");
        playlistContainer.style.display = "none";
        backBtn.style.display = "none";
    }

    nextBtn.addEventListener("click", nextSong);
    shuffleBtn.addEventListener("click", toggleShuffle);
    playBtn.addEventListener("click", playAudio);
    pauseBtn.addEventListener("click", pauseAudio);
    audioPlayer.addEventListener("ended", nextSong);

    playlistBtn.addEventListener("click", togglePlaylistView);
    backBtn.addEventListener("click", goBack);

    updateSong(); // Initialize the first song
});
