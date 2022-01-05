import {
  getArticleExport,
  uploadDecline,
  submitArticle,
} from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../CSS/App.css";
import Parse from "parse";
import "../CSS/Form.css";

export default function HomeUserMessages(props) {
  const [Articles, setArticles] = useState();
  const [newDecline, setNewDecline] = useState([]);
  const [articleSubmission, setArticleSubmission] = useState([]);
  const [render, setRender] = useState(false);
  const completion = "No";

  async function getArticlesFromDb() {
    const Articles = await getArticleExport();
    setArticles(Articles.articlesMapped);
  }
  useEffect(() => {
    getArticlesFromDb();
  }, []);

  useEffect(() => {
    if (articleSubmission.length > 0) {
      submitArticle(articleSubmission);
    }
  }, [articleSubmission]);

  useEffect(() => {
    if (newDecline.length > 0) {
      uploadDecline(newDecline);
    }
  }, [newDecline]);

  useEffect(() => {
    getArticlesFromDb();
  }, [render]);

  if (!Articles) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  //filtering relevant and already accepted articles for the specific user logged in
  const filteredArticles = Object.values(Articles).filter((article) => {
    if (
      Parse.User.current().attributes.role === "Journalist" &&
      article.JournalistAcc == false &&
      article.Decline != true
    ) {
      return article.Journalist.includes(
        Parse.User.current().attributes.username
      );
    } else if (
      Parse.User.current().attributes.role === "Photographer" &&
      article.PhotographerAcc == false &&
      article.Decline != true
    ) {
      return article.Photographer.includes(
        Parse.User.current().attributes.username
      );
    } else if (
      Parse.User.current().attributes.role === "Assistant" &&
      article.AssistanceAcc == false &&
      article.Decline != true
    ) {
      return article.Assistant.includes(
        Parse.User.current().attributes.username
      );
    } else if (
      Parse.User.current().attributes.role === "Editor" &&
      article.JournalistAcc === false &&
      article.Decline != true
    ) {
      return article.Journalist.includes(
        Parse.User.current().attributes.username
      );
    }
  });

  console.log("Filter art:", filteredArticles);
  function handleSubmit(i, trigger) {
    var declined = false;
    if (trigger === "decline") {
      declined = true;
    }
    console.log("Click");
    setArticleSubmission([
      {
        ArticleId: filteredArticles[i].Details,
        Completion: completion,
        Title: filteredArticles[i].Title,
        Section: filteredArticles[i].Section,
        Journalist: filteredArticles[i].Journalist,
        Photographer: filteredArticles[i].Photographer,
        Deadline: filteredArticles[i].Deadline,
        Decline: declined,
      },
    ]);
    setNewDecline([
      {
        ArticleId: filteredArticles[i].Details,
      },
    ]);
    setRender(!render);
  }
  console.log("Length Before:", filteredLength);
  var filteredLength = filteredArticles.length;
  if (filteredLength > 5) {
    filteredLength = 5;
  }
  console.log("Length After:", filteredLength);

  return (
    <>
      {/*Using this form of mapping over the object as I am using the index in the onClick functionality to accept the task */}
      {Array.from({ length: filteredLength }).map((dummy, index) => (
        <>
          <div className="form-inputs">
            <div className="form-inputs1">
              <div className="form-inputs">
                <input
                  className="form-input"
                  type="text"
                  defaultValue={filteredArticles[index].Title}
                />
              </div>

              <div className="form-inputs">
                <input
                  className="form-input"
                  type="text"
                  defaultValue={filteredArticles[index].Section}
                />
              </div>

              <div className="form-inputs">
                <input
                  className="form-input"
                  type="text"
                  defaultValue={filteredArticles[index].State}
                />
              </div>
              <div className="form-inputs2">
                <button
                  className="form-decline-btn-mes"
                  type="submit"
                  onClick={() => handleSubmit(index, "decline")}
                  style={{ marginTop: "10px" }}
                >
                  Decline
                </button>
                <button
                  className="form-delete-btn-mes"
                  type="submit"
                  onClick={() => handleSubmit(index, "accept")}
                  style={{ marginTop: "10px" }}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
