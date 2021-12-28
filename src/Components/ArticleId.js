import { getArticle } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import "../App.css";
import Parse from "parse";
import SelectionPhotographer from "../Selection/SelectionPhotographer";
import SelectionState from "../Selection/SelectionState";
import SelectionSize from "../Selection/SelectionSize";

export default function ArticleID(props) {
  const [article, setArticle] = useState();
  const [newArticle, setNewArticle] = useState({});
  const { articleId } = useParams();
  async function getArticleFromDb() {
    const article = await getArticle(articleId);
    setArticle(article);
    props.passChildData([articleId, article.Deadline]);
    const Article = new Parse.Object("Article");
    Article.set("objectId", articleId);
  }
  function handleChange(event) {
    setNewArticle({
      ...newArticle,
      [event.target.name]: event.target.value,
    });
  }
  function handleDelete() {
    props.isDeleter(true);
  }
  if (!article) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  useEffect(getArticleFromDb, []);

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
            style={{ fontSize: "22px", fontWeight: "bold" }} //Let input appear as a h1
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
              <input
                className="form-input1"
                type="text"
                name="journalist"
                defaultValue={article.Journalist} // Cannot be changed as assigned by Editor in Chief
              ></input>
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
                <SelectionPhotographer />
              </select>
            </div>
          </div>
        </div>
        <div className="form-inputs">
          <div className="form-inputs1">
            <div className="form-inputs">
              <label className="form-label">Section</label>
              <input
                className="form-input"
                type="text"
                name="section"
                defaultValue={article.section}
              ></input>
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
            defaultValue={article.State}
            onChange={handleChange}
          >
            <SelectionState />
          </select>
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
