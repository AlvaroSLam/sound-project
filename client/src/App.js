import io from "socket.io-client";

const socket = io.connect("http://localhost:5050");

const App = () => {
  return (
    <div>
      <h1>Soundbot</h1>
    </div>
  );
};

export default App;
