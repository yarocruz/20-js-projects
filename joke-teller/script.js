const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// Disable / Enable Button
function toggleBtn() {
    button.disabled = !button.disabled
}

// Passing Joke to VoiceRSS Api
function tellMe(joke) {
    VoiceRSS.speech({
        key: '7e25ed7b21ba459690225258129ccf95',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = ''
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke
        }
        // Text-to-Speech
        tellMe(joke)
        // Disable Button
        toggleBtn()
    } catch (err) {
        console.log('Ooh ooh', err)
    }
}

// Event Listeners
button.addEventListener('click', getJokes )
audioElement.addEventListener('ended', toggleBtn)



