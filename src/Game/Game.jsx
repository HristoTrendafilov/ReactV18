import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

import "./game.scss";

const defaultRangeInputValues = {
  minRandomNumber: 1000,
  maxRandomNumber: 9999,
};

const randomNumber = (calculateNewNumbersSum) => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log("here again");

  const number =
    Math.floor(
      Math.random() *
        (calculateNewNumbersSum * 1000 - calculateNewNumbersSum + 1)
    ) + calculateNewNumbersSum;
  console.log(number);
  return number;
};

export default function Game() {
  const [bet, setBet] = useState(1);
  const [numberInput, setNumberInput] = useState("");
  const [hasGuessed, setHasGuessed] = useState(false);
  const [turnsLeft, setTurnsLeft] = useState(3);
  const numberToGuess = useMemo(() => randomNumber(bet), [bet]);

  const { user, increaseBalance, decreaseBalance } = useContext(UserContext);
  const navigate = useNavigate();

  const congratulationsRef = useRef(null);

  const noMoreMoney = user.balance === 0;

  useEffect(() => {
    if (!congratulationsRef.current) {
      return;
    }

    const h1 = congratulationsRef.current.querySelector("h1");
    if (turnsLeft === 0) {
      h1.textContent = `No more turns left. The number was: ${numberToGuess}`;
    }
    if (hasGuessed) {
      h1.textContent = "Congratulations. You win 1000$";
    }
  }, [hasGuessed, turnsLeft]);

  const handleCheckGuess = () => {
    if (Number(numberInput) === numberToGuess) {
      setHasGuessed(true);
      setNumberInput("");
      increaseBalance(1000);
    } else {
      decreaseBalance(10);
    }

    setTurnsLeft(turnsLeft - 1);
  };

  const handleTryAgain = () => {
    setHasGuessed(false);
    setCalculateNewNumbersSum(calculateNewNumbersSum + 1);
    setTurnsLeft(3);
    setNumberInput("");
  };

  const exitGame = () => {
    navigate("/");
  };

  const increaseBet = (e) => {
    setBet(bet + 1);
  };

  const decreaseBet = () => {
    setBet(bet - 1);
  };

  return (
    <div className="game-wrapper">
      <div className="d-flex flex-wrap gap-sm-3 justify-content-center mb-3">
        <h1>Welcome {user.username}</h1>
        <button onClick={exitGame} className="btn btn-md btn-secondary">
          Exit the game
        </button>
      </div>

      <hr />
      <div className="d-flex justify-content-between">
        <div>Turns left: {turnsLeft}</div>
        <div>Balance: {user.balance}$</div>
      </div>

      <div className="d-flex gap-3 mb-3">
        <input
          onChange={(e) => {
            setNumberInput(e.target.value);
          }}
          value={numberInput}
          type="number"
          className="form-control"
          readOnly={turnsLeft === 0 || hasGuessed}
        />
        <button
          disabled={turnsLeft === 0 || hasGuessed || noMoreMoney}
          onClick={handleCheckGuess}
          className="btn btn-primary"
        >
          Guess
        </button>
      </div>

      <div className="number-guess">
        {String(numberToGuess).substring(0, String(numberToGuess).length - 1) +
          "X"}
      </div>

      {(hasGuessed || turnsLeft === 0) && (
        <div
          ref={congratulationsRef}
          className="d-flex flex-column justify-content-center"
        >
          <h1></h1>
          <button className="btn btn-success" onClick={handleTryAgain}>
            Try again
          </button>
        </div>
      )}

      <div className="row g-2">
        <div className="col-sm-5">
          <button onClick={increaseBet} className="btn btn-success w-100">
            Im feeling lucky
          </button>
        </div>
        <div className="col-sm-2"></div>
        <div className="col-sm-5">
          <button onClick={decreaseBet} className="btn btn-warning w-100">
            Im scared for my life
          </button>
        </div>
      </div>
    </div>
  );
}
