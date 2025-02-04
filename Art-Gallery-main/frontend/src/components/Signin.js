import React, { useState } from "react";
import logo from "../img/logo.png";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogin } from "../context/loginContext";

export default function Signin() {
  const { setUserLogin } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notifyE = (msg) => toast.error(msg);

  const notifyA = (msg) => toast.success(msg);

  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const navigate = useNavigate();

  const checkData = () => {
    if (!regexEmail.test(email)) {
      notifyE("Invalid Email!");
      return;
    }

    fetch("http://localhost:5000/signin", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyE(data.error);
        } else {
          notifyA("Signed-In Successfully!");
          console.log(data);
          localStorage.setItem("jwt", data);
          setUserLogin(true);
          navigate("/");
        }
        console.log(data);
      });
  };

  return (
    <div className="sign-in">
      <div>
        <div className="loginForm">
          <img className="sign-logo" src={logo} alt="" />
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div>
            <input
              type="submit"
              id="login-btn"
              onClick={() => {
                checkData();
              }}
              value="Sign In"
            />
          </div>
          <p>
            Don't have an account?
            <Link to="/signup">
              <span
                className="form2"
                style={{ color: "blue", cursor: "pointer" }}
              >
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
