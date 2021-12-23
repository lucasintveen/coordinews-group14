import { getIdea, getideas } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import "../App.css";
import Popup from "./Popup";
import { uploadArticle } from "../DatabaseInteraction/db";
import Articles from "./Ideas";

export default function IdeaId(props, { submitForm }) {
  const [idea, setIdea] = useState();
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({});

  const { ideaId } = useParams();

  async function getIdeaFromDb() {
    const idea = await getIdea(ideaId);
    setIdea(idea);
    props.passChildData([ideaId, idea.Expiration]);
  }

  useEffect(getIdeaFromDb, []);

  async function handleUpload(e) {
    e.preventDefault();
    setArticles((articles) => [...articles, newArticle]);
    // submitForm;
  }
  console.log("Missing Check:", articles);

  useEffect(() => {
    if (articles.length > 0) {
      uploadArticle(articles);
    }
  }, [articles]);

  if (!idea) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  function handleChange(event) {
    setNewArticle({
      ...newArticle,
      [event.target.name]: event.target.value,
    });
    console.log("Changer: ", event.target.value);
    console.log("new: ", newArticle);
  }

  return (
    <div className="form-content-right">
      <form className="form">
        <h1>
          Create an article by filling the missing pieces!
          <span style={{ color: "#D7BADD" }}>
            {" "}
            (Click on the elements to edit){" "}
          </span>
        </h1>
        <div className="form-inputs">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            type="text"
            name="title"
            defaultValue={idea.Title}
            value={newArticle.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-inputs">
          <label className="form-label">Comment</label>
          <input
            className="form-input"
            type="text"
            name="comment"
            defaultValue={idea.Comment}
            value={newArticle.comment}
            onChange={handleChange}
          />
        </div>

        <div className="form-inputs">
          <div className="form-inputs1">
            <div className="form-inputs">
              <label className="form-label">Idea Source</label>
              <input
                className="form-input1"
                type="text"
                name="source"
                defaultValue={idea.Source}
              />
            </div>

            <div className="form-inputs">
              <label className="form-label">Journalist</label>
              <select
                className="form-input1"
                type="text"
                name="journalist"
                value={newArticle.journalist}
                onChange={handleChange}
              >
                {/* TODO: Exchange with database values from journalist class */}
                <option value="" selected disabled hidden>
                  Please Select
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
              <label className="form-label">Photographer</label>
              <select
                className="form-input1"
                type="text"
                name="photographer"
                value={newArticle.photographer}
                onChange={handleChange}
              >
                <option value="" selected disabled hidden>
                  Please Select
                </option>
                <option>LI</option>
                <option>PL</option>
                <option>AJ</option>
                <option>MA</option>
                <option>JH</option>
                <option>JN</option>
                <option>other</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-inputs">
          <div className="form-inputs1">
            <div className="form-inputs">
              <label className="form-label">Section</label>
              <select
                className="form-input"
                type="text"
                name="section"
                value={newArticle.section}
                onChange={handleChange}
              >
                <option value="" selected disabled hidden>
                  Confirm the section: {idea.Section}
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
              <label className="form-label">Work Amount</label>
              <select
                className="form-input"
                type="text"
                name="size"
                value={newArticle.size}
                onChange={handleChange}
              >
                <option value="" selected disabled hidden>
                  Please select the work amount:
                </option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-inputs">
          <label className="form-label">Current State</label>
          <select
            className="form-input"
            type="text"
            name="state"
            value={newArticle.state}
            onChange={handleChange}
          >
            <option value="" selected disabled hidden>
              Please select the current state of work:
            </option>
            <option>0.25</option>
            <option>0.5</option>
            <option>0.75</option>
            <option>1</option>
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">Deadline Date</label>
          <input
            className="form-input"
            type="date"
            name="deadline"
            value={newArticle.deadline}
            onChange={handleChange}
          />
        </div>

        <button className="form-input-btn" type="submit" onClick={handleUpload}>
          Submit Article
        </button>
        <span className="form-input-login">
          You changed your mind about the article? Go <a href="#">back</a>
        </span>
      </form>
    </div>
  );
}
