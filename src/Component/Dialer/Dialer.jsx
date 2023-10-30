import React from "react";
import "./Dialer.css";
import { usePeer } from "../../Context/PeerContext";

const Dialer = (props) => {
  const { name, id, call } = props;
  const peer = usePeer();

  return (
    <div className="d">
      <p>{name}</p>
      <p>{id}</p>
      <button
        onClick={() => {
          call(id);
        }}
      >
        Call
      </button>
    </div>
  );
};

export default Dialer;
