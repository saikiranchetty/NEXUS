const btn = document.getElementById('btn');
const content = document.getElementById('content');
const voice = document.getElementById('voice');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
    content.innerText = 'Listening...';
    btn.style.display = "none";
    voice.style.display = "block";
};

recognition.onspeechend = function() {
    content.innerText = 'Stopped listening.';
    recognition.stop();
};

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    console.log("Transcript: ", transcript); // Debugging
    content.innerText = `You said: ${transcript}`;
    takeCommand(transcript.toLowerCase().trim());
};

recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
    speak('Sorry, I could not recognize what you said. Please try again.');
};

btn.addEventListener("click", () => {
    recognition.start();
});

// Function to process commands
function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    console.log("Command received:", message);

    // Simulate gender detection
    const isFemale = Math.random() > 0.5; // Randomly determine gender for demonstration

    if (isFemale) {
        greetUser("Madam", message);
    } else {
        greetUser("Sir", message);
    }
}

// Function to greet user and process commands
function greetUser(title, message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak(`Hello ${title}, what can I help you with?`);
    } else if (message.includes("who") && message.includes("you")) {
        speak(`I am your virtual assistant, created by pranay.`);
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com", "_blank");
    } else if (message.includes("what") && message.includes("time")) {
        const time = new Date().toLocaleTimeString();
        speak(`The current time is ${time}.`);
    } else if (message.includes("what") && message.includes("date")) {
        const date = new Date().toLocaleDateString(); // Corrected date retrieval
        speak(`Today's date is ${date}.`);
    } else {
        let finalText = "This is what I found on the internet regarding " + message.replace("nyra", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("nyra", "")}`, "_blank");
    }
}

// Text-to-Speech function
function speak(text) {
    console.log("Speaking:", text);
    const textToSpeak = new SpeechSynthesisUtterance(text);
    textToSpeak.lang = "en-US";
    window.speechSynthesis.speak(textToSpeak);
}

function wishMe() {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 17) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener('load', () => {
    wishMe();
    speak("Welcome! Click the microphone button to start speaking.");
});
