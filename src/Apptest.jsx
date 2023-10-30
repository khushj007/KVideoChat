import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Peer } from "peerjs";
import ReactPlayer from "react-player";

function App() {
  const [Id, setId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const peerInstance = useRef();
  const [mystream, setMystream] = useState();
  const [remotestream, setRemotestream] = useState();
  const [Data, setData] = useState("");
  useEffect(() => {
    const peer = new Peer();
    peerInstance.current = peer;
    peerInstance.current.on("open", function (id) {
      setId(id);
    });

    peer.on("call", (call) => {
      console.log(`client ChannelSplitterNode`, call);

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

  function call(id) {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((res) => {
        setMystream(res);
        const call = peerInstance.current.call(id, res);
        console.log(`client1`, call);
        call.on("stream", (remoteStream) => {
          console.log(`remote got answer back`, remoteStream);
          setRemotestream(remoteStream);
        });
      });
  }

  return (
    <div className="App">
      <h1>{Id}</h1>
      <input
        type="text"
        value={remoteId}
        onChange={(e) => {
          setRemoteId(e.target.value);
        }}
      />
      <button
        onClick={() => {
          call(remoteId);
        }}
      >
        Call
      </button>
      {mystream && <h1>My Stream</h1>}
      <ReactPlayer url={mystream} playing muted />

      {remotestream && <h1>Remote Stream</h1>}

      <ReactPlayer url={remotestream} playing />
    </div>
  );
}

export default App;
