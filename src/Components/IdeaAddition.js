import { useEffect, useState } from "react";
import { uploadIdea } from "../DatabaseInteraction/db";
import "../CSS/Form.css";
import SelectionJournalist from "../Selection/SelectionJournalist";
import SelectionSection from "../Selection/SelectionSection";
import SelectionArticleConversion from "../Selection/SelectionArticleConversion";
import SelectionVisibility from "../Selection/SelectionVisibility";
import "../CSS/App.css";

export default function IdeaAddition(props) {
  const [idea, setIdea] = useState([]);
  const [newIdea, setNewIdea] = useState({}); // Used to handle changes of inputs
  const submitter = true;
  async function handleUpload(e) {
    e.preventDefault();
    setIdea((idea) => [...idea, newIdea]);
  }
  function handleChange(event) {
    setNewIdea({
      ...newIdea,
      [event.target.name]: event.target.value,
    });
  }
  useEffect(() => {
    if (idea.length > 0) {
      uploadIdea(idea);
      props.passChildData(submitter);
    }
  }, [idea]);

  return (
    /* No component used for various forms, as these are too distinct from each other. Moving it out too 
    components and using props to pass information would not have necessarily simplified the implementation*/
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
            style={{ fontSize: "22px", fontWeight: "bold" }} //Let input appear as a h1
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
            <SelectionJournalist />
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
            <SelectionSection />
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">Visibility</label>
          <select
            className="form-input"
            name="visible"
            value={newIdea.visible}
            onChange={handleChange}
          >
            <SelectionVisibility />{" "}
            {/* Information is not used in the current implementation*/}
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">Conversion into Article</label>
          <select
            className="form-input"
            name="article"
            value={newIdea.article}
            onChange={handleChange}
          >
            <SelectionArticleConversion />
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
