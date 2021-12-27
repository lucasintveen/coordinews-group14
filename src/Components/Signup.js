import { useState } from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import { restCreateUser } from "../DatabaseInteraction/RestAPI";
import { getArticle } from "../DatabaseInteraction/RestAPI";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function createAccount() {
    const user = new Parse.User();
    user.setUsername(username);
    user.setPassword(password);
    user.setEmail(email);
    user.set("Role", role);
    try {
      await user.signUp();
      navigate("/#/home");
    } catch (error) {
      alert("Error: " + error.message + "Please go back and try again :)");
    }
  }

  function takeUserData() {
    const postUserData = {
      username: username,
      password: password,
      email: email,
    };
    restCreateUser(postUserData);
  }

  function usernameChange(e) {
    setUsername(e.target.value);
  }
  function passwordChange(e) {
    setPassword(e.target.value);
  }

  function emailChange(e) {
    setEmail(e.target.value);
  }

  function positionChange(e) {
    setRole(e.target.value);
  }

  console.log("position: ", role);

  return (
    <div className="background--box">
      <div id="second--signup">
        <form>
          <ul>Sign up to Coordinews {"\u270D"}</ul>
          <ul className="form--list">
            <li className="form--row">
              <label>Username</label>
              <input
                onChange={usernameChange}
                type="text"
                placeholder="Enter username"
              />
            </li>
            <li className="form--row">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={passwordChange}
              />
            </li>
            <li className="form--row">
              <label>Email</label>
              <input
                onChange={emailChange}
                type="email"
                placeholder="Enter email"
              />
            </li>
            <li className="form--row">
              <label>Position</label>
              <select
                placeholder="Select Position"
                name="position"
                value={role}
                onChange={positionChange}
              >
                <option value="" selected disabled hidden>
                  Please Select Here
                </option>
                <option>Editor</option>
                <option>Journalist</option>
                <option>Photographer</option>
                <option>Assistant</option>
              </select>
            </li>
          </ul>

          <button
            onClick={createAccount}
            className="form--button"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
