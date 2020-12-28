const videoElement = document.getElementById('video')
const button = document.getElementById('button')

// Prompt User to Select a Media Stream, pass to video element, then play
async function selectMediaStream() {
    try {
       const mediaStream = await navigator.mediaDevices.getDisplayMedia()
        videoElement.srcObject = mediaStream
        videoElement.onloadedmetadata = () => {
           videoElement.play()
        }
    } catch (err) {
        console.log('woops, error here:', err)
    }
}

button.addEventListener('click', async () => {
//    Disable Button
    button.disabled = true
    // Start Picture in Picture
    await videoElement.requestPictureInPicture()
    // Reset Button
    button.disabled = false
})

// On load
selectMediaStream()