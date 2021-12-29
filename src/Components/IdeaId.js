import { getIdea } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import "../CSS/App.css";
import { uploadArticle } from "../DatabaseInteraction/db";
import sendEmail from "./IdeaAssignmentEmail";
import SelectionJournalist from "../Selection/SelectionJournalist";
import SelectionPhotographer from "../Selection/SelectionPhotographer";
import SelectionSection from "../Selection/SelectionSection";
import SelectionSize from "../Selection/SelectionSize";
import SelectionState from "../Selection/SelectionState";

export default function IdeaID(props) {
  const [idea, setIdea] = useState();
  const [newArticle, setNewArticle] = useState({});
  const [articles, setArticles] = useState([]);
  const { ideaId } = useParams();
  var submitter = true;

  async function getIdeaFromDb() {
    const idea = await getIdea(ideaId);
    setIdea(idea);
    props.passChildData([ideaId, idea.Expiration]);
    setNewArticle({
      title: idea.Title,
      comment: idea.Comment,
    });
  }
  useEffect(getIdeaFromDb, []);

  async function handleUpload(e) {
    e.preventDefault();
    setArticles((articles) => [...articles, newArticle]);
    sendEmail(idea.Source, idea.Title, idea.Section, idea.Expiration);
  }

  useEffect(() => {
    if (articles.length > 0) {
      uploadArticle(articles);
      props.submit(submitter);
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
  }

  return (
    <div className="form-content-right">
      <form className="form">
        <h1>Create an article by filling the missing pieces! Click to edit</h1>
        <div className="form-inputs">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            type="text"
            name="title"
            defaultValue={idea.Title}
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
                <SelectionJournalist />
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
                <SelectionPhotographer />
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
                <SelectionSection />
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
                <SelectionSize />
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
            <SelectionState />
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
