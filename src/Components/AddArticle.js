import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { uploadArticle } from "../DatabaseInteraction/db";
import "../App.css";

export default function Upload() {
  const [articles, setArticles] = useState([]);

  const [newArticle, setNewArticle] = useState({});

  const navigate = useNavigate();

  async function handleUpload(e) {
    e.preventDefault();
    console.log("newa", newArticle);
    setArticles((articles) => [...articles, newArticle]);
  }

  useEffect(() => {
    if (articles.length > 0) {
      console.log(articles);
      uploadArticle(articles);
      navigate("/");
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
    <div className="background--box">
      <form>
        <ul className="form--list">
          <li className="form--row">
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={newArticle.title}
              onChange={handleChange}
            />
          </li>
          <li className="form--row">
            <label>Comment</label>
            <input
              type="text"
              placeholder="Comment"
              name="comment"
              value={newArticle.comment}
              onChange={handleChange}
            />
          </li>
          <li className="form--row">
            <label>Section</label>
            <input
              type="text"
              placeholder="Section"
              name="section"
              value={newArticle.section}
              onChange={handleChange}
            />
          </li>

          <li className="form--row">
            <label>Size</label>
            <input
              type="text"
              placeholder="Size"
              name="size"
              value={newArticle.size}
              onChange={handleChange}
            />
          </li>

          <li className="form--row">
            <label>State</label>
            <input
              type="text"
              placeholder="State"
              name="state"
              value={newArticle.state}
              onChange={handleChange}
            />
          </li>

          <li className="form--row">
            <label>Journalist</label>
            <input
              type="text"
              placeholder="Journalist"
              name="journalist"
              value={newArticle.journalist}
              onChange={handleChange}
            />
          </li>

          <li className="form--row">
            <label>Photographer</label>
            <input
              type="text"
              placeholder="Photographer"
              name="photographer"
              value={newArticle.photographer}
              onChange={handleChange}
            />
          </li>

          <li className="form--row">
            <label>Deadline</label>
            <input
              type="date"
              placeholder="Add Deadline"
              name="deadline"
              value={newArticle.deadline}
              onChange={handleChange}
            />
          </li>

          <button type="submit" onClick={handleUpload} className="form--button">
            Submit Article
          </button>
        </ul>
      </form>
    </div>
  );
}