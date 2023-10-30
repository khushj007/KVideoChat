import { useContext, createContext, useState } from "react";
import { Peer } from "peerjs";

const peerContext = createContext();
const peer = new Peer();

const PeerContext = ({ children }) => {
  const [peerId, setPeerId] = useState();
  peer.on("open", function (id) {
    setPeerId(id);
  });

  return (
    <peerContext.Provider value={{ peer, peerId }}>
      {children}
    </peerContext.Provider>
  );
};

export function usePeer() {
  return useContext(peerContext);
}

export default PeerContext;
