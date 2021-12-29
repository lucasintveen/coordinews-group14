import { useState } from "react";
import Parse from "parse";
import { useNavigate } from "react-router";
import { createNewUser, restCreateUser } from "../DatabaseInteraction/RestAPI";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function handleLoginAttempt(e) {
    e.preventDefault();

    const user = new Parse.User();
    user.setPassword(password);
    user.setUsername(username);
    user.logIn().then(navigate("/home"));
  }

  const postUserData = {
    username: "mir3",
    password: "secret",
    email: "mir3@itu.dk",
  };
  const userData = restCreateUser(postUserData);
  console.log("User Data: ", userData);

  return (
    <div className="background--box">
      <div id="second">
        <form>
          <ul>Please log yourself in {"\u270D"}</ul>
          <ul className="form--list">
            <li className="form--row">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </li>
            <li className="form--row">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
          </ul>

          <button
            onClick={handleLoginAttempt}
            className="form--button"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
