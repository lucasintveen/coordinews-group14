import { useEffect, useState } from "react";
import { uploadIdea } from "../DatabaseInteraction/db";
import "../App.css";
import "../CSS/Form.css";

export default function AddIdea(props) {
  const [idea, setIdea] = useState([]);
  const [newIdea, setNewIdea] = useState({});
  const submitter = true;

  async function handleUpload(e) {
    e.preventDefault();
    setIdea((idea) => [...idea, newIdea]);
  }

  useEffect(() => {
    if (idea.length > 0) {
      uploadIdea(idea);
      console.log("Check the Idea Upload: ", idea);
      props.passChildData(submitter);
    }
  }, [idea]);

  function handleChange(event) {
    setNewIdea({
      ...newIdea,
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
            value={newIdea.title}
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
            value={newIdea.comment}
            onChange={handleChange}
          />
        </div>

        <div className="form-inputs">
          <label className="form-label">Source</label>
          <select
            className="form-input"
            name="source"
            value={newIdea.source}
            onChange={handleChange}
          >
            <option value="" selected disabled hidden>
              Please select the journalist's name
            </option>
            <option>LI</option>
            <option>LK</option>
            <option>KA</option>
            <option>PW</option>
            <option>JF</option>
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">Section</label>
          <select
            className="form-input"
            name="section"
            value={newIdea.section}
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
            <option>Financial</option>
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">Size</label>
          <select
            className="form-input"
            name="potential"
            value={newIdea.potential}
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
          <label className="form-label">Idea</label>
          <select
            className="form-input"
            name="visible"
            value={newIdea.visible}
            onChange={handleChange}
          >
            <option value="" selected disabled hidden>
              Whom should see your idea?
            </option>
            <option>all</option>
            <option>Editor-in-Chief</option>
            <option>Only Journalists</option>
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">Idea</label>
          <select
            className="form-input"
            name="article"
            value={newIdea.article}
            onChange={handleChange}
          >
            <option value="" selected disabled hidden>
              Turn into article immeadiately?
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">Expiration Date</label>
          <input
            className="form-input"
            type="date"
            placeholder="Enter the idea's expiration Date"
            name="deadline"
            value={newIdea.deadline}
            onChange={handleChange}
          />
        </div>

        <button className="form-input-btn" type="submit" onClick={handleUpload}>
          Submit Idea
        </button>
        <span className="form-input-login">
          Idea not worthy to be noted down? Go <a href="#/home">back</a>
        </span>
      </form>
    </div>
  );
}
