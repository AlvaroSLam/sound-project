import { useState, useEffect } from "react";
import io from "socket.io-client";
import audioFile from "./audio/lose.mp3";

const socket = io.connect("http://localhost:5050");

const audio = new Audio();

const App = () => {
  const [role, setRole] = useState("");
  const [playing, setPlaying] = useState("");

  useEffect(() => {
    function receiveMessage(m) {
      if (role === "server") {
        audio.src = m.path;
        audio.play();
      }

      setPlaying(m.name);
    }

    function stopAudio() {
      setPlaying("");
    }

    socket.on("play", receiveMessage);
    socket.on("stop", stopAudio);

    return () => {
      socket.off("play", receiveMessage);
      socket.off("stop", stopAudio);
    };
  }, [role]);

  useEffect(() => {
    function handleAudioStop() {
      socket.emit("stop");
    }
    audio.addEventListener("pause", handleAudioStop);

    return () => {
      audio.removeEventListener("pause", handleAudioStop);
    };
  }, []);

  const handlePlaySound = () => {
    socket.emit("play", { name: "Test sound 1", path: audioFile });
  };
  return (
    <div>
      <h1>Soundbot</h1>

      <div>
        <h4>Role</h4>
        <button onClick={() => setRole("client")}>Client</button>
        <button onClick={() => setRole("server")}>Server</button>
      </div>

      <div>
        <h4>Choose sound</h4>
        <button onClick={handlePlaySound}>Play sound!</button>
      </div>
      <div>Esta sonando desde el {playing}</div>
    </div>
  );
};

export default App;
