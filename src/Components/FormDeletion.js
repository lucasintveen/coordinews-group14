import React from "react";
import Start from "../Images/Start.png";
import "../CSS/Form.css";
import { uploadDeletion } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";

const FormDeletion = (props) => {
  const navigate = useNavigate();
  const [newDeletion, setNewDeletion] = useState([]);

  const [newCommunication, setNewCommunication] = useState({});

  async function handleUpload(e) {
    e.preventDefault();
    setNewDeletion((newDeletion) => [...newDeletion, newCommunication]);
    props.submitForm();
    deleteArticle();
    props.deleteArticle();
  }

  function backHandle() {
    navigate("/articles");
    console.log("Triggered");
  }

  useEffect(() => {
    if (newDeletion.length > 0) {
      uploadDeletion(newDeletion);
    }
  }, [newDeletion]);

  function handleChange(event) {
    setNewCommunication({
      ...newCommunication,
      [event.target.name]: event.target.value,
    });
  }

  console.log("Comment Value: ", newDeletion.comment);
  console.log("Change Value: ", newCommunication.comment);

  async function deleteArticle() {
    const Article = new Parse.Object("Article");
    Article.set("objectId", props.articleId);
    try {
      await Article.destroy();
      window.location.reload();
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
    }
  }

  return (
    <div className="form-content-right">
      <form className="form">
        <h1>
          Are you sure that you want to delete the following{" "}
          {props.formType ? "article" : "idea"} ?
        </h1>
        <div className="form-inputs">
          <label className="form-label">Comment</label>
          <input
            className="form-input"
            type="text"
            placeholder="Enter a short comment to explain the deletion"
            name="comment"
            value={newDeletion.comment}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs2">
          <button
            className="form-decline-btn"
            type="submit"
            onClick={backHandle}
          >
            No, please take me back!
            <span style={{ color: "#D7BADD" }}>(Dummy)</span>
          </button>
          <button
            className="form-delete-btn"
            type="submit"
            onClick={handleUpload}
          >
            Yes, delete the article
            <span style={{ color: "#D7BADD" }}>(Dummy)</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormDeletion;
