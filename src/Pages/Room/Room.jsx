import { useEffect, useState } from "react";
import { useSocket } from "../../Context/Socketcontext";
import Dialer from "../../Component/Dialer/Dialer";
import "./Room.css";
import { usePeer } from "../../Context/PeerContext";
import ReactPlayer from "react-player";

const Room = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [members, setMembers] = useState([]);
  const socket = useSocket();
  const { peer, peerId } = usePeer();
  const [myStrem, setMystream] = useState();
  const [remotestream, setRemotestream] = useState();

  function call(id) {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((res) => {
        setMystream(res);
        const call = peer.call(id, res);
        call.on("stream", (remoteStream) => {
          setRemotestream(remoteStream);
        });
      });
  }

  useEffect(() => {
    socket.on("details", ({ name, room }) => {
      setName(name);
      setRoom(room);
    });

    socket.on("members", (data) => {
      setMembers(data);
    });

    socket.on("left", (data) => {
      alert(data);
    });

    return () => {
      window.location.reload();
    };
  }, []);

  useEffect(() => {
    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((res) => {
          setMystream(res);
          call.answer(res); // answering the call with current user media stream
          call.on("stream", (remoteStream) => {
            console.log(
              `i got the ddata which was send by client 1`,
              remoteStream
            );
            setRemotestream(remoteStream);
          });
        });
    });
  }, []);

  return (
    <div className="room">
      <h1>
        Welcome {name ? name : null} to room {room ? room : null}
      </h1>

      <h1> You Can Connect To</h1>
      <div className="contacts">
        {members?.length > 1 ? (
          members.map((member) => {
            if (member.peerId !== peerId)
              return (
                <Dialer
                  key={member.peerId}
                  id={member.peerId}
                  name={member.name}
                  call={call}
                />
              );
          })
        ) : (
          <p>You are the only one in room</p>
        )}
      </div>
      {myStrem && <h1> My Stream</h1>}

      {myStrem && <ReactPlayer url={myStrem} playing muted />}
      {remotestream && <h1> Remote Stream</h1>}

      {remotestream && <ReactPlayer url={remotestream} playing />}
    </div>
  );
};

export default Room;
