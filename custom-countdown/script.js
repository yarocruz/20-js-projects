const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive

const second = 1000 // milliseconds
const minute = second * 60
const hour = minute * 60
const day = hour * 24

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info')
const completeElBtn = document.getElementById('complete-button')

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)

// Populate Countdown
function updateDOM() {
    countdownActive = setInterval(() => {

        const now = new Date().getTime()
        const distance = countdownValue - now
        console.log('distance', distance)

        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)
        console.log(days, hours, minutes, seconds)

        // Hide input
        inputContainer.hidden = true;

        if (distance < 0) {
            countdownEl.hidden = true
            clearInterval(countdownActive)
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
            completeEl.hidden = false
        } else {
            // Populate Countdown
            countdownElTitle.textContent = `${countdownTitle}`
            timeElements[0].textContent = `${days}`
            timeElements[1].textContent = `${hours}`
            timeElements[2].textContent = `${minutes}`
            timeElements[3].textContent = `${seconds}`

            completeEl.hidden = true
            countdownEl.hidden = false
        }
    }, second)
}

function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.target[0].value
    countdownDate = e.target[1].value
    console.log(countdownTitle, countdownDate)
    // Get number version of current Date, updateDOM
   if (countdownDate === '') {
       alert('Please select a date for the countdown')
   } else {
       countdownValue = new Date(countdownDate).getTime()
       console.log('countdown value:', countdownValue)
       updateDOM()
   }
}

function reset() {
    countdownEl.hidden = true
    inputContainer.hidden = false

    completeEl.hidden = true
    clearInterval(countdownActive)
    // Reset values
    countdownTitle = ''
    countdownDate = ''
}

countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
completeElBtn.addEventListener('click', reset)