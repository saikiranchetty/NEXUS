const secondHand = document.getElementById('second-hand');
const minuteHand = document.getElementById('minute-hand');
const hourHand = document.getElementById('hour-hand');
const digitalTime = document.getElementById('digital-time');
const digitalDate = document.getElementById('digital-date');

function clockTick() {
    const date = new Date();
    const seconds = date.getSeconds() / 60;
    const minutes = (seconds + date.getMinutes()) / 60;
    const hours = (minutes + date.getHours()) / 12;

    rotateClockHand(secondHand, seconds);
    rotateClockHand(minuteHand, minutes);
    rotateClockHand(hourHand, hours);

    updateDigitalClock(date);
}

function rotateClockHand(element, rotation) {
    element.style.setProperty('--rotate', rotation * 360);
}

function updateDigitalClock(date) {
    // Format time as HH:MM:SS
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    digitalTime.textContent = `${hours}:${minutes}:${seconds}`;

    // Format date as Day, Month Date, Year
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    digitalDate.textContent = date.toLocaleDateString(undefined, options);
}

setInterval(clockTick, 1000);
