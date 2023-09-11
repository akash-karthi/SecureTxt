import "./App.css";
// import Homepage from './Components/Homepage/homepage';
import Homepage from "./Components/Homepage/Homepage";
import Navbar from "./Components/Navbar/navbar";
import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Text from "./Components/Text/Text";
function App() {
  const [mode, toggleDarkMode] = useState("light");
  const modeHandler = () => {
    if (mode === "light") {
      toggleDarkMode("dark");
      document.body.style.backgroundColor = "#141617";
      document.getElementById("hero_txt").style.color = "#ffffff";
      document.body.style.color = "#f2f2f2";
      document.getElementById("slash").style.color = "#ffffff";
      document.getElementById("dir").style.border = "none";
      let explainBlocks = document.getElementsByClassName("explain_block");
      for (let it = 0; it < explainBlocks.length; it++)
        explainBlocks[it].style.color = "#ffffff";
      document.querySelector(".notes").style.boxShadow =
        "0px 20px 40px rgba(255, 255, 255, 0.1);";
      document.querySelector(".questions").style.color = "#444444";
      document.querySelector("footer").style.backgroundColor = "#141617";
      let anchors = document.querySelectorAll("footer a");
      for (let it = 0; it < anchors.length; it++)
        anchors[it].style.color = "#ffffff";
      let H4 = document.querySelectorAll("h4");
      for (let it = 0; it < H4.length; it++) H4[it].style.color = "#ffffff";
    } else {
      toggleDarkMode("light");
      document.location = "/";
    }
  };
  return (
    <BrowserRouter>
      <Navbar mode={mode} toggle={modeHandler}></Navbar>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="*" element={<Text />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
