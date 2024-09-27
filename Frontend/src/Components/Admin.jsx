import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import AdminsNav from "./AdminsNav";
import AdminsFlightStatus from "./AdminsFlightStatus";

const AdminPage = () => {
  const [socket, setSocket] = useState(null);
  const [userSpeechData, setUserSpeechData] = useState([]);
  const [background, setBackground] = useState("bg-zinc-200");
  const [glow, setglow] = useState("shadow-glow-hover");
  const [isSoundAllowed, setIsSoundAllowed] = useState(false);

  const bannedWords = ["weapon", "bomb", "attack", "explosive"];

  const playSound = () => {
    if (isSoundAllowed) {
      const audio = new Audio("/beep.mp3");
      console.log(audio);
      audio.play().catch((err) => console.log("Audio play failed:", err));
    }
  };

  useEffect(() => {
    const allowSound = () => {
      setIsSoundAllowed(true);
      document.removeEventListener("click", allowSound);
      document.removeEventListener("keydown", allowSound);
    };

    // Listen for any user interaction like click or keypress
    document.addEventListener("click", allowSound);
    document.addEventListener("keydown", allowSound);

    return () => {
      document.removeEventListener("click", allowSound);
      document.removeEventListener("keydown", allowSound);
    };
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:5000"); // Replace with your backend URL
    setSocket(newSocket);

    newSocket.on("speechToAdmin", ({ name, speech }) => {
      const containsBannedWord = bannedWords.some((word) =>
        speech.toLowerCase().includes(word)
      );

      if (containsBannedWord) {
        setBackground("bg-red-200");
        setglow("shadow-glow-red-hover");
        setTimeout(() => {
          alert("Suspicious Activity Detected");
          // Play beep if banned word is detected
        }, 1000);
        playSound();
      }

      setUserSpeechData((prevData) => [
        ...prevData,
        {
          name,
          speech,
          timestamp: new Date().toLocaleTimeString(),
          containsBannedWord,
        },
      ]);
    });

    return () => newSocket.disconnect();
  }, []);

  return (
    <div className="h-screen w-full bg-zinc-100">
      <AdminsNav />
      <AdminsFlightStatus userSpeechData={userSpeechData} />
      <div
        className={`mx-auto flex flex-col mt-5 w-[90%] h-[56%] px-10 pt-8 py-4 gap-4 rounded-2xl ${background} overflow-auto ${glow}`}
      >
        <h1 className="text-4xl font-bold">Live Monitor</h1>

        {userSpeechData.length !== 0 ? (
          <div className="flex w-full p-2 h-[90%] gap-10 overflow-auto text-xl">
            <div className="w-[20%] flex flex-col px-5 p-1 border-r-2 border-zinc-900">
              <h1 className="text-3xl font-black">Name</h1>
              <div className="mt-4 flex flex-col w-full">
                <ul className="flex flex-col gap-3">
                  {userSpeechData.map((entry, index) => (
                    <li
                      key={index}
                      className={
                        entry.containsBannedWord
                          ? "text-3xl text-red-500 font-black"
                          : ""
                      }
                    >
                      <h1>{entry.name}</h1>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-[20%] flex flex-col px-5 p-1 border-r-2 border-zinc-900">
              <h1 className="text-3xl font-black">Time</h1>
              <div className="mt-4 flex flex-col gap-4">
                <ul className="flex flex-col gap-3">
                  {userSpeechData.map((entry, index) => (
                    <li
                      key={index}
                      className={
                        entry.containsBannedWord
                          ? "text-3xl text-red-500 font-black"
                          : ""
                      }
                    >
                      <h1>{entry.timestamp}</h1>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-[50%] flex flex-col px-5 p-1">
              <h1 className="text-3xl font-black">Speech</h1>
              <div className="mt-4 flex flex-col gap-4">
                <ul className="flex flex-col gap-3">
                  {userSpeechData.map((entry, index) => (
                    <li
                      key={index}
                      className={
                        entry.containsBannedWord
                          ? "text-3xl text-red-500 font-black"
                          : ""
                      }
                    >
                      <h1>{entry.speech}</h1>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-center text-2xl">No data yet</h1>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
