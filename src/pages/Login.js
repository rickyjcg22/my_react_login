// import apiRequest from "../datafetch/apiRequest";
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLogin = {
      "username": username,
      "password": password,
    }

    const response = await fetch("http://localhost:5000/login-no-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(/*{ username, password }*/newLogin)
        // body: "username="+username+"&password="+password
      });

      const data = await response.json();

      console.log(data);

      if (data.Code === "200") {
        setSuccessMsg(data.Msg);
      } else {
        setSuccessMsg("Login failed!")
      }

  };

  return (
    <div className="Login">
      <br/>
      {successMsg}<br/>
      <br/>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

// --
