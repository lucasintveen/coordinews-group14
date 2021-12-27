import { getArticle } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import "../App.css";
import Parse from "parse";
import JournalistSelection from "./JournalistSelection";
import StateSelection from "./StateSelection";
import SectionSelection from "./SectionSelection";
import SizeSelection from "./SizeSelection";
import PhotographerSelection from "./PhotographerSelection";

export default function ArticleId(props) {
  const [article, setArticle] = useState();
  const [newArticle, setNewArticle] = useState({});
  const { articleId } = useParams();
  console.log("Check Params: ", articleId);

  async function getArticleFromDb() {
    console.log("Function Check:", props.isSubmitter);

    const article = await getArticle(articleId);
    setArticle(article);
    props.passChildData([articleId, article.Deadline]);
    console.log(await getArticle(articleId));
    const Article = new Parse.Object("Article");
    Article.set("objectId", articleId);
    console.log("objectID: ", Article);
  }

  useEffect(getArticleFromDb, []);

  useEffect(() => {
    console.log("Use Effect Article:", article);
  }, [article]);

  if (!article) {
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
    console.log("Change ID: ", event.target.value);
  }

  function handleDelete() {
    props.isDeleter(true);
  }

  return (
    <div className="form-content-right">
      <form className="form">
        <h1>Edit, Delete or Submit the Article! </h1>
        <div className="form-inputs">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            type="text"
            name="title"
            defaultValue={article.Title}
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
            defaultValue={article.Comment}
            value={newArticle.comment}
            onChange={handleChange}
          />
        </div>

        <div className="form-inputs">
          <div className="form-inputs1">
            <div className="form-inputs">
              <label className="form-label">Journalist</label>
              <select
                className="form-input1"
                type="text"
                name="journalist"
                defaultValue={article.Journalist}
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
                defaultValue={article.Photographer}
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
                defaultValue={article.section}
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
                defaultValue={article.Size}
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
            defaultValue={article.State}
            onChange={handleChange}
          >
            <StateSelection />
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">
            New Deadline Date
            <span style={{ color: "#D7BADD" }}>
              {" "}
              (Previously {article.Deadline}){" "}
            </span>
          </label>
          <input
            className="form-input"
            type="date"
            name="deadline"
            value={newArticle.deadline}
            onChange={handleChange}
          />
        </div>

        <div className="form-inputs2">
          <button
            className="form-input-btn"
            type="submit"
            onClick={handleDelete}
          >
            Delete Article
          </button>
          <button className="form-input-btn" type="submit">
            Submit Article
          </button>
        </div>
        <span className="form-input-login">
          You changed your mind about the article? Go <a href="#">back</a>
        </span>
      </form>
    </div>
  );
}
