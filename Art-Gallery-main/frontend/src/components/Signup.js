import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const notifyE = (msg) => toast.error(msg);

  const notifyA = (msg) => toast.success(msg);

  const notifyW = (msg) => toast.warning(msg);

  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const postData = () => {
    // email check
    if (!regexEmail.test(email)) {
      notifyE("Invalid Email!");
      return;
    } else if (!regexPassword.test(password)) {
      notifyW(
        "Password must contain 8 characters, including at least 1 number, 1 lowercase and 1 uppercase letter, and 1 special character."
      );
      return;
    }

    fetch("http://localhost:5000/signup", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyE(data.error);
        } else {
          notifyA(data.message);
          navigate("/signin");
        }
        console.log(data);
      });
  };

  return (
    <div className="sign-up">
      <div className="form-container">
        <div className="form">
          <img className="sign-logo" src={logo} alt="" />
          <p className="sign-para">Sign-up to explore Artify</p>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Full Name"
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
          </div>
          <p
            className="sing-para"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
            By signing up, you aagree to out Terms, <br /> privacy policy and
            cookies policy.
          </p>
          <div>
            <input
              type="submit"
              id="submit-btn"
              onClick={() => {
                postData();
              }}
              value="Sign Up"
            />
          </div>
          <p>
            Already have an account?
            <Link to="/signin">
              <span
                className="form2"
                style={{ color: "blue", cursor: "pointer" }}
              >
                Sign In
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
