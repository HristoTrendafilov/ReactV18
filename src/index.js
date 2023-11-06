import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./Context/UserContext.jsx";

import Home from "./Home/Home.jsx";
import Game from "./Game/Game.jsx";
import Register from "./Register/Register.jsx";

import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/game"} element={<Game />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);
