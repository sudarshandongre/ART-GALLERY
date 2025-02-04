import { useContext } from "react";
import React  from "react";
import logo from "../img/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/loginContext";

export default function Navbar({ login }) {
  const {setModalOpen} = useContext(LoginContext) 
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/createPost">
            <li>Create Post</li>
          </Link>
          <Link to={""}>
            <button className="primaryBtn" onClick={() => setModalOpen(true)}>
              Log Out
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>Sign-up</li>
          </Link>
          <Link to="/signin">
            <li>Sign-in</li>
          </Link>
        </>,
      ];
    }
  };

  return (
    <div className="navbar">
      <img src={logo} alt="logo" />
      <ul className="nav__menu">{loginStatus()}</ul>
    </div>
  );
}
