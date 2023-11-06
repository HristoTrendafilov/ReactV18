import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";
import { getUser } from "../api.js";

import "./home.scss";

const defaultInputValues = {
  username: "",
  password: "",
};

export default function Home() {
  const [inputs, setInputs] = useState(defaultInputValues);
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addUserToContext } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setIsSubmitting(true);

    const user = await getUser(inputs.username, inputs.password);
    if (!user) {
      setErrors("Invalid username or password");
      setIsSubmitting(false);
      return;
    }

    addUserToContext(user);
    navigate("/game");
  };

  return (
    <div className="home-wrapper">
      <div className="card">
        <h3 className="card-header">Login</h3>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="mb-1">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                value={inputs.username}
                className="form-control"
                id="username"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                value={inputs.password}
                type="password"
                className="form-control"
                id="password"
                required
              />
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary w-100"
            >
              Enter the game
            </button>
          </form>
        </div>
        {errors && <div className="card-footer error">{errors}</div>}
      </div>
      <div className="d-flex justify-content-center">
        Dont have an account?{" "}
        <Link className="ms-2" to={"/register"}>
          register now
        </Link>
      </div>
    </div>
  );
}
