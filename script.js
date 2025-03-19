let btn = document.querySelector("#btn");
    let content = document.querySelector("#content");
    let voice = document.querySelector("#voice");

    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.volume = 1;
        text_speak.lang = "en-GB"; // Corrected locale
        window.speechSynthesis.speak(text_speak);
    }

    function wishMe() {
        let day = new Date();
        let hours = day.getHours();
        if (hours >= 0 && hours < 12) {
            speak("Good Morning Sir");
        } else if (hours >= 12 && hours < 16) {
            speak("Good Afternoon Sir");
        } else {
            speak("Good Evening Sir");
        }
    }

    // Check browser support for speech recognition
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        alert("Speech recognition is not supported in your browser. Please use Google Chrome.");
    } else {
        let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new speechRecognition();
        recognition.continuous = false; // Stop recognition after one command

        recognition.onresult = (event) => {
            let transcript = event.results[0][0].transcript;
            content.innerText = transcript;
            takeCommand(transcript.toLowerCase());
        };

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error: ", event.error);
            speak("Sorry, there was an error in speech recognition.");
        };

        recognition.onend = () => {
            voice.style.display = "none";
            btn.style.display = "flex"; // Show button again after recognition stops
        };

        btn.addEventListener("click", () => {
            recognition.start();
            voice.style.display = "block";
            btn.style.display = "none";
        });
    }

    function takeCommand(message) {
        voice.style.display = "none";
        btn.style.display = "flex";

        if (message.includes("hello") || message.includes("hey")) {
            speak("Hello Sir, what can I help you with?");
        } else if (message.includes("who are you")) {
            speak("I am a virtual assistant, created by Ayush Sir.");
        } else if (message.includes("open youtube")) {
            speak("Opening YouTube...");
            window.open("https://youtube.com/", "_blank");
        } else if (message.includes("open google")) {
            speak("Opening Google...");
            window.open("https://google.com/", "_blank");
        } else if (message.includes("open facebook")) {
            speak("Opening Facebook...");
            window.open("https://facebook.com/", "_blank");
        } else if (message.includes("open instagram")) {
            speak("Opening Instagram...");
            window.open("https://instagram.com/", "_blank");
        } else if (message.includes("open whatsapp")) {
            speak("Opening WhatsApp...");
            window.open("https://web.whatsapp.com/", "_blank"); // Fixed WhatsApp URL
        } else if (message.includes("time")) {
            let time = new Date().toLocaleTimeString();
            speak("The time is " + time);
        } else if (message.includes("date")) {
            let date = new Date().toLocaleDateString();
            speak("Today's date is " + date);
        } else if (message.includes("open calculator")) {
            speak("Sorry, I can't open the system calculator from a web page.");
        } else {
            let cleanMessage = message.replace(/shipra|shifra/gi, "").trim();
            let finalText = "This is what I found on the internet regarding " + cleanMessage;
            speak(finalText);
            setTimeout(() => {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(cleanMessage)}`, "_blank");
            }, 1000);
        }
    }

    // Check microphone permissions when page loads
    navigator.permissions.query({ name: "microphone" }).then((permission) => {
        if (permission.state === "denied") {
            alert("Microphone access is required for speech recognition to work.");
        }
    });