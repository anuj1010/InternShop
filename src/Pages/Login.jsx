import React, { useContext, useState } from "react";
import "./CSS/Login.css";
import axios from "axios";
import { UserContext } from "../Components/Context/UserContext";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });
      if (response.status == 200) {
        Cookies.set("AuthToken", response.data.token, { expires: 1 / 48 });
        alert("Login Successfull");
        setLoggedIn(true);
      }
      // console.log("response", response);
    } catch (error) {
      console.log(error);
      alert("Inavlid Credentials");
    }
  };

  if (loggedIn) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
