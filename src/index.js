import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./Context/UserContext.jsx";
import ErrorBoundary from './ErrorBoundary.jsx';

import Home from "./Home/Home.jsx";
import Game from "./Game/Game.jsx";
import Register from "./Register/Register.jsx";
import Profile from "./Profile/Profile.jsx";
import Users from "./Users/Users.jsx";
import WidthdrawMoney from "./Profile/WithdrawMoney.jsx";
import Sandbox from "./Sandbox/Sandbox.jsx";

import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <UserContextProvider>
        <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/game"} element={<Game />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/profile/:userID"} element={<Profile />} />
            <Route path={"/users"} element={<Users />} />
            <Route path={"/withdraw-money"} element={<WidthdrawMoney />} />
            <Route path={"/sandbox"} element={<Sandbox/>} />
          </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </UserContextProvider>
  </React.StrictMode>
);
