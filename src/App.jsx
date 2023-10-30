import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import { SocketProvider } from "./Context/Socketcontext";
import Room from "./Pages/Room/Room";
import Dialer from "./Component/Dialer/Dialer";
import PeerContext from "./Context/PeerContext";

const App = () => {
  return (
    <div>
      <SocketProvider>
        <PeerContext>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/room/:id" element={<Room />} />
              <Route path="t" element={<Dialer />} />
            </Routes>
          </BrowserRouter>
        </PeerContext>
      </SocketProvider>
    </div>
  );
};

export default App;
