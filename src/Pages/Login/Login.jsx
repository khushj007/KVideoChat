import "./Login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../Context/Socketcontext";
import { usePeer } from "../../Context/PeerContext";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const { peerId } = usePeer();
  function navigateUser({ name, room }) {
    navigate(`/room/:${room}`);
  }

  useEffect(() => {
    socket.on("room-joined", navigateUser);
    return () => {
      socket.off("room-joined", navigateUser);
    };
  }, []);

  function handelSubmit(e) {
    e.preventDefault();

    socket.emit("join-room", { name, room, peerId });
    setName("");
    setRoom("");
  }
  return (
    <div className="join">
      <form className="fjoin">
        <h1>KVideo</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          name="room"
          placeholder="Room"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button onClick={handelSubmit}>Join</button>
      </form>
    </div>
  );
};

export default Login;
