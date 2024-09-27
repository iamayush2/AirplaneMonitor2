import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import AdminsNav from "./AdminsNav";
import TopNav from "./TopNav";

const bannedWords = ["weapon", "bomb", "attack", "explosive"]; // List of banned words

const UserPage = () => {
  const [socket, setSocket] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [userName, setUserName] = useState(""); // To store the user's name
  const [nameSubmitted, setNameSubmitted] = useState(false); // Track if the user has submitted their name
  let recognition;

  const playSound = () => {
    const audio = new Audio("Frontendsrc/beep.mp3");
    audio.play();
  };

  useEffect(() => {
    // Connect to the backend server
    const newSocket = io("http://localhost:5000"); // Replace with your backend URL
    setSocket(newSocket);

    // Clean up on page unload (stop speech recognition and disconnect socket)
    return () => {
      newSocket.disconnect();
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const initializeSpeechRecognition = () => {
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      console.error("Speech Recognition API is not supported in this browser.");
      return;
    }

    recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false; // Only get final results
    recognition.continuous = true; // Keep listening continuously
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Speech recognition started.");
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechResult =
        event.results[event.resultIndex][0].transcript.toLowerCase();
      console.log(`Speech recognized: ${speechResult}`);
      setTranscript(speechResult); // Store transcript for display

      // Send the recognized speech and user name to the backend
      if (socket && userName) {
        socket.emit("userSpeech", { name: userName, speech: speechResult });
      }

      // Check for banned words
      if (checkForBannedWords(speechResult)) {
        playBeep();
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error: ", event.error);
    };

    recognition.onspeechend = () => {
      console.log("Speech ended.");
      setIsListening(false); // Set to false on speech end but don't restart immediately
    };

    recognition.onend = () => {
      console.log("Recognition ended, waiting for a new speech event.");
      // Restart after a small pause if the user is still on the page
      if (isListening) {
        recognition.start();
      }
    };

    recognition.start();
  };

  // Function to check if the recognized speech contains any banned words
  const checkForBannedWords = (speechResult) => {
    return bannedWords.some((word) => speechResult.includes(word));
  };

  // Function to play a beep sound when a banned word is detected
  const playBeep = () => {
    if (hasUserInteracted) {
      const beepSound = new Audio("/beep.mp3"); // Path to your beep sound file
      beepSound
        .play()
        .catch((error) => console.error("Error playing beep sound:", error));
    }
  };

  // Start listening when the user submits their name and accepts the terms
  const handleUserInteraction = () => {
    if (userName) {
      setNameSubmitted(true);
      setHasUserInteracted(true);
      initializeSpeechRecognition();
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 pb-10 ">
      <TopNav />
      <div className="w-full max-w-2xl bg-white rounded-lg  p-8 shadow-glow-hover">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">
          📜 Terms & Conditions
        </h1>

        <div className="space-y-4 text-lg text-gray-700 mb-6">
          <section>
            <h2 className="text-2xl font-bold text-blue-500">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using this platform, you agree to these Terms and
              Conditions. If you do not agree, please refrain from using the
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-500">
              2. User Responsibilities
            </h2>
            <ul className="list-disc ml-6">
              <li>
                <strong>Accurate Information:</strong> You must provide accurate
                and truthful information.
              </li>
              <li>
                <strong>Prohibited Behavior:</strong> Do not use offensive or
                harmful language, engage in illegal activities, or disrupt the
                platform.
              </li>
              <li>
                <strong>Compliance:</strong> You are responsible for complying
                with all laws and regulations.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-500">
              3. Monitoring of User Activity
            </h2>
            <p>
              Your speech may be monitored for banned words such as "weapon" or
              "bomb". Speech logs will be recorded for security purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-500">
              4. Privacy Policy
            </h2>
            <p>
              We value your privacy. By using our platform, you consent to the
              collection and use of your information in line with our Privacy
              Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-500">
              5. Security Measures
            </h2>
            <p>
              Users may be required to provide identification information.
              Unauthorized access to the platform is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-500">
              6. Intellectual Property
            </h2>
            <p>
              All content displayed on this platform is owned by the platform
              owners. You may not copy or distribute any content without
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-500">
              7. Limitation of Liability
            </h2>
            <p>
              We are not liable for interruptions in service, data loss, or
              unauthorized access arising from the use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-500">
              8. Modification of Terms
            </h2>
            <p>
              We may change or update these terms at any time without notice.
              Continued use implies acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-500">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to the
              platform for violations of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-500">
              10. Contact Information
            </h2>
            <p>
              For questions, please contact us at{" "}
              <a
                href="mailto:airmonitor@gmail.com"
                className="text-blue-600 font-semibold underline"
              >
                airmonitor@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        {/* Ask for user name */}
        {!nameSubmitted ? (
          <div className="flex flex-col items-center ">
            <label className=" text-xl mb-2 font-medium  ">
              Please enter your name:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border rounded-lg px-3 py-2 mt-1 ml-1 border-1 border-sky-500 focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="Your name"
              />
            </label>
            <button
              onClick={handleUserInteraction}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-300"
            >
              Accept & Start
            </button>
          </div>
        ) : (
          <div className="text-center mt-4">
            <button
              disabled={isListening}
              className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              {isListening ? "Listening..." : "Stopped"}
            </button>
          </div>
        )}
      </div>

      {/* Add an audio element for the beep sound */}
      <audio id="beepSound" src="/beep.mp3" preload="auto"></audio>
    </div>
  );
};

export default UserPage;
