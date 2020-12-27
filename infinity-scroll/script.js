const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []
let isInitialized = true

// Unsplash API
let count = 5
const apiKey = 'tM3TvgZWZYY6-3J2yg2uLjAEOMNY2OJTzT7lJZTq6u4'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

function updateAPIURLWithNewCount(newCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newCount}`
}

// Check if all images are loaded
function imageLoaded() {
    imagesLoaded++
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
        console.log('ready =', ready)
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Creates Elements for links & Photos, and adds the to the DOM
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
    console.log('total images', totalImages)
    photosArray.forEach((photo) => {
        // create <a> for link Unsplash
        const item = document.createElement('a')

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // create <img> for photo
        const img = document.createElement('img')

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event Listener,
        img.addEventListener('load', imageLoaded)
        // Put <img> inside <a>, then both inside container element
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
        if (isInitialized) {
            updateAPIURLWithNewCount(30)
            isInitialized = false
        }
    } catch (err) {
        console.log(err)
    }
}

// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
    // window.innerHeight is the total height of the browser window
    // window.scrollY distance from top of page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
})

// on load
getPhotos()