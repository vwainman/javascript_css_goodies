const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const text = document.querySelector('[name="text"]');
const playButton = document.querySelector('#play');
const pauseButton = document.querySelector("#pause");
const resumeButton = document.querySelector("#resume");
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang}</option>`)
        .join('');
}

function setVoice() {
    speechSynthesis.cancel();
    msg.voice = voices.find(voice => voice.name === this.value);
}

function toggleVoiceButton() {
    if (this.id == "resume") {
        speechSynthesis.resume();
        this.style.display = "none";
        pauseButton.style.display = "block";
    } else if (this.id == "pause") {
        speechSynthesis.pause();
        this.style.display = "none";
        resumeButton.style.display = "block";
    } else if (this.id == "play") {
        speechSynthesis.speak(msg);
        this.style.display = "none";
        resumeButton.style.display = "none";
        stopButton.style.display = "block";
        pauseButton.style.display = "block";
    } else if (this.id == "stop") {
        speechSynthesis.cancel();
        playButton.style.display = "block";
        this.style.display = "none";
        pauseButton.style.display = "none";
        resumeButton.style.display = "none";
    }
    else {
        throw Error("togglePlayPauseButton called incorrectly");
    }
}

function resetVoiceButtonsVis() {
    playButton.style.display = "block";
    stopButton.style.display = "none";
    pauseButton.style.display = "none";
    resumeButton.style.display = "none";
}

function setText() {
    msg[this.name] = this.value;
    resetVoiceButtonsVis();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
msg.addEventListener('end', resetVoiceButtonsVis);
voicesDropdown.addEventListener('change', setVoice);
text.addEventListener('change', setText);
pauseButton.addEventListener('click', toggleVoiceButton);
resumeButton.addEventListener('click', toggleVoiceButton);
stopButton.addEventListener('click', toggleVoiceButton);
playButton.addEventListener('click', toggleVoiceButton);

// adding a bind to a callin function gives you the opportunity to pass in an argument
// without worrying about it firing on page load!, pretty much equiv to () => toggle(false)

/* voiceschanged event fired on server-side synthesis where the voices list
is determined asynchronously, or when client-side voices are installed/uninstalled.
In chrome, populating voices will not work without this event listener since it
makes an async API call. */