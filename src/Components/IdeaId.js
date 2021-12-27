import { getIdea, getideas } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import "../App.css";
import { uploadArticle } from "../DatabaseInteraction/db";
import JournalistSelection from "./JournalistSelection";
import emailjs from "emailjs-com";
import StateSelection from "./StateSelection";
import PhotographerSelection from "./PhotographerSelection";
import SectionSelection from "./SectionSelection";
import SizeSelection from "./SizeSelection";

export default function IdeaId(props) {
  const [idea, setIdea] = useState();
  const [newArticle, setNewArticle] = useState({});
  const [emailData, setEmailData] = useState();
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
  console.log("Idea: ", idea, "Article: ", newArticle);

  async function handleUpload(e) {
    e.preventDefault();
    console.log("Check Article Setting: ", newArticle);
    setArticles((articles) => [...articles, newArticle]);
  }

  useEffect(() => {
    if (articles.length > 0) {
      uploadArticle(articles);
      console.log("Upload Check");
      props.submit(submitter);

      emailjs.send(
        "service_5flydld",
        "template_1fkl0ur",
        {
          to_name: "LI",
          Title: "ABCDE",
          Section: "Sport",
          Deadline: "27-01-2021",
          email: "neumann.lucas8@gmail.com",
        },
        "user_0gUfh2qxMOwB9lgArUZI6"
      );
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
                <JournalistSelection />
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
                <PhotographerSelection />
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
                <SectionSelection />
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
                <SizeSelection />
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
            <StateSelection />
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
