import {
  getArticle,
  editArticle,
  submitArticle,
} from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import "../CSS/App.css";
import Parse from "parse";
import SelectionPhotographer from "../Selection/SelectionPhotographer";
import SelectionState from "../Selection/SelectionState";
import SelectionSize from "../Selection/SelectionSize";

export default function ArticleID(props) {
  const [article, setArticle] = useState();
  const [articles, setArticles] = useState([]);
  const [articleSubmission, setArticleSubmission] = useState([]);
  const [newArticle, setNewArticle] = useState({});
  const completion = "Yes";
  const { articleId } = useParams();
  async function getArticleFromDb() {
    const article = await getArticle(articleId);
    setArticle(article);
    props.passChildData([articleId, article.Deadline]);
    const Article = new Parse.Object("Article");
    Article.set("objectId", articleId);
  }
  useEffect(getArticleFromDb, []);

  function handleChange(event) {
    setNewArticle({
      ...newArticle,
      [event.target.name]: event.target.value,
    });
    setArticle({ ...article, [event.target.name]: event.target.value });
  }
  function handleDelete() {
    props.isDeleter(true);
  }

  async function handleUpload(e) {
    e.preventDefault();
    setArticles((articles) => [...articles, article]);
  }

  useEffect(() => {
    if (articles.length > 0) {
      editArticle(articles);
    }
  }, [articles]);

  async function handleSubmit(e) {
    e.preventDefault();
    setArticleSubmission([
      {
        ArticleId: article.ArticleId,
        Completion: completion,
        Title: article.Title,
        Section: article.Section,
        Journalist: article.Journalist,
        Photographer: article.Photographer,
        Deadline: article.Deadline,
      },
    ]);
  }

  useEffect(() => {
    if (articleSubmission.length > 0) {
      submitArticle(articleSubmission);
    }
  }, [articleSubmission]);

  if (!article) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
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
            name="Title"
            defaultValue={article.Title}
            value={newArticle.Title}
            onChange={handleChange}
            style={{ fontSize: "22px", fontWeight: "bold" }} //Let input appear as a h1
          />
        </div>

        <div className="form-inputs">
          <label className="form-label">Comment</label>
          <input
            className="form-input"
            type="text"
            name="Comment"
            defaultValue={article.Comment}
            value={newArticle.Comment}
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
                name="Journalist"
                defaultValue={article.Journalist} // Cannot be changed as assigned by Editor in Chief
              ></input>
            </div>
            <div className="form-inputs">
              <label className="form-label">Photographer</label>
              <select
                className="form-input1"
                type="text"
                name="Photographer"
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
                name="Section"
                defaultValue={article.Section}
              ></input>
            </div>

            <div className="form-inputs">
              <label className="form-label">Work Amount</label>
              <select
                className="form-input"
                type="text"
                name="Size"
                value={newArticle.Size}
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
            name="State"
            value={newArticle.State}
            defaultValue={article.State}
            onChange={handleChange}
          >
            <SelectionState />
          </select>
        </div>

        <div className="form-inputs2">
          <button
            className="art-delete-btn"
            type="submit"
            onClick={handleDelete}
          >
            Delete Article
          </button>
          <button className="art-edit-btn" type="submit" onClick={handleUpload}>
            Edit Article
          </button>
          <button
            className="art-submit-btn"
            type="submit"
            onClick={handleSubmit}
          >
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
