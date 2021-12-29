import { getArticleExport } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../CSS/App.css";
import Parse from "parse";
import "../CSS/Form.css";

export default function HomeUserMessages(props) {
  const [Articles, setArticles] = useState();

  async function getArticlesFromDb() {
    const Articles = await getArticleExport();
    setArticles(Articles.articlesMapped);
  }
  useEffect(() => {
    getArticlesFromDb();
  }, []);

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
      article.JournalistAcceptance == false
    ) {
      console.log(
        "break1: ",
        article.Journalist.includes(Parse.User.current().attributes.username)
      );
      return article.Journalist.includes(
        Parse.User.current().attributes.username
      );
    } else if (
      Parse.User.current().attributes.role === "Photographer" &&
      article.PhotographerAcceptance == false
    ) {
      return article.Photographer.includes(
        Parse.User.current().attributes.username
      );
    } else if (
      Parse.User.current().attributes.role === "Assistant" &&
      article.AssistanceAcceptance == false
    ) {
      return article.Assistant.includes(
        Parse.User.current().attributes.username
      );
    } else if (Parse.User.current().attributes.role === "Editor") {
      return article.Assistant.includes(
        Parse.User.current().attributes.username
      );
    }
  });

  async function articleAcception(i) {
    const Article = new Parse.Object("Article");
    const articleset = Article[i];
    if (Parse.User.current().attributes.Role === "Journalist") {
      articleset.set("JournalistAcc", true);
    } else if (Parse.User.current().attributes.Role === "Photographer") {
      articleset.set("PhotoAcc", true);
    } else if (Parse.User.current().attributes.Role === "Assistant") {
      articleset.set("AssiAcc", true);
    }
  }

  return (
    <form className="form-mes">
      {/*Using this form of mapping over the object as I am using the index in the onClick functionality to accept the task */}
      {Array.from({ length: filteredArticles.length }).map((index) => (
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
            </div>
          </div>

          <div className="form-inputs2">
            <button className="form-decline-btn-mes" type="submit">
              Decline!
            </button>
            <button
              className="form-delete-btn-mes"
              type="submit"
              onClick={articleAcception(index)}
            >
              Accept the task
            </button>
          </div>
        </>
      ))}
    </form>
  );
}
