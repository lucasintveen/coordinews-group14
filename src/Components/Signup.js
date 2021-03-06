import { useState } from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
//import { restCreateUser } from "../DatabaseInteraction/RestAPI";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [imageChosen, setImageChosen] = useState();

  // both of the following functions work well, and post the user data via the API
  // I decided to use the Parse functionality, as it turned out to be very simple, whenever needing the current user
  async function createAccount() {
    const imageURL = URL.createObjectURL(imageChosen);
    const imageTrans = imageURL.toString().substring(5);
    const user = new Parse.User();
    user.setUsername(username);
    user.setPassword(password);
    user.setEmail(email);
    user.set("Role", role);
    user.set("Image", imageTrans);
    try {
      await user.signUp();
      navigate("/home");
    } catch (error) {
      alert("Error: " + error.message + "Please go back and try again :)");
    }
    navigate("/home");
  }

  // currently not used but functioning
  // async function createAccountRest() {
  //   var user;
  //   const postUserData = {username: username, password: password, email: email, role: role,};
  //   try {
  //     user = restCreateUser(postUserData);
  //     navigate("/home");
  //   } catch (error) {alert("Error: " + error.message + " Please go back and try again :)");}
  // }

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

  function handleImageUpload(e) {
    setImageChosen(e.target.files[0]);
  }

  return (
    <div className="form-container1">
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

            <li className="form--row">
              <label>Profile Picture</label>
              {!imageChosen && (
                <input
                  onChange={handleImageUpload}
                  type="file"
                  placeholder="Select a locally stored image"
                  style={{ paddingTop: "3px" }}
                />
              )}
              {imageChosen && (
                <>
                  <img
                    alt=""
                    style={{ maxWidth: "200px", marginRight: "365px" }}
                    src={URL.createObjectURL(imageChosen)}
                  />
                </>
              )}
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
