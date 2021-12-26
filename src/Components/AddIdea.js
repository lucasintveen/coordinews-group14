import { useEffect, useState } from "react";
import { uploadArticle } from "../DatabaseInteraction/db";
import "../App.css";
import "../CSS/Form.css";

export default function AddIdea({ submitForm }) {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({});

  async function handleUpload(e) {
    e.preventDefault();
    setArticles((articles) => [...articles, newArticle]);
    submitForm();
  }

  useEffect(() => {
    if (articles.length > 0) {
      uploadArticle(articles);
      // navigate("/");
    }
  }, [articles]);

  function handleChange(event) {
    setNewArticle({
      ...newArticle,
      [event.target.name]: event.target.value,
    });
  }

  return (
    //TODO: take component out and add information via prop
    <div className="form-content-right">
      <form className="form">
        <h1>Add a new idea by filling out the information below!</h1>
        <div className="form-inputs">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            type="text"
            placeholder="Enter the idea's title"
            name="title"
            value={newArticle.title}
            onChange={handleChange}
            style={{ fontSize: "22px", fontWeight: "bold" }}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Comment</label>
          <input
            className="form-input"
            type="text"
            placeholder="Enter some valuable comments"
            name="comment"
            value={newArticle.comment}
            onChange={handleChange}
          />
        </div>

        <div className="form-inputs">
          <label className="form-label">Source</label>
          <select
            className="form-input"
            name="journalist"
            value={newArticle.journalist}
            onChange={handleChange}
          >
            <option value="" selected disabled hidden>
              Please select the journalist's name
            </option>
            <option>LA</option>
            <option>LK</option>
            <option>KA</option>
            <option>LA</option>
            <option>JN</option>
            <option>LP</option>
            <option>CJ</option>
            <option>other</option>
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">Section</label>
          <select
            className="form-input"
            name="section"
            value={newArticle.section}
            onChange={handleChange}
          >
            <option value="" selected disabled hidden>
              Please select the section
            </option>
            <option>News</option>
            <option>Sport</option>
            <option>Politics</option>
            <option>Local</option>
            <option>World</option>
            <option>Business</option>
            <option>other</option>
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">Size</label>
          <select
            className="form-input"
            name="size"
            value={newArticle.size}
            onChange={handleChange}
          >
            <option value="" selected disabled hidden>
              Please select choose the potential of the idea
            </option>
            <option>Low</option>
            <option>Medium</option>
            <option>Big</option>
            <option>Headline</option>
            <option>Sensation</option>
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">Expiration Date</label>
          <input
            className="form-input"
            type="date"
            placeholder="Enter the idea's expiration Date"
            name="deadline"
            value={newArticle.deadline}
            onChange={handleChange}
          />
        </div>

        <button className="form-input-btn" type="submit" onClick={handleUpload}>
          Submit Idea
        </button>
        <span className="form-input-login">
          Idea not worthy to be noted down? Go <a href="#">back</a>
        </span>
      </form>
    </div>
  );
}
