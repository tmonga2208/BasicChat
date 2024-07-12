import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import VideoCall from "./videocall";
import SignIn from "./signin";
import Chat from "./chat";

function Route1() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route index element={<SignIn />} />
        <Route path="/vc" element={<VideoCall/>} />
        <Route path="/messages" element={<Chat/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Route1;