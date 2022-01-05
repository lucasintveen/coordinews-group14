import React from "react";
import "../CSS/Form.css";
import { uploadDeletion } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Parse from "parse";

export default function FormDeletion(props) {
  const [newDeletion, setNewDeletion] = useState([]);
  const [newCommunication, setNewCommunication] = useState({});

  async function handleUpload(e) {
    e.preventDefault();
    console.log("Click");
    setNewDeletion((deletion) => [...deletion, newCommunication]);
  }

  function handleChange(event) {
    setNewCommunication({
      ...newCommunication,
      [event.target.name]: event.target.value,
      type: "Article Deletion",
      articleId: props.articleId,
    });
  }

  useEffect(() => {
    if (newDeletion.length > 0) {
      console.log(newDeletion);
      deleteArticle();
      props.isDeleter(false);
      props.submitter(true);
      uploadDeletion(newDeletion);
    }
  }, [newDeletion]);

  async function deleteArticle() {
    const Article = new Parse.Object("Article");
    Article.set("objectId", props.articleId);
    try {
      const deleteArtTest = await Article.destroy();
      console.log("Delete Test: ", deleteArtTest);
      return true;
    } catch (error) {}
    console.log("Jawoll");
  }
  function handleDelete() {
    props.isDeleter(false);
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
            value={newCommunication.comment}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs2">
          <button
            className="form-decline-btn"
            type="submit"
            onClick={handleDelete}
          >
            No, please take me back!
            <span style={{ color: "#D7BADD" }}>(Dummy)</span>
          </button>

          <button
            type="submit"
            onClick={handleUpload}
            className="form-delete-btn"
          >
            Yes, delete the Article
          </button>
        </div>
      </form>
    </div>
  );
}
