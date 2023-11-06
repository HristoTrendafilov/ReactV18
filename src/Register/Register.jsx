import React, { useState } from "react";

import { getUserByUsername, addUser } from "../api.js";
import { useNavigate } from "react-router-dom";

import "./register.scss";

const defaultInputValues = {
  username: "",
  password: "",
  repeatedPassword: "",
};

export default function Register() {
  const [inputs, setInputs] = useState(defaultInputValues);
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault(0);
    if (inputs.repeatedPassword !== inputs.password) {
      setErrors("The passwords dont match!");
      return;
    }

    setIsSubmitting(true);
    setErrors("");

    const user = await getUserByUsername(inputs.username);
    if (user) {
      setErrors(`There already exist user with username: ${inputs.username}`);
      setIsSubmitting(false);
      return;
    }

    await addUser(inputs.username, inputs.password);
    navigate("/");
  };

  return (
    <div className="register-wrapper">
      <div className="card">
        <h3 className="card-header">Register</h3>
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="repeatedPassword" className="form-label">
                Repeat password
              </label>
              <input
                onChange={(e) =>
                  setInputs({ ...inputs, repeatedPassword: e.target.value })
                }
                value={inputs.repeatedPassword}
                type="password"
                className="form-control"
                id="repeatedPassword"
              />
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-success w-100"
            >
              Register
            </button>
          </form>
        </div>
        {errors && <div className="card-footer error">{errors}</div>}
      </div>
    </div>
  );
}
