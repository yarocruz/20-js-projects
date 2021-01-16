const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.getElementById('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    },
]
// Check if playing
let isPlaying = false

// Play
function playSong(){
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

// Pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

// Update Dom
function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

// Current Song
let songIndex = 0

// Previous Song
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length -  1
    }
    loadSong(songs[songIndex])
    playSong()
}

// Next Song
function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// On Load - Select First Song
loadSong(songs[songIndex])

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        console.log(e)
        const { duration, currentTime } = e.target
        // Update progress bar
        const progressPercent = (currentTime / duration ) * 100
       progress.style.width = `${progressPercent}%`
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60)
        console.log('minutes', durationMinutes)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        console.log('seconds', durationSeconds)

       // Delay switching duration Element to avoid NaN
       if (durationSeconds) {
           durationEl.textContent = `${durationMinutes}:${durationSeconds}`
       }
        // Calculate display for current time
        const currentMinutes = Math.floor( parseInt(currentTime) / 60)
        console.log('minutes', currentMinutes)
        let currentSeconds = Math.floor( parseInt(currentTime) % 60)
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        console.log('seconds', currentSeconds)
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
