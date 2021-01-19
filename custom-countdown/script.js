const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = new Date
let countdownActive
let saveCountdown

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

        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)

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
    saveCountdown = {
        title: countdownTitle,
        date: countdownDate
    }
    console.log(saveCountdown)
    localStorage.setItem('countdown', JSON.stringify(saveCountdown))
    // Get number version of current Date, updateDOM
   if (countdownDate === '') {
       alert('Please select a date for the countdown')
   } else {
       countdownValue = new Date(countdownDate).getTime()
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
    localStorage.removeItem('countdown')
}

function restorePreviousCountDown(){
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true
        saveCountdown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = saveCountdown.title
        countdownDate = saveCountdown.date
        countdownValue = new Date(countdownDate).getTime()
        updateDOM()
    }
}

countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
completeElBtn.addEventListener('click', reset)

// On load, check localStorage
restorePreviousCountDown()