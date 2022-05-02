const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
const playButton = document.querySelector('.play');


const rabbit = '🐇';
const milliSecondsPerHop = 5000;

let hopAudio = new Audio('8bit-jump.wav'); //found here https://freesound.org/people/Soundholder/sounds/425346/
let gameOn = false;
let gameOver = false;
let refreshIntervalId;
let linkId = 0

triggers.forEach(function (i, idx, array) {
    if (idx === array.length - 1) {
        i.setAttribute('id', linkId);
    } else {
        i.setAttribute('id', linkId++);
    }
})
let rabbitId = Math.floor(Math.random() * (linkId + 1));

highlight.classList.add('highlight');
document.body.append(highlight);

function highlightLink() {
    const linkCoords = this.getBoundingClientRect();
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX
    }

    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

    if (parseInt(this.id) === rabbitId && gameOn) {
        this.textContent = rabbit;
        clearInterval(refreshIntervalId);
        gameOver = true;
    }
}

function playGame() {
    if (!gameOver) {
        gameOn = true;
        hopAudio.play();
        refreshIntervalId = setInterval(rabbitHops, milliSecondsPerHop);
    } else {
        alert("Refresh to play again");
    }
}

function rabbitHops() {
    rabbitId = Math.floor(Math.random() * (linkId + 1));
    hopAudio.play();
}

playButton.addEventListener('click', playGame);
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));